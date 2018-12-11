<template>
  <van-popup v-model="isShow" position="bottom" @click-overlay="closeHandler">
    <van-picker show-toolbar :title="title" :columns="columns" @cancel="cancelHandler" @confirm="confirmHandler" />
  </van-popup>
</template>
<script>

export default {
  props: {
    show: { type: Boolean, default: false },
    columns: { type: Array },
    title: { type: String },
  },
  data: () => ({
    isShow: false
  }),
  methods: {
    confirmHandler(val) {
      this.$emit('confirm', val)
    },
    cancelHandler(val) {
      this.$emit('cancel', val)
    },
    closeHandler(val) {
      this.$emit('cancel', val)
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
