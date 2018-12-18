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
          v-on:input="onInput"
        >
          <!-- <div slot="action" @click="onSearch">搜索</div> -->
        </van-search>
      </form>
    </div>
    <div class="search-content">
      <div class="search-tips">
        <div class="bg_img search-tips-icon" :style="{backgroundImage:'url(' + searchIcon + ')'}"></div>
        <div class="search-tips-cnt">请输入主营区域下所属公司</div>
      </div>
      <div class="search-list" v-for="(item, index) in searchLists" :key="index">
        <div class="search-item" @click="onSelectHandler(index)">
          {{item.childDistributorName}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from 'COMP/Search'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import RegisterService from 'SERVICE/registService'
export default {
  components: {
    Search
  },
  data: () => ({
    value: '',
    searchIcon: require('IMG/register/searchIcon@2x.png'),
    searchLists: null,
    // regLists: null,
    enterpriseId: '',
    city: '',
    area: ''
  }),
  created() {
    this.enterpriseId = this.$route.query.enterpriseId
    this.city = this.$route.query.city
    // this.area = this.$route.query.area
  },
  computed: {
    ...mapGetters(['userRegistInfo'])
  },
  methods: {
    async queryRegisterDistributor(enterpriseId, city, searchData) {
      const result = await RegisterService.queryRegisterDistributor(enterpriseId, city, searchData)
      this.searchLists = result
    },
    onSearch(val) {
      if (val.length >= 4) {
        this.queryRegisterDistributor(this.enterpriseId, this.city, val)
        // let len = this.searchLists.length
        // let arr = []
        // for(let i=0; i<len; i++) {
        //   val = val.toLocaleLowerCase()
        //   let tempTarget = this.searchLists[i].distributorName.toLocaleLowerCase()
        //   if (tempTarget.indexOf(val) !== -1) {
        //     arr.push(this.searchLists[i])
        //   }
        // }
        // this.regLists = arr
      }
    },
    onCancel() {
       this.$router.back(-1)
    },
    onInput(val) {
      if (val.length >= 4) {
        this.queryRegisterDistributor(this.enterpriseId, this.city, val)
        // let len = this.searchLists.length
        // let arr = []
        // debugger
        // for(let i=0; i<len; i++) {
        //   val = val.toLocaleLowerCase()
        //   let tempTarget = this.searchLists[i].distributorName.toLocaleLowerCase()
        //   if (tempTarget.indexOf(val) !== -1) {
        //     arr.push(this.searchLists[i])
        //   }
        // }
        // this.regLists = arr
      }
    },
    onSelectHandler(index) {
      let _userRegistInfo = {
        distributorId: this.searchLists[index].childDistributorId,
        distributorName: this.searchLists[index].childDistributorName
      }
      this.$store.commit(types.USER_REGIST_INFO, _userRegistInfo)
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
        font-size: 12px;
        margin-left: 8px;
      }
    }
    .search-list {
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .search-item {
        color: #333333;
        font-size: 16px;
        margin-top: 12px;
      }
    }
  }
</style>
