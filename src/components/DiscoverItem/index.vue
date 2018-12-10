<template>
  <router-link :to="{name: 'discover-detail', params: {id: data.id, city: data.city}}">
    <div class="van-hairline--bottom discover-item">
      <div class="discover-list-left">
        <p class="list-left-title">{{data.title}}</p>
        <p class="list-left-time">{{data.publisher}}&nbsp;&nbsp;{{data.createDate | dateFormatterToHuman}}&nbsp;&nbsp;{{data.scanNum | numberFormatter}}浏览</p>
      </div>
      <div class="bg_img discover-list-right" :style="{'backgroundImage':'url('+ data.image +')'}">
      </div>
    </div>
  </router-link>

</template>
<script>
export default {
  props: ['data'],
  data: () => ({
    backIcon: require('IMG/user/usercard@2x.png')
  })
}
</script>
<style lang="less">
.discover-item {
  background: #ffffff;
  margin: 15px;
  display: flex;
  > .discover-list-left {
    width: 225px;
    height: 100px;
    > .list-left-title {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      padding-right: 10px;
    }
    > .list-left-time {
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      padding-top: 28px;
    }
  }
  > .discover-list-right {
    width: 120px;
    height: 90px;
    margin: 5px 0;
    border-radius: 6px;
    background-color: #999999;
  }
}
</style>
