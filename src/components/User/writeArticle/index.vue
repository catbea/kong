<template>
  <div>
    <div
      class="write-item-body"
      @click="enterDetail"
      v-for="item in dataArray"
      :key="item"
      v-if="dataArray.length>0"
    >
      <div class="write-item-left">
        <span class="article-title">{{item.title}}</span>
        <li class="article-label">
          <tag-group :arr="tags"></tag-group>
        </li>
        <span class="share-time">分享时间：2019/1/6 16:33</span>
      </div>
      <div class="write-item-right">
        <img class="article-img" :src="item.image">
      </div>
    </div>
    <!-- <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="dataArray.length<=0"></null> -->
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup/index'
// import Null from 'COMP/Null'

export default {
  components: {
    TagGroup,
    // Null
  },
  created() {},
  mounted() {},
  props: {
    dataArray: Array
  },
  data() {
    return {
      myImage: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg',
      tags: ['已收藏', '未分享', '已编辑'],
      // nullIcon: require('IMG/user/collection/Article@2x.png'),
      // nullcontent: '暂还没有文章记录'
    }
  },
  methods: {
    enterDetail() {
      this.$emit('enterDetail', '')
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

  > .write-item-left {
    display: flex;
    flex-direction: column;
    padding-right: 16px;
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

    > .share-time {
      font-size: 12px;
      color: #969ea8;
      margin-top: 12px;
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
