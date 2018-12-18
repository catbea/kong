<template>
  <div class="map-container"></div>
</template>
<script>
export default {
  props: {
    latLng: {
      type: Object,
      default: () => {
        return { lat: 31.28706, lng: 114.606628 }
      }
    }
  }
}
</script>
<style lang="less">
.map-container {
}
</style>
