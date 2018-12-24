<template>
  <div class="null-container">
    <img :src="nullIcon" class="nullIcon">
    <p class="null-content">暂无动态，赶紧去分享名片吧</p>
  </div>

</template>
<script>
export default {
  props: {},
  data() {
    return {
      nullIcon: require('IMG/dynamics/dynamicsNull.png')
    }
  }
}
</script>
<style lang="less">
.null-container {
  background: #ffffff;
  text-align: center;
  margin-top: 20%;
  > .nullIcon {
    width: 88px;
    height: 88px;
  }
  > .null-content {
    font-size: 12px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 17px;
  }
}
</style>
