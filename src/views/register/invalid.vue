<template>
  <div class="invalid">
    <img src="../../assets/img/register/invalid.png" alt="">
    <p v-if="type==1">二维码已过期！</p>
    <p v-else>优惠券已领完！</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: ''
    }
  },
  created () {
    this.type = this.$route.query.type || 1
  }
}
</script>

<style lang="less" scoped>
.invalid{
 height: 100%;
 position: relative;
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 img{
   width: 92px;
   height: 92px;
 }
 p{
   color: #999;
   font-size: 14px;
   margin-top: 16px;
 }
}
</style>
