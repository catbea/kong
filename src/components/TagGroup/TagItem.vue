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
  font-size: 10px;
  padding: 3px 4px 2px;
  border-radius: 2px;
  margin-right: 5px;
  background: rgba(143, 159, 177, 0.15);
  color: #5c5f66;
  white-space: nowrap;
}
</style>
