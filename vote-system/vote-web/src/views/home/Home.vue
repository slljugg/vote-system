<template>
  <div id="home">
    <div class="data-item-top">
      <div class="data-item-top-left">
        <img src="../../assets/home.jpg">
        <span class="sep">|</span>
        <router-link class="blog" to="/">slljugg Blog</router-link>
        <span class="sep">|</span>
      </div>
      <div class="data-item-top-middle">
        <img src="../../assets/github.jpg">
        <span class="sep">|</span>
        <a class="github" href="https://github.com/slljugg">github</a>
        <span class="sep">|</span>
      </div>
      <div class="data-item-top-mi">
        <img src="../../assets/mi.jpg">
        <span class="sep">|</span>
        <router-link class="system" to="/mi">小米首页 html css</router-link>
        <span class="sep">|</span>
      </div>
      <div class="data-item-top-right">
        <div>
          <img src="../../assets/logo.png">
          <span class="sep">|</span>
          <router-link class="system" to="/system">投票系统</router-link>
          <span class="sep">|</span>
        </div>
      </div>
    </div>
    <div class="data-item-buttom">
      <div class="data-slider">
        <ul class="data-menu">
          <li class="dataitem">
            <router-link class="datacount" to="/slider">Super Slider</router-link>
          </li>
          <li class="dataitem">
            <router-link class="datacount" to="/introduce">Vote Introdunce</router-link>
          </li>
          <li class="dataitem">
            <router-link class="datacount" to="/clock">Clock</router-link>
          </li>
          <li class="dataitem">
            <router-link class="datacount" to="/learning">Learning</router-link>
          </li>
          <li class="dataitem">
            <router-link class="datacount" to="/me">About Me</router-link>
          </li>
        </ul>
      </div>
      <div class="data-show">
        <div class="show">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  html, body {
    margin: 0;
    height: 100%;
  }
  #home {
    flex-flow: column;
    display: flex;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/home.jpg);
    background-size: cover;
    background-size:100% 100%;
    background-repeat: no-repeat;
  }
  .data-item-top {
    position: relative;
    width: 100%;
    height: 50px;
    background: rgba(27, 27, 27, 0.5);
    text-align: center;
    font-size: 20px;
  }
  .data-item-top-left {
    margin-left: 40px;
    float: left;
    height: 55px;
  }
  .data-item-top-left > .blog {
    display:inline-block;
    color:white;
    line-height: 55px;
    cursor: pointer;
    text-decoration: none;
  }
  .data-item-top-middle {
    position: absolute;
    right: 230px;
    height: 55px;
  }
  .data-item-top-mi {
    position: absolute;
    right: 415px;
    height: 55px;
  }
  .github {
    display: inline-block;
    color: #fff;
    line-height: 55px;
    text-decoration: none;
  }
  .github:hover {
    color:rgb(255, 0, 0);
    transition:1.5s;
  }
  .data-item-top-right {
    position: relative;
    float: right;
    height: 55px;
    width: 210px;
  }
  .system {
    display: inline-block;
    color: #fff;
    text-decoration: none;
    line-height: 55px;
  }
  .system:hover {
    color: rgb(255, 0, 0);
    transition: 2s;
  }
  .blog:hover {
    color: rgb(255, 0, 0);
    transition: 2s;
  }
  .sep {
    margin: 0.5em;
    margin-top: 0;
    margin-bottom: 0;
    color: #fff;
  }
  .data-item-top img {
    display:inline-block;
    line-height: 55px;
    width: 18px;
    height: 18px;
  }
  .data-item-buttom {
    width: 100%;
    background-color:rgba(0,0,0,0);
    flex: 1;
    position: relative;
    display: flex;
  }
  .data-slider {
    width: 320px;
    background-color: rgba(0,0,0,0);
  }
  .data-show {
    flex: 1;
    background-color: rgba(0,0,0,0);
    position: relative;
  }
  .show {
    width: 85%;
    height: 75%;
    background-color: rgba(0,0,0,0.2);
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;
    border-radius: 30px;
  }
  .data-menu {
    display: block;
    width: 320px;
    height: 600px;
    padding: 0;
    background-color: rgba(0,0,0,0);
    margin-top: 80px;
  }
  .dataitem {
    width: 260px;
    height: 50px;
    display: block;
    margin-left: 60px;
    background-color:rgba(0,0,0,0);
    margin-top: 40px;
    text-align: left;
    position: relative;
    border-radius: 10px;
  }
  .dataitem > .datacount {
    width: 260px;
    display: inline-block;
    text-decoration: none;
    line-height: 50px;
    padding-left: 30px;
    font-size: 24px;
    color: #fff;
    border-radius: 10px;
    background-color: #ff6700;
    transition: 2s;
  }
  .datacount:hover {
    color: #ff6700;
    background-color: rgb(251, 251, 251);
  }
</style>

<script>
export default {
  name: 'home',
};
</script>
