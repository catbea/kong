<template>
  <div v-if="info" class="tag-item" :style="styleOptions"><span>{{info.labelName}}</span></div>
</template>
<script>
export default {
  props: {
    info: { type: Object, default: _ => { return {} } },
    styleOptions: { type: Object, default: _ => { return {} } }
  }
}
</script>
<style lang="less">
.tag-item {
  display: inline-block;
  font-size: 12px;
  transform: scale(0.85);
  margin: 1px -1px;
  padding: 1px 5px;
  border-radius: 3px;
}
</style>



