<template>
  <div class="share-box">
    <!-- 名片海报选择 -->
    <div class="share-card" :style="{'opacity': !showEdit ? 1 : 0, 'height':!showEdit ? '100%' : 0}">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="card-info card1">
              <div class="avat">
                <img :src="editData.avatarUrl" alt="封面">
              </div>
              <div class="name text-one-line">
                <h3>{{editData.agentName}}</h3>
                <span v-show="editData.agentName === shareBaseInfo.agentName">{{editData.pinyin}}</span>
              </div>
              <div class="qrcode">
                <img :src="editData.miniQrCode" alt="小程序">
                <span>长按识别更多</span>
              </div>
              <div class="data-info">
                <img class="bg" src="../../../assets/img/share/card1.png" alt="">
                <h3>{{editData.signature}}</h3>
                <p><span>Tel :</span>{{editData.mobile}}</p>
                <p><span>Col :</span>{{editData.institutionName}}</p>
                <p><span>Add:</span>{{editData.mojarRegion}}</p>
              </div>

            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-info card2">
              <div class="avat">
                <img :src="editData.avatarUrl" alt="封面" />
              </div>
              <div class="data-info">
                <img class="bg" src="../../../assets/img/share/card2.png" alt="" />
                <div class="data-info-box">
                  <div class="data">
                    <div class="name text-one-line">
                      <b>{{editData.agentName}}</b>
                      <span v-show="editData.agentName === shareBaseInfo.agentName">{{editData.pinyin}}</span>
                    </div>
                    <div class="info">
                      <p><span>Tel :</span>{{editData.mobile}}</p>
                      <p><span>Col :</span>{{editData.institutionName}}</p>
                      <p><span>Add:</span>{{editData.mojarRegion}}</p>
                    </div>
                  </div>
                  <div class="qrcode">
                    <img :src="editData.miniQrCode" alt="小程序">
                    <span>长按识别更多</span>
                  </div>
                </div>
                <div class="signature">
                  {{editData.signature}}
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-info card3">
              <div class="avat">
                <div class="img"><img :src="editData.avatarUrl" alt="封面" /></div>
                <p>{{editData.signature}}</p>
              </div>
              <div class="name">
                <h3>{{editData.agentName}}</h3>
                <span>{{editData.mobile}}</span>
              </div>
              <div class="data-info">
                <p><span>Col : </span>{{editData.institutionName}}</p>
                <p><span>Add: </span>{{editData.mojarRegion}}</p>
              </div>
              <div class="qrcode">
                <img :src="editData.miniQrCode" alt="小程序" >
                <span>长按识别更多</span>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-info card4">
              <div class="avat">
                <img :src="editData.avatarUrl" alt="封面" />
              </div>
              <div class="data-info">
                <img src="../../../assets/img/share/card4.png" alt="" class="bg">
                <div class="data-info-box">
                  <div class="data">
                    <div class="name text-one-line">
                      <b>{{editData.agentName}}</b>
                      <span v-show="editData.agentName === shareBaseInfo.agentName">{{editData.pinyin}}</span>
                    </div>
                    <div class="info">
                      <p><span>Tel :</span>{{editData.mobile}}</p>
                      <p><span>Col :</span>{{editData.institutionName}}</p>
                      <p><span>Add:</span>{{editData.mojarRegion}}</p>
                    </div>
                  </div>
                  <div class="qrcode">
                    <img :src="editData.miniQrCode" alt="小程序">
                    <span>长按识别更多</span>
                  </div>
                </div>
                <div class="signature">
                  <p>{{editData.signature}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-info card5">
              <div class="vata">
                <img :src="editData.avatarUrl" alt="封面" />
              </div>
              <div class="qrcode">
                <img :src="editData.miniQrCode" alt="小程序">
              </div>
              <div class="data-info">
                <div class="name">
                  <b>{{editData.agentName}}</b>
                  <span v-show="editData.agentName === shareBaseInfo.agentName">{{editData.pinyin}}</span>
                </div>
                <div class="info">
                  <p><span>Tel :</span>{{editData.mobile}}</p>
                  <p><span>Col :</span>{{editData.institutionName}}</p>
                  <p><span>Add:</span>{{editData.mojarRegion}}</p>
                  <p class="signature">{{editData.signature}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-info card6">
              <div class="vata">
                <img :src="editData.avatarUrl" alt="封面" />
              </div>
              <div class="name text-one-line">
                <b>{{editData.agentName}}</b>
                <span v-show="editData.agentName === shareBaseInfo.agentName">{{editData.pinyin}}</span>
              </div>
              <div class="data-info">
                <div class="data-info-box">
                  <div class="data">
                    <div class="info">
                      <p><span>Tel :</span>{{editData.mobile}}</p>
                      <p><span>Col :</span>{{editData.institutionName}}</p>
                      <p><span>Add:</span>{{editData.mojarRegion}}</p>
                    </div>
                  </div>
                  <div class="qrcode">
                    <img :src="editData.miniQrCode" alt="小程序">
                    <span>长按识别更多</span>
                  </div>
                </div>
                <div class="signature">
                  <p>{{editData.signature}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="swiper-pagination"></div> -->
      </div>
      <div class="share-card-action">
        <button type="button" class="edit" @click="showEditFn">编辑海报信息</button>
        <button type="button" class="save" @click="creatCoverFn">生成海报</button>
      </div>
    </div>

    <!-- 名片海报信息编辑 -->
    <div class="share-detail-edit" v-show="showEdit">
      <div class="form">
        <div class="group-item">
          <span>姓名</span>
          <input type="text" v-model="editData.agentName" maxlength="16" placeholder="请输入姓名">
        </div>
        <div class="group-item">
          <span>经纪人电话</span>
          <input type="text" v-model="editData.mobile" maxlength="11" placeholder="请输入电话号码">
        </div>
        <div class="group-item">
          <span>机构地址</span>
          <input type="text" v-model="editData.mojarRegion" placeholder="请输入机构地址">
        </div>
        <div class="group-item">
          <span>宣传语</span>
          <input type="text" v-model="editData.signature" maxlength="48" placeholder="请输入宣传语">
        </div>
        <div class="group-upload">
          <p class="title">选择名片封面</p>
          <div class="img-box">
            <div class="img-item" @click="editData.avatarUrl = shareBaseInfo.avatarUrl">
              <img :src="shareBaseInfo.avatarUrl" alt="">
              <van-icon name="success" v-show="editData.avatarUrl === shareBaseInfo.avatarUrl" />
            </div>
            <div class="img-item" @click="editData.avatarUrl = uploadImg" v-show="shareBaseInfo.avatarUrl !== uploadImg">
              <img :src="uploadImg" alt="">
              <van-icon name="success" v-show="editData.avatarUrl === uploadImg"/>
            </div>
            <div class="uploader-box">
              <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png">
                <van-icon name="plus" />
              </van-uploader>
            </div>
          </div>
        </div>
      </div>
      <div class="action-box scale-1px">
        <span class="reset" @click="reset">
          <img src="../../../assets/img/share/reset.png" alt="" srcset=""> 重置
        </span>
        <span class="view" @click="viewCover">
          <img src="../../../assets/img/share/view.png" alt="" srcset=""> 预览
        </span>
        <button @click="updateAgentCard">保存信息</button>
      </div>
    </div>
    <!-- 名片海报预览 -->
    <div class="share-cover-img" v-show="showView">
      <p class="img-box">
        <img src="" alt="" id="share-cover-img">
      </p>
      <p class="btn btnview" v-if="!creatCover">
        <button class="close" @click="closeView">关闭预览</button>
        <button class="save" @click="updateAgentCard">保存信息</button>
      </p>
      <p class="btn" v-else>
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
  import {
    mapGetters
  } from 'vuex'
  import h2c from 'html2canvas'
  import userService from '@/services/userService'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import { randomString, dataURLtoBlob, checkStrLength, checkStrType, checkPhoneNum, downloadFile } from '@/utils/tool'
  import CosCloud from 'cos-js-sdk-v4'
  export default {
    data() {
      return {
        agentId: 1,
        shareBaseInfo: {}, // 默认数据
        shareInfo: {}, // 用户修改数据
        activeIndex: 1, // 初始化模板索引
        editData: {}, // 编辑数据
        showView: false, // 图片预览
        showEdit: false, // 显示编辑信息
        creatCover: false, // 生成海报
        showLoading: false, // 加载中
        cos: null, //封面照片
        appId: '10037467',
        bucket: '720ljq2test',
        region: 'sh',
        uploadImg: ''
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    created() {
      this.showLoading = true
      this.agentId = this.$route.query.agentId
      this.initData()
      this.initCos()
    },
    mounted() {
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
          slideChange: function () {
            // 当前激活的海报index索引
            _that.activeIndex = this.activeIndex
          }
        }
      })
    },
    methods: {
      // 获取分享卡片详情
      async getCardInfo() {
        let result = await userService.getQrCodeWithToken()
        if (result) {
          this.shareBaseInfo = result
        }
      },
      // 获取代理商卡片
      async getAgentCard() {
        let result = await userService.getAgentCard()
        if (result) {
          this.shareInfo = result
        }
      },
      // 初始化数据
      async initData () {
        await this.getCardInfo()
        await this.getAgentCard()
        this.editData = Object.assign({}, this.shareBaseInfo, this.shareInfo)
        // 合并两个接口参数
        this.editData.mobile = this.editData.agentMobile || this.editData.mobile
        this.editData.avatarUrl = this.editData.imageUrl || this.editData.avatarUrl
        this.editData.signature = this.editData.slogan || this.editData.signature
        this.editData.mojarRegion = this.editData.institutionalAddress || this.editData.mojarRegion
        this.uploadImg = this.editData.avatarUrl
        this.showLoading = false
      },
      // 编辑海报信息按钮
      showEditFn () {
        this.showEdit = true
      },
      // 生成海报
      creatCoverFn () {
        this.showLoading = true
        this.creatCover = true
        this.htmlToImg()
      },
      // 生成图片
      htmlToImg () {
        let cls = `.card${this.activeIndex + 1}`
        let img =document.getElementById('share-cover-img')
        let _that = this
        h2c(document.querySelector(cls), {
          backgroundColor: null,
          scale: 3,
          useCORS: true,
          allowTaint: false,
          logging: false,
          width: '260px',
          heigt: '420px'
        }).then(canvas => {
          let dataURL = canvas.toDataURL()
          img.src = dataURL
          _that.showView =  true
          _that.showLoading = false
        })
      },
      // 关闭预览
      closeView () {
        this.showView = false
      },
      // 下载图片
      downLoad () {
        let img =document.getElementById('share-cover-img')
        let data = img.getAttribute('src')
        downloadFile(data, '名片')
        let toast = this.$toast('下载成功')
        setTimeout(() => {
          toast.clear()
          this.showView = false
        }, 1000)
      },
      // 预览名片
      async viewCover () {
        this.creatCover = false
        this.showLoading = true
        await this.htmlToImg()
        this.showView = true
      },
      // 重置数据
      reset () {
        this.initData()
      },
      // 保存名片信息
      async updateAgentCard () {
        let name = this.editData.agentName
        let mobile = this.editData.mobile
        let slogan = this.editData.signature
        let mojarRegion = this.editData.mojarRegion
        if (!name) {
          return this.$toast('姓名不能为空')
        }
        if (!checkStrLength(name, 16)) {
          return this.$toast('姓名最多8个汉字(或16个字符)')
        }
        if (!checkStrType(name)) {
          return this.$toast('姓名只支持中文、英文和数字')
        }
        if (!checkPhoneNum(mobile)) {
          return this.$toast('电话只能为11位数字')
        }
        let reg = /^[\u4E00-\u9FA5A-Za-z0-9\！\.\,\，\。\!\?\？\'\"\’\‘\“\”]+$/g
        if (!reg.test(slogan)) {
          return this.$toast('宣传语只支持中文、英文和数字')
        }
        if (!checkStrLength(slogan, 48)) {
           return this.$toast('宣传语最多为24个汉字')
        }
        let reg2 = /^[\u4E00-\u9FA5A-Za-z0-9\/\\]+$/g
        if (!reg2.test(mojarRegion)) {
          return this.$toast('机构地址只支持中文、英文和数字')
        }
        if (!checkStrLength(mojarRegion, 48)) {
           return this.$toast('机构地址最多为24个汉字')
        }

        let result = await userService.updateAgentCard({
          // agentId: this.agentId,
          imageUrl: this.editData.avatarUrl,
          slogan: this.editData.signature,
          institutionalAddress: this.editData.mojarRegion,
          agentMobile: this.editData.mobile,
          agentName: this.editData.agentName
        })
        if (result) {
          let toast = this.$toast('保存成功')
          // this.initData()
          setTimeout(() => {
            toast.clear()
            this.showView = false
            this.showEdit = false
          }, 500)
        }
      },
      // 图片上传
      onRead (file) {
        let imgData = file.content
        let image = new Image()
        image.src = imgData
        if (imgData.length > 100 * 1024) {
          let that = this
          image.onload = function() {
            imgData = that.compress(image, '')
          }
        }
        this.postImg(imgData)
      },
      // 上传图片签名
      async initCos () {
        let result = await userService.getCosAppSign()
        if (result) {
          this.cos = new CosCloud({
            appid: this.appId,
            bucket: this.bucket,
            region: this.region,
            getAppSign: function(callback) {
              callback(result.signature)
            },
            getAppSignOnce: function(callback) {
              callback(result.signature)
            }
          })
        }
      },
      //图片的上传
      postImg (imageData) {
        this.showLoading = true
        var file = dataURLtoBlob(imageData)
        this.cos.uploadFile(this.uploadSuccess, this.uploadError, null, this.bucket, randomString(16), file, 0, null)
      },
      uploadSuccess (result) {
        let res_data = result.data
        if (res_data) {
          this.uploadImg = res_data.access_url
          this.editData.avatarUrl = res_data.access_url
        } else {
          console.log('上传失败')
        }
        this.showLoading = false
      },
      uploadError (err) {
        this.showLoading = false
        console.log(err)
      },
      //图片压缩
      compress: function(img, Orientation) {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        //瓦片canvas
        let tCanvas = document.createElement('canvas')
        let tctx = tCanvas.getContext('2d')
        let initSize = img.src.length
        let width = img.width
        let height = img.height

        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio
        if ((ratio = (width * height) / 4000000) > 1) {
          console.log('大于400万像素')
          ratio = Math.sqrt(ratio)
          width /= ratio
          height /= ratio
        } else {
          ratio = 1
        }
        canvas.width = width
        canvas.height = height
        //        铺底色
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        //如果图片像素大于100万则使用瓦片绘制
        let count
        if ((count = (width * height) / 1000000) > 1) {
          count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
          //            计算每块瓦片的宽和高
          let nw = ~~(width / count)
          let nh = ~~(height / count)
          tCanvas.width = nw
          tCanvas.height = nh
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height)
        }
        //修复ios上传图片的时候 被旋转的问题
        if (Orientation != '' && Orientation != 1) {
          switch (Orientation) {
            case 6: //需要顺时针（向左）90度旋转
              this.rotateImg(img, 'left', canvas)
              break
            case 8: //需要逆时针（向右）90度旋转
              this.rotateImg(img, 'right', canvas)
              break
            case 3: //需要180度旋转
              this.rotateImg(img, 'right', canvas) //转两次
              this.rotateImg(img, 'right', canvas)
              break
          }
        }
        //进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.8)
        console.log('压缩前：' + initSize)
        console.log('压缩后：' + ndata.length)
        console.log('压缩率：' + ~~((100 * (initSize - ndata.length)) / initSize) + '%')
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0

        return ndata
      },
      //图片旋转
      rotateImg: function(img, direction, canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0
        const max_step = 3
        if (img == null) return
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height
        let width = img.width
        let step = 2
        if (step == null) {
          step = min_step
        }
        if (direction == 'right') {
          step++
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step)
        } else {
          step--
          step < min_step && (step = max_step)
        }
        //旋转角度以弧度值为参数
        let degree = (step * 90 * Math.PI) / 180
        let ctx = canvas.getContext('2d')
        switch (step) {
          case 0:
            canvas.width = width
            canvas.height = height
            ctx.drawImage(img, 0, 0)
            break
          case 1:
            canvas.width = height
            canvas.height = width
            ctx.rotate(degree)
            ctx.drawImage(img, 0, -height)
            break
          case 2:
            canvas.width = width
            canvas.height = height
            ctx.rotate(degree)
            ctx.drawImage(img, -width, -height)
            break
          case 3:
            canvas.width = height
            canvas.height = width
            ctx.rotate(degree)
            ctx.drawImage(img, -width, 0)
            break
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .share-box {
    height: 100%;
    .share-card {
      background: linear-gradient(46deg, rgba(37, 39, 55, 1) 0%, rgba(72, 76, 98, 1) 100%);
      height: 100%;
      font-size: 14px;

      .swiper-container {
        width: 100%;
        height: 420px;
        padding-top: 48px;
        box-sizing: content-box;

        .card-info {
          width: 260px;
          margin: auto;
          height: 100%;
          position: relative;

          &.card1 {
            background-color: #113460;          
              .avat {
                position: relative;
                height: 260px;
                z-index: 1;
                text-align: center;
                overflow: hidden;
                img {
                  width: auto;
                  min-height: 100%;
                }
              }
            .name {
              position: absolute;
              left: 10px;
              top: 160px;
              color: #fff;
              border-bottom: 2px solid #0069CA;
              padding-bottom: 5px;
              max-width: 140px;
              z-index: 4;
              text-shadow: 0 0 5px #000;
              h3 {
                font-size: 24px;
              }

              span {
                font-size: 12px;
              }
            }
            .qrcode {
              position: absolute;
              top: 36%;
              right: 5px;
              z-index: 3;
              width: 80px;
              color: #fff;
              text-align: center;

              img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
              }

              span {
                display: block;
                padding-top: 5px;
                text-align: center;
                opacity: 0.44;
                font-size: 8px;
              }
            }

            .data-info {
              position: relative;
              // background: url('../../../assets/img/share/card1.png') no-repeat left top;
              // backgr7und-size: cover;
              margin-top: -80px;
              z-index: 2;
              height: 280px;
              color: #fff;
              padding: 0 20px;
              overflow: hidden;
              img.bg{
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                height: 100%;
                z-index: -1;
              }
              h3 {
                padding-top: 40%;
                font-size: 14px;
                // line-height: 1.4;
                margin-bottom: 15px;
              }

              p {
                font-size: 12px;
                opacity: 0.6;
                margin-bottom: 5px;
                line-height: 1.5;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

                span {
                  display: inline-block;
                  padding-right: 8px;
                  text-align: right;
                  min-width: 25px;
                }
              }
            }
          }

          &.card2 {
            .avat {
              position: relative;
              height: 220px;
              z-index: 1;
              text-align: center;
              overflow: hidden;
              img {
                width: auto;
                min-height: 100%;
              }
            }

            .data-info {
              // background: url('../../../assets/img/share/card2.png') no-repeat left top;
              // background-size: cover;
              min-height: 220px;
              width: 100%;
              left: -1px;
              margin-top: -20px;
              padding-right: 2px;
              position: relative;
              z-index: 2;
              img.bg{
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                height: 100%;
                z-index: -1;
              }
              .data-info-box {
                display: flex;

                .data {
                  padding-top: 30px;
                  padding: 20px 0 10px 20px;
                  color: #fff;
                  flex: 1;

                  .name {
                    padding-top: 15px;
                    padding-bottom: 15px;
                    max-width: 140px;
                    b {
                      font-size: 20px;
                    }

                    span {
                      font-size: 12px;
                      opacity: 0.8;
                      padding-left: 10px;
                    }
                  }

                  .info {
                    p {
                      font-size: 12px;
                      opacity: 0.6;
                      margin-bottom: 8px;

                      span {
                        display: inline-block;
                        padding-right: 8px;
                        text-align: right;
                        min-width: 25px;
                      }
                    }

                  }
                }

                .qrcode {
                  width: 80px;
                  text-align: center;
                  color: #fff;
                  margin-top: 30px;

                  img {
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                  }

                  span {
                    display: block;
                    font-size: 8px;
                    opacity: 0.44;
                    padding-top: 5px;
                  }
                }
              }

              .signature {
                padding: 0 20px 5px 20px;
                font-size: 14px;
                opacity: 0.5;
                color: #fff;
                // line-height: 1.5;
                text-align: center;
              }
            }
          }

          &.card3 {
            background-color: #14355F;

            .avat {
              text-align: center;
              padding: 15px 20px;
              .img{
                width: 120px;
                height: 120px;
                overflow: hidden;
                border-radius: 50%;
                margin: auto;
              }
              img {
                min-width: 120px;
                min-height: 120px;
              }

              p {
                font-size: 14px;
                opacity: 0.5;
                padding-top: 8px;
                color: #fff;
                // line-height: 1.5;
              }
            }

            .name {
              background-color: rgba(255, 255, 255, 0.1);
              padding: 10px;
              text-align: center;
              color: #fff;

              h3 {
                font-size: 24px;
                padding-bottom: 5px;
              }

              span {
                font-size: 12px;
                opacity: 0.6;
              }
            }

            .data-info {
              color: #fff;
              opacity: 0.6;
              text-align: center;
              padding-top: 15px;

              p {
                font-size: 12px;
                padding-bottom: 8px;
              }
            }

            .qrcode {
              padding-top: 15px;
              text-align: center;
              color: #fff;

              img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
              }

              span {
                display: block;
                opacity: 0.6;
                font-size: 8px;
                padding-top: 5px;
              }
            }
          }

          &.card4 {
            overflow: hidden;
            .avat {
              position: relative;
              height: 220px;
              z-index: 1;
              overflow: hidden;
              img {
                width: auto;
                min-height: 100%;
              }
            }

            .data-info {
              // background: url('../../../assets/img/share/card4.png') no-repeat left top;
              // background-size: cover;
              min-height: 240px;
              width: 100%;
              margin-top: -40px;
              padding-right: 2px;
              position: relative;
              left: -1px;
              z-index: 2;
              img.bg{
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                z-index: -1;
                height: 100%;
              }
              .data-info-box {
                display: flex;

                .data {
                  padding-top: 30px;
                  padding: 20px 0 10px 20px;
                  color: #14355F;
                  flex: 1;

                  .name {
                    padding-top: 15px;
                    padding-bottom: 15px;
                    max-width: 140px;
                    b {
                      font-size: 20px;
                    }

                    span {
                      font-size: 12px;
                      opacity: 0.8;
                      padding-left: 10px;
                    }
                  }

                  .info {
                    p {
                      font-size: 12px;
                      opacity: 0.6;
                      margin-bottom: 8px;

                      span {
                        display: inline-block;
                        padding-right: 8px;
                        text-align: right;
                        min-width: 25px;
                      }
                    }
                  }
                }

                .qrcode {
                  width: 80px;
                  text-align: center;
                  color: #14355F;
                  margin-top: 40px;

                  img {
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                  }

                  span {
                    display: block;
                    font-size: 8px;
                    opacity: 0.44;
                    padding-top: 5px;
                  }
                }
              }

              .signature {
                margin: 5px 20px;
                padding: 10px 0 5px;
                font-size: 14px;
                opacity: 0.5;
                color: #14355F;
                // line-height: 1.5;
                text-align: center;
                position: relative;
                border: none;

                &:after {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  background: #14355F;
                  width: 100%;
                  height: 1px;
                  -webkit-transform: scaleY(0.5);
                  transform: scaleY(0.5);
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }
            }
          }

          &.card5 {
            background-color: #fff;

            .vata {
              position: relative;
              height: 220px;
              z-index: 1;
              text-align: center;
              overflow: hidden;
              img {
                width: auto;
                min-height: 100%;
              }
            }

            .qrcode {
              width: 80px;
              margin: -40px auto 0;
              text-align: center;
              color: #14355F;
              z-index: 3;
              position: relative;

              img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
              }
            }

            .data-info {
              position: relative;
              z-index: 2;
              padding: 10px 20px 0 20px;
              color: #14355F;

              .name {
                margin-bottom: 10px;

                b {
                  font-size: 24px;
                }

                span {
                  padding-left: 10px;
                  font-size: 12px;
                }
              }

              .info {
                font-size: 12px;
                opacity: 0.6;
                margin-bottom: 8px;

                p {
                  margin: 5px;
                }
                .signature{
                    margin-top: 10px;
                    font-size: 14px;
                  }
                span {
                  display: inline-block;
                  padding-right: 8px;
                  text-align: right;
                  min-width: 25px;
                }
              }
            }
          }

          &.card6 {
            overflow: hidden;
            .vata {
              position: relative;
              height: 290px;
              z-index: 1;
              text-align: center;
              overflow: hidden;
              img {
                min-height: 100%;
                min-width: 100%;
                max-width: 120%;
                margin-left: -10%;
              }
            }

            .name {
              position: relative;
              z-index: 2;
              height: 60px;
              color: #fff;
              background: none;
              margin-top: -60px;
              padding: 0 20px;
              max-width: 140px;
              b {
                font-size: 24px;
                text-shadow: 0 0 5px #000;
              }

              span {
                font-size: 12px;
                opacity: 0.8;
                padding-left: 10px;
                text-shadow: 0 0 5px #000;
              }
            }

            .data-info {
              background: url('../../../assets/img/share/card6.png') no-repeat left top;
              background-size: cover;
              width: 100%;
              margin-top: -10px;
              position: relative;
              height: 120px;
              z-index: 2;
              padding-top: 15px;
              .data-info-box {
                display: flex;

                .data {
                  padding: 0 0 0 20px;
                  color: #14355F;
                  flex: 1;

                  .info {
                    p {
                      font-size: 12px;
                      opacity: 0.6;
                      margin-bottom: 5px;

                      span {
                        display: inline-block;
                        padding-right: 8px;
                        text-align: right;
                        min-width: 25px;
                      }
                    }
                  }
                }

                .qrcode {
                  width: 80px;
                  text-align: center;
                  color: #14355F;
                  margin-top: -50px;

                  img {
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                  }

                  span {
                    display: block;
                    font-size: 8px;
                    opacity: 0.44;
                    padding-top: 5px;
                  }
                }
              }

              .signature {
                margin: 5px 20px;
                font-size: 14px;
                opacity: 0.5;
                color: #14355F;
                // line-height: 1.5;
              }
            }
          }
        }
      }

      .share-card-action {
        position: absolute;
        width: 100%;
        bottom: 24px;
        text-align: center;

        button {
          width: 144px;
          height: 44px;
          border-radius: 6px;
          color: #fff;
          border: none;
          margin: 0 10px;
          border: #007AE6 1px solid;
          &.edit {
            background:linear-gradient(46deg,rgba(37,39,55,1) 0%,rgba(72,76,98,1) 100%);
            color: #007AE6;
          }
          &.save {
            background: rgba(0, 122, 230, 1);
          }
        }
      }
    }
    // 编辑信息
    .share-detail-edit{
      height: 100%;
      background-color: #F7F9FA;
      padding-top: 10px;
      position: relative;
      box-sizing: content-box;
      // .form{
      //   padding-bottom: 72px;
      // }
      .group-item{
        background-color: #fff;
        border: none;
        position: relative;
        height: 56px;
        line-height: 56px;
        display: flex;
        padding: 0 15px;
        &:after{
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
        span{
          width: 95px;
          font-size: 16px;
        }
        input{
          height: 30px;
          line-height: 30px;
          padding: 13px 10px 13px 5px;
          flex: 1;
          border: none;
          font-size: 14px;
          text-align: right;
          color: #445166;
          &:disabled{
            background-color: #fff;
          }
        }
      }
      .group-upload{
        margin: 10px 0;
        background-color: #fff;
        padding: 10px 20px;
        .title{
          font-size: 16px;
        }
        .img-box{
          margin: 15px 0 0 0;
          .img-item{
            vertical-align: middle;
            position: relative;
            width: 100px;
            height: 75px;
            display: inline-block;
            margin-right: 15px;
            overflow: hidden;
            img{
              min-width: 100%;
              min-height: 100%;
            }
            .van-icon{
              background-color: #007AE6;
              color: #fff;
              border-radius: 50%;
              position: absolute;
              right: 2px;
              top: 2px;
              font-size: 20px;
            }
          }
        }
        .uploader-box{
          display: inline-block;
          vertical-align: middle;
          height: 75px;
          .van-uploader{
            height: 75px;
            width: 100px;
            text-align: center;
            line-height: 75px;
            background-color: #F4F5F6;
          }
        }
      }
      .action-box{
        position: fixed;
        height: 72px;
        width: 100%;
        bottom: 0;
        display: flex;
        background-color: #fff;
        span{
          display: inline-block;
          width: 24px;
          height: 72px;
          box-sizing: content-box;
          padding: 0 10px;
          margin-right: 30px;
          font-size: 10px;
          color: #666;
          &.reset{
            margin-left: 20px;
          }
          img{
            padding-top: 20px;
          }
        }
        button{
          width:184px;
          height:44px;
          background:rgba(0,122,230,1);
          border-radius:6px;
          color: #fff;
          border: none;
          margin-top: 19px;
          font-size: 14px;
        }
      }
    }
    // 预览名片
    .share-cover-img{
      position: fixed;
      z-index: 3;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background:rgba(37,39,55,1);
      .img-box{
        height: 420px;
        width: 260px;
        margin: 48px auto 15px auto;
      }
      .btn{
        width: 260px;
        margin: auto;
        font-size: 14px;
        color: #fff;
        text-align: center;
        span{
          display: block;
          padding-bottom: 25px;
          font-size: 12px;
          opacity: 0.5;
        }
        button{
          height: 44px;
          width: 120px;
          border-radius:6px;
          border: none;
          border:1px solid #007AE6;
          &.close{
            margin-right: 20px;
            background:linear-gradient(46deg,rgba(37,39,55,1) 0%,rgba(72,76,98,1) 100%);
            color: #007AE6;
          }
          &.save{
            background-color: #007AE6;
          }
        }
        &.btnview{
          margin-top: 30px;
        }
      }
    }
    // loading
    .loading{
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