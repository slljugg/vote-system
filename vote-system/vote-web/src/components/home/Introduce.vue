<template>
  <div id="introduce">
    <div class="introduce-wrap">
      <div class="introduce-title"><h1>投票系统介绍</h1></div>
      <p><strong>技术栈：HTML, CSS, JS, Vue, Element-UI, Axios, Node,</strong></p><br>
      <p><strong style="margin-buttom:5px;">具体实现如下：</strong></p><br>
      <p>使用Node作为后端，Vue作为前端框架，使用Vue/cli创建的一个前后端分离的小项目。</p><br>
      <p>数据库采用的是Sqlite，express处理前端发过来的请求并且返回需要使用到的相关json，lodash处理投票数据。</p><br>
      <p>cors处理跨域请求，cookie-parser设置cookie标记用户名实现登录用户与未登录用户跳转至不同界面。</p><br>
      <p>nodemailer实现忘记密码的情况下发送邮件找回密码。</p><br>
      <p style="color: red;">具体实现功能点击右上角投票系统尝试。</p><br>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #introduce {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .introduce-wrap {
    height: 80%;
    width: 80%;
    background-color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 30px;
    // transition: .4s;
  }
  .introduce-title {
    text-align: center;
  }
  .introduce-wrap p {
    font-size: 18px;
    margin: 0px 50px;
  }
  .introduce-title h1 {
    margin-bottom: 15px;
  }
  // .introduce-wrap:hover {
  //   /* transform: translatey(-10px); */
  //   width: 85%;
  //   height: 85%;
  //   font-size: 25px;
  // }
</style>

<script>
export default {
  name: 'introduce',
}
</script>
