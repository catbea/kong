<template>
  <div class="market-share-poster-box-page">
    <save-poster></save-poster>
  </div>
</template>
<script>
import SavePoster from 'COMP/SavePoster/'
export default {
  components:{
    SavePoster
  }
}
</script>
<style lang="less">
.market-share-poster-box-page{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>