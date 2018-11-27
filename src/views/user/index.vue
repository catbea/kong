<template>
  <div class="me-page">
    <business-card>
    </business-card>
    <div class="top-null"></div>
    <div class="business-status-con">
      <div class="business-status-title">个人中心</div>
       <div class="modify-child">
          <div v-for="(img,index) in headIcons" :key="index" class="head-img" @click="selectedHead(index,img.type,img.itemCode)">
            <!--   -->
            <img :src="img.Icon"/>
             <p class="grou1Icon-p">{{img.title}}</p>
            <!--   -->
            <!--  -->
           
          </div>
        </div>
   
    </div>
    <div class="top-null"></div>
    <div class="business-status-tow">
       <div class="business-status-title">我的服务</div>
        <div class="modify-child">
          <div v-for="(img,index) in btnIcons" :key="index" class="head-img" @click="selectedHead(index,img.type,img.itemCode)">
            <!--   -->
            <img :src="img.Icon"/>
             <p class="grou1Icon-p">{{img.title}}</p>
            <!--   -->
            <!--  -->
           
          </div>
        </div>
    </div>
     <div class="top-null-css"></div>
  </div>
</template>
<script>
import businessCard from 'COMP/User/BusinessCard'
import { Cell, CellGroup } from 'vant'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
export default {
  components: {
    businessCard,
    Cell,
    CellGroup,

  },
  data: () => ({
    headIcons:[
      {"title":"我的楼盘","Icon":require('IMG/user/Group@2x.png')},
      {"title":"我的收藏","Icon":require('IMG/user/Group1@2x.png')},
      {"title":"历史文章","Icon":require('IMG/user/Group3@2x.png')},
      {"title":"我的报备","Icon":require('IMG/user/Group6@2x.png')},
      {"title":"我的优惠券","Icon":require('IMG/user/Group5@2x.png')},
      {"title":"消费账单","Icon":require('IMG/user/Group2@2x.png')},
      {"title":"邀请有礼","Icon":require('IMG/user/Group4@2x.png')},
    ],
    btnIcons:[
       {"title":"我的优惠券","Icon":require('IMG/user/Group9@2x.png')},
       {"title":"消费账单","Icon":require('IMG/user/Group7@2x.png')},
       {"title":"邀请有礼","Icon":require('IMG/user/Group8@2x.png')},
    ]
   
   
  }),
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      // TODO jwt启用后应该不需再存userid
      let userId = window.localStorage.getItem('userId')
      this.$store.dispatch('getUserInfo', userId)
      this.$store.dispatch('getUserVipInfo', userId)
    },
    goarticles () {
      this.$router.push('/user/articles/historicalArticles')
    },
    goCollection () {
      this.$router.push('/user/collection/myCollection')
    },
    goallDynamics () {
      this.$router.push('/dynamics/allDynamics')
    },
    goallDynamics () {
      this.$router.push('/dynamics/allDynamics')
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="less">

.me-page {
  height: 100%;
  background: #ffffff;
  .business-status-title {
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    padding: 20px 16px 18px;
  }
  .top-null {
    height: 10px;
    background: rgba(247, 249, 250, 1);
  }
  .top-null-css{
     height: 30px;
    background: rgba(247, 249, 250, 1);
  }
  .business-status-con{
    height: 218px;

  }
  .business-status-tow{
    height: 140px;
  }
   .modify-child {
    .head-img {
      float: left;
      margin-left: 16px;
      margin-bottom: 16px;
      height: 60px;
      width: 60px;
      position: relative;
          margin-right: 16px;
          text-align: center;
      img {
        height: 24px;
        width: 24px;
      }
        > .grou1Icon-p {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
      }
   
    }
   
  }
  
  // > .business-info,
  // > .business-help {
  //   background: #fff;
  //   margin-top: 10px;
  //   > .business-info-cell {
  //     height: 56px;
  //     line-height: 56px;
  //     padding: 0 20px;
  //     font-size: 16px;
  //     color: #333333;
  //     font-weight: 400;
  //     > .van-icon {
  //       font-size: 16px;
  //       position: absolute;
  //       right: 5px;
  //       top: 50%;
  //       transform: translateY(-50%);
  //     }
  //     > .msg-dot {
  //       position: absolute;
  //       background: #ea4d2e;
  //       width: 8px;
  //       height: 8px;
  //       right: 30px;
  //       border-radius: 100%;
  //       top: 50%;
  //       transform: translateY(-50%);
  //     }
  //   }
  // }
}
</style>
