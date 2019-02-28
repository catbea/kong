<template>
  <div class="talk-page">
    <iframe :src="this.host+'panorama-helper/static/customerAnalysis.html?agentId='+this.userInfo.agentId+'&enterpriseId='+this.userInfo.enterpriseId"
     scrolling='auto'></iframe>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data:()=>({
     host: process.env.VUE_APP_APP_URL
  }),
  computed: {
    ...mapGetters(['userInfo'])
  },
  // mounted() {
    // let host=process.env.VUE_APP_APP_URL
    // window.location.href = `${host}panorama-helper/static/customerAnalysis.html?agentId=${this.userInfo.agentId}&enterpriseId=${this.userInfo.enterpriseId}`
  // },
//   beforeRouteEnter (to, from, next) {
    
//   next(vm => {
//     if(from.name==='user'){
//       console.log(window)
//       let host=process.env.VUE_APP_APP_URL
//     window.location.href = `${host}panorama-helper/static/customerAnalysis.html?agentId=${vm.userInfo.agentId}&enterpriseId=${vm.userInfo.enterpriseId}`
//     }else{
//       window.history.back(-1); 
//     }
//   })
// }
}
</script>
<style lang="less">
.talk-page{
  width:100%;
  height:100%;
  iframe{
    width:100%;
  height:100%;
  }
}
</style>
