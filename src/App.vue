<template>
  <div id="app">
    <div id="nav">
      <div class="dev">

      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import demoService from '@/services/demoService'
export default {
  created() {
    this.test()
  },
  mounted() {
    console.log(this.$store.state.system)
  },
  methods: {
    async test() {
      let a = await demoService.testApi(82612312312, 10)
      console.log('controll log');
      console.log(a)
    }
  }
}
</script>
<style lang="less">
#app {
  #nav {
    font-size: 24px;
  }
}
.dev {
  border: 1px solid red;
  width: 348px;
  height: 100px;
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
