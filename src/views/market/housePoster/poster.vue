<template>
  <div class="share-poster-box">
    <div class="share-poster" v-show="!showView">
        <div class="pic">
          <img :src="imgUrl" alt="">
        </div>
        <div class="agent-info">
          <div class="info">
            <div class="img">
              <img :src="agent.avatarUrl" alt="">
            </div>
            <div class="text">
              <p class="name">{{agent.agentName}}</p>
              <p class="tel">{{agent.mobile}}</p>
            </div>
          </div>
          <div class="qrcode">
            <img :src="qrcode" alt="">
          </div>
        </div>
      </div>
      <div class="share-poster-img" v-show="showView">
        <div class="img-box">
          <img src="" alt="" id="share-poster-img">
        </div>
        <div class="tips">
          长按图片保存，分享给好友或朋友圈
        </div>
      </div>
      <!-- 加载中 -->
      <div class="loading"  v-show="showLoading" >
       <van-loading type="spinner" color="white" class="van-loading"/>
    </div>
  </div>
  
</template>

<script>
import userService from 'SERVICE/userService'
import marketService from '@/services/marketService'
import h2c from 'html2canvas'
export default {
  data () {
    return {
      marketId: '',
      imgUrl: '',
      agent: '',
      showView: false,
      showLoading: false,
      qrcode: ''
    }
  },
  created () {
    this.imgUrl = this.$route.query.url
    this.marketId = this.$route.query.marketId
    this.getPosterInfo()
  },
  methods: {
    // 获取海报基本信息
    async getPosterInfo() {
      const result = await marketService.shareBuildingCard(this.marketId)
      if (result) {
        this.qrcode = result.qrCode
        this.getQrCodeByToken()
      }
    },
    getQrCodeByToken () {
      userService.getQrCodeByToken().then(res => {
        this.agent = res
        this.html2Img()
      }).catch()
    },
    html2Img () {
      this.showLoading = true
      let img = document.getElementById('share-poster-img')
      let html = document.querySelector('.share-poster')
      let _this = this
      h2c(html, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: '340px',
        heigt: '472px'
      }).then(canvas => {
        let dataURL = canvas.toDataURL()
        img.src = dataURL
        _this.showView = true
        _this.showLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.share-poster{
  width: 340px;
  margin: 20px auto;
  .pic{
    width: 340px;
    height: 400px;
    overflow: hidden;
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .agent-info{
    height:72px;
    background:rgba(242,248,255,1);
    display: flex;
    font-size: 12px;
    .info{
      flex: 1;
      display: flex;
      margin: 16px;
      .img{
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 8px;
        }
      }
      .text{
        .name{
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-top: 2px;
        }
        .tel{
          font-size:12px;
          font-weight:400;
          color:rgba(150,158,168,1);
          margin-top: 4px;
        }
      }
    }
    .qrcode{
      margin: 6px 16px;
      img{
        width: 60px;
        height: 60px;
        border-radius: 30px;
      }
    }
  }
}
.share-poster-img{
  .img-box {
    width: 340px;
    margin: 20px auto;
  }
  .tips{
    font-size:12px;
    font-weight:400;
    color:rgba(150,158,168,1);
    text-align: center;
    margin: 24px auto;
  }
}
// loading
.loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  .van-loading {
    display: inline-block;
    position: fixed;
    left: 50%;
    top: 50%;
    width: 50px;
    height: 50px;
    z-index: 5;
    margin-left: -25px;
    margin-top: -25px;
  }
}
</style>
