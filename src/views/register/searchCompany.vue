<template>
  <div class="search-container">
    <div class="search-area" style="height:1rem;">
      <form action="/">
        <van-search
          v-model="value"
          placeholder="请输入公司名称"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        ></van-search>
      </form>
    </div>
  </div>
</template>
<script>
import Search from 'COMP/Search'
import { mapGetters } from 'vuex'
export default {
  components: {
    Search
  },
  data: () => ({
    value: ''
  }),
  created() {
    console.log(this.userRegistInfo)
  },
  computed: {
    ...mapGetters(['userRegistInfo'])
  },
  methods: {
    onSearch() {},
    onCancel() {},
    onSelectHandler() {
      let _userRegistInfo = {
        distributorId: '',
        distributorName: ''
      }
      this.$store.dispatch('userRegistInfo', Object.assign(this.userRegistInfo, _userRegistInfo))
    }
  }
}
</script>
<style lang="less">
</style>


