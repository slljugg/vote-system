<template>
  <div id="me">
    <div class="me-pic"></div>
    <span class="tel"><i class="el-icon-phone"></i>15869161830</span>
    <span class="wechat"><i class="el-icon-chat-dot-round"></i>15869161830</span>
  </div>
</template>

<style lang="scss">
  #me {
    width: 100%;
    height: 100%;
    background-color: rgba(248, 245, 245, 0);
    position: relative;
    text-align: center;
  }
  .me-pic {
    width: 300px;
    height: 300px;
    border-radius: 99999px;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    margin: auto;
    background-image: url(../../assets/home.jpg);
    background-size: cover;
    background-size:100% 100%;
    background-repeat: no-repeat;
  }
  #me span.tel {
    display: block;
    position: absolute;
    top: 380px;
    left: 0;
    right: 0;
    margin: auto;
    line-height: 50px;
    font-size: 24px;
    color: white;
  }
  #me span.wechat {
    display: block;
    position: absolute;
    top: 430px;
    left: 0;
    right: 0;
    margin: auto;
    line-height: 50px;
    font-size: 24px;
    color: white;
  }
</style>

<script>
export default {
  name: 'me',
}
</script>
