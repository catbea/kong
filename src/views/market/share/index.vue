<template>
  <div class="market-share-page" id="market-share-page">
    <div class="box" v-show="status === 1">
      <div class="share-top" id="share-top">
        <img class="avatar-img" :src="buildingInfo.postersUrl" alt="">
        <img class="cover-img" :src="coverBg">
        <div class="logo-body">
          <div class="logo-img">
            <img :src="buildingInfo.qrCode">
          </div>
          <span class="distinguish-span">长按识别更多</span>
        </div>
        <span class="poster-describe">{{buildingInfo.posterDescribe}}</span>
        <span class="building-name">{{buildingInfo.linkerName}}</span>
        <span class="building-price" v-if="buildingInfo.linkerPrice=='0'">价格：价格待定</span>
        <span
          class="building-price"
          v-else
        >价格：{{buildingInfo.linkerPrice}}{{buildingInfo.priceUnit}}</span>
        <!-- <img class="avatar-view" :src="buildingInfo.avatarMediaid"> -->
        <div
          class="avatar-view"
          :style="{backgroundImage:'url(' + buildingInfo.avatarMediaid + ')'}"
        ></div>
        <span class="username-view">{{buildingInfo.agentName}}</span>
        <span class="mobile-view">{{buildingInfo.agentMobile}}</span>
        <span class="canpamy-view">授权开发商：{{buildingInfo.developer}}</span>
      </div>
      <!-- <div class="swipe-box">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in list" :key="index" :class="{trans:photoIndex==index}">
           <div class="share-top-swipe" :class="{trans:photoIndex==index}">{{item}}</div> 
          </swiper-slide>
        </swiper>
      </div>-->
      <div class="share-bottom">
        <!-- <p>长按保存图片 可分享好友或朋友圈</p> -->
        <ul>
          <router-link
            tag="li"
            :to="{path:'/marketDetail/share/compile',query:{linkerId:this.buildingInfo.linkerId}}"
            class="compile"
          >编辑海报</router-link>
          <li class="save" @click="savaReport" :style="{'pointer-events':this.pointerEvents}">保存海报</li>
        </ul>
        <!-- <router-view></router-view> -->
      </div>
    </div>
    <van-loading type="spinner" class="van-loading" v-if="showLoading==true"/>
    <div class="result" id="card-result" v-show="status === 2">
      <canvas id="imgcard" class="imgcard"></canvas>
      <div class="notice-text">长按保存图片可分享好友或朋友圈</div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Avatar from 'COMP/Avatar'
import { mapGetters } from 'vuex'
import h2c from 'html2canvas'
import marketService from 'SERVICE/marketService'
export default {
  components: {
    Avatar,
    swiper,
    swiperSlide
  },
  data() {
    const _this = this
    return {
      list: [1, 2, 3, 4],
      photoIndex: null,
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        on: {
          slideChangeTransitionEnd: function() {
            _this.photoIndex = this.activeIndex //切换结束时，告诉我现在是第几个slide
          }
        }
      },
      id: -1,
      avatvrImg: 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=e31d7a55dba20cf4529df68d17602053/91ef76c6a7efce1b27893518a451f3deb58f6546.jpg',
      coverBg: require('IMG/dev/page1/cover2@2x.png'),
      logoImg: require('IMG/dev/page1/logo@2x.png'),
      buildingInfo: {},
      status: 1,
      showLoading: false,
      pointerEvents: '',
      lastOpTimer: 0
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getPosterInfo(this.id)
    this.photoIndex = 0
  },
  methods: {
    onChange(index) {
      //轮播图
    },
    async getPosterInfo(buildId) {
      const result = await marketService.shareBuildingCard(buildId)
      if (result) {
        this.buildingInfo = result
      }
    },
    savaReport() {
      let dd = new Date().getTime()
      if (dd - this.lastOpTimer < 3000) return
      this.lastOpTimer = dd
      this.handleDate()
    },

    handleDate() {
      this.showLoading = true
      this.pointerEvents = 'none'
      this.status = 2

      var cntElem = document.querySelector('#share-top')
      var shareContent = cntElem //需要截图的包裹的（原生的）DOM 对象
      var width = shareContent.offsetWidth //获取dom 宽度
      var height = shareContent.offsetHeight //获取dom 高度
      var canvas = document.getElementById('imgcard') //创建一个canvas节点
      var ctx = canvas.getContext('2d')
      var scale = 2 //定义任意放大倍数 支持小数
      canvas.width = width * scale //定义canvas 宽度 * 缩放
      canvas.height = height * scale //定义canvas高度 *缩放
      ctx.scale(scale, scale) //获取context,设置scale
      var opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, //自定义 canvas
        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        useCORS: true // 【重要】开启跨域配置
      }

      h2c(shareContent, opts).then(function(canvas) {
        var context = canvas.getContext('2d')
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
        context.imageSmoothingEnabled = false

        // 【重要】默认转化的格式为png,也可设置为其他格式
        var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height)

        document.body.appendChild(img)

        $(img)
          .css({
            width: canvas.width / 2 + 'px',
            height: canvas.height / 2 + 'px',
          })
          .addClass('f-full')
      })

      this.showLoading = false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="less">
.market-share-page {
  width: 100%;
  height: 100%;
  position: relative;
  background: #ffffff;

  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide {
    width: 192px;
    height: 308px;
    border-radius: 5px;
  }

  .box {
    width: 100%;
    position: absolute;
  }

  .van-loading {
    display: inline-block;
    position: absolute;
    margin-left: 39%;
    width: 84px;
    height: 84px;
    margin-top: 50%;
    z-index: 10000;
  }

  .result {
    border-radius: 10px;
    border-color: transparent;
    background: transparent;

    > .imgcard {
      border: none;
      border-color: transparent;
      background: transparent;
      margin-left: 10%;
      margin-top: 10%;
    }

    > .notice-text {
      color: #999999;
      font-size: 13px;
      text-align: center;
      margin-top: 20px;
    }
  }

  .swipe-box {
    .share-top-swipe {
      width: 192px;
      height: 308px;
      border-radius: 10px;
    }
    .trans {
      width: 240px;
      height: 387px;
      background: black;
    }
  }

  .share-top {
    position: relative;
    width: 297px;
    height: 483px;
    border-radius: 10px;
    left: 10%;
    right: 10%;
    margin-top: 10px;
    padding-right: 2px;
    > .avatar-img {
      position: absolute;
      width: 296px;
      height: 330px;
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
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      bottom: -2px;
    }

    > .logo-body {
      position: absolute;
      width: 73px;
      top: 236px;
      right: 20px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;

      > .logo-img {
        width: 73px;
        height: 73px;

        img {
          width: 68px;
          height: 68px;
          border-radius: 50%;
        }
      }

      > .distinguish-span {
        color: rgba(255, 255, 255, 0.25);
        font-size: 9px;
        margin-top: 8px;
      }
    }

    > .poster-describe {
      position: absolute;
      color: #e5b37b;
      font-size: 29px;
      z-index: 2;
      left: 20px;
      top: 280px;
    }

    > .building-name {
      position: absolute;
      color: #e5b37b;
      font-size: 20px;
      z-index: 2;
      left: 20px;
      top: 320px;
    }

    > .building-price {
      position: absolute;
      color: #e5b37b;
      font-size: 11px;
      z-index: 2;
      left: 20px;
      top: 353px;
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
      bottom: 43px;
      border-radius: 50%;
      object-fit: cover;
      background-size: cover;
    }

    > .username-view {
      position: absolute;
      z-index: 2;
      color: #a4b8d5;
      font-size: 12px;
      left: 65px;
      bottom: 63px;
    }

    > .mobile-view {
      position: absolute;
      z-index: 2;
      color: #a4b8d5;
      font-size: 11px;
      left: 65px;
      bottom: 45px;
    }

    > .canpamy-view {
      position: absolute;
      z-index: 2;
      color: rgba(255, 255, 255, 0.25);
      font-size: 10px;
      left: 20px;
      bottom: 17px;
    }
  }
  .share-bottom {
    margin-bottom: 20px;
    margin-top: -6px;
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
        margin-right: 3px;
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
        margin-left: 3px;
      }
    }
  }
}
</style>
