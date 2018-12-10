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
          @focus="onFocus"
        >
          <!-- <div slot="action" @click="onSearch">搜索</div> -->
        </van-search>
      </form>
    </div>
    <div class="search-content">
      <div class="search-tips">
        <div class="search-tips-icon bg_img" :style="{backgroundImage:'url(' + searchIcon + ')'}"></div>
        <div class="search-tips-cnt">请输入主营区域下所属公司</div>
      </div>
      <div class="search-list" v-for="(item, index) in searchList" :key="index">
        <div class="search-item">
          {{item.distributorName}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from 'COMP/Search'
import { mapGetters } from 'vuex'
import RegisterService from 'SERVICE/registService'
export default {
  components: {
    Search
  },
  data: () => ({
    value: '',
    searchIcon: require('IMG/register/searchIcon@2x.png'),
    searchLists: null
  }),
  created() {
    console.log(this.userRegistInfo)
  },
  computed: {
    ...mapGetters(['userRegistInfo'])
  },
  methods: {
    onSearch(val) {
      console.log(val)
      if (val.length >= 4) {
        let len = this.searchLists.length
        let arr = []
        let reg = new RegExp(val)
        for(let i=0; i<len; i++) {
          // 如果字符串中不包含目标字符会返回-1
          debugger
          if (this.searchLists[i].match(reg)) {
            arr.push(this.searchLists[i])
          }
        }
      }
    },
    onCancel() {
      console.log('cancel')
       this.$router.back(-1)
    },
    onFocus(val) {
      console.log(val)
      if (val.length >= 4) {
        let len = this.searchLists.length
        let arr = []
        let reg = new RegExp(val)
        for(let i=0; i<len; i++) {
          // 如果字符串中不包含目标字符会返回-1
          debugger
          if (this.searchLists[i].match(reg)) {
            arr.push(this.searchLists[i])
          }
        }
      }
    },
    onSelectHandler() {
      let _userRegistInfo = {
        distributorId: '',
        distributorName: ''
      }
      this.$store.dispatch('userRegistInfo', Object.assign(this.userRegistInfo, _userRegistInfo))
       this.$router.back(-1)
    }
  }
}
</script>
<style lang="less">
  .search-content {
    margin: 15px;
    .search-tips {
      display: flex;
      flex-direction: row;
      align-items: center;
      .search-tips-icon {
        width: 16px;
        height: 16px;
        margin-top: 2px;
      }
      .search-tips-cnt {
        color: #999999;
        font-size: 12pt;
        margin-left: 8px;
      }
    }
    .search-list {
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .search-item {
        color: #333333;
        font-size: 16pt;
        margin-top: 12px;
      }
    }
  }
</style>
