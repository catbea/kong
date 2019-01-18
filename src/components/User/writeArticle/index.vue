<template>
  <div>
    <div
      class="write-item-body"
      v-for="(item, index) in dataArray"
      :key="index"
      @click="enterDetail(selectType,item)"
    >
      <div class="write-item-left">
        <span class="article-title">{{item.title | textOver(25)}}</span>
        <div class="share-bottom">
          <span
            class="share-time"
            v-if="selectType=='1'"
          >收藏时间：{{item.createTimeStamp | dateTimeFormatter(3,'/')}}</span>
          <span class="share-time" v-else>发布时间：{{item.createTimeStamp | dateTimeFormatter(3,'/')}}</span>
          <span class="collection-text" v-if="selectType=='1'"  @click.stop="cancelCollect(item.id,index)">取消收藏</span>
          <img class="collection-img" v-if="selectType=='1'" :src="cancelCollection" @click.stop="cancelCollect(item.id,index)">
        </div>
      </div>
      <div class="write-item-right">
        <img class="article-img" :src="item.image">
      </div>
    </div>
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup/index'

export default {
  components: {},
  created() {},
  mounted() {},
  props: {
    selectType: String,
    dataArray: Array
  },
  data() {
    return {
      cancelCollection: require('IMG/user/myWrite/cancelCollection.png')
      // nullIcon: require('IMG/user/collection/Article@2x.png'),
      // nullcontent: '暂还没有文章记录'
    }
  },
  methods: {
    enterDetail(selectType, item) {
      item['selectType'] = selectType
      this.$emit('enterDetail', item)
    },
    cancelCollect(id, index) {
      let obj = {
        id: id,
        index: index
      }
      this.$emit('cancelCollect', obj)
    }
  },
  computed: {}
}
</script>
<style lang="less">
.write-item-body {
  width: 100%;
  height: 122px;
  display: flex;
  padding: 11px 15px;
  justify-content: space-between;
  background: #ffffff;
  margin-bottom: 1px;

  > .write-item-left {
    display: flex;
    flex-direction: column;
    padding-right: 5px;
    justify-items: center;
    margin-top: 5px;

    > .article-title {
      font-size: 16px;
      width: 208px;
      color: #333333;
    }

    > .article-label {
      margin-top: 8px;
      list-style: none;
    }

    > .share-bottom {
      width: 100%;
      margin-top: 30px;
      > .share-time {
        font-size: 12px;
        color: #969ea8;
      }

      > .collection-text {
        color: #bbbbbb;
        font-size: 10px;
        margin-left: 5px;
      }

      > .collection-img {
        width: 16px;
        height: 16px;
        margin-bottom: -5px;
      }
    }
  }

  > .write-item-right {
    margin-top: 5px;
    width: 31%;
    height: 90px;

    > .article-img {
      width: 110px;
      height: 90px;
      border-radius: 6px;
    }
  }
}
</style>
