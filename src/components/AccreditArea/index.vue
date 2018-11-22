<template>
  <div class="accredit-area-page" v-if="domShowInfo.domShow">
    <div class="content-box">
    <ul class="accredit-area-page-content" :class="{backColor:activeShow}">
      <li class="accredit-area-page-content-left" :class="{show:activeShow}">
        <p v-for="(item,index) in list" :key="index" :class="{active:showa==index}" @click="activea(index)">广东</p>
      </li>
       <li class="accredit-area-page-content-center" v-if="domShowInfo.liShow">
        <p v-for="(item,index) in list" :key="index" :class="{active:showb==index}" @click="activeb(index)">深圳</p>
      </li>
       <li class="accredit-area-page-content-right" v-if="domShowInfo.liShow">
        <p v-for="(item,index) in list" :key="index" :class="{active:showc==index}" @click="activec(index)">南山</p>
      </li>
    </ul>
    <div class="accredit-area-page-residue" @click="pageShow"></div>
    </div>
  </div>
</template>
<script>
export default {
  data:()=>({
    list:[1,2,3,4,5,67,8,9,0,13,14,55,33],
    // accreditShow:true,
    showa:null,
    showb:null,
    showc:null,
  }),
  props:{
    activeShow:{
      type:Boolean,
      default:false
    },
    domShowInfo:{
      type:Object
    }
  },
  methods:{
    activea(num){
      this.showa=num
    },
    activeb(num){
      this.showb=num
    },
    activec(num){
      this.showc=num
    },
    pageShow(){
      this.domShowInfo.domShow=false
    }
  }
}
</script>
<style lang="less">
.accredit-area-page{
  width: 100%;
  height:100%;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  .show{
    border-bottom: 1px solid #E6E6E6; 
  }
  .backColor{
    background: #FFFFFF !important;
  }
  .content-box{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .accredit-area-page-content{
    width: 375px;
    height: 401px;
    display: flex;
    background: #f2f5f9;
    li{
      overflow-y: auto;
      .active{
        color:rgba(0,122,230,1);
      }
    }
    p{
        font-size:15px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:49px;
        margin: 15px 0 15px 0;
    }
    .accredit-area-page-content-left{
      width: 85px;
      background: #FFFFFF;
      p{
        width:60px;
        height:49px;
        margin-left: 20px;
      }
    }
    .accredit-area-page-content-center{
      width: 126px;
      background:rgba(242,245,249,1);
      margin-left: 9px;
      p{
        width:120px;
        height:49px; 
        text-indent:11px;
        border-bottom: 1px solid #E6E6E6; 
      }
    }
    .accredit-area-page-content-right{
      width: 126px;
      background:rgba(242,245,249,1);
      margin-left:21px;
       p{
        width:120px;
        height:49px; 
        text-indent:11px;
        border-bottom: 1px solid #E6E6E6; 
      }
    }
  }
  .accredit-area-page-residue{
    background: #000000;
    opacity:0.6;
    flex: 1;
    width: 375px;
  }
}
</style>
