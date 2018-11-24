<template>
  <div v-if="true" class="tag-item" :style="style">{{info}}</div>
</template>
<script>
import conf from './conf'
export default {
  props: {
    // info: {
    //   type:Object,
    //   default:function () {
    //     return {}
    //   }
    // }
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
  font-size: 12px;
  margin: 0 -5px;
  transform: scale(0.85);
  margin: 1px 4px 1px -6px;
  padding: 1px 5px;
  border-radius: 3px;
  height: 15px;
  line-height: 15px;
}
</style>
