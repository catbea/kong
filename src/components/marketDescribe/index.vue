<template>
<div class="market-box-page">
  <div class="market-box" v-for="(item,index) in describeInfo" :key="index" @click="itemClickHandler(item)">
    <div class="all-describe" :class="{line:item.borderColor}">
        <div class="img">
          <div class="label">9.9折</div>
        </div>
        <input type="text" v-model="val">
        <ul class="market-describe">
          <li class="market-name">
            <span> 华润城市花园</span>
            <span class="dredge" v-if="item.dredgeFlag"></span>
          </li>
          <li class="site">南山 大冲</li>
          <!-- <condition :info="info"></condition> -->
          <li class="unit-price">
            <span>98000元/m2起</span>
            <span>45次开通</span>
          </li>
        </ul>
        <div class="market-price">
          <span>佣</span>
          <span>1.56%+111111元/套</span>
        </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data: ()=>({
    val:123,

  }),
  props:{
    value:'',
    describeInfo:{
      type: Array,
      default: _ => { return [] }
      }
  },
  methods: {
    itemClickHandler(e) {
      console.log('hahahahah');
      this.$emit('clickasdadsadsa')
      
      // if(n.skip==true){
      //   this.$router.push({path:`/market/marketDetail/${this.userId}`})
      // }
      // this.$router.push({ path: '/market/marketDetail', query:{plan:`${this.userId}`}})
    }
  },
  watch:{
    value(val){
      this.val = val
    },
    val(val){
      this.$emit('change',val)
    }
  }
}
</script>
<style lang="less">
.line{
  border-bottom:1px solid #E6E6E6;
}
   .market-box-page{
     background: #FFFFFF;
    .market-box {
      width:343px;
      padding-top: 13px;
      padding-left: 16px;
      .all-describe{
        
        display: flex;
       flex-wrap: wrap;
      .img {
        width: 120px;
        height: 90px;
        border-radius: 6px;
        border: 1px solid black;
        margin-right: 12px;
        position: relative;
        .label {
          position: absolute;
          left: -4px;
          top: 4px;
          width: 36px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          background: rgba(234, 77, 46, 1);
          font-size: 11px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
      }
      .market-describe {
        width: 207px;
        height: 90px;
        .market-name {
          display: flex;
          justify-content: space-between;
          margin-bottom: 11px;
          span:nth-child(1){
            font-size:16px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:16px;
          }
          span:nth-child(2){
            width: 16px;
            height: 16px;
            border: 1px solid black;
          }
        }
        .site {
          font-size:12px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:12px;
          margin-bottom: 9px;
        }
        .unit-price {
          display: flex;
          height: 15px;
          margin-top: 11px;
          span:nth-child(1) {
            line-height: 15px;
            font-size: 15px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(234, 77, 46, 1);
          }
          span:nth-child(2) {
            line-height: 15px;
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            margin-left: 12px;
          }
        }
      }
      .market-price {
        width:335px;
        height:34px;
        padding:0 0 0 8px;
        background:rgba(247,249,250,1);
        border-radius:4px;
        margin: 16px 0 16px 0;
        display: flex;
        span:nth-child(1) {
          width:16px;
          height:16px;
          border-radius:2px;
          border:1px solid;
          font-size:10px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(255,85,51,1);
          line-height:16px;
          margin-top: 9px;
          text-align: center;
        }
        span:nth-child(2) {
          margin: 5px 0 0 10px;
          font-size:15px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height: 24px;
        }
      }
      }
    }
    }
</style>
