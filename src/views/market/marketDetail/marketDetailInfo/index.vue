<template>
  <div class="market-detail-info-page">
    <InfoTop v-for="(item,index) in topList" :key="index" :topInfo="item">
    </InfoTop>
    <!-- <InfoTop :info="topa"></InfoTop>
    <InfoTop :info="topb"></InfoTop>
    <InfoTop :info="topc"></InfoTop>
    <InfoTop :info="topd"></InfoTop>
    <InfoTop :info="tope"></InfoTop>
    <InfoTop :info="topf"></InfoTop> -->
    <div class="title">
      <ul>
        <li>预售许可证</li>
        <li>发证时间</li>
        <li>绑定楼栋</li>
      </ul>
    </div>
     <InfoMiddle v-for="(item,index) in middleList" :key="index" :middleInfo="item">
     </InfoMiddle>
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
export default {
  components: {
    InfoTop,
    InfoMiddle
  },
  created() {
    this.$store.commit(types.TABBAR,false)
    this.info = this.$route.query
    console.log(this.info,999999999999999)
  },
  computed:{
    topList(){
      return [
      {
        top: [{ left: '开发商', right: this.info.developer}]
      },
      {
        top: [
          { left: '楼盘状态', right: this.info.saleStatus },
          { left: '参考均价', right: this.info.averagePrice },
          { left: '开盘时间', right:this.info.openTime},
          { left: '交房时间', right: this.info.expectedOthers}
        ]
      },
      {
        top: [
          { left: '区域位置', right:this.info.district},
          {
            left: '楼盘地址',
            right:this.info.detailAddress
          },
          { left: '售楼处地址', right:this.info.saleAddress}
        ]
      },
      {
        top: [
          { left: '建筑风格', right:this.info.buildStyle},
          { left: '产权年限', right:this.info.propertyYears},
          { left: '装修标准', right:this.info.decorateStatus},
          { left: '占地面积', right:this.info.coverArea},
          { left: '建筑面积', right:this.info.buildArea},
          { left: '容积率', right:this.info.plotRate},
          { left: '绿化率', right:this.info.greenRate},
          { left: '规划户数', right:this.info.householdNum},
          { left: '规划车位', right:this.info.carNum}
        ]
      },
      {
        top: [
          { left: '物业类型  ', right:this.info.houseUseList},
          { left: '物业公司', right:this.info.management},
          { left: '物业费', right:this.info.managementPrice}
        ]
      },
      {
        top: [
          { left: '供暖方式  ', right:this.info.heatingType},
          { left: '供水类型', right:this.info.waterType},
          { left: '供电类型', right:this.info.electricType}
        ]
      }
    ]
    },
    middleList(){
      return [
      {
        middle: [
          { left:this.info.licence, right:this.info.certificationTime, center:this.info.bindBuilding}
        ]
      }
    ]
    }
  },
  data: () => ({
    info:null,
    warnImg:require('IMG/marketDetail/warn.png'),
  })
}
</script>
<style lang="less">
.market-detail-info-page {
  width: 100%;
  background: #eeeeee;
  padding-bottom: 102px;
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
    margin: 13px 0 102px 15px;
    span {
      width: 12px;
      height: 12px;
      margin-top:4px;
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
