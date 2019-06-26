<template>
  <div class="share-box">
    <!-- 名片海报选择 -->
    <div class="card-model" :style="{'opacity': showModel ? 1 : 0, 'height': showModel ? '100%' : 0}">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="card item1">
              <div class="pic">
                <img :src="avatarUrl" alt="">
              </div>
              <div class="linker-box scale-1px-bottom">
                <div class="linker-info">
                  <p class="name">{{editData.linkerName}}</p>
                  <p class="address">{{editData.city | formatCity}} {{editData.county | formatCounty}}</p>
                </div>
                <div class="linker-price">
                  <p class="price" v-if="editData.linkerPrice-0">{{editData.linkerPrice}} {{editData.priceUnit}}</p>
                  <p class="price" v-else>价格待定</p>
                  <p class="tips">参考均价</p>
                </div>
              </div>
              <div class="agent-box">
                <div class="agent-info">
                  <div class="agent-cnt">
                    <div class="img">
                      <img class="pic" :src="editData.avatarMediaidTwo" alt="">
                    </div>
                    <div class="text">
                      <p class="name">{{editData.agentName}}</p>
                      <p class="tel">{{editData.agentMobile}}</p>
                    </div>
                  </div>
                  <div class="tips">
                    长按识别小程序码，查看楼盘详情
                  </div>
                </div>
                <div class="qrcode">
                  <img :src="editData.qrCode" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card item2">
              <div class="pic">
                <img :src="avatarUrl" alt="">
              </div>
              <div class="linker-box">
                <div class="name">{{editData.linkerName}}</div>
                <div class="linker-item">
                    <div class="price">
                      <p class="title">价格(元/㎡)</p>
                      <p class="text" v-if="editData.linkerPrice-0">{{editData.linkerPrice}}</p>
                      <p class="text" v-else>价格待定</p>
                    </div>
                    <div class="area">
                      <p class="title">区域</p>
                      <p class="text">{{editData.city | formatCity}} {{editData.county | formatCounty}}</p>
                    </div>
                    <div class="build">
                      <p class="title">建面(㎡)</p>
                      <p class="text">{{editData.buildArea || '暂无'}}</p>
                    </div>
                </div>
              </div>
              <div class="agent-box">
                <div class="agent-info">
                  <div class="agent-cnt">
                    <div class="img">
                      <img class="pic" :src="editData.avatarMediaidTwo" alt="">
                    </div>
                    <div class="text">
                      <p class="name">{{editData.agentName}}</p>
                      <p class="tel">{{editData.agentMobile}}</p>
                    </div>
                  </div>
                  <div class="tips">
                    长按识别小程序码，查看楼盘详情
                  </div>
                </div>
                <div class="qrcode">
                  <img :src="editData.qrCode" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card item3">
              <div class="pic">
                <img :src="avatarUrl" alt="">
              </div>
              <div class="linker-box">
                <div class="name">{{editData.linkerName}}</div>
                <div class="linker-item">
                    <div class="price">
                      <p class="title">价格(元/㎡)</p>
                      <p class="text" v-if="editData.linkerPrice-0">{{editData.linkerPrice}}</p>
                      <p class="text" v-else>价格待定</p>
                    </div>
                    <div class="area">
                      <p class="title">区域</p>
                      <p class="text">{{editData.city | formatCity}} {{editData.county | formatCounty}}</p>
                    </div>
                    <div class="build">
                      <p class="title">建面(㎡)</p>
                      <p class="text">{{editData.buildArea || '暂无'}}</p>
                    </div>
                </div>
              </div>
              <div class="agent-box">
                <div class="agent-info">
                  <div class="agent-cnt">
                    <div class="img">
                      <img class="pic" :src="editData.avatarMediaidTwo" alt="">
                    </div>
                    <div class="text">
                      <p class="name">{{editData.agentName}}</p>
                      <p class="tel">{{editData.agentMobile}}</p>
                    </div>
                  </div>
                  <div class="tips">
                    长按识别小程序码，查看楼盘详情
                  </div>
                </div>
                <div class="qrcode">
                  <img :src="editData.qrCode" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide" v-if="false">
            <div class="card card2">
              <div class="item4">
                <div class="pic">
                  <img :src="avatarUrl" alt="">
                </div>
                <div class="agent-box">
                  <div class="agent-info">
                    <div class="agent-cnt">
                      <div class="img">
                        <img class="pic" :src="editData.avatarMediaidTwo" alt="">
                      </div>
                      <div class="text">
                        <p class="name">{{editData.agentName}}</p>
                        <p class="tel">{{editData.agentMobile}}</p>
                      </div>
                    </div>
                    <div class="tips">
                      长按识别小程序码，查看楼盘详情
                    </div>
                  </div>
                  <div class="qrcode">
                    <img :src="editData.qrCode" alt="">
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div class="card-action">
         <div class="btn">
           <button @click="cancleModel">取消</button>
           <button class="submit" @click="changeModel">确认</button>
         </div>
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
          <input type="text" v-model="editData.agentMobile" maxlength="16" placeholder="请输入电话号码" @blur="blur">
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
      <p class="img-box img-box2" v-if="activeIndex===3">
        <img src="" alt="" id="share-cover-img2">
      </p>
      <p class="img-box" v-else>
        <img src="" alt="" id="share-cover-img">
      </p>
      <div class="card-action">
        <p>长按图片保存，分享给好友或朋友圈</p>
        <div class="btn">
          <button  @click="showEditFn">编辑信息</button>
          <button  @click="chooseModel">选择模板</button>
        </div>
      </div>
    </div>
    <!-- 加载中 -->
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
      editData: '', // 编辑数据
      showView: false, // 图片预览
      showEdit: false, // 显示编辑信息
      creatCover: false, // 生成海报
      showLoading: false, // 加载中
      avatarUrl: '',
      showModel: false
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
    // 取消模板
    cancleModel () {
      this.showView = true
      this.showModel = false
    },
    // 修改模板
    changeModel () {
      this.showView = true
      this.showModel = false
      this.viewCover()
    },
    // 选择模板
    chooseModel () {
      this.showView = false
      this.showModel = true
    },
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
          stretch: 40,
          depth: 40,
          modifier: 2,
          slideShadows: false
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
      let result = await marketService.getAgentLinkerPoster({agentId: agentId, linkerId : this.linkedId})
      if (result) {
        this.shareInfo = result
      }
    },
    // 初始化数据
    async initData() {
      await this.getPosterInfo(this.linkedId)
      await this.getAgentLinkerPoster(this.shareBaseInfo.agentId)
      this.editData = Object.assign({}, this.shareBaseInfo)
      this.avatarUrl = (this.shareInfo && this.shareInfo.imageUrl) || (this.shareBaseInfo.postersUrlList && this.shareBaseInfo.postersUrlList[0]) || ''
      this.showLoading = false
      if (!this.showEdit) {
        this.viewCover()
      }
    },
    // 编辑海报信息按钮
    showEditFn() {
      this.activeIndexOld = this.activeIndex
      this.showView = false
      this.showEdit = true
    },
    // 生成海报
    creatCoverFn() {
      this.showLoading = true
      this.htmlToImg()
    },
    // 生成图片
    htmlToImg() {
      let cls = `.item${this.activeIndex + 1}`
      let img = document.getElementById('share-cover-img')
      let _that = this
      let width = '300px'
      if (this.activeIndex === 3) {
        width = '224px'
        img = document.getElementById('share-cover-img2')
      }
      h2c(document.querySelector(cls), {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: width,
        heigt: '460px'
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
    // 预览名片
    async viewCover() {
      this.showLoading = true
      await this.htmlToImg()
      this.showEdit =  false
      this.showView = true
    },
    // 重置数据
    reset() {
      this.initData()
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
        agentId: this.editData.agentId,
        linkerId : this.linkedId
      })
      if (result) {
        let toast = this.$toast('保存成功')
        setTimeout(() => {
          toast.clear()
          this.viewCover()
          this.showView = true
          this.showEdit = false
        }, 500)
      }
    },
    // 键盘遮挡
    blur() {
      document.activeElement.scrollIntoViewIfNeeded(true)
    }
  },
  filters: {
    formatCity (city) {
      if (city) {
        return city.split('市').join('')
      }
    },
    formatCounty (county) {
      if (county) {
        return county === '片区' ? county :  county.indexOf('新区') > -1 ? county.split('新区').join('') : county.split('区').join('')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.share-box{
  font-size: 12px;
  margin-top: 16px;
  .card {
      width:300px;
      height:400px;
      background:rgba(255,255,255,1);
      margin: 16px auto;
      position: relative;
    }
    .item1{
      box-shadow:0px 2px 17px 0px rgba(34,47,85,0.1);
      border-radius:4px;
      background-color: #fff;
      .pic{
        width:300px;
        height:225px;
        border-radius:4px 4px 0px 0px;
        overflow: hidden;
        img{
          min-width: 300px;
          min-height: 225px;
          object-fit: cover;
        }
      }
      .linker-box{
        margin: 20px 16px;
        display: flex;
        padding-bottom: 16px;
        .linker-info{
          flex: 1;
          .name{
            max-width: 170px;
            font-size:18px;
            font-weight:600;
            color:rgba(26,39,51,1);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .address{
            font-size:10px;
            font-weight:400;
            color:rgba(145,149,153,1);
            line-height:14px;
            margin-top: 8px;
          }
        }
        .linker-price{
          .price{
            font-size:16px;
            color:rgba(234,77,46,1);
            font-weight: 600;
          }
          .tips{
            height:14px;
            font-size:10px;
            font-weight:400;
            color:rgba(145,149,153,1);
            line-height:14px;
            text-align: right;
            margin-top: 8px;
          }
        }
      }
      .agent-box{
        display: flex;
        margin: 0 16px;
        .agent-info{
          flex: 1;
          margin-top: 5px;
          .agent-cnt{
            display: flex;
            .img{
              img{
                width: 32px;
                height: 32px;
                border-radius: 50%;
                margin-right: 8px;
              }
            }
            .text{
              flex: 1;
              max-width: 140px;
              .name{
                font-size:12px;
                font-weight:600;
                color:rgba(26,39,51,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .tel{
                font-size:10px;
                font-weight:400;
                color:rgba(145,149,153,1);
                margin-top: 5px;
              }
            }
          }
          .tips{
            font-size:10px;
            font-weight:400;
            color:#C6C9CC;
            margin-top: 5px;
          }
        }
        .qrcode{
          width: 64px;
          img{
            width: 64px;
            height: 64px;
          }
        }
      }
    }
    .item2{
      box-shadow:0px 2px 17px 0px rgba(34,47,85,0.1);
      border-radius:4px;
      background-color: #fff;
      .pic{
        width:300px;
        height:225px;
        border-radius:4px 4px 0px 0px;
        overflow: hidden;
        img{
          min-width: 300px;
          min-height: 225px;
          object-fit: cover;
        }
      }
      .linker-box{
        margin-bottom: 25px;
        .name{
          margin: 10px 16px;
          font-size:16px;
          font-weight:600;
          color:rgba(26,39,51,1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .linker-item{
          display: flex;
          margin: 0 16px;
          .price,.area,.build{
            .title{
              font-size:10px;
              font-weight:400;
              color:rgba(145,149,153,1);
              line-height:14px;
            }
            .text{
              font-size:14px;
              font-weight:600;
              color:rgba(234,77,46,1);
              margin-top: 5px;
            }
          }
          .area{
            margin: 0 30px;
            .text {
              max-width: 80px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
      .agent-box{
        display: flex;
        margin: 0 16px;
        .agent-info{
          flex: 1;
          margin-top: 5px;
          .agent-cnt{
            display: flex;
            .img{
              img{
                width: 32px;
                height: 32px;
                border-radius: 50%;
                margin-right: 8px;
              }
            }
            .text{
              flex: 1;
              max-width: 140px;
              .name{
                font-size:12px;
                font-weight:600;
                color:rgba(26,39,51,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .tel{
                font-size:10px;
                font-weight:400;
                color:rgba(145,149,153,1);
                margin-top: 5px;
              }
            }
          }
          .tips{
            font-size:10px;
            font-weight:400;
            color:#C6C9CC;
            margin-top: 5px;
          }
        }
        .qrcode{
          width: 64px;
          img{
            width: 64px;
            height: 64px;
          }
        }
      }
    }
    .item3{
      box-shadow:0px 2px 17px 0px rgba(34,47,85,0.1);
      border-radius:4px;
      background-color: #fff;
      .pic{
        width:300px;
        height:225px;
        border-radius:4px 4px 0px 0px;
        overflow: hidden;
        img{
          min-width: 300px;
          min-height: 225px;
          object-fit: cover;
        }
      }
      .linker-box{
        background-color: #fff;
        box-shadow:0px 0px 16px 0px rgba(0,0,0,0.1);
        border-radius:4px;
        margin: -55px 16px 40px 16px;
        z-index: 9;
        padding: 5px 0 20px;
        position: relative;
        border: 1px solid #f5f5f5;
        .name{
          margin: 10px 16px 20px 16px;
          font-size:16px;
          font-weight:600;
          color:rgba(26,39,51,1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .linker-item{
          display: flex;
          margin: 0 16px;
          .price,.area,.build{
            .title{
              font-size:10px;
              font-weight:400;
              color:rgba(145,149,153,1);
              line-height:14px;
            }
            .text{
              font-size:14px;
              font-weight:600;
              color:rgba(234,77,46,1);
              margin-top: 5px;
            }
          }
          .area{
            margin: 0 30px;
            .text {
              max-width: 80px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
      .agent-box{
        display: flex;
        margin: 0 16px;
        .agent-info{
          flex: 1;
          margin-top: 5px;
          .agent-cnt{
            display: flex;
            .img{
              img{
                width: 32px;
                height: 32px;
                border-radius: 50%;
                margin-right: 8px;
              }
            }
            .text{
              flex: 1;
              max-width: 140px;
              .name{
                font-size:12px;
                font-weight:600;
                color:rgba(26,39,51,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .tel{
                font-size:10px;
                font-weight:400;
                color:rgba(145,149,153,1);
                margin-top: 5px;
              }
            }
          }
          .tips{
            font-size:10px;
            font-weight:400;
            color:#C6C9CC;
            margin-top: 5px;
          }
        }
        .qrcode{
          width: 64px;
          margin-top: -4px;
          img{
            width: 64px;
            height: 64px;
          }
        }
      }
    }
    .card2 {
      box-shadow:0px 2px 17px 0px rgba(34,47,85,0.1);
      border-radius:4px;
    }
    .item4{
      background-color: #fff;
      width:224px;
      height:400px;
      margin: auto;
      overflow: hidden;
      .pic{
        width: 224px;
        height:326px;
        // border-radius:4px 4px 0px 0px;
        margin-bottom: 5px;
        margin: auto;
        img{
          width: 224px;
          height: 326px;
          object-fit: cover;
        }
      }
      .agent-box{
        display: flex;
        width: 224px;
        margin: auto;
        padding: 0 13px;
        box-sizing: border-box;
        .agent-info{
          flex: 1;
          margin-top: 5px;
          .agent-cnt{
            display: flex;
            margin-top: 16px;
            .img{
              img{
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin-right: 6px;
              }
            }
            .text{
              flex: 1;
              max-width: 140px;
              .name{
                font-size:10px;
                font-weight:600;
                color:rgba(26,39,51,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .tel{
                font-size:8px;
                font-weight:400;
                color:rgba(145,149,153,1);
                margin-top: 5px;
              }
            }
          }
          .tips{
            font-size:8px;
            font-weight:400;
            color: #C6C9CC;
            margin-top: 5px;
          }
        }
        .qrcode{
          width: 44px;
          margin-top: 16px;
          img{
            width: 44px;
            height: 44px;
          }
        }
      }
    }
  .card-action{
    text-align: center;
    font-weight: 400;
    margin-top: 20px;
    p{
      color: #1A2733;
      margin-top: 12px;
    }
    .btn{
      display: flex;
      margin: 30px 20px 15px 20px;
      button{
        flex: 1;
        height:44px;
        background:rgba(240,243,245,1);
        border-radius:4px;
        border: none;
        color: #666;
        &:nth-child(1){
          margin-right: 10px;
        }
      }
    }
  }
  .card-model{
    height: 100%;
    .swiper-container {
      width: 100%;
      height: 100%;
      box-sizing: content-box;
    }
    .card-action{
      button:nth-child(2){
        background-color: #007AE6;
        color: #fff;
      }
    }
  }
  // 预览名片
  .share-cover-img {
    width:300px;
    height:400px;
    background:rgba(255,255,255,1);
    margin: 16px auto;
    .img-box {
      height: 400px;
      width: 300px;
      box-shadow:0px 2px 17px 0px rgba(34,47,85,0.1);
      border-radius:4px;
      text-align: center;
    }
    .img-box2 {
      height: 400px;
      width: 224px;
      margin: auto;
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
          background-color: #eee;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
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

