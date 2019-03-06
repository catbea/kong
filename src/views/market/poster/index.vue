<template>
  <div class="share-box">
    <!-- 名片海报选择 -->
    <div class="share-card" :style="{'opacity': !showEdit ? 1 : 0, 'height':!showEdit ? '100%' : 0}">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="card-info card1" v-if="editData.tagList">
              <div class="tag-box">
                <p><span v-if="editData.tagList.length>0">{{editData.tagList[0]}}</span><span  v-if="editData.tagList.length>1"> · {{editData.tagList[1]}}</span></p>
                <p class="sub">GUAN JUN PIN ZHI CHENG SHI JING YANG</p>
              </div>
              <div class="cover">
                <img :src="avatarUrl" alt="">
              </div>
              <div class="name">
                <h3>{{editData.linkerName}}</h3>
                <p>{{editData.linkerPrice}} {{editData.priceUnit}}</p>
              </div>
              <div class="qrcode">
                <img :src="editData.qrCode" alt="">
                <p class="agent">
                  <span class="name">{{editData.agentName}}</span> <span>{{editData.agentMobile}}</span>
                </p>
                <p class="company">授权开发商：{{editData.developer}}</p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-info card2"  v-if="editData.tagList">
              <div class="cover">
                <img :src="avatarUrl" alt="">
              </div>
              <div class="data-info">
                <img class="bg" src="../../../assets/img/market/poster/card2.png" alt="">
                <div class="name-box">
                  <p class="name">{{editData.linkerName}}</p>
                  <p class="tag"><span v-if="editData.tagList.length>0">{{editData.tagList[0]}}</span><span  v-if="editData.tagList.length>1"> · {{editData.tagList[1]}}</span></p>
                  <p class="price">价格：{{editData.linkerPrice}} {{editData.priceUnit}}</p>
                </div>
                <div class="qrcode">
                  <img :src="editData.qrCode" alt="">
                  <p>长按识别更多</p>
                </div>
                <div class="agent">
                  <div class="agent-info">
                    <img class="pic" :src="editData.avatarMediaidTwo" alt="">
                    <div class="text">
                      <p class="agentName">{{editData.agentName}}</p>
                      <p>{{editData.agentMobile}}</p>
                    </div>
                  </div>
                  <p class="company">授权开发商：{{editData.developer}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-info card3" v-if="editData.tagList">
              <div class="tag-box">
                <div class="info">
                  <p class="tag"><span v-if="editData.tagList.length>0">{{editData.tagList[0]}}</span><span  v-if="editData.tagList.length>1"> · {{editData.tagList[1]}}</span></p>
                  <p class="sub">GUAN JUN PIN ZHI CHENG SHI JING YANG</p>
                </div>
                
              </div>
              <div class="cover">
                 <img :src="avatarUrl" alt="">
              </div>
              <div class="agent-box">
                <div class="name">
                  <sup>“</sup>{{editData.linkerName}}<sub>”</sub>
                </div>
                <p class="price">{{editData.linkerPrice}} {{editData.priceUnit}}</p>
              </div>
              <div class="developer-box">
                <div class="developer">
                  <img class="pic" :src="editData.avatarMediaidTwo" alt="">
                  <p class="agentName">{{editData.agentName}} | {{editData.agentMobile}}</p>
                  <p class="company">授权开发商：{{editData.developer}}</p>
                </div>
                <div class="qrcode">
                  <img :src="editData.qrCode" alt="">
                  <p>长按识别更多</p>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-info card4" v-if="editData.tagList">
              <div class="cover">
                <img :src="avatarUrl" alt="">
              </div>
              <div class="tag-box">
                <p class="tag"><span v-if="editData.tagList.length>0">{{editData.tagList[0]}}</span><span  v-if="editData.tagList.length>1"> · {{editData.tagList[1]}}</span></p>
                <p class="price">{{editData.linkerPrice}} {{editData.priceUnit}}</p>
                <p class="pic"><img src="../../../assets/img/market/poster/card4.png" alt=""></p>
              </div>
              <div class="name">
                <span class="arr-l"></span><h3>{{editData.linkerName}}</h3><span class="arr-r"></span>
              </div>
              <div class="qrcode">
                <img :src="editData.qrCode" alt="">
                <p class="agentName">{{editData.agentName}} | {{editData.agentMobile}}</p>
              </div>
              <div class="company">
                授权开发商：{{editData.developer}}
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="swiper-pagination"></div> -->
      </div>
      <div class="share-card-action">
        <button type="button" class="edit" @click="showEditFn">编辑海报</button>
        <button type="button" class="save" @click="creatCoverFn">生成海报</button>
      </div>
    </div>

    <!-- 名片海报信息编辑 -->
    <div class="share-detail-edit" v-show="showEdit">
      <div class="form">
        <div class="group-item">
          <span>经纪人姓名</span>
          <input type="text" v-model="editData.agentName" maxlength="16" placeholder="请输入姓名" @blur="blur">
        </div>
        <div class="group-item">
          <span>经纪人电话</span>
          <input type="number" v-model="editData.agentMobile" maxlength="16" placeholder="请输入电话号码" @blur="blur">
        </div>
        <div class="group-upload">
          <p class="title">选择楼盘封面</p>
          <div class="img-box">
            <div class="img-item" @click="avatarUrl = item" v-for="(item,index) in editData.postersUrlList" :key='index'>
              <img :src="item" alt="">
              <van-icon name="success" v-show="avatarUrl === item" />
            </div>
          </div>
        </div>
      </div>
      <div class="action-box scale-1px">
        <button @click="reset" class="cancle">重置</button>
        <button @click="updateAgentCard">保存</button>
      </div>
    </div>

    <!-- 名片海报预览 -->
    <div class="share-cover-img" v-show="showView">
      <p class="img-box">
        <img src="" alt="" id="share-cover-img">
      </p>
      <p class="btn">
        <span>长按图片保存，分享给好友或朋友圈</span>
        <button class="save" style="width:100%" @click="closeView">返回</button>
      </p>
    </div>

    <div class="loading"  v-show="showLoading" >
       <van-loading type="spinner" color="white" class="van-loading"/>
    </div>
  </div>
</template>

<script>
import h2c from 'html2canvas'
import marketService from '@/services/marketService'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import { checkStrLength, checkStrType, checkPhoneNum } from '@/utils/tool'
export default {
  data() {
    return {
      linkedId: '',
      agentId: 1,
      shareBaseInfo: {}, // 默认数据
      shareInfo: {}, // 用户修改数据
      activeIndex: 1, // 初始化模板索引
      editData: {}, // 编辑数据
      showView: false, // 图片预览
      showEdit: false, // 显示编辑信息
      creatCover: false, // 生成海报
      showLoading: false, // 加载中
      avatarUrl: ''
    }
  },
  created() {
    this.showLoading = true
    this.linkedId = this.$route.params.id
    this.initData()
  },
  mounted() {
    this.initSwiper()
  },
  methods: {
    // 初始化swiper
    initSwiper () {
      let _that = this
      var mySwiper = new Swiper('.swiper-container', {
        loop: false,
        effect: 'coverflow',
        slidesPerView: 1,
        centeredSlides: true,
        initialSlide: this.activeIndex,
        coverflowEffect: {
          rotate: 20,
          stretch: 30,
          depth: 60,
          modifier: 1,
          slideShadows: true
        },
        on: {
          slideChange: function() {
            // 当前激活的海报index索引
            _that.activeIndex = this.activeIndex
          }
        }
      })
    },
    // 获取海报基本信息
    async getPosterInfo(linkedId) {
      const result = await marketService.shareBuildingCard(linkedId)
      if (result) {
        this.shareBaseInfo = result
      }
    },
    // 获取代理商海报信息
    async getAgentLinkerPoster(agentId) {
      let result = await marketService.getAgentLinkerPoster({agentId: agentId})
      if (result) {
        this.shareInfo = result
      }
    },
    // 初始化数据
    async initData() {
      await this.getPosterInfo(this.linkedId)
      await this.getAgentLinkerPoster(this.shareBaseInfo.agentId)
      this.editData = Object.assign({}, this.shareBaseInfo, this.shareInfo)
      this.avatarUrl = this.shareInfo && this.shareInfo.imageUrl || this.shareBaseInfo.postersUrlList && this.shareBaseInfo.postersUrlList[0]
      // 合并两个接口参数
      this.showLoading = false
    },
    // 编辑海报信息按钮
    showEditFn() {
      this.showEdit = true
    },
    // 生成海报
    creatCoverFn() {
      this.showLoading = true
      this.creatCover = true
      this.htmlToImg()
    },
    // 生成图片
    htmlToImg() {
      let cls = `.card${this.activeIndex + 1}`
      let img = document.getElementById('share-cover-img')
      let _that = this
      h2c(document.querySelector(cls), {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: '300px',
        heigt: '480px'
      }).then(canvas => {
        let dataURL = canvas.toDataURL()
        img.src = dataURL
        _that.showView = true
        _that.showLoading = false
      })
    },
    // 关闭预览
    closeView() {
      this.showView = false
    },
    // 重置数据
    reset() {
      this.editData = Object.assign({}, this.shareBaseInfo)
    },
    // 保存名片信息
    async updateAgentCard() {
      let name = this.editData.agentName
      let mobile = this.editData.agentMobile
      if (!name) {
        return this.$toast('姓名不能为空')
      }
      if (!checkStrLength(name, 16)) {
        return this.$toast('姓名最多8个汉字(或16个字符)')
      }
      if (!checkStrType(name)) {
        return this.$toast('姓名只支持中文、英文和数字')
      }
      if (!mobile) {
        return this.$toast('经纪人电话不能为空')
      }
      if (!/[\d|\-]{11,16}/.test(mobile)) {
        return this.$toast('经纪人电话不正确')
      }
      let result = await marketService.updateAgentLinkerPoster({
        agentMobile: this.editData.agentMobile,
        agentName: this.editData.agentName,
        imageUrl: this.avatarUrl,
        agentId: this.editData.agentId
      })
      if (result) {
        let toast = this.$toast('保存成功')
        setTimeout(() => {
          toast.clear()
          this.showEdit = false
        }, 500)
      }
    },
    // 键盘遮挡
    blur() {
      document.activeElement.scrollIntoViewIfNeeded(true)
    }
  }
}
</script>

<style lang="less" scoped>
.share-box {
  height: 100%;
  font-family:PingFang-SC-Semibold;
  .share-card {
    background: linear-gradient(46deg, rgba(37, 39, 55, 1) 0%, rgba(72, 76, 98, 1) 100%);
    height: 100%;
    font-size: 14px;
    .swiper-container {
      width: 100%;
      height: 480px;
      padding-top: 15px;
      box-sizing: content-box;
      .card-info {
        width: 300px;
        margin: auto;
        height: 100%;
        position: relative;
        background-color: #fff;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        &.card1 {
          background-color: #030303;
          color: #BF9667;
          .tag-box{
            font-size: 20px;
            font-weight:600;
            text-align: center;
            padding-top: 20px;
            .sub{
              font-size: 10px;
              font-weight: 500;
              margin: 6px 0 20px;
            }
          }
          .cover{
            width: 260px;
            height: 194px;
            margin: auto;
            overflow: hidden;
            img{
              width: 260px;
              min-height: 100%;
            }
          }
          .name{
            color: #BF9667;
            text-align: center;
            padding-top: 15px;
            h3{
              width: 60%;
              margin: auto;
              font-size: 16px;
              padding-bottom: 5px;
              border-bottom: 1px solid  #BF9667;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
            }
            p{
              font-size: 12px;
              padding-top: 6px;
            }
          }
          .qrcode{
            text-align: center;
            font-size: 12px;
            padding-top: 20px;
            img{
              width: 64px;
              height: 64px;
              border-radius: 50%;
            }
            .agent{
              padding-top: 8px;
              .name{
                padding-right: 10px;
              }
            }
            .company{
              padding-top: 12px;
              font-size: 10px;
              white-space: normal;
            }
          }
        }

        &.card2 {
          .cover{
            height: 300px;
            overflow: hidden;
            img{
              min-height: 300px;
              width: 100%;
            }
          }
          .data-info{
            height: 260px;
            margin-top: -80px;
            position: relative;
            img.bg{
              min-height: 100%;
              position: absolute;
              bottom: 0;
              top: 0;
            }
            .name-box{
              position: relative;
              color: #E5B37B;
              padding-top: 50px;
              padding-left: 20px;
              border-bottom: 1px dotted  rgba(243, 216, 186,0.3);
              padding-bottom: 10px;
              .name{
                font-size: 28px;
                margin-right: 95px;
                overflow: hidden;
              }
              .tag{
                padding: 8px 0;
                font-size: 14px;
              }
              .price{
                font-size: 14px;
              }
            }
            .qrcode{
              position: absolute;
              top: 10px;
              right: 15px;
              img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
              }
              p{
                color:rgba(255,255,255,0.5);
                font-size: 10px;
                text-align: center;
                padding-top: 5px;
              }
            }
          }
          .agent{
            position: relative;
            .agent-info{
              display: flex;
              padding: 25px 20px 20px;
              .pic{
                width: 44px;
                height: 44px;
                border-radius: 50%;
              }
              .text{
                flex: 1;
                margin-left: 10px;
                color:rgba(164, 184, 213, 0.6);
                font-size: 14px;
                padding-top: 2px;
                .agentName{
                  padding-bottom: 5px;
                }
              }
            }
            .company{
              padding: 0 20px;
              font-size: 10px;
              color: rgba(164, 184, 213, 0.6);
              white-space: normal;
            }
          }
        }

        &.card3 {
          color: #0A1930;
          .tag-box{
            font-size: 20px;
            font-weight:600;
            text-align: left;
            padding: 20px;
            .info{
              border-left:4px solid #0A1930;
              padding-left: 10px;
            }
            .sub{
              font-size: 10px;
              font-weight: 500;
              margin: 6px 0 0;
            }
          }
          .cover{
            width: 260px;
            height: 194px;
            margin: auto;
            overflow: hidden;
            img{
              width: 260px;
              min-height: 100%;
            }
          }
          .agent-box{
            text-align: center;
            position: relative;
            padding-top: 30px;
            .name{
              font-size: 24px;
              sup,sub{
                color: #F5A623;
                margin: 0 5px;
              }
              sub{
                vertical-align: bottom;
              }
            }
            .price{
              font-size: 12px;
              padding-top: 10px;
            }
          }
          .developer-box{
            display: flex;
            padding-top: 20px;
            .developer{
              width: 60%;
              color: #102849;
              font-size: 10px;
              padding: 10px 20px;
              .pic{
                width: 34px;
                height: 34px;
                border-radius: 50%;
              }
              .agentName{
                line-height: 2;
              }
              .company{
                border-top: 1px solid rgba(16, 40, 73, 0.8);
                overflow: auto;
                white-space: normal;
                padding-top: 5px;
              }
            }
            .qrcode{
              text-align: center;
              font-size: 10px;
              color: #102849;
              margin: 5px 10px;
              img{
                width: 64px;
                height: 64px;
                border-radius: 50%;
              }
              p{
                padding-top: 5px;
              }
            }
          }
        }

        &.card4 {
          background:rgba(247,249,250,1);
          .cover{
            height: 220px;
            overflow: hidden;
            img{
              width: 100%;
              min-height: 220px;
            }
            
          }
          .tag-box{
            padding-top: 20px;
            text-align: center;
            .tag{
              font-size: 20px;
            }
            .price{
              font-size: 12px;
              padding: 6px 0 3px 0;
            }
            .pic{
              width: 60%;
              margin: auto;
              img{
                width: 100%;
              }
            }
          }
          .name{
            padding-top: 15px;
            text-align: center;
            font-size: 16px;
            position: relative;
            h3{
              display: inline-block;
              position: relative;
              margin: auto;
              border:1px solid  #0A1933;
              border-radius: 2px;
              line-height: 25px;
              padding: 0 10px;
            }
            span{
              display: inline-block;
              width: 3px;
              height: 18px;
              border:1px solid  #0A1933;
              border-radius: 2px;
              vertical-align: middle;
              &.arr-l{
                margin-right: -1px;
              }
              &.arr-r{
                margin-left: -1px;
              }
            }
          }
          .qrcode{
            padding-top: 10px;
            text-align: center;
            color: #0A1933;
            img{
              width: 64px;
              height: 64px;
              border-radius: 50%;
            }
            p{
              line-height: 1.5;
              padding-top: 5px;
            }
          }
          .company{
            font-size: 10px;
            white-space: normal;
            text-align: center;
            padding-top: 10px;
            color: #0A1933;
          }
        }

      }
    }

    .share-card-action {
      // position: absolute;
      width: 100%;
      // bottom: 15px;
      text-align: center;
      margin-top: 15px;
      button {
        width: 144px;
        height: 44px;
        border-radius: 6px;
        color: #fff;
        border: none;
        margin: 0 10px;
        border: #007ae6 1px solid;
        &.edit {
          background: linear-gradient(46deg,rgba(37,39,55,1) 0%,rgba(72,76,98,1) 100%);
          color: #fff;
          border-color: #fff;
        }
        &.save {
          background: rgba(0, 122, 230, 1);
        }
      }
    }
  }
  // 编辑信息
  .share-detail-edit {
    height: 100%;
    background-color: #f7f9fa;
    padding-top: 10px;
    position: relative;
    box-sizing: content-box;
    // .form{
    //   padding-bottom: 72px;
    // }
    .group-item {
      background-color: #fff;
      border: none;
      position: relative;
      height: 56px;
      line-height: 56px;
      display: flex;
      padding: 0 15px;
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        background: #ebedf0;
        width: 100%;
        height: 1px;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }
      span {
        width: 95px;
        font-size: 16px;
      }
      input {
        height: 30px;
        line-height: 30px;
        padding: 13px 10px 13px 5px;
        flex: 1;
        border: none;
        font-size: 14px;
        text-align: right;
        color: #445166;
        &:disabled {
          background-color: #fff;
        }
      }
    }
    .group-upload {
      margin: 10px 0;
      background-color: #fff;
      padding: 10px 20px;
      .title {
        font-size: 16px;
      }
      .img-box {
        margin: 15px 0 0 0;
        overflow-x:scroll; 
        height: 75px;
        white-space: nowrap;
        .img-item {
          vertical-align: middle;
          position: relative;
          width: 100px;
          height: 75px;
          display: inline-block;
          margin-right: 15px;
          overflow: hidden;
          img {
            min-width: 100%;
            min-height: 100%;
          }
          .van-icon {
            background-color: #007ae6;
            color: #fff;
            border-radius: 50%;
            position: absolute;
            right: 2px;
            top: 2px;
            font-size: 20px;
          }
        }
      }
      .uploader-box {
        display: inline-block;
        vertical-align: middle;
        height: 75px;
        .van-uploader {
          height: 75px;
          width: 100px;
          text-align: center;
          line-height: 75px;
          background-color: #f4f5f6;
        }
      }
    }
    .action-box {
      position: fixed;
      height: 72px;
      width: 100%;
      bottom: 0;
      display: flex;
      background-color: #fff;
      button {
        flex: 1;
        margin: 14px 16px;
        height: 44px;
        background: #007AE6;
        border-radius: 6px;
        color: #fff;
        border: none;
        font-size: 14px;
        &.cancle{
          background-color: #fff;
          color: #007AE6;
          border: 1px solid #007AE6;
        }
      }
    }
  }
  // 预览名片
  .share-cover-img {
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(37, 39, 55, 1);
    .img-box {
      height: 480px;
      width: 300px;
      margin: 5px auto;
    }
    .btn {
      width: 300px;
      margin: auto;
      font-size: 14px;
      color: #fff;
      text-align: center;
      span {
        display: block;
        padding-bottom: 10px;
        font-size: 12px;
        opacity: 0.5;
      }
      button {
        height: 44px;
        width: 120px;
        border-radius: 6px;
        border: none;
        border: 1px solid #007ae6;
        &.close {
          margin-right: 20px;
          background: linear-gradient(46deg, rgba(37, 39, 55, 1) 0%, rgba(72, 76, 98, 1) 100%);
          color: #007ae6;
        }
        &.save {
          background-color: #007ae6;
        }
      }
      &.btnview {
        margin-top: 30px;
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

}
</style>
