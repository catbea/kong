<template>
  <div class="fixedBtn-container">
    <button class="fixedBtn-card">
      <img :src="cardIcon" class="card-icon">小程序名片
    </button>
    <button class="fixedBtn-collection">
      <img :src="collectionIcon" class="collection-icon">收藏
    </button>
    <button class="fixedBtn-share">
      <img :src="shareIcon" class="share-icon">分享
    </button>
  </div>
</template>
<script>
export default {
  data () {
    return {

      cardIcon: require('IMG/discover/Path@2x.png'),
      collectionIcon: require('IMG/discover/Path1@2x.png'),
      shareIcon: require('IMG/discover/PathCopy@2x.png'),
    }
  }
}
</script>
<style lang="less">
.fixedBtn-container {
  
  display: flex;
  margin: 9px 16px 18px ;
  > .fixedBtn-card {
    width: 138px;
    height: 44px;
    border-radius: 22px;
    opacity: 0.7;
    border: 1px solid;
    font-size: 15px;
    font-weight: 400;
    color: rgba(174, 177, 194, 1);
    background: #ffffff;
    line-height: 21px;
     display: flex;
    padding: 0 18px;
    > .card-icon {
      width: 24px;
      height: 24px;
      margin-top: -3px;
    }
  }
  > .fixedBtn-collection {
    width: 94px;
    height: 44px;
    border-radius: 22px;
    opacity: 0.7;
    border: 1px solid;
    font-size: 15px;
    font-weight: 400;
    color: rgba(174, 177, 194, 1);
    line-height: 21px;
    margin: 0 8px;
     display: flex;
    padding: 0 18px;
    background: #ffffff;
    > .collection-icon {
      width: 24px;
      height: 24px;
      margin-top: -3px;
    }
  }
  > .fixedBtn-share {
    width: 94px;
    height: 44px;
    background: rgba(174, 177, 194, 1);
    border-radius: 22px;
    font-size: 15px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 21px;
    border: 0;
        display: flex;
    padding: 0 18px;
    > .share-icon {
      width: 24px;
      height: 24px;
      margin-top: -5px;
    }
  }
}
</style>
