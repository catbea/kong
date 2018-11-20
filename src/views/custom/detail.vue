<template>
  <div class="custom-detail">

  </div>
</template>
<script>
export default {
  data: () => ({
    id: -1
  }),
  created () {
    this.id = this.$route.params.id
  }

}
</script>
<style lang="less">
.custom-detail {

}
</style>

