<template>
  <div class="search-container dev">
    <div class="search-box-content">
      <p @click="siteClickHandler">
        {{conf.siteText}}
        <span class="bg_img" :style="{'background':'url(' + arrowIcon + ')','background-size':'contain'}"></span>
      </p>
      <span class="icon-line"></span>
      <!-- <router-link to="/market/inputSearch"> -->
      <!-- <form action="/"> -->
      <van-search class="search-box" :placeholder="conf.placeholderText"/>
      <!-- </form> -->
      <!-- </router-link> -->
    </div>
    <div class="site-select"></div>
  </div>
</template>
<script>
export default {
  props: {
    conf: {
      type: Object,
      default: function() {
        return
      }
    }
  },
  data: () => ({
    arrowIcon: require('IMG/market/list__arrow_@2x.png')
  })
}
</script>

<style lang="less" scoped>
.search-container-new {
  width: 100%;
  height: 100%;
  // margin: 5px 10px;
  border-radius: 4px;
  background-color: #F5F5F5;
  > .search-box-content {
    display: flex;
    font-size: 13px;
    > p {
      width: 45px;
      display: flex;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis;
      > span {
        width: 16px;
        height: 16px;
      }
    }
    > .icon-line {
      width: 1px;
      height: 12px;
    }
    > .search-box {
      padding: 0;
      .van-cell {
        background: rgba(245, 245, 245, 1);
        input {
          line-height: 24px;
        }
      }
    }
  }
}
</style>
