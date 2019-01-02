<template>
  <div class="collection-null">
    <img :src="collectionIcon" class="collection-null-icon">
    <p class="collection-null-tips">{{collectionTips}}</p>
    <p class="collection-null-tips-s">{{collectionRemar}}</p>
    <div class="collection-null-like">{{collectionLike}}</div>
  </div>

</template>
<script>
export default {
  props: {
    collectionIcon: { type: String, default: '' },
    collectionTips: { type: String, default: '' },
    collectionRemar: { type: String, default: '' },
    collectionLike: { type: String, default: '' }
  },
  data() {
    return {
      // groupIcon: require('IMG/user/collection/Group@2x.png'),
    }
  }
}
</script>
<style lang="less">
.collection-null {
  margin-top: 40px;
  text-align: center;
  > .collection-null-icon {
    width: 88px;
    height: 88px;
  }
  > .collection-null-tips {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 17px;
  }
  > .collection-null-tips-s {
    font-size: 12px;
    font-weight: 400;
    color: #dddddd;
    line-height: 17px;
  }
  > .collection-null-remar {
  }
  > .collection-null-like {
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    text-align: left;
    margin-left: 16px;
    margin-top: 34px;
  }
}
</style>
