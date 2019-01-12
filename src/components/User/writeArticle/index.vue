<template>
    <div class="write-item-body" @click="enterDetail">
        <div class="write-item-left">
            <span class="article-title">厦门今年第二批9000套保障性商品房上午摇号</span>
            <li class="article-label">
                <tag-group :arr="tags"></tag-group>
            </li>
            <span class="share-time">分享时间：2019/1/6 16:33</span>
        </div>
        <div class="write-item-right">
            <img class="article-img" :src="myImage">
        </div>
    </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup/index'
export default {
  components: {
      TagGroup
  },
  created() {},
  mounted() {},
  props: {},
  data() {
    return {
      myImage: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg',
      tags: ['已收藏', '未分享', '已编辑']
    }
  },
  methods: {
    enterDetail(){
      this.$emit('enterDetail','');
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
