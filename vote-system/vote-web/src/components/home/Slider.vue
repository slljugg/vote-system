<template>
  <div id="slider">
    <input type="radio" name="slider" id="a1" checked>
    <input type="radio" name="slider" id="a2">
    <input type="radio" name="slider" id="a3">
    <input type="radio" name="slider" id="a4">
    <div class="main">
      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <label for="a1">1</label>
      </div>
      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <label for="a2">2</label>
      </div>
      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <label for="a3">3</label>
      </div>
      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <label for="a4">4</label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  html, body {
    margin: 0;
  }
  #slider {
    position: relative;
    margin-top: -1px;
  }
  input {
      display: none;
  }
  .main {
    width: 880px;
    height: 500px;
    background-color: rgba(0, 0, 0, 0.02);
    margin: auto;
    text-align: center;
    position: relative;
    border-radius: 5px;
    top: 16px;
    left: 0;
    bottom: 0;
    right: 0;
    font-size: 0;
    line-height: 500px;
  }
  .main > div {
    display: inline-block;
    width: 210px;
    height: 500px;
    border-radius: 5px;
    border: 2px solid white;
    vertical-align: middle;
    position: relative;
    overflow: hidden;
  }
  label {
    display: inline-block;
    height: 50px;
    width: 50px;
    border-radius: 100px;
    font-size: 20px;
    line-height: 40px;
    border: 5px solid rgba(0, 0, 0, 0.02);
    background-color: rgba(0, 0, 0, 0.6);
    /* box-shadow: 2px 2px 2px black; */
    color: red;
    position: absolute;
    top: 420px;
    left: 80px;
    z-index: 50;
  }
  label:hover {
    background-color: #fff;
    color: red;
    cursor: pointer;
  }
  div > span {
    width: 210px;
    height: 500px;
    position: absolute;
    border-radius: 5px;
    left: -100%;
    animation: leave 1s -0.5s linear;
  }
  @keyframes leave {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }
  input:nth-of-type(1):checked ~ .main > div > span:nth-of-type(1),
  input:nth-of-type(2):checked ~ .main > div > span:nth-of-type(2),
  input:nth-of-type(3):checked ~ .main > div > span:nth-of-type(3),
  input:nth-of-type(4):checked ~ .main > div > span:nth-of-type(4){
    left: 0;
    animation: none;
    z-index: 10;
    transition: 0.5s linear;
  }
  input:nth-of-type(1):checked ~ .main > div:nth-of-type(1) > label,
  input:nth-of-type(2):checked ~ .main > div:nth-of-type(2) > label,
  input:nth-of-type(3):checked ~ .main > div:nth-of-type(3) > label,
  input:nth-of-type(4):checked ~ .main > div:nth-of-type(4) > label{
    background-color: #fff;
    color: blue;
  }
  div > span:nth-child(1) {
    background-image: url(../../assets/asi.jpg);
    background-size: cover;
    background-repeat: no-repeat;
  }
  div > span:nth-child(2) {
    background-image: url(../../assets/barsa.jpg);
    background-size: cover;
    background-repeat: no-repeat;
  }
  div > span:nth-child(3) {
    background-image: url(../../assets/onepiece.jpg);
    background-size: cover;
    background-repeat: no-repeat;
  }
  div > span:nth-child(4) {
    background-image: url(../../assets/show.jpg);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .main > div:nth-of-type(1) > span{
    background-position: 0 0;
  }
  .main > div:nth-of-type(2) > span{
    background-position: -210px 0;
  }
  .main > div:nth-of-type(3) > span{
    background-position: -420px 0;
  }
  .main > div:nth-of-type(4) > span{
    background-position: -630px 0;
  }
</style>

<script>
export default {
  name: 'slider',
}
</script>
