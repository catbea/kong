<template>
  <div class="area-selection-page">
    <div class="search-box van-hairline--bottom">
      <search></search>
    </div>
    <div class="area-selection-box">
      <div class="current-location"></div>
      <div class="selection-box" ref="content">

      </div>
    </div>
  </div>
</template>
<script>
import Search from 'COMP/Search'
import { fullArea } from '@/utils/fullArea'
import letter from '@/utils/letter'
export default {
  
  components: {
    Search
  },
  data: () => ({
    pyMap: {}
  }),
  async created() {
     for (let key of Object.keys(fullArea.city_list)) {
      let py = letter(fullArea.city_list[key])
      if(!this.pyMap[py]) this.pyMap[py] = []
      this.pyMap[py].push(fullArea.city_list[key])
    }
  }
}
</script>
<style lang="less">
.area-selection-page {
  .search-box {
    position: relative;
    width: 345px;
    height: 30px;
    margin: 7px 15px;
    padding-bottom: 7px;
  }
  > .area-selection-box {
  }
}
</style>

