<template>
  <div>
    <div class="write-item-body" @click="enterDetail" v-for="(item, index) in dataArray" :key="index">
      <div class="write-item-left">
        <span class="article-title">{{item.title}}</span>
        <div class="share-bottom">
          <span class="share-time">分享时间：2019/1/6 16:33</span>
          <div class="collection-view" v-if="selectType=='3'"  @click="cancelCollect">
            <span class="collection-text">取消收藏</span>
            <img class="collection-img" :src="cancelCollection">
          </div>
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
    enterDetail() {
      this.$emit('enterDetail', '')
    },
    cancelCollect(){
       this.$emit('cancelCollect', '')
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
  border-bottom: #e2e2e3 1px solid;
  border-top: 1px #e5e5f0 solid;

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
      display: flex;
      flex-direction: row;
      margin-top: 50px;

      > .share-time {
        font-size: 12px;
        color: #969ea8;
        display: none;
      }

      > .collection-view {
        display: flex;

        > .collection-text {
          color: #bbbbbb;
          font-size: 10px;
          margin-left: 5px;
        }

        > .collection-img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  > .write-item-right {
    margin-top: 5px;
    width: 120px;
    height: 90px;

    > .article-img {
      width: 120px;
      height: 90px;
      border-radius: 6px;
    }
  }
}
</style>
