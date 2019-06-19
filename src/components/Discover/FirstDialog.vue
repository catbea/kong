<template>
  <div class="firstDialog" v-show="isShowFirstDialog" style="display:none">
      <div class="img-box">
        <img class="bigImg" :src="bigImg" alt="">
        <img class="knowImg" :src="knowImg" alt="" @click.stop="firstDialogBtn">
      </div>
  </div>
</template>
<script>
export default {
  props: {
    isShowFirstDialog: { type: Boolean ,default:false}
  },
  data:()=>{
    return {
      bigImg:require('IMG/discover/article_tips.png'),
      knowImg:require('IMG/discover/article_btn.png')    
    }
  },
  methods: {
    firstDialogBtn(){
      this.$emit("firstDialogBtn");
    }
  }
}
</script>
<style lang="less" scoped>
.firstDialog{
  position:fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 1);
  overflow: hidden;
  .img-box{    
    margin-top: 71px;
    img{
      display: block;
    }
    .bigImg{
      width: 336px;
      height: 271px;
    }
    .knowImg{
      width: 160px;
      height: 40px;
      margin:49px auto 0;
    }
  }
}
</style>
