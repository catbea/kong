<template>
  <div class="cell-container">
      <div>{{label}}</div>
  </div>
</template>
<script>
export default {
  name: 'cell',
  props: {
    label: String,

  }
}
</script>
<style lang="less">
.cell-container {
  position: relative;
  height: 56px;
  &:not(:last-child):after {
    content: ' ';
    position: absolute;
    pointer-events: none;
    box-sizing: border-box;
    left: 15px;
    right: 0;
    bottom: 0;
    transform: scaleY(0.5);
    border-bottom: 1px solid #DADADA;
  }
}
</style>

