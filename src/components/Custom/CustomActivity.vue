<template>
  <div class="CustomActivity-page" @click="goactivitDetaily">
      <img :src="activityIcon" class="CustomActivity-img">
  </div>
</template>
<script>
export default {
  props: {
    info: { type: Object }
  },
  data() {
    return {
      activityIcon: require('IMG/custom/customActivity.png')
    }
  },
  methods: {
    goactivitDetaily() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less">
.CustomActivity-page {
  position: fixed;
  bottom: 67px;
  right: 20px;
  .CustomActivity-img {
    width: 84px;
    height: 84px;
  }
}
</style>
