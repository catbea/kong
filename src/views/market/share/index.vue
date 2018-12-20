<template>
  <div class="market-share-page">
    <div class="box" v-show="status === 1">
      <div class="share-top" id="share-top">
        <!--  -->
        <img class="avatar-img" :src="buildingInfo.postersUrl" alt>
        <img class="cover-img" :src="coverBg">
        <img class="logo-img" :src="buildingInfo.qrCode">
        <span class="distinguish-span">长按识别更多</span>
        <span class="building-name">{{buildingInfo.linkerName}}</span>
        <span class="building-price">价格：{{buildingInfo.linkerPrice}}{{buildingInfo.priceUnit}}</span>
        <img class="avatar-view" :src="buildingInfo.avatarMediaid">
        <span class="username-view">{{buildingInfo.agentName}}</span>
        <span class="mobile-view">{{buildingInfo.agentMobile}}</span>
        <span class="canpamy-view">授权开发商：{{buildingInfo.developer}}</span>
      </div>
      <div class="share-bottom">
        <!-- <p>长按保存图片 可分享好友或朋友圈</p> -->
        <ul>
          <router-link
            tag="li"
            :to="{path:'/marketDetail/share/compile',query:{linkerId:this.buildingInfo.linkerId}}"
            class="compile"
          >编辑海报</router-link>
          <li class="save" @click="savaReport">保存海报</li>
        </ul>
        <!-- <router-view></router-view> -->
      </div>
    </div>
    <div class="result" id="card-result" v-show="status === 2">
      <!-- <van-loading class="loadding-view" type="spinner" color="white" style="{display:loading}"/> -->
    </div>
  </div>
</template>
<script>
import Avatar from 'COMP/Avatar'
import { mapGetters } from 'vuex'
import h2c from 'html2canvas'
import marketService from 'SERVICE/marketService'
export default {
  components: {
    Avatar
  },
  data: () => ({
    id: -1,
    avatvrImg: 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=e31d7a55dba20cf4529df68d17602053/91ef76c6a7efce1b27893518a451f3deb58f6546.jpg',
    coverBg: require('IMG/dev/page1/cover2@2x.png'),
    logoImg: require('IMG/dev/page1/logo@2x.png'),
    buildingInfo: {},
    status: 1
  }),
  created() {
    this.id = this.$route.params.id
    this.getPosterInfo(this.id)
  },
  methods: {
    async getPosterInfo(buildId) {
      const result = await marketService.shareBuildingCard(buildId)
      if (result) {
        this.buildingInfo = result
      }
    },
    async savaReport() {
      this.status = 2
      const dpr = window.devicePixelRatio
      const canvas = await h2c(document.querySelector('#share-top'), {
        logging: false,
        useCORS: true
      })
      canvas.style.width = '101%'
      canvas.style.height = '100%'
      document.getElementById('card-result').appendChild(canvas)
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="less">
.market-share-page {
  position: relative;
  width: 100%;
  background: #ffffff;
  .box {
    margin-bottom: 5px;
  }
  .share-top {
    position: relative;
    width: 300px;
    height: 480px;
    border-radius: 10px;
    left: 10%;
    right: 10%;
    margin-top: 30px;
    background: rgba(255, 255, 255, 1);
    > .avatar-img {
      position: absolute;
      width: 300px;
      height: 300px;
      border-radius: 10px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center top;
    }
    > .cover-img {
      position: absolute;
      width: 300px;
      height: 268px;
      z-index: 1;
      border-radius: 10px;
      bottom: 0;
    }

    > .logo-img {
      position: absolute;
      width: 73px;
      height: 73px;
      border-radius: 50%;
      top: 236px;
      right: 20px;
      z-index: 2;
    }

    > .distinguish-span {
      position: absolute;
      color: #ffffff;
      font-size: 9px;
      right: 20px;
      top: 317px;
      z-index: 2;
    }

    > .building-name {
      position: absolute;
      color: #e5b37b;
      font-size: 20px;
      z-index: 2;
      left: 20px;
      top: 300px;
    }

    > .building-price {
      position: absolute;
      color: #e5b37b;
      font-size: 11px;
      z-index: 2;
      left: 20px;
      top: 340px;
    }

    > .line-view {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 1px;
      border-bottom: 1px dashed #e5b37b;
      bottom: 105px;
    }

    > .avatar-view {
      position: absolute;
      z-index: 2;
      width: 36px;
      height: 36px;
      left: 20px;
      bottom: 50px;
      border-radius: 50%;
    }

    > .username-view {
      position: absolute;
      z-index: 2;
      color: #a4b8d5;
      font-size: 12px;
      left: 65px;
      bottom: 70px;
    }

    > .mobile-view {
      position: absolute;
      z-index: 2;
      color: #a4b8d5;
      font-size: 11px;
      left: 65px;
      bottom: 50px;
    }

    > .canpamy-view {
      position: absolute;
      z-index: 2;
      color: #a4b8d5;
      font-size: 10px;
      left: 20px;
      bottom: 10px;
    }
  }
  .share-bottom {
    margin-top: 12px;
    p {
      text-align: center;
      font-size: 13px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: normal;
    }
    ul {
      display: flex;
      justify-content: space-between;
      margin-top: 17px;
      .compile {
        width: 144px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid;
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 122, 230, 1);
        background: #ffffff;
        margin-left: 38px;
      }
      .save {
        width: 144px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: rgba(0, 122, 230, 1);
        border-radius: 4px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-right: 38px;
      }
    }
  }
}
</style>
