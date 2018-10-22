<template>
  <div id="app">
    <div id="view-box">
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
import demoService from '@/services/demoService'
export default {
  components: {
    Navbar,
    Tabbar
  },
  created () {
    this.test()
  },
  mounted () {
    // console.log(this.$store.state.system)
  },
  methods: {
    async test () {
      let a = await demoService.testApi(82612312312, 10)
    }
  }
}
</script>
<style lang="less">
@import './assets/css/reset.less';
@import './assets/css/common.less';

html {
  -webkit-text-size-adjust: none;
  -webkit-overflow-scrolling: touch;
}

#app {
  width: 100%;
  height: 100%;
  // position: relative;
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
      >div{
        position: absolute;
        top: 0;
      }
    }
  }
}

// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
