<template>
  <div id="app">
    <!--头部-->
    <screen_header></screen_header>
    <!--切换内容-->
    <screen_content>
      <!--路由视图-->
      <router-view v-transition></router-view>
      <!--路由视图-->
    </screen_content>
  </div>
</template>

<script>
  
  import Screen_header from "./components/index/screen_header/screen_header";
  import Screen_content from "./components/index/screen_content/screen_content";

  export default {
    name: 'app',
    components: {Screen_content, Screen_header},
  }
</script>

<style lang="scss">
  @import "common/scss/sandal/core";

  @font-face {
    font-family: nums;
    src: url('~common/fonts/KET.TTF')
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 1920px;
    height: 1080px;
    background: url("~common/img/blurred-bg.png");
    overflow: hidden;
    .ceshi{
      width: 100px;
      height: 100px;
      background-color: red;
    }
  }
</style>
