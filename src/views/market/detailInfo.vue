<template>
  <div class="market-detail-info-page">
    <InfoTop v-for="(item,index) in topList" :key="index" :topInfo="item"></InfoTop>
    <div class="title">
      <ul>
        <li>预售许可证</li>
        <li>发证时间</li>
        <li>绑定楼栋</li>
      </ul>
    </div>
    <InfoMiddle v-for="(item,index) in middleList" :key="index" :middleInfo="item"></InfoMiddle>
    <div class="info-bottom">
      <span :style="{backgroundImage:'url('+warnImg+')'}" class="bg_img"></span>
      <p>免责申明：楼盘信息来源于政府共事网站，开发商， 第三方公众平台最终以政府部门登记备案为准，请谨慎检查。</p>
    </div>
  </div>
</template>
<script>
import * as types from '@/store/mutation-types'
import InfoTop from 'COMP/TowLines/'
import InfoMiddle from 'COMP/ThreeLines'
import MarketService from 'SERVICE/marketService'
export default {
  components: {
    InfoTop,
    InfoMiddle
  },
  created() {
    this.linkerId = this.$route.params.id
    this.getLinkerSimpleDetail(this.linkerId)
  },
  computed: {
    topList() {
      if (!this.info) return
      return [
        [{ 开发商: this.info.developer }],
        [{ 楼盘状态: this.info.saleStatus }, { 参考均价: this.info.averagePrice }, { 开盘时间: this.info.openTime }, { 交房时间: this.info.expectedOthers }],
        [{ 区域位置: this.info.district }, { 楼盘地址: this.info.detailAddress }, { 售楼处地址: this.info.saleAddress }],
        [
          { 建筑风格: this.info.buildStyle },
          { 产权年限: this.info.propertyYears },
          { 装修标准: this.info.decorateStatus },
          { 占地面积: this.info.coverArea },
          { 建筑面积: this.info.buildArea },
          { 容积率: this.info.plotRate },
          { 绿化率: this.info.greenRate },
          { 规划户数: this.info.householdNum },
          { 规划车位: this.info.carNum }
        ],
        [{ 物业类型: this.info.houseUse }, { 物业公司: this.info.management }, { 物业费: this.info.managementPrice }],
        [{ 供暖方式: this.info.heatingType }, { 供水类型: this.info.waterType }, { 供电类型: this.info.electricType }]
      ]
    },
    middleList() {
      return [
        {
          middle: [{ left: this.info && this.info.licence, right: this.info && this.info.certificationTime, center: this.info && this.info.bindBuilding }]
        }
      ]
    },
    buildStyle() {
      switch (this.info.buildStyle) {
        case '0':
          return '塔楼'
        case '1':
          return '板楼'
        case '2':
          return '平板'
        case '3':
          return '塔板结合'
        default:
          return '暂无信息'
      }
    },
    decorateStatus() {
      switch (this.info.decorateStatus) {
        case '0':
          return '精装'
        case '1':
          return '毛坯'
        case '2':
          return '简单装修'
        case '3':
          return '全装修'
        case '4':
          return '公共部分精装修'
        default:
          return '暂无信息'
      }
    },
    houseUse() {
      switch (this.info.houseUse) {
        case '0':
          return '普通住宅'
        case '1':
          return '商住两用'
        case '2':
          return '商品房'
        case '3':
          return '建筑综合体'
        case '4':
          return '商铺'
        case '5':
          return '写字楼'
        case '6':
          return '别墅'
        case '7':
          return '公寓'
        case '8':
          return '洋房'
        case '9':
          return '酒店 '
        default:
          break
      }
    }
  },
  data: () => ({
    linkerId: '',
    info: null,
    warnImg: require('IMG/marketDetail/warn.png')
  }),
  methods: {
    async getLinkerSimpleDetail(linkerId) {
      const res = await MarketService.getLinkerSimpleDetail(linkerId)
      this.info = res
    }
  }
}
</script>
<style lang="less">
.market-detail-info-page {
  width: 100%;
  background: #eeeeee;
  .title {
    background: #fff;
    height: 39px;
    padding: 13px 0 0 15px;
    border-bottom: 1px solid #eeeeee;
    ul {
      margin-right: 20px;
      display: flex;
      justify-content: space-between;
      li {
        width: 122px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(150, 158, 168, 1);
        line-height: normal;
      }
    }
  }
  .info-bottom {
    display: flex;
    margin: 13px 0 50px 15px;
    span {
      width: 12px;
      height: 12px;
      margin-top: 4px;
    }
    p {
      margin-left: 8px;
      width: 324px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(150, 158, 168, 1);
      line-height: normal;
    }
  }
}
</style>
