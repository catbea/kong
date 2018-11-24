<template>
  <div class="collection-container">

    <div class="collection-list" >
      <span class="collection-list-left">
        <p class="list-left-title">厦门今年第二批9000套保吃大餐吃的深V是的</p>
        <p class="list-left-conter">政府和企业现在都明白，与建造航母或生产导弹想必，与建造航母或生产导弹想必，在某些情况在某些情况与建造航母或生产导弹想必，在某些情况</p>
        <!-- <span class="list-left-tab-ok">收藏</span> -->
        <span class="list-left-tab-no">取消收藏</span>
      </span>
      <span class="collection-list-right">
        <img :src="backIcon" class="mark-icon">
      </span>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backIcon: require('IMG/user/usercard@2x.png')
    }
  },
  methods: {
    GOheadline() {
      console.log(1)
      //跳转到房产头条
      this.$router.push('/discover/headline')
    }
  }
}
</script>
<style lang="less">
.collection-container {
  > .collection-list {
    margin: 0 15px;
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    padding: 10px 0 16px 0;
    > .collection-list-left {
      height: 90px;
      position: relative;
      > .list-left-title {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 62%;
      }
      > .list-left-conter {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
        width: 60%;
        margin-top: 5px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        overflow: hidden; /** 隐藏超出的内容 **/
      }
      > .list-left-tab-ok {
        font-size: 10px;
        font-weight: 400;
        color: rgba(0, 122, 230, 1);
        line-height: 20px;
        border-radius: 10px;
        border: 1px solid;
        width: 60px;
        height: 20px;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
      > .list-left-tab-no {
        font-size: 10px;
        font-weight: 400;
        color: rgba(178, 181, 197, 1);
        line-height: 20px;
        width: 60px;
        height: 20px;
        border-radius: 10px;
        border: 1px solid;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
    }
    > .collection-list-right {
      width: 120px;
      height: 90px;
      border-radius: 6px;
      position: absolute;
      margin-right: 0;
      padding-right: 0;
      right: 16px;
      > .mark-icon {
        width: 120px;
        height: 90px;
        background: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
