<template>
  <div class="dynamics-collect">
    <div class="top-container">
      <h5></h5>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: _ => ({
    data: null
  }),
  watch: {
    info (val) {
      this.data = val
    }
  }
}

</script>
<style lang="less">
.dynamics-collect {
}
</style>

