<template>
  <div class="shadow-box">
    <slot name="container"></slot>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.shadow-box {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07), 0px 2px 17px 0px rgba(34, 47, 85, 0.05);
  border-radius: 6px;
  margin: 0 16px;
}
</style>
