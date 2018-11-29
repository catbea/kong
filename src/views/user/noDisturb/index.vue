<template>
  <div class="no-disturb-page">
    <div class="no-disturb-page-top">
      <div class="disturb-box">
        勿扰模式
        <van-switch v-model="checked" @change="onSwitch"/>
      </div>
      <div class="disturb-describe">
        启用勿扰模式后，在设定时间内将收不到任何推送提醒，请谨慎开启避免影响正常工作
      </div>
    </div>
    <ul class="no-disturb-page-bottom" v-if="checked">
      <li @click="setHandle" class="cycle-set">
        <p>周期设置</p>
        <div class="right" ref="rr">
          <p class="show-date" v-show="showDate">每天</p>
         <div class="show-box" v-show="showBox"> 
           <i v-for="(item,index) in periodList" :key="index" v-show="item.check">{{item.date}}</i>
          </div>
          <span class="bg_img icon" :style="{backgroundImage:'url('+detaliImg+')'}"></span>
        </div>
        <van-popup v-model="popupShow" position="bottom" :overlay="true">
         <ol class="period-box">
           <li v-for="(item,index) in periodList" :key="index" @click.stop="periodTaget(index,item)"> 
             {{item.date}}
             <span class="bg_img" :style="{backgroundImage:'url('+checkImg+')'}" v-show="item.check"></span>
           </li>
         </ol>
         <div class="confirm-button" @click.stop="periodHandle">
           确定
         </div>
        </van-popup>
      </li>
       <li class="start-time" @click="startHandle"> 
        <p>开始时间</p>
        <div class="right">
          <i>{{startTime}}</i>
          <span class="bg_img icon" :style="{backgroundImage:'url('+detaliImg+')'}"></span>
        </div>
      </li>
      <van-popup v-model="startShow" position="bottom" :overlay="true" >
          <van-datetime-picker
          v-model="startDate"
          type="time"
          @confirm="onStartConfirm"
          @cancel="onStartCancel"
        />
        </van-popup>
       <li class="end-time" @click="endHandle">
        <p>结束时间</p>
        <div class="right">
          <i>
            <span v-show="greater">次日</span> {{endTime}}
            </i>
          <span class="bg_img icon" :style="{backgroundImage:'url('+detaliImg+')'}"></span>
        </div>
      </li>
      <van-popup v-model="endShow" position="bottom" :overlay="true">
          <van-datetime-picker
          v-model="endDate"
          type="time"
          @confirm="onEndConfirm"
          @cancel="onEndCancel"
        />
        </van-popup>
    </ul>
  </div>
</template>
<script>
export default {
  data:()=>({
    checked:false,
    detaliImg:require('IMG/user/arr.png'),
    popupShow:false,
    checkImg:require('IMG/user/goxuan@2x.png'),
    periodList:[
      {date:"周一 ",check:false},
      {date:"周二 ",check:false},
      {date:"周三 ",check:false},
      {date:"周四 ",check:false},
      {date:"周五 ",check:false},
      {date:"周六 ",check:false},
      {date:"周日 ",check:false}
      ],
      showBox:true,
    date:"每天",
    showDate:false,
    itemDate:"",
    endShow:false,
    endDate: '12:00',
    endTime:null,
    startShow:false,
    startDate: '12:00',
    startTime:null,
     greater:false
  }),
  methods:{
    onSwitch(checked){
      this.checked=checked
    },
    periodHandle(){
      console.log(this.$refs.rr.innerText)
      this.popupShow=!this.popupShow
      if(
        this.periodList[0].check===true
      &&this.periodList[1].check===true
      &&this.periodList[2].check===true
      &&this.periodList[3].check===true
      &&this.periodList[4].check===true
      &&this.periodList[5].check===true
      &&this.periodList[6].check===true
      ){
        this.showBox=false
        this.showDate=true
      }else{
        this.showBox=true
        this.showDate=false
      }
    },
  setHandle(){
    this.popupShow=!this.popupShow
  },
    periodTaget(index,item){
        this.periodList[index].check = !this.periodList[index].check
    },
    // onChange(picker,value,index){
    //   console.log(picker.getColumnValue(0),'-',picker.getColumnValue(1)) 
    // },
    startHandle(){
      this.startShow=!this.startShow
    },
    onStartConfirm(N){
      this.startTime=N
      this.startShow=!this.startShow
      console.log(this.startShow)
    },
    onStartCancel(){
      this.startShow=!this.startShow
      console.log(this.startShow)
    },
    endHandle(){
      this.endShow=!this.endShow
    },
    onEndConfirm(N){
      this.endTime=N
      this.endShow=!this.endShow
      if(this.endDate<this.startDate){
        this.greater=true
        console.log(this.greater)
      }else{
        this.greater=false
        console.log(this.greater)
      }
    },
    onEndCancel(){
      this.endShow=!this.endShow
    }
  }
}
</script>
<style lang="less">
.no-disturb-page{
  background:rgba(247,249,250,1);
  .van-switch--on{
    background:#007AE6;
  }
  .no-disturb-page-top{
    margin-top:10px;
    padding:18px 15px 7px 14px; 
    background:rgba(255,255,255,1);
    .disturb-box{
      display: flex;
      justify-content:space-between;
      align-items:center;
      margin-top:13px;
      font-size:15px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:21px;
    }
    .disturb-describe{
      
      font-size:13px;
      padding:7px 16px 22px 15px;
      background:rgba(247,249,250,1);
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
    }
  }
  .no-disturb-page-bottom{
    background:rgba(255,255,255,1);
    .cycle-set,.start-time,.end-time{
      width:345px;
      display: flex;
      justify-content: space-between;
      height:56px;
      margin-left:15px;
      border-bottom:1px solid #E6E6E6;
      align-items: center;
      p{
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
      }
      .show-date,.right{
        display: flex;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        .show-box{
          display: flex;
        }
        i{
        margin-right:2px;
        font-style: normal;
        }
        .icon{
          margin-top:6px;
          width:16px;
          height:16px;
        }
      }
      }
    .cycle-set{
      .period-box{
        li{
          width:360px;
          height:50px;
          align-items:center;
          margin-left:15px;
          display:flex;
          justify-content: space-between;
          font-size:15px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(51,51,51,1);
          span{
            width:22px;
            height:22px;
          }
        }
      }
        .confirm-button{
            border-top:6px solid #E8E8E8;
            height:50px;
            text-align:center;
            line-height:50px;
            font-size:16px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
    }
  }
}
</style>
