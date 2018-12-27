<template>
  <!-- <router-link :to="{name: 'discover-detail', params: {id: data.id, city:data.city}}"> -->
    <router-link :to="routeComputed">
    <div class="van-hairline--bottom discover-item">
      <div class="discover-list-left">
        <p class="list-left-title">{{data.title}}</p>
        <p
          class="list-left-time"
        >{{data.publisher}}&nbsp;&nbsp;{{data.createDate | dateFormatterToHuman}}&nbsp;&nbsp;{{data.scanNum | numberFormatter}}浏览</p>
      </div>
      <div
        class="bg_img van-hairline--surround discover-list-right"
        :style="{'backgroundImage':'url('+ data.image +')'}"
      ></div>
    </div>
  </router-link>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['data'],
  data: () => ({
    backIcon: require('IMG/user/usercard@2x.png')
  }),
  computed: {
    ...mapGetters(['userInfo']),
    routeComputed() {
      return `/discover/${this.data.id}/${this.data.city ? this.data.city : '全国'}?agentId=${this.userInfo.agentId}&enterpriseId=${this.userInfo.enterpriseId}`
    }
  }
}
</script>
<style lang="less">
.discover-item {
  background: #ffffff;
  margin: 15px;
  display: flex;
  > .discover-list-left {
    position: relative;
    flex: 1;
    height: 100px;
    padding: 3px 15px;
    > .list-left-title {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    > .list-left-time {
      position: absolute;
      left: 15px;
      bottom: 7px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  > .discover-list-right {
    width: 120px;
    height: 90px;
    border-radius: 6px;
    background-color: #999999;
    margin-right: 16px;
  }
}
</style>
