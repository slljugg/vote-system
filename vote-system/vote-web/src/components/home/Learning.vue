<template>
  <div id="learning">
    <div class="learn-book">
      <h1>书籍</h1>
      <p>《编码》</p>
      <p>《HeadFirst  HTML与CSS》</p>
      <p>《CSS权威指南》</p>
      <p>《CSS3专业网页开发指南》</p>
      <p>《Eloquent JavaScript JavaScript 编程精解》</p>
      <p>《JavaScript 高级程序设计》</p>
    </div>
    <div class="learn-video">
      <h1>视频</h1>
      <a href="https://space.bilibili.com/341919508?spm_id_from=333.788.b_765f7570696e666f">
        全站之巅：node.js Vue.js 项目部署
      </a>
      <a href="https://space.bilibili.com/425325651?spm_id_from=333.788.b_765f7570696e666f">
        SimbaJs：小程序 Vue.jsjs UI 面试
      </a>
      <a href="https://space.bilibili.com/40018594?spm_id_from=333.788.b_765f7570696e666f">
        老陈打码：前端技巧学习
      </a>
      <a href="https://space.bilibili.com/431551452?spm_id_from=333.788.b_765f7570696e666f">
        手把手撸码前端：Vue.js完整项目学习
      </a>
    </div>
  </div>
</template>

<style lang="scss">
  #learning {
    width: 80%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    position: relative;
    left: 10%;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
  }
  .learn-book, .learn-video {
    height: 90%;
    width: 45%;
    background-color:#fff;
    border-radius: 50px;
    position: relative;
    top: 5%;
    text-align: center;
    transition: .5s;
  }
  .learn-book p {
    font-size: 18px;
    // color: blue;
  }
  // .learn-book:hover {
  //   background-image:linear-gradient(to right,white,orange);
  //   animation:learn-book 1s 1;
  //   top: 4%;
  // }
  // .learn-video:hover {
  //   background-image:linear-gradient(to right,white,orange);
  //   animation:learn-vedio 1s 1;
  //   top: 4%;
  // }
  .learn-video a {
    display: block;
    margin: 20px;
    font-size: 18px;
  }
  #learning h1 {
    margin-bottom: 50px;
  }
</style>

<script>
export default {
  name: 'learning',
}
</script>
