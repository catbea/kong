<template>
  <div v-if="true" class="tag-item" :style="style">{{info}}</div>
</template>
<script>
import conf from './conf'
export default {
  props: {
    info: {
      type: String
    }
  },
  data: () => ({
    style: null
  }),
  created() {
    this.computeStyle()
  },
  methods: {
    computeStyle() {
      this.style = conf(this.info)
    }
  }
}
</script>
<style lang="less">
.tag-item {
  border-radius: 3px;
  display: inline-block;
  white-space: nowrap;
  font-size: 12px;
  transform: scale(0.85);
  margin: 1px 0;
  padding: 3px 8px;
  
  
}
</style>
