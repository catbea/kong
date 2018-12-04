<template>
  <div class="family-list-page">
    <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6" sticky animated>
          <van-tab v-for="(item,index) in tabs" :key="index" :title="item">
           <keep-alive>
            <van-list v-model="loading" :finished="item.finished" :finished-text="'没有更多了'" @load="onLoad">
              <div class="family-list-page-box">
      <div class="centent">
      <div class="big-box">
      <div class="family-list-page-box-left">
           
      </div>
      <ul class="family-list-page-box-center">
        <li>3室2厅1卫</li>
        <li>建面 120㎡ 南北朝向</li>
        <li>
          <tag-group :arr="info"></tag-group>
        </li>
        <li>约320万/套</li>
      </ul>
      </div>
      <div class="family-list-page-box-right">
        <p class="bg_img" :style="{backgroundImage:'url('+panorama+')'}"></p>
        <span class="bg_img" :style="{backgroundImage:'url('+leave+')'}"></span>
      </div>
      </div>
      <div class="centent">
      <div class="big-box">
      <div class="family-list-page-box-left">
           
      </div>
      <ul class="family-list-page-box-center">
        <li>3室2厅1卫</li>
        <li>建面 120㎡ 南北朝向</li>
        <li>
          <tag-group :arr="info"></tag-group>
        </li>
        <li>约320万/套</li>
      </ul>
      </div>
      <div class="family-list-page-box-right">
        <p class="bg_img" :style="{backgroundImage:'url('+panorama+')'}"></p>
        <span class="bg_img" :style="{backgroundImage:'url('+leave+')'}"></span>
      </div>
      </div>
    </div>
          </van-list>
          </keep-alive>
          </van-tab>
      </van-tabs>
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup/'
import HouseTypeService from 'SERVICE/houseTypeService'
export default {
  components: {
    TagGroup
  },
  created() {
    this.getHouseTypeInfo(this.linkerId)
  },
  data:()=>({
    linkerId:'13f8c005b5c6440ea1ba2a0d9341e56c',
    num:null,
    tabs:["全部","一室","二室","三室"],
    activeIndex: 0,
    loading: false,
    finished:false,
    panorama:require('IMG/marketDetail/quanj@2x.png'),
    leave:require('IMG/marketDetail/arrow2.png'),
    info:["热销中","全景看房"]
  }),
  methods:{
    onLoad(){
      console.log(909090909)
    },
    async getHouseTypeInfo (n) {
      const res = await HouseTypeService.getHouseType(n)
      console.log(res)
    }
  }
}
</script>
<style lang="less">
.family-list-page{
      display: flex;
      height:100%;
    flex-direction: column;
    background:#ffffff;
  .family-list-page-box{
    width:375px;
    height:100%;
    display: flex;
    flex-direction: column;
    margin-top:45px;
    .centent{
      width:343px;
      height:107px;
      margin:16px 0px 0 16px;
      border-bottom:1px solid #EEEEEE;
      display: flex;
    justify-content: space-between;
    }
    .big-box{
      display: flex;
    }
    .family-list-page-box-left{
      width:120px;
      height:90px;
    }
    .family-list-page-box-center{
      margin-left:11px;
      li:nth-of-type(1){
        margin-bottom:11px;
        font-size:16px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:16px;
      }
      li:nth-of-type(2){
        margin-bottom:9px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:12px;
      }
      li:nth-of-type(3){
        margin-bottom:9px;
      }
      li:nth-of-type(4){
        font-size:15px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(234,77,46,1);
        line-height:15px;
      }
    }
    .family-list-page-box-right{
      display: flex;
      margin-top:37px;
      p{
        width:28px;
        height:15px;
      }
      span{
        margin:2px 0 0 4px;
        width:12px;
        height:12px;
      }
    }
  }

}
</style>
