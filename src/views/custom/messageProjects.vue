<template>
  <div class="my-member-page">
    <div class="market-box">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="'没有更多了'"
        @load="getLinkerList"
      >
        <meal-market
          v-for="(item,index) in projectList"
          :key="index"
          :dataArr="item"
          :indexData="index"
          :showData="checkedList.indexOf(index) > -1"
          @click.native="selectHandle(item)"
        ></meal-market>
      </van-list>
    </div>
    <div class="send-box">
      <div class="cancel-box" @click="sendCancel">取消</div>
      <span @click="sendProjectHandle" class="send-button">发送</span>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import marketService from 'SERVICE/marketService'
import userService from 'SERVICE/userService'
import MealMarket from '@/views/user/myMember/selectedDisk/MealMarket.vue'
import { mapGetters } from 'vuex'
import { onSendMsg, initMsg, setToAccount } from '@/utils/im/receive_new_msg.js'
export default {
  components: {
    MealMarket
  },
  created() {},
  computed: {
    ...mapGetters(['userInfo'])
  },
  data: () => ({
    checkedList: [],
    page: 1,
    pageSize: 8,
    loading: false,
    finished: false,
    projectList: []
  }),
  methods: {
    sendCancel() {
      this.$router.go(-1)
    },
    async getLinkerList() {
      const res = await userService.getMyMarket(0)

      let _list = []
      for (let item of res.records) {
        let buildPrice = ''
        let priceUnit = ''
        if (item.price === 0) {
          buildPrice = '价格待定'
          priceUnit = ''
        } else {
          buildPrice = item.price + ''
          priceUnit = item.priceUnit
        }

        let obj = {
          linkerId: item.linkerId,
          linkerUrl: item.linkerUrl,
          sale: item.sale,
          linkerName: item.linkerName,
          site: `${item.city} ${item.county} ${buildPrice} ${priceUnit}`, //'深圳 南山 120000元/㎡',
          condition: item.linkerTags,
          open: `${item.openTimes}次开通`,
          isChecked: false,
          divisionRules: item.divisionRules,
          saleStatus: item.saleStatus,
          ifPanorama: item.ifPanorama,
          price: `${item.price} ${item.priceUnit}`
        }
        _list.push(obj)
      }
      this.projectList = this.projectList.concat(_list)
      if (res.pages === 0 || this.page === res.pages) {
        this.finished = true
      }

      this.page++
      this.loading = false
    },

    selectHandle(project) {
      for (let item of this.projectList) {
        item.isChecked = false
      }
      project.isChecked = !project.isChecked
      this.checkedList = [project]
    },

    sendProjectHandle() {
      if (this.checkedList.length == 0) {
        this.$toast('请先选择楼盘')
        return
      }
      let project = this.checkedList[0]
      // console.log(project)
      this.$router.go(-1)
      let content = {}
      let msg = {}
      msg.avatarMediaid = project.linkerUrl
      msg.linkerId = project.linkerId
      msg.linkerName = project.linkerName
      msg.linkerPrice = project.price
      msg.address = project.site
      msg.agentId = this.userInfo.agentId
      //'{"avatarMediaid":"https://720ljq2-10037467.file.myqcloud.com/linker/administrator/image/b6df070d1fdb48bd8d085f40607aef7a.png","linkerId":"d604ecf5687642569614b65625418d62","linkerName":"QQQ-2","address":"广东省深圳市南山区","linkerPrice":"88888.00元/㎡","agentId":"4149","building":"建面暂无信息"}'
      content.data = msg
      content.ext = {}
      onSendMsg(JSON.stringify(content), true, 3, 0)
      // console.log(this.checkedList)
    }
  }
}
</script>
<style lang="less">
.my-member-page {
  .market-box {
    padding-bottom: 80px;
    .meal-market-page {
      .meal-market-page-box {
        margin: 16px 0 0 16px;
      }
    }
  }
  .send-box {
    background: rgba(255, 255, 255, 1);
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    .cancel-box {
      font-size: 16px;
      line-height: 60px;
      padding-left: 16px;
    }
    .send-button {
      margin-right: 16px;
      width: 72px;
      height: 30px;
      border-radius: 22px;
      border: 1px solid;
      font-size: 14px;

      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>
