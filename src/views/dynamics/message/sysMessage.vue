<template>
  <div class="sysMessage-page">
    <van-list v-model="loading" :finished="finished" finished-text="--没有更多了--" @load="onLoad">
      <div class="sysMessage-container" v-for="(time ,key) in sysMessage" :key="key">
        <div class="sysMessage-time">{{time.createDate}}</div>
        <div class="sysMessage-shadowBox" v-for="(item,key) in time.systemMessages" :key="key">
          <shadow-box>
            <div slot="container">
              <div class="sys-shadowBox" @click="enterActivityDetail(item)">
                <p class="sys-shadowBox-title">{{item.title}}</p>
                <p class="sys-shadowBox-time" v-html="item.content.replace(/(\r+\n+)|(\n+)/g,'<br>')"></p>
                <div style="display:flex;" v-show="item.type!==''&&item.type==10">
                  <p class="client-detail" @click="goDetail(item.appointmentId)">客户详情</p>
                  <p class="go-report" @click="goReport(item.appointmentId)">立即报备</p>
                </div>
                <!-- <p class="sys-shadowBox-remarks">本次主要更新内容有： 1.增加勿扰模式 2.VIP功能优化调整 3.我的楼盘增加关闭展示功能</p> -->
                <!-- <div class="button-item">
                  <div class="left-button">客户详情</div>
                  <div class="right-button">立即报备</div>
                </div>-->
                <div class="button-detail" v-if="item.type==11 || item.type==101">
                  查看详情
                  <img :src="detailIcon">
                </div>

              </div>
            </div>
          </shadow-box>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import ShadowBox from 'COMP/ShadowBox'
import dynamicsService from 'SERVICE/dynamicsService'
import * as types from '@/store/mutation-types'
export default {
  components: {
    ShadowBox
  },
  data() {
    return {
      sysMessage: [],
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完所有数据
      size: 10,
      current: 1,
      pages: 1,
      detailIcon: require('IMG/activity/blue_arrow.png')
    }
  },
  created() {
    // this.getSystemMessageList()
  },
  methods: {
    async getSystemMessageList() {
      const res = await dynamicsService.getSystemMessage({ current: this.current, size: this.size })
      console.log(res, '数据')
      this.pages = res.pages
      this.sysMessage.push(...res.records)
      this.current += 1
    },

    enterActivityDetail(item) {
      // 活动
      if (item.type == 11) {
        this.$router.push({ path: '/huiwan-activity/partake', query: { activityId: item.activityId } })
      }
      // 培训学院分享
      if (item.type == 101) {
        const { linkerId } = JSON.parse(item.extendParam)
        this.$router.push({ path: '/user/learn', query: { linkerId } })
      }
    },

    // 加载更多
    async onLoad() {
      if (this.current > this.pages) {
        // 加载状态结束
        this.finished = true
        this.loading = false
      } else {
        await this.getSystemMessageList()
        this.loading = false
      }
    },
    async goDetail(appointmentId) {//查看客户详情
      const res = await dynamicsService.getReportClient(appointmentId)
      this.$router.push(`/custom/${res.clientId}`)
    },
    async goReport(appointmentId) {//立即报备
      const res = await dynamicsService.getReportClient(appointmentId)
      console.log(res, '报备数据')
      let _reportAddInfo = {
        clientId: res.clientId,//客户id
        clientName: res.clientName,//客户姓名
        clientPhone: res.mobile,//客户号码
        linkerId: res.linkerId,
        linkerName: res.linkerName,//楼盘ID
        distributorId: res.distributorId,// 经纪人所属分销商平台id 
        institutionId: res.institutionId//经纪人所属分销商机构id 
      }
      this.$store.commit(types.REPORT_INFO, _reportAddInfo)
      this.$router.push('/user/myReport/addReport')
    }
  }
}
</script>
<style lang="less">
.sysMessage-page {
  background: #ffffff;
  .sysMessage-shadowBox {
    margin-top: 16px;
  }
  .sysMessage-container {
    margin: 16px 0;
    .sysMessage-time {
      font-size: 14px;
      font-weight: 500;
      color: rgba(41, 46, 51, 1);
      line-height: 20px;
      margin: 20px 0 12px 16px;
    }
    .sys-shadowBox {
      padding: 16px;

      .button-detail {
        width: 100%;
        height: 40px;
        display: flex;
        // justify-content: center;
        justify-content: flex-start;
        align-items: center;
        color: #077de6;
        font-size: 14px;

        img {
          width: 12px;
          height: 12px;
          margin-left: 6px;
        }
      }

      .button-item {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;

        .left-button {
          margin-right: 12px;
          height: 40px;
          width: 50%;
          background: rgba(242, 244, 245, 1);
          border-radius: 4px;
          color: #333333;
          font-size: 14px;
          justify-content: center;
          align-items: center;
          display: flex;
        }

        .right-button {
          margin-left: 12px;
          height: 40px;
          width: 50%;
          background: rgba(242, 244, 245, 1);
          border-radius: 4px;
          font-size: 14px;
          color: #077de6;
          justify-content: center;
          align-items: center;
          display: flex;
        }
      }

      .sys-shadowBox-title {
        font-size: 20px;
        font-weight: 600;
        color: rgba(41, 46, 51, 1);
        line-height: 30px;
        padding-bottom: 8px;
      }
      .sys-shadowBox-time {
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
        // padding-bottom: 18px;
      }
      .sys-shadowBox-remarks {
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
      .client-detail {
        width: 143px;
        height: 40px;
        background: rgba(242, 244, 245, 1);
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
        text-align: center;
      }
      .go-report {
        margin-left: 24px;
        width: 143px;
        height: 40px;
        background: rgba(242, 244, 245, 1);
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(7, 125, 230, 1);
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
</style>
