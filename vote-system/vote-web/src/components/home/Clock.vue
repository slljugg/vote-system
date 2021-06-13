<template>
    <div id="clock">
      <div class="clock-wrap">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
        <span>11</span>
        <span>12</span>
        <div class="hour">
          <div class="h1"></div>
        </div>
        <div class="minter">
          <div class="m1"></div>
        </div>
        <div class="secondclock">
          <div class="s1"></div>
        </div>
      </div>
    </div>
</template>

<style lang="scss">
  #clock {
    position: relative;
    top: 54px;
    left: 0;
    right: 0;
    margin: auto;
    width: 80%;
    height: 80%;
    background-image: url(../../assets/clock.jpg);
    background-size: cover;
    background-size:100% 100%;
    background-repeat: no-repeat;
    border-radius: 200px;
  }
  .clock-wrap {
  height: 300px;
  width: 300px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;
  border-radius:9999px;
  background-color: white;
  overflow: hidden;
  box-shadow: 2px 2px 20px -1px green;
  }
  div.clock-wrap > div {
  height: 300px;
  width: 300px;
  position: absolute;
  }
  .hour {
    animation: time 43200s steps(60, end) infinite;
  }
  .minter {
    animation: time 3600s steps(60, end) infinite;
  }
  .secondclock {
    animation: time 60s steps(60, end) infinite;
  }
  @keyframes time {
    from {
      transform:rotate(0);
    }
    to {
      transform:rotate(360deg);
    }
  }
  .h1 {
    width: 8px;
    height:70px;
    position: absolute;
    top: 80px;
    left: 146px;
    background-color: black;
    border-radius:50% 50% 0 0;
    animation: hour 720s ease-out infinite;
  }
  .m1 {
    width: 6px;
    height:90px;
    position: absolute;
    top: 60px;
    left: 147px;
    background-color: black;
    border-radius:50% 50% 0 0;
    animation: min 60s ease-out infinite;
  }
  .s1 {
    width: 4px;
    height:135px;
    position: absolute;
    top: 30px;
    left: 148px;
    background-color: red;
    border-radius:50% 50% 0 0;
    animation: sec 1s ease-out infinite
  }
  @keyframes hour {
    0% {
      transform: rotate(0);
    }
    0.03125% {
      transform: rotate(3deg);
    }
    0.0625% {
      transform: rotate(0);
    }
    0.09375% {
      transform: rotate(-1.5deg);
    }
    0.125% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(0);
    }
  }
  @keyframes min {
    0% {
      transform: rotate(0);
    }
    0.125% {
      transform: rotate(3deg);
    }
    0.25% {
      transform: rotate(0);
    }
    0.375% {
      transform: rotate(-1.5deg);
    }
    0.5% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(0);
    }
  }
  @keyframes sec {
    0% {
      transform: rotate(0);
    }
    5% {
      transform: rotate(2deg);
    }
    10% {
      transform: rotate(0);
    }
    15% {
      transform: rotate(-1deg);
    }
    20% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(0);
    }
  }
  .clock-wrap span {
    height: 50px;
    width: 50px;
    text-align: center;
    position: absolute;
    line-height: 50px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
    /* background-color: #fff; */
  }
  .clock-wrap span:nth-child(1) {
    transform: rotate(-60deg) translatex(125px) rotate(60deg);
  }
  .clock-wrap span:nth-child(2) {
    transform: rotate(-30deg) translatex(125px) rotate(30deg);
  }
  .clock-wrap span:nth-child(3) {
    transform: rotate(0deg) translatex(125px) rotate(0deg);
  }
  .clock-wrap span:nth-child(4) {
    transform: rotate(30deg) translatex(125px) rotate(-30deg);
  }
  .clock-wrap span:nth-child(5) {
    transform: rotate(60deg) translatex(125px) rotate(-60deg);
  }
  .clock-wrap span:nth-child(6) {
    transform: rotate(90deg) translatex(125px) rotate(-90deg);
  }
  .clock-wrap span:nth-child(7) {
    transform: rotate(120deg) translatex(125px) rotate(-120deg);
  }
  .clock-wrap span:nth-child(8) {
    transform: rotate(150deg) translatex(125px) rotate(-150deg);
  }
  .clock-wrap span:nth-child(9) {
    transform: rotate(180deg) translatex(125px) rotate(-180deg);
  }
  .clock-wrap span:nth-child(10) {
    transform: rotate(210deg) translatex(125px) rotate(-210deg);
  }
  .clock-wrap span:nth-child(11) {
    transform: rotate(240deg) translatex(125px) rotate(-240deg);
  }
  .clock-wrap span:nth-child(12) {
    transform: rotate(270deg) translatex(125px) rotate(-270deg);
  }
</style>

<script>
export default {
  name: 'clock',
}
</script>
