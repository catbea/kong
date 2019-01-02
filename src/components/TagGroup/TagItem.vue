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
  display: inline-block;
  white-space: nowrap;
  font-size: 10px;
  margin: 0 0;
  // transform: scale(0.85);
  margin: 1px 4px 1px 0;
  padding: 3px 8px;
  border-radius: 3px;
  margin-left: 1px;
}
</style>
