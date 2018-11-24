<template>
  <div class="null-container">
    <img :src="nullIcon" class="nullIcon">
    <p class="null-content">{{nullcontent}}</p>
  </div>

</template>
<script>
export default {
  props: {
    nullIcon: { type: String, default: '' },
    nullcontent: { type: String, default: '' },
  }
}
</script>
<style lang="less">
.null-container {
  text-align: center;
  margin-top: 55%;
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
