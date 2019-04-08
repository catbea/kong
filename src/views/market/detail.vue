<template>
<div>
  <div class="market-detail-page" v-if="info">
    <!-- 新手引导 -->
    <hint-tire></hint-tire>
    <!-- 顶部swipe -->
    <div class="top-swipe-container">
      <div class="swipe-outer">
        <div class="swipe-content">
          <div class="btn-box">
            <div class="swipe-photo" :class="{'photo': !showVideo}" @click.stop="photoHandle">相册</div>
            <div
              class="swipe-photo"
              :class="{'photo': showVideo}"
              @click.stop="videoHandle"
              v-if="info.fyVideo"
            >视频</div>
          </div>
          <van-swipe @change="swipeChange">
            <van-swipe-item v-for="(item,index) in info.bannerList" :key="index">
              <div
                class="bg_img swipe-item dev"
                :style="{backgroundImage:'url(' + item.imgUrl + ')'}"
              ></div>
            </van-swipe-item>
            <div
              class="custom-indicator dev"
              slot="indicator"
              v-show="photoButton"
            >{{ swipeCurrent + 1 }}/{{info.bannerList.length}}</div>
          </van-swipe>
        </div>
        <div class="operate-content">
          <!-- 收藏/分享 -->
          <div class="operate-1">
            <div class="operate-collect" @click.stop="collectHandler">
              <i v-if="status==0" class="bg_img" :style="{backgroundImage:'url('+collectImg+')'}"></i>
              <i v-else class="bg_img" :style="{backgroundImage:'url('+collectColorImg+')'}"></i>
              收藏
            </div>
            <div class="operate-share" @click.stop="shareHandler" v-if="info.saleStatus!=='售罄'">
              <i class="bg_img" :style="{backgroundImage:'url('+shareImg+')'}"></i>
              分享
            </div>
          </div>
          <!-- 存在全景时全景播放 -->
        </div>
        <div
          class="bg_img operate-2"
          v-if="info.ifPanorama===1"
          :style="{backgroundImage:'url(' + playIcon + ')'}"
          @click.stop="ifPanoramaClickHandler"
        ></div>
      </div>
      <!-- 视频  http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400  x5-playsinline="true" -->
      <div class="video-box" v-show="showVideo">
        <video
          width="100%"
          height="100%"
          ref="videoplay"
          preload="true"
          controls="showControls"
          style="object-fit:fill"
          :poster="info.headImgUrl"
          webkit-playsinline="true"
          playsinline="true"
          x-webkit-airplay="allow"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
        >
          <source :src="info.fyVideo" type="video/mp4">
        </video>
        <div class="close-video" @click="videoHide">退出视频</div>
      </div>
    </div>
    <!-- 楼盘基础信息 -->
    <div class="base-info-container">
      <div class="info-top-bar">
        <tag-group :arr="tagGroupArr&&tagGroupArr.slice(0,3)"/>
        <div class="browser-info">
          <span>{{info.browsCount}}</span>人浏览过
          <div class="head-portrait-box">
            <transition name="show">
              <avatar
                :avatar="item.clientImg"
                v-for="(item,index) in info.customerList"
                :key="index"
                v-if="index===headCurrent"
              />
            </transition>
          </div>
        </div>
      </div>
      <div class="info-content">
        <h5 class="house-name">{{info.linkerName}}</h5>
        <p
          class="house-feature"
        >{{ info.projectTagList === '' ? null : info.projectTagList.join(" | ")}}</p>
        <div class="specific-market-detail-commission" v-if="info&&info.divisionRules">
          <span class="bg_img" :style="{backgroundImage:'url('+commissionImg+')'}"></span>
          <span class="commission-text">{{info&&info.divisionRules}}</span>
          <div
            class="bg_img commission-detail"
            @click="commission"
            :style="{backgroundImage:'url('+siteDetailImg+')'}"
          ></div>
        </div>
        <div class="house-info-form">
          <p>
            <span>平均价格:</span>
            {{info.averagePrice}}
            <span
              class="calculation-view"
              @click="goCalculation(info.linkerName)"
            >
              <img :src="calculationIcon">
              <span>房贷计算器</span>
            </span>
          </p>
          <p>
            <span>开盘时间:</span>
            {{info.openTime}}
          </p>
          <p>
            <span>楼盘地址:</span>
            {{info.detailAddress}}
          </p>
          <p>
            <span>开发商:</span>
            {{info.developer}}
          </p>
        </div>
        <div class="more-info" @click="moreInfoHandler">更多信息</div>
      </div>
    </div>
    <!-- 楼盘分享关系图谱 -->
    <div class="marker-relation-box">
      <p>楼盘分享关系图谱</p>
      <ol
        class="bg_img relation-drawing"
        :style="{backgroundImage:'url('+drawingImg+')'}"
        @click="relationShowFn"
      >
        <li class="bg_img" :style="{backgroundImage:'url('+info.headImgUrl+')'}"></li>
        <li>{{info.linkerName}}</li>
      </ol>
    </div>
    <van-popup v-model="relationShow" class="relationPopup">
      <div class="relationName">
        <p
          class="bg_img"
          :style="{backgroundImage:'url('+closeImg+')'}"
          @click="relationShow=false"
        ></p>
        <ul>
          <li>请联系经纪人</li>
          <li>了解更多楼盘分享关系详情，请联系经纪人</li>
          <!-- <li>{{info&&info.contatctTel}}</li> -->
        </ul>
        <p class="van-hairline--top immediately" @click="relationHandle">知道了</p>
      </div>
    </van-popup>
    <!-- 户型 -->
    <div class="house-type" v-if="info.houseTypeList&&info.houseTypeList.length>0">
      <title-bar :conf="typeTitleConf"/>
      <div class="type-swipe-content">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in info.houseTypeList" :key="index">
            <div class="house-type">
              <div
                class="bg_img house-type-img"
                :style="{backgroundImage:'url('+item.imgUrl+')'}"
                @click.stop="houseTypeHandle(item.imgUrl)"
              ></div>
              <div class="house-type-info">
                <p class="house-type-name">{{item.householdDesc}}</p>
                <p
                  class="house-type-area"
                  v-if="item.orientations=='暂无信息'"
                >{{`建面${item.area} 暂无朝向信息`}}</p>
                <p class="house-type-area" v-else>{{`建面${item.area}${item.orientations}朝向`}}</p>
                <p class="house-type-price" v-if="item.price=='价格待定'">{{item.price}}</p>
                <p class="house-type-price" v-else>
                  <span v-if="item.price.indexOf('起')=== -1">约</span>
                  {{item.price}}
                </p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 动态 -->
    <div class="house-news" v-if="info.houseDynamicList&&info.houseDynamicList.length>0">
      <title-bar :conf="newsTitleConf"/>
      <div class="news-container">
        <p class="news-title">{{info.houseDynamicList[0].title}}</p>
        <p class="news-content">{{info.houseDynamicList[0].content | textOver(48)}}</p>
        <p class="news-time">{{info.houseDynamicList[0].dynamicTime}}</p>
      </div>
    </div>
    <!-- 位置周边 -->
    <div class="house-circum" v-if="info.houseAroundType&&info.houseAroundType.length>0">
      <title-bar :conf="aroundTitleConf"/>
      <div class="tab-box">
        <van-tabs v-model="mapTab" color="#007ae6" title-active-color="#007ae6" :line-height="0" swipeable>
          <van-tab
            v-for="item in info.houseAroundType"
            :key="item.name"
            :title="item.name"
            :line-width="0"
          />
        </van-tabs>
      </div>
      <div class="map-box" @click="mapClickHandler">
        <t-map :latLng="{lat:info.latitude,lng:info.longitude}" :data="mapData" :conf="mapConf"></t-map>
      </div>
    </div>
    <!-- 楼盘评测 -->
    <div class="evaluating-box" v-if="this.evaluatingInfo">
      <title-bar :conf="evaluatingTitleConf"/>
      <div class="evaluating-content" @click="enterEvaluation">
        <div class="pic-box">
          <img
            class="bg_img evaluating-img"
            :src="evaluatingInfo&&evaluatingInfo.cover"
            alt=""
            srcset=""
          >
        </div>
        
        <div class="right-body">
          <div class="aa">{{evaluatingInfo&&evaluatingInfo.title}}</div>
          <div class="bb">{{evaluatingInfo&&evaluatingInfo.content}}</div>
        </div>
      </div>
    </div>
    <!-- 楼盘评价 -->
    <div class="evaluate-box">
      <title-bar :conf="evaluateTitleConf"/>
      <div class="evaluate-content" v-if="commnetList.length">
        <div v-if="commentCount">
          <!-- <p class="evaluate-label">实看用户 (8)</p><p class="evaluate-label">实看用户 (8)</p><p class="evaluate-label">实看用户 (8)</p> -->
          <router-link
            class="evaluate-label"
            tag="p"
            :to="`/market/comment/list/${this.info.linkerId}?type=0`"
            v-if="commentCount.all"
          >全部 ({{commentCount.all}})</router-link>
          <router-link
            class="evaluate-label"
            tag="p"
            :to="`/market/comment/list/${this.info.linkerId}?type=3`"
            v-if="commentCount.withPicture"
          >有图 ({{commentCount.withPicture}})</router-link>
          <router-link
            class="evaluate-label"
            tag="p"
            :to="`/market/comment/list/${this.info.linkerId}?type=1`"
            v-if="commentCount.authUserNum"
          >实看 ({{commentCount.authUserNum}})</router-link>
          <router-link
            class="evaluate-label"
            tag="p"
            :to="`/market/comment/list/${this.info.linkerId}?type=2`"
            v-if="commentCount.goodReputation"
          >好评 ({{commentCount.goodReputation}})</router-link>
        </div>
        <ul class="evaluate-detail" @click="goComment">
          <li class="van-hairline--bottom" v-for="(item,index) in commnetList">
            <div class="top">
              <img :src="item.avatarUrl" alt="" srcset="">
              <div class="message">
                <p>
                  {{item.nickName | privacyName() }}
                  <span
                    v-if="item.userTag===1"
                  >{{item.userTag | formatTag}}</span>
                </p>
                <p>
                  <van-rate
                    v-model="item.starLevel"
                    :size="10"
                    :count="5"
                    :readonly="true"
                    color="#ED8147"
                  />
                </p>
              </div>
            </div>
            <div class="bottom">
              {{item.content}}
              <span v-if="item.imgList.length">
                <img src="../../assets/img/market/comment/pic.png" alt="">
              </span>
            </div>
          </li>
        </ul>
        <span class="hint">在这里，说出楼盘的一切</span>
        <router-link
          class="go-evaluate"
          tag="span"
          :to="`/market/comment/write/${this.info.linkerId}`"
        >我要评论</router-link>
      </div>
      <div class="evaluate-content-nodata" v-else>
        <p>该楼盘没有评论哦，快来抢先一步评论吧</p>
        <button @click="goCommentWrite">我要评论</button>
      </div>
    </div>
    <!-- 买房问问 -->
    <div class="buy-ask">
      <title-bar :conf="buyAskTitleConf"/>
      <div v-if="linkerInfo">
        <ol class="ask-content">
          <li>
            <div>
              <span>问</span>
              <span>{{this.linkerInfo&&this.linkerInfo.content}}</span>
              <!-- {{this.linkerInfo&&this.linkerInfo.content}} -->
            </div>
            <p>{{this.linkerInfo&&this.linkerInfo.replyNum}}人回复</p>
          </li>
          <li class="van-hairline--bottom" v-if="this.linkerInfo&&this.linkerInfo.replyVO!=''">
            <div>
              <span>答</span>
              <img class="header-img" :src="this.linkerInfo.replyVO.avatarUrl " alt="" srcset="">
              <i>{{this.linkerInfo.replyVO.nickName | privacyName()}}</i>&nbsp;&nbsp;
              <i>{{this.linkerInfo.replyVO.createTimeStamp | dateTimeFormatter(5)}}</i>
            </div>
            <p>{{this.linkerInfo.replyVO.content}}</p>
          </li>
        </ol>
        <span class="hint">在这里，说出楼盘的一切</span>
        <span class="go-evaluate" @click="commitQuestion">我要提问</span>
      </div>
      <div class="evaluate-content-nodata" v-else>
        <p>该楼盘没有问答哦，快来抢先一步提问吧</p>
        <button @click="commitQuestion">我要提问</button>
      </div>
    </div>
    <!-- 其他楼盘 -->
    <div class="house-recommend" v-if="info.linkerOtherList.length>0">
      <title-bar :conf="othersTitleConf"/>
      <div class="recommend-swipe-content">
        <swiper :options="swiperOption">
          <swiper-slide
            v-for="(item,index) in info.linkerOtherList"
            :key="index"
            @click.native="itemClickHandler(item.linkerId)"
          >
            <div class="recommend-house-item">
              <div
                class="bg_img recommend-house-img"
                :style="{backgroundImage:'url('+item.headImgUrl+')'}"
              >
                <p
                  class="bg_img panorama-icon"
                  v-if="item.ifPanorama==1"
                  :style="{backgroundImage:'url('+panoramaIcon+')'}"
                ></p>
              </div>
              <div class="recommend-house-info">
                <p class="house-name">{{item.linkerName}}</p>
                <p class="house-location">{{item.district}}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="m-statement">
      <span>免责声明：楼盘信息来源于政府公示网站、开发商、第三方公众平台，最终以政府部门登记备案为准，请谨慎核查。如楼盘信息有误或其他异议，请点击</span>
      <router-link :to="'/marketDetail/correction/'+id" class="feedback">反馈纠错</router-link>
    </div>
    <!-- 开通提示及开通状态 -->
    <div class="van-hairline--top house-status">
      <div class="unopen-status-box" v-if="openStatus&&info.saleStatus!=='售罄'">
        <!-- <div class="open-btn" @click="openHandler">开通({{info.subscribePrice}}元/天起)</div> -->
        <div class="open-btn" @click="openHandler">开通楼盘</div>
      </div>
      <market-renew
        v-if="!openStatus&&info.saleStatus!=='售罄'"
        :renewInfo="info"
        :vipInfo="vipInfo"
      />
      <div class="saleStatusFlag" v-if="info.saleStatus==='售罄'">
        <p>售罄</p>
      </div>
    </div>
    <!-- poster !posterRemind&&info&&info.posterImgUrl != ''-->
    <div class="poster-container" v-show="posterShow">
      <div class="cnt">
        <div class="bg_img poster-img">
          <img :src="info.activityImgUrl" alt="" srcset="">
          <div class="bg_img close-icon" @click="posterShow=false">
            <img :src="closeIcon" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- loading -->
  <div class="loading"  v-show="showLoading">
    <van-loading type="spinner" color="white" class="van-loading"/>
  </div>
</div>
  
</template>
<script>
import 'swiper/dist/css/swiper.css'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import HintTire from 'COMP/Market/MarketDetail/HintTire/'
import MarketRenew from 'COMP/Market/MarketDetail/MarketRenew'
import TagGroup from 'COMP/TagGroup'
import Avatar from 'COMP/Avatar'
import TitleBar from 'COMP/TitleBar'
import TMap from 'COMP/TMap'
import marketService from 'SERVICE/marketService'
import isEmpty from 'lodash/isEmpty'
import qs from 'qs'
import { ImagePreview } from 'vant'
export default {
  components: {
    HintTire,
    TagGroup,
    Avatar,
    swiper,
    swiperSlide,
    TitleBar,
    TMap,
    MarketRenew
  },
  data() {
    return {
      vipInfo: {},
      instance: 0,
      status: null, // 0-未收藏 1-已收藏
      photoButton: false, //是否存在相册
      commissionImg: require('IMG/user/collection/icon_commission@2x.png'),
      siteDetailImg: require('IMG/marketDetail/hun@2x.png'),
      collectImg: require('IMG/marketDetail/collect@2x.png'),
      collectColorImg: require('IMG/marketDetail/collectColor@2x.png'),
      shareImg: require('IMG/marketDetail/share@2x.png'),
      panoramaIcon: require('IMG/marketDetail/Oval@2x.png'),
      drawingImg: require('IMG/marketDetail/drawing@2x.png'),
      closeImg: require('IMG/marketDetail/close@2x.png'),
      closeIcon: require('IMG/market/closeIcon@2x.png'),
      levelColorImg: require('IMG/marketDetail/levelColor@2x.png'),
      levelImg: require('IMG/marketDetail/level@2x.png'),
      calculationIcon: require('IMG/market/calculation_icon.png'),
      id: -1,
      linkerName: '',
      info: null,
      swipeCurrent: 0,
      headCurrent: 0,
      tagGroupArr: [],
      mapTab: 0,
      openStatus: false,
      relationShow: false, //立即联系
      appointmentShow: false, //预约看房
      nameContent: '', //预约姓名
      phoneContent: '', //预约手机号码
      codeContent: '', //预约验证码
      typeTitleConf: {
        title: '户型',
        linkText: '全部户型'
        // link: `/marketDetail/FamilyList/${this.id}`
      },
      newsTitleConf: {
        title: '楼盘动态',
        linkText: '全部动态',
        link: '/'
      },
      aroundTitleConf: {
        title: '位置周边'
      },
      othersTitleConf: {
        title: '其他楼盘',
        linkText: '全部楼盘',
        link: '/market'
      },
      evaluatingTitleConf: {
        title: '楼盘评测',
        linkText: '立即查看'
        // link: '/marketDetail/marketEvaluating'
      },
      evaluateTitleConf: {
        title: '楼盘评论',
        linkText: '查看全部'
        // link: `/market/comment/list/${this.id}?type=0`
      },
      buyAskTitleConf: {
        title: '买房问问',
        linkText: '查看全部'
        // link: '/marketDetail/asking/:id'
      },
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 12
      },
      mapConf: {
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: false
      },
      rd: {
        headSlideTimer: null
      },
      posterShow: false,
      posterClosed: false,
      playIcon: require('IMG/market/view720.png'),
      showVideo: false,
      showControls: true,
      appointmentImg: require('IMG/market/appointment@2x.png'),
      commentCount: null,
      commnetList: [],
      linkerInfo: null,
      evaluatingInfo: null,
      showLoading: false
    }
  },
  async created() {
    this.id = this.$route.params.id
    this.getDetailInfo(this.id)
    this.getMarketDetailPhotoInfo()
    this.typeTitleConf.link = `/marketDetail/FamilyList/${this.id}`
    this.newsTitleConf.link = `/marketDetail/marketAllDynamic/${this.id}`
    // this.buyAskTitleConf.link = `/marketDetail/asking/${this.id}`
    this.getVipInfo()
    this.getCommentCount()
    this.getCommentList()
    // this.getQuestionDetail('488cbcde9fd5463bbe2ed1724a93f77c')
    // this.getEvaluatingInfo('1d98425ff63940fdba3939beb5dc7d98')

    // this.getQuestionDetail('')
    // this.getEvaluatingInfo('')

    
    this.getQuestionDetail(this.id)
    this.getEvaluatingInfo(this.id)

  },
  beforeRouteLeave(to, from, next) {
    if (this.instance) {
      this.instance.close()
    }
    next()
  },
  watch: {
    $route(to, from) {
      this.id = this.$route.params.id
      this.getDetailInfo(this.id)
      this.getMarketDetailPhotoInfo()
      this.typeTitleConf.link = `/marketDetail/FamilyList/${this.id}`
      this.newsTitleConf.link = `/marketDetail/marketAllDynamic/${this.id}`
      this.buyAskTitleConf.link = `/marketDetail/asking/${this.id}`
      this.getCommentCount()
      this.getCommentList()
    }
  },
  methods: {
    commitQuestion() {
      this.$router.push({ name: 'market-asking-ask', params: { id: this.id }, query: { linkerName: this.linkerName } })
    },

    async getEvaluatingInfo(linkerId) {
      let result = await marketService.getEvaluatingInfo(linkerId)
      this.evaluatingInfo = result

      this.evaluatingTitleConf.link = {
        name: 'market-marketEvaluating',
        query: { reviewId: this.evaluatingInfo.reviewId, userInfo: this.userInfo.agentId, userType: '2', enterpriseId: this.userInfo.enterpriseId }
      }
    },

    // 楼盘评论分类统计
    async getCommentCount() {
      let result = await marketService.getCommentCount({ linkerId: this.id })
      if (result) {
        this.commentCount = result
      }
    },
    // 获取评论列表
    async getCommentList() {
      let result = await marketService.getCommentList({
        current: 1,
        size: 2,
        linkerId: this.id,
        type: 0
      })
      if (result) {
        let commnetList = result.records
        if (commnetList && commnetList.length) {
          this.commnetList = commnetList
          this.evaluateTitleConf.title = `楼盘评论（${result.total}）`
        } else {
          this.evaluateTitleConf.title = '楼盘评论（0）'
        }
      }
      this.evaluateTitleConf.link = `/market/comment/list/${this.id}?type=0`
    },
    // this.buyAskTitleConf.link = `/marketDetail/asking/${this.id}`
    async getQuestionDetail(linkerId) {
      //获取买房问问的详情
      const result = await marketService.getBuildQuestionDetail(linkerId)

      if (result.linkerQuestionVO) {
        this.linkerInfo = result.linkerQuestionVO
        if (this.linkerInfo.replyNum == 0 || this.linkerInfo.replyNum == '') {
          this.linkerInfo.replyNum = 0
        }
      }

      this.questionNum = result.questionNum
      this.replyNum = result.replyNum

      this.buyAskTitleConf.title = `买房问问（${result.questionNum}）`
    },

    goCalculation(e) {
      //进入计算器页面
      // window.location.href = process.env.VUE_APP_AW_SIT_CALCU + 'panorama-helper/linker/toNewcalculator?linkerName=' + encodeURI(e)

      window.location.href = process.env.VUE_APP_AW_SIT_CALCU + 'mobile/calculator.html'
    },

    /**
     * 进入楼盘评测页面
     */
    enterEvaluation() {
      this.$router.push({
        name: 'market-marketEvaluating',
        query: { reviewId: this.evaluatingInfo.reviewId, userInfo: this.userInfo.agentId, userType: '2', enterpriseId: this.userInfo.enterpriseId }
      })
    },
    // 进入楼盘评价列表页面
    goComment() {
      this.$router.push(`/market/comment/list/${this.info.linkerId}?type=0`)
    },
    // 进入楼盘评价页面
    goCommentWrite() {
      this.$router.push(`/market/comment/write/${this.info.linkerId}`)
    },
    appointmentHandle() {
      //预约看房弹窗
      this.appointmentShow = true
    },
    emptyContent() {
      //预约看房弹窗内容清空
      this.appointmentShow = false
      this.nameContent = ''
      this.phoneContent = ''
      this.codeContent = ''
    },
    submitHandle() {
      //提交预约信息
      this.emptyContent()
    },
    // 点击客户关系弹框
    relationShowFn() {
      this.$dialog.confirm({
        title: '联系经纪人',
        message: '了解更多楼盘分享关系详情，请联系经纪人。',
        confirmButtonText: '知道了',
        closeOnClickOverlay: true,
        showCancelButton: false
      })
    },
    relationHandle() {
      //立即联系弹窗
      // window.location.href = 'tel://' + this.info.contatctTel
      this.relationShow = false
    },
    async getMarketDetailPhotoInfo() {
      //判断该楼盘有无图片列表
      const res = await marketService.getMarketDetailPhoto(this.id)
      if (res.length > 0) {
        this.photoButton = true
      } else if (res.length <= 0) {
        this.photoButton = false
      }
    },
    photoHandle() {
      if (this.showVideo) {
        return this.videoHide()
      }
      //进入相册页面
      if (this.photoButton) {
        this.$router.push({ name: 'photoList', params: { id: this.id } })
      } else {
        this.$toast({
          duration: 1000,
          message: '该楼盘暂无图片'
        })
      }
    },
    // 进入视频
    videoHandle() {
      // this.$refs.videoplay.play()
      this.$refs.videoplay.muted = true
      this.showVideo = true
    },
    // 关闭视频
    videoHide() {
      this.$refs.videoplay.pause()
      this.showVideo = false
    },
    commission() {
      //进入佣金详情
      this.$router.push({ name: 'marketDetail-commission', params: { id: this.info.linkerId } })
    },
    async getDetailInfo(id) {
      this.showLoading = true
      // 获取楼盘详情
      const res = await marketService.getLinkerDetail(id)
      this.info = res
      this.linkerName = res.linkerName
      let invalidTime = +new Date(this.info.expireTime.replace(/-/g, '/'))
      if (!this.info.linkerOtherList) {
        this.othersTitleConf.title = ''
      }
      this.status = this.info.collectionStatus
      this.tagGroupArr = [this.info.saleStatus, ...this.info.houseUseList]
      // 浏览者头像动画
      this.headSlide()
      this.competeOpenStatus()
      this.posterCheck()

      //楼盘详情中的买房问问模块
      var parameterInfo = {
        id: this.id,
        replyNum: this.replyNum,
        questionNum: this.questionNum,
        linkerName: this.info.linkerName
      }
      this.buyAskTitleConf.link = { name: 'market-asking-list', query: { infos: JSON.stringify(parameterInfo) } }
      this.showLoading = false
    },
    swipeChange(val) {
      this.swipeCurrent = val
    },
    headSlide() {
      this.rd.headSlideTimer = setInterval(() => {
        this.headCurrent = this.headCurrent < this.info.customerList.length - 1 ? this.headCurrent + 1 : 0
      }, 3000)
    },
    houseTypeHandle(n) {
      //查看户型图片预览
      let data = []
      data.push(n)
      // this.$router.push({ name: 'Preview-Picture', query: { arr: data }})
      this.instance = ImagePreview({
        images: data,
        startPosition: 0
      })
    },
    async collectHandler() {
      //修改收藏状态
      if (this.status == 1) {
        this.status = 0
      } else {
        this.status = 1
      }
      await marketService.changeLinkerCollect(this.id, this.status, 1)
    },
    shareHandler() {
      if (isEmpty(this.userInfo.name) || isEmpty(this.userInfo.distributorName) || isEmpty(this.userInfo.majorCity) || isEmpty(this.userInfo.institutionName)) {
        this.$dialog
          .confirm({
            title: '您有未完善的信息',
            message: '信息不完整会影响传播效率哦',
            confirmButtonText: '去完善',
            className: 'marketShareHint'
          })
          .then(() => {
            this.$router.push({ name: 'user-edit' })
          })
      } else {
        if (this.info.expireFlag == 0) {
          this.$dialog
            .confirm({
              title: '温馨提示',
              message: '还未开通楼盘，请前往开通'
            })
            .then(() => {
              this.$router.push({ name: 'marketDetail-open', params: { id: this.id } })
            })
        } else {
          this.$router.push({ name: 'market-poster', params: { id: this.id } })
        }
      }
    },
    async openHandler() {
      //VIP用户选择城市与VIP开通楼盘同城市
      // if (this.info.city === this.userInfo.vipInfo.city) {
      //   const res = await marketService.addHouseByVip(this.info.linkerId)
      //   if (res.returnCode == 21801) {
      //     this.$router.push({ name: 'marketDetail-open', params: { id: this.info.linkerId } })
      //     return
      //   }
      //   await this.getDetailInfo(this.id)
      //   this.openStatus = false
      //   this.$toast({
      //     duration: 1000,
      //     message: '已开通成功，请到我的楼盘查看'
      //   })
      // let invalidTime = +new Date(this.info.expireTime.replace(/-/g,'/'))// 楼盘到期时间
      let invalidTime = this.info.expireDate - 0 // 含时分秒的楼盘到期时间
      let expireTimestamp = this.vipInfo.expireTimestamp - 0 // vip到期时间
      if (this.vipInfo.vipValid && expireTimestamp > invalidTime && this.info.city === this.vipInfo.city) {
        const res = await marketService.addHouseByVip(this.info.linkerId)
        await this.getDetailInfo(this.id)
        this.openStatus = false
        this.$toast({
          duration: 1000,
          message: '已开通成功，请到我的楼盘查看'
        })
        let time = new Date(+this.vipInfo.expireTimestamp)
        let year = time.getFullYear()
        let mou = time.getMonth() + 1
        let date = time.getDate()
        this.info.expireTime = `0${mou}/0${date}`
      } else {
        this.$router.push({ name: 'marketDetail-open', params: { id: this.info.linkerId } })
      }
    },
    moreInfoHandler() {
      this.$router.push({ name: 'marketDetail-info', params: { id: this.info.linkerId, licenceList: this.info.licenceList } })
    },
    // 全景点击
    ifPanoramaClickHandler() {
      window.location.href = `${this.info.linkerUrl}?enterpriseId=${this.userInfo.enterpriseId}`
    },
    competeOpenStatus() {
      this.openStatus = this.info.openStatus == 0
    },
    // 其他楼盘
    itemClickHandler(id) {
      this.$router.push(`/market/${id}`)
    },
    // 地图点击
    mapClickHandler() {
      this.$router.push({ path: '/public/map-Search', query: { id: this.info.linkerId, mapTab: this.mapData.category, latitude: this.info.latitude, longitude: this.info.longitude } })
    },
    posterCheck() {
      this.posterShow = !!(this.info && this.info.activityImgUrl)
    },
    posterClosedHandler() {
      this.posterShow = false
    },
    // 获取VIP详情
    async getVipInfo() {
      let res = await marketService.vipInfo()
      this.vipInfo = res
    },
    async vipRenewHandle() {
      //vip续费操作
      let invalidTime = +new Date(this.info.expireTime.replace(/-/g, '/')) // 楼盘到期时间
      // let invalidTime = +new Date(this.info.invalidTime.replace(/-/g,'/'))// 含时分秒的楼盘到期时间
      let expireTimestamp = this.vipInfo.expireTimestamp // vip到期时间
      if (this.vipInfo.vipValid && expireTimestamp > invalidTime && this.info.city === this.vipInfo.city) {
        const res = await marketService.addHouseByVip(this.info.linkerId)
        this.$toast({
          duration: 1000,
          message: '续费成功！'
        })
        let time = new Date(+this.vipInfo.expireTimestamp)
        let year = time.getFullYear()
        let mou = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
        let date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
        this.info.expireTime = `${mou}/${date}`
        // this.info.expireTime = this.vipInfo.expireDate.substring(0,9)
        this.info.openStatus = 2
        this.info.expireFlag = 1
        // await this.getDetailInfo(this.id)
      } else {
        this.openHandler()
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    mapData() {
      return this.info.houseAroundType[this.mapTab]
    }
    // poster: {
    //   get: function() {
    //     return !window.localStorage.getItem('POSTER_REMIND') && this.info && this.info.posterImgUrl != ''
    //   },
    //   set: function(val) {
    //     // 触发poster重新计算,设置localStorage不会触发
    //     const tempposterImgUrl = this.info.posterImgUrl
    //     this.info.posterImgUrl = ''
    //     this.info.posterImgUrl = tempposterImgUrl
    //     // window.localStorage.setItem('POSTER_REMIND',true) // 每次进入都弹,暂时屏蔽
    //   }
    // }
  },
  filters: {
    // 格式化名称
    formatName(val) {
      let str = val + ''
      let len = val.length
      if (!len) {
        return ''
      } else if (len === 1) {
        return val + '***'
      } else {
        return `${val[0]}***${val[len - 1]}`
      }
    },
    // 格式化用户标签
    formatTag(val) {
      if (!val) {
        return ''
      }
      let tag = {
        1: '实看用户',
        2: '未实看用户',
        3: '管理员'
      }
      return tag[val]
    }
  },
  beforeDestroy() {
    clearInterval(this.rd.headSlideTimer)
    window.removeEventListener('popstate', this.fun, false)
  }
}
</script>
<style lang="less" scoped>
.market-detail-page {
  .top-swipe-container {
    position: relative;
    width: 100%;
    height: 281px;
    .swipe-outer {
      height: 100%;
      width: 100%;
      .swipe-content {
        position: relative;
        width: 100%;
        height: 100%;
        .btn-box {
          position: absolute;
          z-index: 2;
          left: 0;
          bottom: 15px;
          width: 100%;
          text-align: center;
          height: 24px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          .swipe-photo {
            border-radius: 12px;
            background: rgba(255, 255, 255, 1);
            display: inline-block;
            width: 70px;
            margin: 0 5px;
            &.photo {
              background-color: #007ae6;
              color: #fff;
            }
          }
        }
        .van-swipe {
          position: relative;
          width: 100;
          height: 100%;
          .custom-indicator {
            position: absolute;
            color: #fff;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 10px;
            z-index: 5;
            right: 20px;
            bottom: 15px;
            font-size: 12px;
            padding: 3px 15px;
            border: none;
          }
          .swipe-item {
            width: 100%;
            height: 100%;
            background-color: #999999;
            border: none;
          }
        }
      }
      .operate-content {
        position: absolute;
        top: 0;
        right: 10px;
        .operate-1 {
          display: flex;
          div {
            padding: 10px;
            font-size: 12px;
            color: #fff;
            i {
              width: 24px;
              height: 24px;
              font-size: 24px;
              display: block;
            }
          }
        }
      }
      .operate-2 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 64px;
        height: 64px;
      }
    }
    .video-box {
      position: absolute;
      top: 0;
      width: 100%;
      height: 281px;
      background-color: #000;
      overflow: hidden;
      z-index: 9;
      video {
        width: 100%;
        height: 100%;
        object-fit: none;
      }
      .close-video {
        position: absolute;
        top: 45px;
        right: 5px;
        font-size: 12px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        width: 64px;
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        text-align: center;
        z-index: 9999;
      }
    }
  }
  > .base-info-container {
    > .info-top-bar {
      display: flex;
      justify-content: space-between;
      margin: 15px;
      margin-left: 9px;
      font-size: 12px;
      > .browser-info {
        display: flex;
        line-height: 23px;
        color: #333333;
        font-weight: 600;
        font-size: 12px;
        > span {
          color: #007ae6;
        }
        > .head-portrait-box {
          position: relative;
          width: 24px;
          height: 24px;
          margin-left: 4px;
          > div {
            position: absolute;
            width: 24px;
            height: 24px;
            border-radius: 50%;
          }
        }
      }
    }
    > .info-content {
      padding: 0 15px;
      > .house-name {
        color: #333333;
        font-size: 26px;
        font-weight: 600;
        font-family: PingFangSC-Semibold;
      }
      > .house-feature {
        padding-top: 10px;
        font-size: 14px;
        line-height: 1.5;
      }
      .specific-market-detail-commission {
        width: 339px;
        height: 34px;
        background: rgba(247, 249, 250, 1);
        border-radius: 4px;
        font-size: 15px;

        font-weight: 400;
        color: rgba(234, 77, 46, 1);
        display: flex;
        align-items: center;
        position: relative;
        .commission-detail {
          width: 12px;
          height: 12px;
          position: absolute;
          right: 5px;
        }
        span:nth-child(1) {
          width: 17px;
          height: 17px;
          margin: 0 8px;
        }
        .commission-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          width: 130px;
        }
      }
      > .house-info-form {
        padding-top: 20px;
        line-height: 1.5;
        font-size: 16px;
        color: #333333;
        > p {
          padding-bottom: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 343px;

          > .calculation-view {
            float: right;
            display: flex;
            align-items: center;

            > img {
              width: 16px;
              height: 16px;
            }

            > span {
              display: inline-block;
              color: #007ae6;
              font-size: 12px;
              margin-left: 2px;
            }
          }
        }
      }
      > .more-info {
        width: 335px;
        height: 44px;
        line-height: 44px;
        margin: 5px;
        margin-left: 0px;
        background-color: rgba(0, 122, 230, 0.05);
        color: #445166;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        border-radius: 4px;
      }
    }
  }
  > .marker-relation-box {
    padding: 40px 0 0 15px;
    p {
      font-size: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
    }
    ol {
      position: relative;
      margin-top: 12px;
      width: 343px;
      height: 114px;
      li:nth-child(1) {
        border-radius: 50%;
        position: absolute;
        top: 47.5px;
        left: 153.5px;
        width: 23px;
        height: 23px;
      }
      li:nth-child(2) {
        text-align: center;
        position: absolute;
        top: 73px;
        left: 135px;
        width: 60px;
        font-size: 8px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
      }
    }
  }
  > .house-type {
    margin-top: 28px;
    .type-swipe-content {
      margin: 16px 22px 0px 22px;
      .house-type {
        > .house-type-img {
          width: 160px;
          height: 120px;
          border-radius: 6px;
        }
        > .house-type-info {
          margin-top: 12px;
          line-height: 1.5;
          > .house-type-name {
            font-size: 16px;
            color: #333333;
            font-weight: 600;
          }
          > .house-type-area {
            font-size: 12px;
            color: #333333;
            font-weight: 400;
          }
          > .house-type-price {
            font-size: 14px;
            color: #ea4d2e;
            font-weight: 400;
          }
        }
      }
    }
  }
  > .house-news {
    margin-top: 15px;
    > .news-container {
      color: #333333;
      line-height: 1.5;
      margin: 0 15px;
      > .news-title {
        font-size: 16px;
        font-weight: 600;
        margin-top: 11px;
        margin-bottom: 6px;
      }
      > .news-content {
        font-size: 14px;
        font-weight: 400;
      }
      > .news-time {
        margin-top: 12px;
        font-size: 12px;
        color: #999999;
      }
    }
  }
  > .house-circum {
    margin-top: 15px;
    .tab-box {
      position: relative;
      z-index: 1;
      > .van-tabs {
        .van-tabs__line {
          display: none;
        }
        > .van-tabs__wrap {
          &::after {
            border: none;
          }
        }
        .van-tab--active {
          color: #007ae6;
        }
      }
    }
    .map-box {
      margin: 0 15px;
      width: 345px;
      height: 190px;
      border-radius: 10px;
      overflow: hidden;
    }
  }
  > .evaluating-box {
    margin-top: 15px;
    .evaluating-content {
      margin-top: 15px;
      height: 90px;
      padding: 0 15px;
      width: 100%;
      display: flex;
      .pic-box{
        width: 120px;
        height: 90px;
        overflow: hidden;
        border-radius: 6px;
        margin-right: 8px;
        img {
          height: 90px;
          width: 120px;
          object-fit:  cover;
          object-position: center;
        }
      }
      .right-body {
        position: relative;
        > .aa {
          width: 216px;
          line-height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 10px;
        }

        > .bb {
          position: absolute;
          bottom: 0;
          line-height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          width: 216px;
          display: -webkit-box;
        }

        // p:nth-child(1) {
        //   width: 216px;
        //   line-height: 22px;
        //   font-size: 16px;
        //   font-family: PingFangSC-Regular;
        //   font-weight: 400;
        //   color: rgba(51, 51, 51, 1);
        //   margin-bottom: 10px;
        // }
        // p:nth-child(2) {
        //   line-height: 17px;
        //   font-size: 12px;
        //   font-family: PingFangSC-Regular;
        //   font-weight: 400;
        //   color: rgba(153, 153, 153, 1);
        //   overflow: hidden;
        //   text-overflow: ellipsis;
        //   display: -webkit-box;
        //   -webkit-line-clamp: 2;
        //   -webkit-box-orient: vertical;
        //   width: 216px;
        //   align-content: flex-end
        // }
      }
    }
  }
  > .evaluate-box {
    margin-top: 40px;
    .evaluate-content {
      margin-top: 10px;
      padding: 0 15px;
      width: 100%;
      .evaluate-label {
        display: inline-block;
        width: 108px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: rgba(242, 245, 249, 1);
        border-radius: 4px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(139, 151, 167, 1);
        margin-bottom: 5px;
      }
      .evaluate-label:nth-child(2) {
        margin: 0 9px;
      }
      .evaluate-detail {
        margin-top: 10px;
        li {
          padding: 10px 0;
          .top {
            img {
              width: 36px;
              height: 36px;
              border-radius: 18px;
              margin-right: 15px;
            }
            .message {
              display: inline-block;
              font-size: 16px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              margin-bottom: 10px;
              vertical-align: middle;
              span {
                display: inline-block;
                width: 60px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                background: rgba(143, 159, 177, 0.15);
                border-radius: 2px;
                font-size: 10px;
                transform: scale(0.8);
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(92, 95, 102, 1);
                vertical-align: middle;
              }
              i {
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-right: 5px;
              }
            }
          }
          .bottom {
            font-size: 15px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 21px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            vertical-align: top;
            vertical-align: middle;
            img {
              width: 15px;
              height: 12px;
              vertical-align: middle;
              margin-left: 5px;
            }
          }
        }
      }
      .hint {
        margin-top: 18px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .go-evaluate {
        margin-top: 12px;
        margin-left: 118px;
        display: inline-block;
        width: 82px;
        height: 30px;
        border-radius: 4px;
        border: 1px solid rgba(68, 81, 102, 1);
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(68, 81, 102, 1);
        line-height: 30px;
        text-align: center;
      }
    }
    .evaluate-content-nodata {
      font-size: 12px;
      background-color: #f8fafc;
      border: 1px dashed rgba(248,250,252,1);
      text-align: center;
      padding: 20px;
      margin: 16px;
      p {
        padding-bottom: 20px;
        color: #969ea8;
      }
      button {
        border: 1px solid #445166;
        border-radius: 4px;
        color: #445166;
        height: 30px;
        padding: 6px 16px;
        background-color: #f8fafc;
      }
    }
  }
  > .buy-ask {
    margin-top: 41px;

    .not-question {
      width: 92%;
      margin-left: 4%;
      height: 103px;
      background: rgba(248, 250, 252, 1);
      border: 1px solid rgba(205, 214, 225, 1);
      margin-top: 5px;
      display: flex;
      flex-direction: column;

      .hint {
        margin-top: 18px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        text-align: center;
        justify-content: center;
      }
      .go-evaluate {
        display: flex;
        margin-top: 12px;
        display: inline-block;
        width: 82px;
        height: 30px;
        border-radius: 4px;
        border: 1px solid rgba(68, 81, 102, 1);
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(68, 81, 102, 1);
        line-height: 30px;
        text-align: center;
        justify-content: center;
        margin-left: 40%;
      }
    }

    .ask-content {
      margin-top: 16px;
      padding: 0 15px;
      width: 100%;

      li:nth-child(1) {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 16px;
        margin-top: -4px;
        div {
          display: flex;
        }
        span:nth-of-type(1) {
          display: inline-block;
          width: 22px;
          height: 22px;
          background: rgba(235, 108, 82, 1);
          border-radius: 6px;
          text-align: center;
          line-height: 22px;
          font-size: 12px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          margin-right: 8px;
        }
        span:nth-of-type(2) {
          display: inline-block;
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          width: 225px;
          line-height: 23px;
        }
        p {
          font-size: 13px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
      li:nth-child(2) {
        padding-bottom: 16px;
        span {
          display: inline-block;
          text-align: center;
          line-height: 22px;
          width: 22px;
          height: 22px;
          background: rgba(0, 122, 230, 1);
          border-radius: 6px;
          font-size: 12px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
        div {
          display: flex;
          align-items: center;
          img {
            width: 24px;
            height: 24px;
            margin: 0 8px;
            border-radius: 50%;
          }
          i:nth-of-type(1) {
            font-size: 12px;
            font-style: normal;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          i:nth-of-type(2) {
            font-size: 12px;
            font-style: normal;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
        p {
          font-size: 15px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 21px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          margin: 8px 0 0 31px;
        }
      }
    }

    .evaluate-content-nodata {
      font-size: 12px;
      background:rgba(248,250,252,1);
      border: 1px dashed rgba(205,214,225,1);
      text-align: center;
      padding: 20px;
      margin: 16px;
      p {
        padding-bottom: 20px;
        color: #969ea8;
      }
      button {
        border: 1px solid #445166;
        border-radius: 4px;
        height: 30px;
        padding: 6px 16px;
        background:rgba(248,250,252,1);
        background-color: #f8fafc
      }
    }

    .hint {
      margin-top: 18px;
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      padding-left: 15px;
    }
    .go-evaluate {
      margin-top: 12px;
      margin-left: 118px;
      display: inline-block;
      width: 82px;
      height: 30px;
      border-radius: 4px;
      border: 1px solid rgba(68, 81, 102, 1);
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(68, 81, 102, 1);
      line-height: 30px;
      text-align: center;
    }
  }
  > .house-recommend {
    margin-top: 28px;
    margin-bottom: 10px;
    > .recommend-swipe-content {
      margin: 0 15px;
      .recommend-house-item {
        line-height: 1.5;
        > .recommend-house-img {
          margin-top: 18px;
          margin-bottom: 12px;
          width: 160px;
          height: 90px;
          border-radius: 6px;
          position: relative;
          .panorama-icon {
            position: absolute;
            width: 34px;
            height: 34px;
            left: 50%;
            top: 50%;
            margin-left: -17px;
            margin-top: -17px;
          }
        }
        > .recommend-house-info {
          .house-name {
            font-size: 16px;
            font-weight: 600;
            color: #333333;
          }
          .house-location {
            font-size: 12px;
            font-weight: 400;
            color: #999999;
          }
        }
      }
    }
  }
  .m-statement {
    padding: 16px 23px 90px 16px;
    // width: 343px;
    background: #f7f9fa;
    color: #8a9299;
    font-size: 12px;
    line-height: 1.5;
    .feedback {
      color: #525c66;
    }
  }
  > .house-status {
    position: fixed;
    width: 100%;
    height: 70px;
    left: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 8;
    > .unopen-status-box {
      position: relative;
      width: 100%;
      height: 100%;
      > .open-btn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        width: 343px;
        height: 44px;
        background: #007ae6;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        line-height: 44px;
        text-align: center;
      }
    }
    .saleStatusFlag {
      width: 343px;
      height: 44px;
      background: #c8c9cc;
      border-radius: 6px;
      line-height: 44px;
      text-align: center;
      margin-top: 14px;
      margin-left: 16px;
      p {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  @keyframes show {
    0% {
      opacity: 0;
      top: 0px;
    }
    100% {
      opacity: 1;
      top: 0;
    }
  }
  @keyframes hide {
    0% {
      opacity: 1;
      top: 0;
    }
    100% {
      opacity: 0;
      top: 0;
    }
  }
  .show-enter-active {
    animation: show 1.2s;
  }
  .show-leave-active {
    animation: hide 1.2s;
  }
  .show-enter,
  .show-leave-to {
    opacity: 0;
  }
}
.relationPopup {
  border-radius: 12px;
  width: 311px;
  height: 198px;
  // padding-top:45px;
  .relationName {
    width: 311px;
    height: 168px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    position: relative;
    p:nth-child(1) {
      width: 12px;
      height: 12px;
      position: absolute;
      right: 15px;
      top: 15px;
    }
    ul {
      padding-top: 45px;
      margin: 0px 25px 32px 32px;
      li:nth-child(1) {
        font-size: 20px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
      li:nth-child(2) {
        margin: 12px 0;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      li:nth-child(3) {
        width: 248px;
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
    .immediately {
      text-align: center;
      // margin-left: 32px;
      width: 100%;
      height: 50px;
      // background: rgba(0, 122, 230, 1);
      border-radius: 6px;
      font-size: 18px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(1, 127, 255, 1);
      line-height: 50px;
    }
  }
}
.marketShareHint {
  //完善信息弹窗
  width: 280px;
  border-radius: 12px;
  text-align: center;
  .van-dialog__header {
    font-size: 18px;

    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }
  .van-dialog__message {
    font-size: 15px;

    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 21px;
  }
  .van-dialog__footer {
    border-top: 1px solid #e5e5e5;
  }
}
.poster-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
  .cnt {
    width: 290px;
    height: 500px;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -145px;
    margin-top: -250px;
    .poster-img {
      position: relative;
      width: 101%;
      height: 101%;
      border-radius: 5px;
      img {
        width: 290px;
        height: 500px;
        border-radius: 5px;
      }
      .close-icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 100px;
        height: 100px;
        text-align: right;
        img {
          width: 24px;
          height: 24px;
          margin: 5px 10px;
        }
      }
    }
  }
}
// loading
.loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
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

<style lang="less">
.house-circum{
  .van-tab--active {
    color: #007ae6;
  }
  .van-hairline--top-bottom::after{
    border-width: 0;
  }
}
  
</style>