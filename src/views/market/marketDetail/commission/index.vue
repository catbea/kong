<template>
  <div class="commission-page">
    <ul class="commission-content" v-for="(item,index) in list" :key="index">
      <li class="commission-content-condition">
        一室一厅、单身公寓
      </li>
      <li class="commission-content-deduct">
        <span>佣金提成：</span> <span>5000元/套</span>
      </li>
      <li class="commission-content-standard">
        <div>结佣标准</div> 
        <div>
          客户提交过户按揭资料、签订《房地产买卖合同》缴费首期款后，项目将结算50%服务佣金，银行放款后 结算剩余的50%服务佣金
        </div>
      </li>
      <li class="commission-content-payment">
        <div>支付方式</div>
        <div>线下支付</div>
      </li>
      <li class="commission-content-rule">
        <div>分佣规则</div>
        <div>
          因客户退房致使开发商不向平台支付佣金或团购费， 经纪人应向平台全额退还已垫付的款项及财产性收益。 否则，平台有权从经纪人其他未结算的款项中扣除， 并保留追究其法律责任的权利。
        </div>
      </li>
      <li class="commission-content-protect">
        <div>保护期</div>
        <div>
          23天
        </div>
      </li>
      <li class="commission-content-remark">
        <div>备注</div>
        <div>
          1.成交每套房型将收取佣金的10%作为平台服务费； 2.发票和税票说明： a.如合作方提供发票，不需要扣除税点3%； b.特殊情况合作方无法提供发票的，需扣除税点8%； c.发票的抬头和开票内容请联系现场助理。
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: _ => ({
    list: [1, 2]
  })
}
</script>
<style lang="less">
.commission-page {
  width: 100%;
  height: 100%;
  padding: 16px 0 0 16px;
  background: #f7f9fa;
  line-height: normal;
  > .commission-content {
    width: 302px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 16px 25px 0 16px;
    > li {
      display: inline-block;
      margin-top: 12px;
      div:nth-child(1) {
        font-size: 15px;
        font-family: PingFang-SC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
      div:nth-child(2) {
        margin-top: 8px;
        font-size: 13px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
    > .commission-content-condition {
      font-size: 18px;
      font-family: PingFang-SC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
    > .commission-content-deduct {
      margin-top: 16px;
      span:nth-child(1) {
        font-size: 15px;
        font-family: PingFang-SC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
      span:nth-child(2) {
        font-size: 15px;
        font-family: PingFang-SC-Semibold;
        font-weight: 600;
        color: #ea4d2e;
      }
    }
    // > .commission-content-standard{
    //   margin-content: 12px;
    //   div:nth-child(1){
    //     font-size:15px;
    //     font-family:PingFang-SC-Semibold;
    //     font-weight:600;
    //     color:rgba(51,51,51,1);
    //   }
    //   div:nth-child(2){
    //     margin-content: 8px;
    //     font-size:13px;
    //     font-family:PingFang-SC-Regular;
    //     font-weight:400;
    //     color:rgba(102,102,102,1);
    //   }
    // }
    // > .commission-content-payment{
    //   margin-content: 12px;
    //   div:nth-child(1){
    //     font-size:15px;
    //     font-family:PingFang-SC-Semibold;
    //     font-weight:600;
    //     color:rgba(51,51,51,1);
    //   }
    //   div:nth-child(2){
    //     margin-content: 8px;
    //     font-size:13px;
    //     font-family:PingFang-SC-Regular;
    //     font-weight:400;
    //     color:rgba(102,102,102,1);
    //   }
    // }
  }
  .commission-bottom {
    width: 334px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    padding: 16px 0 0 16px;
  }
}
</style>
