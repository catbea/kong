<template>
  <div class="custom-detail">
    <div class="custom-info">

    </div>
  </div>
</template>
<script>
import CustomService from 'SERVICE/customService'
export default {
  data: () => ({
    id: -1,
    customBaseInfo: null
  }),
  created () {
    this.id = this.$route.params.id
    this.getCustomBaseInfo(this.id)
  },
  methods: {
    async getCustomBaseInfo (id) {
      const result = await CustomService.getClientInfo(id)
      this.customBaseInfo = result
    }
  }

}
</script>
<style lang="less">
.custom-detail {
}
</style>

