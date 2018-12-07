<template>
  <van-popup v-model="isShow" position="bottom">
    <van-area :area-list="areaList" :value="code" :title="title" @cancel="cancelHandler" @confirm="confirmHandler" />
  </van-popup>
</template>
<script>
import { fullArea } from '@/utils/fullArea'
export default {
  props: {
    show: { type: Boolean, default: false },
    areaList: { type: Object, default: function () { return fullArea } },
    code: { type: String },
    title: { type: String },
  },
  data: () => ({
    isShow: false,
  }),
  methods: {
    confirmHandler (val) {
      this.$emit('confirm', val)
    },
    cancelHandler (val) {
      this.$emit('cancel', val)
    }
  },
  watch: {
    show (val) {
      this.isShow = val
    },
    isShow (val) {
      this.$emit('update:show', val)
    },
    code (val) {
      this.value = val
    },
    value (val) {
      this.$emit('update:code', val)
    }
  }
}
</script>
<style lang="less">
.area-select {
}
</style>

