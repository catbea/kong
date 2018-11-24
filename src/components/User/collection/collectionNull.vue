<template>
  <div class="collection-null">
    <img :src="groupIcon" class="collection-null-icon">
    <p class="collection-null-tips">您还没有收藏任何楼盘</p>
    <p class="collection-null-tips">快去看看我们为您准备的推荐楼盘吧</p>
    <div class="collection-null-like">猜你喜欢</div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      groupIcon: require('IMG/user/collection/Group@2x.png')
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
    color: rgba(221, 221, 221, 1);
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
