<template>
  <div id="app">
    <div id="view-box" ref="viewBox">
      <div class="router-view">
        <router-view></router-view>
      </div>
      <tabbar></tabbar>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Common/Navbar'
import Tabbar from '@/components/Common/Tabbar'
export default {
  components: {
    Navbar,
    Tabbar
  },
  mounted() {
    document.addEventListener('touchstart', handler, false)
  },
  methods:{
    handler(e){
      e.preventDefault()
    }
  }
}
</script>
<style lang="less">
@import '~normalize.css/normalize.css';
@import './assets/css/reset.less';
@import './assets/css/common.less';

html {
  -webkit-text-size-adjust: none;
  -webkit-overflow-scrolling: touch;
}

#app {
  width: 100%;
  height: 100%;
  #view-box {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    > .router-view {
      position: relative;
      margin-bottom: -1px;
      width: 100%;
      height: 100%;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      > div {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
      }
    }
  }
}
</style>
