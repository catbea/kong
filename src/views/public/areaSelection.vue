<template>
  <div class="area-selection-page">
    <div class="search-box van-hairline--bottom">
      <search></search>
    </div>
    <div class="area-selection-box">
      <div class="current-location">
        <p class="location-str">
          深圳
          <span>当前城市</span>
        </p>
      </div>
      <div class="selection-box" ref="content"></div>
    </div>
  </div>
</template>
<script>
import Search from 'COMP/Search'
import { fullArea } from '@/utils/fullArea'
import letter from '@/utils/letter'
import { mapGetters } from 'vuex'
export default {
  components: {
    Search
  },
  data: () => ({
    // pyMap: {}
  }),
  async created() {
    this.$store.dispatch('getAllCity')
    //  for (let key of Object.keys(fullArea.city_list)) {
    //   let py = letter(fullArea.city_list[key])
    //   if(!this.pyMap[py]) this.pyMap[py] = []
    //   this.pyMap[py].push(fullArea.city_list[key])
    // }
  },
  computed: {
    ...mapGetters[('cityMap', 'userArea')]
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
