<template>
  <div class="sysMessage-page">
    <div class="sysMessage-container" v-for="(time ,key) in sysMessage" :key="key">
      <div class="sysMessage-time">
        {{time.createDate}}
      </div>
       <div class="sysMessage-shadowBox" v-for="(item,key) in time.systemMessages" :key="key">
        <shadow-box>
          <div slot="container">
            <div class="sys-shadowBox">
              <p class="sys-shadowBox-title">{{item.title}}</p>
              <p class="sys-shadowBox-time">{{item.content}}</p>
              <!-- <p class="sys-shadowBox-remarks">本次主要更新内容有： 1.增加勿扰模式 2.VIP功能优化调整 3.我的楼盘增加关闭展示功能</p> -->
            </div>
          </div>
        </shadow-box>
      </div> 
    </div>
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
      sysMessage: []
    }
  },
  created() {
    this.getSystemMessageList()
  },
  methods: {
    async getSystemMessageList() {
      const res = await dynamicsService.getSystemMessage()
      this.sysMessage = res.records
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
  > .sysMessage-container {
    margin: 16px 0;
    > .sysMessage-time {
      font-size: 14px;
      font-weight: 500;
      color: rgba(41, 46, 51, 1);
      line-height: 20px;
      margin: 20px 0 12px 16px;
    }
    .sys-shadowBox {
      padding: 16px;
      > .sys-shadowBox-title {
        font-size: 20px;
        font-weight: 600;
        color: rgba(41, 46, 51, 1);
        line-height: 30px;
        padding-bottom: 8px;
      }
      > .sys-shadowBox-time {
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
        padding-bottom: 18px;
      }
      > .sys-shadowBox-remarks {
        font-size: 14px;

        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
    }
  }
}
</style>
