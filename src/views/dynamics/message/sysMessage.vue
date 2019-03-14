<template>
  <div class="sysMessage-page">
    <van-list v-model="loading" :finished="finished" finished-text="--没有更多了--" @load="onLoad">
      <div class="sysMessage-container" v-for="(time ,key) in sysMessage" :key="key">
        <div class="sysMessage-time">{{time.createDate}}</div>
        <div class="sysMessage-shadowBox" v-for="(item,key) in time.systemMessages" :key="key">
          <shadow-box>
            <div slot="container">
              <div class="sys-shadowBox">
                <p class="sys-shadowBox-title">{{item.title}}</p>
                <p class="sys-shadowBox-time" v-html="item.content.replace(/(\r+\n+)|(\n+)/g,'<br>')"></p>
                <p class="look-detail" v-show="detailShow">查看详情</p>
                <div style="display:flex;" v-show="appointment">
                  <p class="client-detail">客户详情</p>
                  <p class="go-report">立即报备</p>
                </div>
                <!-- <p class="sys-shadowBox-remarks">本次主要更新内容有： 1.增加勿扰模式 2.VIP功能优化调整 3.我的楼盘增加关闭展示功能</p> -->
                <!-- <div class="button-item">
                  <div class="left-button">客户详情</div>
                  <div class="right-button">立即报备</div>
                </div>-->
                <div class="button-detail">查看详情 <p>你好</p></div> 
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
      appointment:false,//是否显示预约按钮
      detailShow:false,//是否显示查看详情按钮
    }
  },
  created() {
    // this.getSystemMessageList()
  },
  methods: {
    domShow(text){//根据字符串显示dom
      switch (text) {
        case '恭喜获奖':
          this.detailShow=true
          break;
        case '客户预约':
          this.appointment=true
          break;
        default:
          break;
      }
    },
    async getSystemMessageList() {
      const res = await dynamicsService.getSystemMessage({current: this.current, size: this.size})
      console.log(res)
      this.pages = res.pages
      this.sysMessage.push(...res.records)
      this.current += 1
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
      position: relative;
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
        padding-bottom: 18px;
      }
      .sys-shadowBox-remarks {
        font-size: 14px;

        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
      .look-detail{
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(7,125,230,1);
        text-align: center;
        i{
          display:inline-block;
          width:12px;
          height:12px;
        }
      }
      .client-detail{
        width:143px;
        height:40px;
        background:rgba(242,244,245,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:40px;
        text-align:center;
      }
      .go-report{
        margin-left:24px;
        width:143px;
        height:40px;
        background:rgba(242,244,245,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(7,125,230,1);
        line-height:40px;
        text-align:center;
      }
    }
  }
}
</style>




 