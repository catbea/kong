<template>
  <div v-if="info" class="tag-item" :style="style"><span>最多六个字</span></div>
</template>
<script>
import conf from './conf'
export default {
  props: {
    info: { type: String }
  },
  data: () => ({
    style:null
  }),
  created () {
    this.computeStyle()
  },
  methods: {
    computeStyle(){
      this.style = conf(this.info)
    }
  }
}
</script>
<style lang="less">
.tag-item {
  display: inline-block;
  white-space: nowrap;
  font-size: 12px;
  margin: 0 -5px;
  transform: scale(0.85);
  margin: 1px 1px 1px -6px;
  padding: 1px 5px;
  border-radius: 3px;
}
</style>
