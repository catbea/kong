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
      <span></span>
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
    this.$store.commit(types.TABBAR, false)
  },
  data: _ => ({
    topList: [
      {
        top: [{ left: '开发商', right: '惠州市太东地产有限公司' }]
      },
      {
        top: [
          { left: '楼盘状态', right: '在售 ' },
          { left: '参考均价', right: '15000元/㎡ ' },
          { left: '开盘时间', right: '2017年01月23日 ' },
          { left: '交房时间', right: '2019年01月23日 ' }
        ]
      },
      {
        top: [
          { left: '区域位置', right: '宝安区 ' },
          {
            left: '楼盘地址',
            right:
              '广东省深圳市宝安区前进一路92号广东省深圳市宝安区前进一路92号广东省深圳市宝安区前进一路92号广东省深圳市宝安区前进一路92号'
          },
          { left: '售楼处地址', right: '广东省深圳市宝安区前进一路92号 ' }
        ]
      },
      {
        top: [
          { left: '建筑风格', right: '在售 ' },
          { left: '产权年限', right: '在售 ' },
          { left: '装修标准', right: '在售 ' },
          { left: '占地面积', right: '在售 ' },
          { left: '建筑面积', right: '在售 ' },
          { left: '容积率', right: '在售 ' },
          { left: '绿化率', right: '在售 ' },
          { left: '规划户数', right: '在售 ' },
          { left: '规划车位', right: '在售 ' }
        ]
      },
      {
        top: [
          { left: '物业类型  ', right: '在售 ' },
          { left: '物业公司', right: '在售 ' },
          { left: '物业费', right: '在售 ' }
        ]
      },
      {
        top: [
          { left: '供暖方式  ', right: '暂无信息' },
          { left: '供水类型', right: '民水 ' },
          { left: '供电类型', right: '民电 ' }
        ]
      }
    ],
    middleList: [
      {
        middle: [
          { left: '供暖方式  ', right: '暂无信息', center: '右边' },
          { left: '供水类型', right: '民水 ', center: '右边' },
          { left: '供电类型', right: '民电 ', center: '右边' }
        ]
      },
      {
        middle: [
          { left: '供暖方式  ', right: '暂无信息', center: '右边' },
          { left: '供水类型', right: '民水 ', center: '右边' },
          { left: '供电类型', right: '民电 ', center: '右边' }
        ]
      },
      {
        middle: [
          { left: '供暖方式  ', right: '暂无信息', center: '右边' },
          { left: '供水类型', right: '民水 ', center: '右边' },
          { left: '供电类型', right: '民电 ', center: '右边' }
        ]
      },
      {
        middle: [
          { left: '供暖方式  ', right: '暂无信息', center: '右边' },
          { left: '供水类型', right: '民水 ', center: '右边' },
          { left: '供电类型', right: '民电 ', center: '右边' }
        ]
      },
      {
        middle: [
          { left: '供暖方式  ', right: '暂无信息', center: '右边' },
          { left: '供水类型', right: '民水 ', center: '右边' },
          { left: '供电类型', right: '民电 ', center: '右边' }
        ]
      }
    ]
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
    margin: 13px 0 0 15px;
    span {
      width: 12px;
      height: 12px;
      border: 1px solid black;
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
