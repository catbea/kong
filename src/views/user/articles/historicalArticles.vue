<template>
  <div class="my-write-body">
    <div class="search-body">
      <search-write @goSearch="goSearch"></search-write>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import searchWrite from 'COMP/Search/searchWrite'
export default {
  components: {
    searchWrite
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {},
  methods: {
    goSearch(val) {
      
    }
  }
}
</script>
<style lang="less">
.my-write-body {
  width: 100%;
  height: 100%;
  background-color: #f7f9fa;
  > .search-body {
    width: 100%;
    background: #ffffff;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
