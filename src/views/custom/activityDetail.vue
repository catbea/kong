<template>
  <div class="activityDetail-page">
     <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="'没有更多了'"
        @load="onLoad"
        v-if="haveData"
      >
    <div class="activityDetail-center" v-for="(item, index) in activitylist" :key="index">
      <div class="activityDetail-list">
        <div class="activityDetail-list-left">
            <img :src="item.avatarUrl" class="activityDetail-Img">
            <div class="activityDetailImg-right">
              <p class="activityDetailImg-right-name">{{item.clientName}}</p>
              <p class="activityDetailImg-right-tel">{{item.clientMobile}}</p>
            </div>
        </div>
        <div class="activityDetail-list-right">{{item.formatTime | dateTimeFormatter(3,'/')}}</div>
      </div>
    </div>
     </van-list>
     <div v-if="!haveData">
        <null :nullIcon="nullIcon" :nullcontent="nullcontent"></null>
     </div>
  </div>
</template>
<script>
import customService from 'SERVICE/customService'
import Null from 'COMP/Null'
export default {
  components: {
    Null
  },
  data() {
    return {
      nullIcon: require('IMG/custom/activityImg.png'),
      nullcontent: '暂无报名用户',
      activityDetailImg: require('IMG/custom/customActivity.png'),
      size: 10,
      current: 1,
      activitylist: [],
      loading: false,
      finished: false,
      page: 1,
      haveData: false
    }
  },
  mounted() {
    this.getLinkerApplyListByAgentId()
  },
  methods: {
    onLoad() {
      this.getLinkerApplyListByAgentId(this.current)
    },
    async getLinkerApplyListByAgentId(current) {
      this.loading = true
      const res = await customService.getLinkerApplyListByAgentId(current)
      if (res.pages > 1) {
        this.activitylist = this.activitylist.concat(res.records)
      } else {
        this.activitylist = res.records
      }
      if (this.activitylist.length > 0) {
        this.haveData = true
        if (res.pages === 0 || this.current >= res.pages) {
          this.finished = true
        } else {
          this.current++
        }
        this.loading = false
      } else {
        if (current == 1) {
          this.haveData = false
        } else {
          this.haveData = true
        }
        this.loading = false
        this.finished = true
      }
    }
  }
}
</script>
<style lang="less">
.activityDetail-page {
  .activityDetail-center {
    border-bottom: 1px solid #e5e5e5;
    margin: 16px;
    .activityDetail-list {
      display: flex;
      padding-bottom: 16px;

      .activityDetail-list-left {
        display: flex;
        .activityDetail-Img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        .activityDetailImg-right {
          margin-left: 17px;
          .activityDetailImg-right-name {
            font-size: 16px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 30px;
          }
          .activityDetailImg-right-tel {
            font-size: 12px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 25px;
          }
        }
      }
      .activityDetail-list-right {
        position: absolute;
        right: 16px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 68px;
      }
    }
  }
}
</style>
