<template>
  <van-popup v-model="isShow" position="bottom">
    <van-area :area-list="areaList" :value="value" @confirm="confirmHandler" @cancel="closePopup"/>
  </van-popup>
</template>
<script>
import { fullArea } from '@/utils/fullArea'
export default {
  props: {
    show: { type: Boolean, default: false },
    areaList: {
      type: Object,
      default: function() {
        return fullArea
      }
    },
    code: { type: String }
  },
  data: () => ({
    isShow: false,
    value: '110000'
  }),
  methods: {
    confirmHandler(val) {
      this.$emit('confirmCityData', val)
      this.isShow = false
    },
    closePopup() {
      this.isShow = false
    }
  },
  watch: {
    show(val) {
      this.isShow = val
    },
    isShow(val) {
      this.$emit('update:show', val)
    },
    code(val) {
      this.value = val
    },
    value(val) {
      this.$emit('update:code', val)
    }
  }
}
</script>
<style lang="less">
.area-select {
}
</style>

