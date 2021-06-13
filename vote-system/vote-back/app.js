const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userAccount = require('./user-account')
// const socketIo = require('socket.io')

const port = 3005
const app = express()

app.use((req, res, next) =>{
  console.log(req.method,req.url)
  next()
})
app.use(cors({
  allow:true,
  maxAge:86400,
  credentials:true,
  origin: function(origin, cb) {
    cb(null, true)
  },
}))
app.use(cookieParser('secret'))

app.use(express.static(__dirname + '/static'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(userAccount)


app.listen(port, () => {
  console.log(port)
})