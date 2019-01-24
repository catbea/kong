<template>
  <!-- 1-收藏，2-分享，3-编辑 -->
  <div class="my-write-body">
    <div class="search-body">
      <div class="tab-body">
        <div
          class="share-type"
          :style="{'fontSize':shareFontSize,'fontWeight':shareStyle}"
          @click="clickShare('2')"
        >分享</div>
        <div
          class="edit-type"
          :style="{'fontSize':editFontSize,'fontWeight':editStyle}"
          @click="clickEdit('3')"
        >编辑</div>
        <div
          class="collection-type"
          :style="{'fontSize':collectionFontSize,'fontWeight':collectionStyle}"
          @click="clickCollection('1')"
        >收藏</div>
      </div>
    </div>
    <div class="list-result">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="haveData"
      >
        <write-article
          :selectType="typeCode"
          :dataArray="myWriteList"
          @cancelCollect="cancelCollect"
          @enterDetail="enterDetail"
        ></write-article>
      </van-list>
      <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="!haveData"></null>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import searchWrite from 'COMP/Search/searchWrite'
import writeArticle from 'COMP/User/writeArticle/index'
import selectTab from 'COMP/User/writeArticle/selectTab'
import userService from 'SERVICE/userService'
import Null from 'COMP/Null'
import * as types from '@/store/mutation-types'

export default {
  components: {
    // searchWrite,
    writeArticle,
    Null,
    selectTab
  },
  data() {
    return {
      // index:0,
      loading: false,
      finished: false,
      current: 1,
      typeCode: '2', //选中的code
      myWriteList: [], //我的写一写列表
      nullIcon: require('IMG/user/collection/Article@2x.png'),
      nullcontent: '暂还没有文章记录',
      haveData: true,
      shareFontSize: '24px',
      editFontSize: '14px',
      collectionFontSize: '14px',
      shareStyle: 'bold',
      editStyle: 'normal',
      collectionStyle: 'normal'
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },

  created() {
    this.typeCode = this.$store.getters.currMyWriteTab

    if (this.typeCode == '3') {
      this.selectEditTap()
    } else if (this.typeCode == '2') {
      this.selectShareTap()
    } else if (this.typeCode == '1') {
      this.selectCoolectionTap()
    }
  },
  methods: {
    clickShare(val) {
      this.selectShareTap()
      this.typeCode = val
      this.current = 1
      this.myWriteList = []
      this.onLoad()
      this.$store.commit(types.MYWRITE_TAB, '2')
      this.loading = true
      this.finished = false
    },

    clickEdit(val) {
      this.selectEditTap()
      this.typeCode = val
      this.current = 1
      this.myWriteList = []
      this.onLoad()
      this.$store.commit(types.MYWRITE_TAB, '3')
      this.loading = true
      this.finished = false
    },

    clickCollection(val) {
      this.selectCoolectionTap()
      this.typeCode = val
      this.current = 1
      this.myWriteList = []
      this.onLoad()
      this.$store.commit(types.MYWRITE_TAB, '1')
      this.loading = true
      this.finished = false
    },

    //改变tab分享样式
    selectShareTap() {
      this.shareFontSize = '24px'
      this.editFontSize = '14px'
      this.collectionFontSize = '14px'
      this.shareStyle = 'bold'
      this.editStyle = 'normal'
      this.collectionStyle = 'normal'
    },
    //改变tab编辑样式
    selectEditTap() {
      this.shareFontSize = '14px'
      this.editFontSize = '24px'
      this.collectionFontSize = '14px'
      this.shareStyle = 'normal'
      this.editStyle = 'bold'
      this.collectionStyle = 'normal'
    },
    //改变tab收藏样式
    selectCoolectionTap() {
      this.shareFontSize = '14px'
      this.editFontSize = '14px'
      this.collectionFontSize = '24px'
      this.shareStyle = 'normal'
      this.editStyle = 'normal'
      this.collectionStyle = 'bold'
    },

    cancelCollect(val) {
      this.$dialog
        .confirm({
          title: '取消收藏',
          message: '是否取消文章收藏'
        })
        .then(() => {
          // on close
          this.cancelClooection(val)
        })
        .catch(() => {
          // on cancel
        })
    },

    async cancelClooection(info) {
      let id = info.id
      let index = info.index

      const result = await userService.getlinkerCollection(id, 1)
      let dataArray = this.myWriteList

      dataArray.splice(index, 1)
      if (result) {
        this.$toast('取消收藏成功')
      }
    },

    getContent(val) {
      this.editContent = val
    },

    enterDetail(val) {
      if (this.typeCode == '1') {
        this.$router.push({ name: 'discover-detail', query: { agentId: this.userInfo.agentId, enterpriseId: this.userInfo.enterpriseId }, params: { id: val.id, city: '全国' } })
      } else {
        this.$router.push({ name: 'easyLookChildList', query: val })
      }
    },

    getCurrentType() {
      for (let temp of this.tabs) {
        if (temp.index === this.activeIndex) return temp
      }
    },

    async onLoad() {
      //获取选中的位置
      let selectType = this.typeCode
      const res = await userService.queryWriteArticleList(selectType, this.current, '')

      if (res.records.length > 0) {
        this.haveData = true

        this.myWriteList = this.myWriteList.concat(res.records)
        if (res.pages === 0 || this.current === res.pages) {
          this.finished = true
        }
        this.current++
        this.loading = false
      } else {
        if (this.current == 1) {
          this.haveData = false
        }
        this.loading = false
        this.finished = true
      }
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
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;

    > .tab-body {
      width: 100%;
      height: 54px;
      background: #ffffff;
      display: flex;
      align-items: flex-end;

      > .share-type {
        margin-left: 0px;
        margin-bottom: 12px;
        color: #333333;
      }

      > .edit-type {
        margin-left: 22px;
        margin-bottom: 12px;
        color: #333333;
      }

      > .collection-type {
        margin-left: 22px;
        margin-bottom: 12px;
        color: #333333;
      }
    }
  }

  > .list-result {
    width: 100%;
    margin-top: 1px;
  }
}
</style>
