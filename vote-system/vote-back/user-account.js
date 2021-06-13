const fs = require('fs')
const express = require('express')
const nodemailer = require('nodemailer')
const e = require('cors')


const chengePasswordTokenMap = {}
let db
(async function() {
  db = await require('./db')
}())

const app = express.Router()

app.route('/register')
  .post(async (req, res, next) => {
    var registerInfo = req.body
    var user = await db.get('SELECT * FROM users WHERE name=?',registerInfo.name)
    if(user) {
      res.json({
        meta: {
          status: 404,
          code: 0,
          msg: '用户名已存在'
        }
      })
      return
    }
    await db.run('INSERT INTO users (name,email,password) VALUES(?,?,?)',registerInfo.name,registerInfo.email,registerInfo.password)
    res.json({
      meta: {
        status: 200,
        code: 1,
        msg: '用户注册成功'
      }
    })
  })

app.route('/login')
  .post(async (req, res, next) => {
    var tryloginInfo = req.body
    var user = await db.get('SELECT * FROM users WHERE name=? AND password=?',tryloginInfo.name,tryloginInfo.password)
    if(!user) {
      res.json({
        meta: {
          status: 404,
          code: 0,
          msg: '用户信息有误'
        }
      })
      return
    }
    res.cookie('userid', user.id, {
      signed: true,
    })
    res.json({
      meta: {
        status: 200,
        code: 1,
        msg: '登录成功'
      },
      token: Math.random().toString().slice(2),
    })
  })

app.route('/change')
  .post(async (req, res, next) => {
    var email = req.body.email
    var user = await db.get('SELECT * FROM users WHERE email=?',email)
    if(!user) {
      res.json({
        meta: {
          status: 404,
          code: 0,
          msg: '不存在此邮箱'
        }
      })
      return
    }
    var token = Math.random().toString().slice(2)
    chengePasswordTokenMap[token] = email
    var link = `http://localhost:8080/#/change-password/${token}`

    var transport = nodemailer.createTransport('smtps://994192111%40qq.com:niymkasczvkhbfgc@smtp.qq.com')
    var mailOptions = {
      from: '994192111@qq.com',
      to: '994192111@qq.com',
      subject: '大家好，我是lei',
      text: link,
    }
    transport.sendMail(mailOptions, function(err, info) {
      if(err) {
        return console.log(err)
      }
      console.log('Message sent: ' + info.response)
      res.json({
        meta: {
          status: 200,
          code: 1,
          msg: '链接已发送请注意查收'
        }
      })
    })
  })

app.route('/change-password/:token')
.post(async (req, res, next) => { 
  var token = req.params.token
  var password = req.body.password
  var email = chengePasswordTokenMap[token]
  var user = await db.get('SELECT * FROM users WHERE email=?',email)
  if(!user) {
    res.json({
      meta: {
        status: 404,
        code: 0,
        msg: '此链接已失效'
      }
    })
    return
  }
  setTimeout(() => {
    delete chengePasswordTokenMap[token]
  }, 60 * 1000 * 20)
  await db.run('UPDATE users SET password=? WHERE email=?',password,email)
  res.json({
    meta: {
      status: 200,
      code: 1,
      msg: '密码修改成功'
    }
  })
})

app.route('/userinfo')
  .get(async (req, res, next) => {
    var userid = req.signedCookies.userid
    if(userid) {
      var user = await db.get('SELECT id,name,email FROM users WHERE id=?',userid)
      res.json({
        meta: {
          status: 200,
          code: 1,
          msg: '获取数据成功'
        },
        data: user,
      })
      return
    }
    res.json({
      meta: {
        status: 404,
        code: 0,
        msg: '获取用户数据失败'
      }
    })
  })

app.route('/users/:id')
  .get(async (req, res, next) => {
    var uid = req.params.id
    var userinfo = await db.get('SELECT * FROM users WHERE id=?', uid)
    if(!userinfo) {
      res.json({
        meta: {
          status: 404,
          code: 0,
          msg: '获取用户信息失败'
        }
      })
      return
    }
    res.json({
      meta: {
        status: 200,
        code: 0,
        msg: '获取用户信息成功'
      },
      data: userinfo
    })
  })
  .put(async (req, res, next) => {
    var uid = req.params.id
    var userinfo = req.body
    // console.log(userinfo)
    await db.run('UPDATE users SET name=? WHERE id=?', userinfo.name, uid)
    await db.run('UPDATE users SET password=? WHERE id=?', userinfo.password, uid)
    await db.run('UPDATE users SET email=? WHERE id=?', userinfo.email, uid)
    res.json({
      meta: {
        status: 200,
        code: 1,
        msg: '用户数据更新成功'
      }
    })
  })
  .delete(async (req, res, next) => {
    var uid = req.params.id
    var user = await db.get('SELECT * FROM users WHERE id=?', uid)
    if(user.name === 'admin') {
      res.json({
        meta: {
          status: 404,
          code: 0,
          msg: '无法删除超级管理员用户admin'
        }
      })
      return
    } 
    await db.run('DELETE FROM users WHERE id=?', uid)
    res.json({
      meta: {
        status: 200,
        code: 1,
        msg: '删除用户成功'
      }
    })
  })

app.route('/userlist')
  .get(async (req, res, next) => {
    var userid = req.signedCookies.userid
    if(!userid) {
      res.json({
        meta: {
          status: 404,
          code: 0,
          msg: '获取用户信息失败，请确认已登录'
        }
      })
    }
    var users = await db.all('SELECT * FROM users')
    res.json({
      meta: {
        status: 200,
        code: 1,
        msg: '获取用户列表成功'
      },
      data: users
    })
  })

app.get('/ticketsinfo', async(req, res, next) => {
  var tickets = await db.all('SELECT * FROM votes')
  var voteups = await db.all('SELECT * FROM voteups WHERE userid=?',req.signedCookies.userid)
  if (!tickets) {
    res.json({
      meta: {
        status: 404,
        code: 0,
        msg: '数据库无投票数据'
      }
    })
    return
  }
  res.json({
    meta: {
      status: 200,
      code: 1,
      msg: '数据请求成功'
    },
    data: {
      tickets,
      voteups
    }
  })
})

app.route('/logout')
  .get((req, res, next) => {
    res.clearCookie('userid')
    res.json({
      meta: {
        status:200,
        code:1,
        msg: '登出成功'
      }
    })
  })

app.route('/create')
  .post(async (req, res, next) => {
    console.log(req.body)
    var createInfo = req.body
    var userid = req.signedCookies.userid
    if(!userid) {
      res.json({
        meta: {
          status: 404,
          code: 0,
          msg: '创建失败，请先登录'
        }
      })
      return
    }
    await db.run('INSERT INTO votes (title,desc,userid,singleSelection,deadline,anonymouse) VALUES (?,?,?,?,?,?)',createInfo.title, createInfo.desc, userid, createInfo.singleSelection, createInfo.deadline, createInfo.anonymouse)

    var createVote = await db.get('SELECT * FROM votes ORDER BY id DESC LIMIT 1')
    await Promise.all(createInfo.options.map(option => {
    return db.run('INSERT INTO options (content,voteid) VALUES(?,?)',option,createVote.id)
    }))
    res.json({
      meta: {
        status: 200,
        code: 0,
        msg: '创建投票成功'
      },
      data: createVote
    })
  })

app.route('/createdself')
  .get(async (req, res, next) => {
    var userid = req.signedCookies.userid
    if (!userid) {
      res.json({
        meta: {
          status: 401,
          code: 0,
          msg: '获取用户个人投票信息失败'
        }
      })
      return
    } 
    var createdinfo = await db.all('SELECT * FROM votes WHERE userid=?',userid)
    res.json({
      meta: {
        status: 200,
        code: 1,
        msg: '获取用户个人投票信息成功'
      },
      data: createdinfo,
    })
  })

app.route('/created/:id')
  .delete(async (req, res, next) => {
    var voteid = req.params.id
    var userid = req.signedCookies.userid
    if (!userid) {
      res.json({
        meta: {
          status: 401,
          code: 0,
          msg: '删除数据失败,请确保您已登录'
        }
      })
      return
    }
    await db.run('DELETE FROM votes WHERE id=?',voteid)
    await db.run('DELETE FROM options WHERE voteid=?',voteid)
    await db.run('DELETE FROM voteups WHERE voteid=?',voteid)
    res.json({
      meta: {
        status: 200,
        code: 1,
        msg: '删除数据成功'
      }
    })
  })

app.route('/voteinfo/:id')
  .get(async (req, res, next) => {
    var userid = req.signedCookies.userid
    if(!userid) {
      res.json({
        meta: {
          status: 404,
          code: 0,
          msg: '请求个人详情数据失败'
        }
      })
    }
    var info = await db.get('SELECT * FROM votes WHERE id=?',req.params.id)
    var options = await db.all('SELECT * FROM options WHERE voteid=?',req.params.id)
    var voteups = await db.all('SELECT * FROM voteups WHERE voteid=?',req.params.id)
    res.json({
      meta: {
        status: 200,
        code: 1,
        msg: '请求个人数据成功'
      },
      data: {
        info,
        options,
        voteups,
      }
    })
  })

app.route('/contentinfo/:id')
  .get(async (req, res, next) => {
    var userid = req.signedCookies.userid
    if(!userid) {
      res.json({
        meta: {
          status: 404,
          code: 0,
          msg: '请求个人选项详情数据失败,未登录'
        }
      })
    }
    var voteup = await db.get('SELECT * FROM voteups WHERE userid=? AND voteid=?',req.signedCookies.userid,req.params.id)
    if(!voteup) {
      res.json({
        meta: {
          status: 404,
          code: 0,
          msg: '获取数据失败，还未对该项投票'
        }
      })
      return
    }
    var contents = await db.get('SELECT * FROM options WHERE id=?',voteup.optionid)
    if(!contents) {
      res.json({
        meta: {
          status: 404,
          code: 0,
          msg: '获取数据失败，还未对该项投票'
        }
      })
      return
    }
    res.json({
      meta: {
        status: 200,
        code: 1,
        msg: '获取数据成功'
      },
      data: {
        contents
      }
    })
  })

app.post('/voteup', async (req, res, next) => {
  // var userid = req.signedCookies.userid
  // var body = req.body
  // var voteid = req.body.voteid
  // var voteupInfo = await db.get('SELECT * FROM voteups WHERE userid=? AND voteid=?',req.signedCookies.userid, req.body.voteid)
  // if(voteupInfo) {
  //   await db.run ('UPDATE voteups SET optionid=? WHERE userid=? AND voteid=?',req.body.optionid, req.signedCookies.userid,  req.body.voteid)
  // } else {
  //   await db.run ('INSERT INTO voteups (userid, optionid, voteid) VALUES (?,?,?)',req.signedCookies.userid, req.body.optionid, req.body.voteid)
  // }
  await db.run ('INSERT INTO voteups (userid, optionid, voteid) VALUES (?,?,?)',req.signedCookies.userid, req.body.optionid, req.body.voteid)
  res.json({
    meta: {
      status: 200,
      code: 1,
      msg: '投票成功'
    }
  })
})

app.get('/votedlist', async (req, res, next) => {
  var userid = req.signedCookies.userid
  if(!userid) {
    res.json({
      meta: {
        status: 404,
        code: 0,
        msg: '信息请求失败'
      }
    })
    return
  }
  var votedlist = await db.all('SELECT * FROM votes JOIN voteups ON voteups.userid=? WHERE votes.id=voteups.voteid', userid)
  if (!votedlist) {
    res.json({
      meta: {
        status: 404,
        code: 0,
        msg: '没有数据，该用户没用进行过投票'
      }
    })
    return
  }
  res.json({
    meta: {
      status: 200,
      code: 1,
      msg: '请求个人数据成功'
    },
    data: votedlist
  })
})

app.get('/votedetail/:id', async(req, res, next) => {
  var vid = req.params.id
  var votes = await db.get('SELECT * FROM votes WHERE votes.id=?',vid)
  var options = await db.all('SELECT * FROM options WHERE voteid=?',vid)
  var voteups = await db.all('SELECT * FROM voteups WHERE voteid=?',vid)
  res.json({
    meta: {
      status: 200,
      code: 1,
      msg: '获取数据成功'
    },
    data: {
      votes,
      options,
      voteups
    }
  })
})

app.get('/cententdetail/:id', async (req, res, next) => {
  var optionid = req.params.id
  var contents = await db.get('SELECT * FROM options WHERE id=?',optionid)
  res.json({
    meta: {
      status: 200,
      code: 1,
      msg: '获取选项成功'
    },
    data: contents
  })
}) 


module.exports = app
