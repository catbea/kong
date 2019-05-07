<template>
  <div class="vip-list">
    <div class="open-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="vip-item scale-1px-bottom" v-for="(item,index) in vipList" :key="index">
          <div class="info">
            <b class="title">{{item.city}}</b>
            <p class="time" :class="{'disable': !item.valiable}">{{item.time}}<span v-if="!item.valiable">已</span>到期</p>
          </div>
          <div class="action">续费</div>
        </div>
      </van-list>
    </div>
    <div class="open-btn" @click="goOpenVip">开通更多城市</div>
  </div>
</template>

<script>
import userService from 'SERVICE/userService'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      current: 1,
      pages: 0,
      pageSize: 10,
      vipList: [{city: '广州', time: '2019/02/14', valiable: false}, {city: '深圳', time: '2019/08/25', valiable: true},{city: '北京', time: '2019/10/05', valiable: true}]
    }
  },
  methods: {
    // 加载数据
    onLoad () {
      if (this.current > this.pages) {
        // 加载状态结束
        this.finished = true
        this.loading = false
      } else {
        this.getVipList()
      }
    },
    // 获取todoList列表
    getVipList () {
      userService.getVipList({}).then(result => {
        if (result) {
          this.pages = result.pages
          let todoList = result.vipList
          if (this.current === 1) {
            this.vipList = vipList
          } else {
            this.vipList.push(...vipList)
          }
          this.current += 1
        }
      }).catch()
    },
    // 跳转开通vip城市
    goOpenVip () {
      this.$router.push('/user/myMember')
    }
  }
}
</script>

<style lang="less" scoped>
.vip-list{
  font-size: 12px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  .open-box{
    flex: 1;
    .vip-item{
      padding: 10px 0;
      display: flex;
      align-items: center;
      .info{
        flex: 1;
        .title{
          font-size: 16px;
          font-weight: 600;
        }
        .time{
          padding-top: 5px;
          color: rgba(145,145,145,0.8);
          &.disable{
            color: #EA4D2E;
          }
        }
      }
      .action{
        width: 50px;
        height:24px;
        line-height: 24px;
        background:rgba(195,151,101,1);
        border-radius:2px;
        color: #fff;
        text-align: center;
      }
    }
  }
  .open-btn{
    height: 44px;
    margin: 16px 0;
    background-color: #007AE6;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 44px;
    border-radius: 4px;
  }
}
</style>
