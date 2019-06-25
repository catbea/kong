<template>
  <div class="share-box">
    <!-- 名片海报选择 -->
    <div class="card-model" :style="{'opacity': showModel ? 1 : 0, 'height': showModel ? '100%' : 0}">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="card item1">
              <div class="pic">
                <img :src="editData.avatarUrl" alt="">
              </div>
              <div class="agent-info">
                <p class="name-box"><span class="name">{{editData.agentName}}</span><span class="tel">{{editData.mobile}}</span></p>
                <!-- <p class="signature">{{editData.signature}}</p> -->
                <p class="signature">房地产从业时间{{editData.workingTime | formatWorkTime}}的{{editData.saleType || '买卖经纪人'}}</p>
              </div>
              <div class="qrcode-box">
                <div class="tips">
                  <p class="logo"><img src="../../../assets/img/user/share/logo.png" alt="">AW大师</p>
                  <p class="text">长按识别小程序码，进入我的名片</p>
                </div>
                <div class="qrcode">
                  <img :src="editData.miniQrCode" alt="小程序">
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card item2">
              <div class="type2-cnt">
              <div class="logo">
                <img src="../../../assets/img/user/share/logo.png" alt="">AW大师
              </div>
              <div class="pic">
                <img :src="editData.avatarUrl" alt="">
              </div>
              <div class="agent-info">
                <p class="name">{{editData.agentName}}</p>
                <p class="tel">{{editData.mobile}}</p>
                <!-- <p class="signature">{{editData.signature}}</p> -->
                <p class="signature">房地产从业时间{{editData.workingTime | formatWorkTime}}的{{editData.saleType || '买卖经纪人'}}</p>
              </div>
              <div class="qrcode">
                <img :src="editData.miniQrCode" alt="小程序">
                <p>长按识别小程序码，进入我的名片</p>
              </div>
            </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card item3">
              <div class="type3-cnt">
                <div class="signature">{{editData.signature}}</div>
                <div class="pic">
                  <img :src="editData.avatarUrl" alt="">
                </div>
                <div class="agent-info">
                  <p class="name">{{editData.agentName}}</p>
                  <p class="tel">{{editData.mobile}}</p>
                  <p class="worktime">房地产从业时间{{editData.workingTime | formatWorkTime}}的{{editData.saleType || '买卖经纪人'}}</p>
                </div>
                <div class="qrcode">
                  <img :src="editData.miniQrCode" alt="小程序">
                  <p>长按识别小程序码，进入我的名片</p>
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
          <span>姓名</span>
          <input type="text" v-model="editData.agentName" maxlength="16" placeholder="请输入姓名" @blur="blur">
        </div>
        <div class="group-item">
          <span>经纪人电话</span>
          <input type="text" v-model="editData.mobile" maxlength="16" placeholder="请输入电话号码" @blur="blur">
        </div>
        <div class="group-item">
          <span>宣传语</span>
          <input type="text" v-model="editData.signature" maxlength="48" placeholder="请输入宣传语" @blur="blur">
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
              <van-uploader :after-read="onRead" accept="image/*">
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
    <!-- 截图 -->
    <div class="cropper-box" v-show="showCopper">
      <vueCropper
				ref="cropper"
				:img="imgSrc"
        :viewMode="1"
        :autoCrop="true"
        :canMove="true"
        :autoCropWidth="375"
				:autoCropHeight="420"
        :fixedBox="true"
        :canMoveBox="false"
        :centerBox="true"
        :rotatable="true"
        mode="cover"
			></vueCropper>
      <div class="action">
        <button class="cancle" @click="cancleCropper">取消</button>
        <button class="save" @click="cropper">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import h2c from 'html2canvas'
import userService from '@/services/userService'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import { randomString, dataURLtoBlob, checkStrLength, checkStrType, checkPhoneNum, downloadFile } from '@/utils/tool'
import CosCloud from 'cos-js-sdk-v4'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      agentId: 1,
      shareBaseInfo: {}, // 默认数据
      shareInfo: {}, // 用户修改数据
      activeIndex: 0, // 初始化模板索引
      activeIndexOld: 0, // 模板索引记录
      editData: {}, // 编辑数据
      showModel: false, //选择模板
      showView: false, // 图片预览
      showEdit: false, // 显示编辑信息
      showLoading: false, // 加载中
      cos: null, //封面照片
      appId: '10037467',
      bucket: '720ljq2test',
      region: 'sh',
      uploadImg: '', // 上传图片
      showCopper: false, // 截图框
      imgSrc: '' // 被截图图片
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
    // 获取分享卡片详情
    async getCardInfo() {
      let result = await userService.getQrCodeByToken()
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
    async initData() {
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
      h2c(document.querySelector(cls), {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: '300px',
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
    // 下载图片
    downLoad() {
      let img = document.getElementById('share-cover-img')
      let data = img.getAttribute('src')
      downloadFile(data, '名片')
      let toast = this.$toast('下载成功')
      setTimeout(() => {
        toast.clear()
        this.showView = false
      }, 1000)
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
      if (!mobile) {
        return this.$toast('电话号码不能为空')
      }
      if (!/[\d|\-]{11,16}/.test(mobile)) {
        return this.$toast('电话号码输入有误')
      }
      
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9\！\.\,\，\。\!\?\？\'\"\’\‘\“\”]+$/g
      if (!reg.test(slogan)) {
        return this.$toast('宣传语只支持中文、英文和数字')
      }
      if (!checkStrLength(slogan, 48)) {
        return this.$toast('宣传语最多为24个汉字')
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
          this.viewCover()
          this.showView = true
          this.showEdit = false
        }, 500)
      }
    },
    // 图片上传组件
    onRead(file) {
      this.imgSrc = file.content
      this.showCopper = true
    },
    // 图片裁剪
    cropper() {
      this.showCopper = false
      this.$refs.cropper.getCropData(data => {
        this.uploadCropperImg(data)
      })
    },
    // 取消图片截图
    cancleCropper() {
      this.showCopper = false
      this.imgSrc = ''
    },
    // 图片压缩上传
    uploadCropperImg(imgData) {
      this.showLoading = true
      // let imgData = file.content
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
    async initCos() {
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
    postImg(imageData) {
      var file = dataURLtoBlob(imageData)
      this.cos.uploadFile(this.uploadSuccess, this.uploadError, null, this.bucket, randomString(16), file, 0, null)
    },
    uploadSuccess(result) {
      let res_data = result.data
      if (res_data) {
        this.uploadImg = res_data.access_url
        this.editData.avatarUrl = res_data.access_url
      } else {
        this.$toast('上传失败')
      }
      this.showLoading = false
    },
    uploadError(err) {
      this.showLoading = false
      this.$toast(err)
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
    },
    // 键盘遮挡
    blur() {
      document.activeElement.scrollIntoViewIfNeeded(true)
    }
  },
  filters: {
    formatWorkTime (val) {
      let status = {
        100: '3年',
        101: '5年',
        102: '8年',
        103: '10年以上'
      }
      return status[val] || '3年'
    }
  }
}
</script>

<style lang="less" scoped>
.share-box{
  font-size: 12px;
  .card {
      width:300px;
      height:460px;
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
        height:300px;
        border-radius:4px 4px 0px 0px;
        overflow: hidden;
        img{
          min-width: 300px;
          min-height: 300px;
          object-fit: cover;
        }
      }
      .agent-info{
        margin: 16px 16px 0;
        .name-box{
          display: flex;
          line-height: 20px;
          .name {
            font-size:16px;
            font-weight:600;
            color:rgba(26,39,51,1);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .tel{
            font-size: 12px;
            font-weight:400;
            margin-left: 8px;
            color:rgba(92,97,102,1);
          }
        }
        .signature{
          width:170px;
          height:28px;
          font-size:10px;
          font-weight:400;
          color:rgba(92,97,102,1);
          line-height:14px;
          margin-top: 10px;
        }
      }
      .qrcode-box{
        display: flex;
        margin: 4px 16px;
        .tips{
          flex: 1;
          font-size: 10px;
          height: 16px;
          line-height: 16px;
          vertical-align: middle;
          .logo{
            color: #007AE6;
            margin-top: 16px;
            img{
              width: 16px;
              height: 16px;
              margin-right: 5px;
              vertical-align: middle;
            }
          }
          .text{
            color: #919599;
            margin-top: 5px;
          }
        }
        .qrcode{
          width: 64px;
          height: 64px;
        }
      }
    }
    .item2{
      background: #fff url('../../../assets/img/user/share/bg1.png') no-repeat center bottom;
      background-size:100% 50px;
      box-shadow:0px 2px 17px 0px rgba(34,47,85,0.1);
      border-radius:4px;
      .type2-cnt{
        height: 100%;
        width: 100%;
        background: url('../../../assets/img/user/share/bg3.png') repeat left top;
      }
      .logo{
        padding-top: 14px;
        margin: 0 0 30px 16px;
        font-size: 10px;
        color: #007AE6;
        height: 16px;
        line-height: 16px;
        img{
          width: 16px;
          height: 16px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      .pic{
        width:150px;
        height:150px;
        margin: 0 auto;
        img{
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .agent-info{
        text-align: center;
        margin-top: 16px;
        color: #5C6166;
        font-size: 12px;
        .name{
          font-size:16px;
          font-weight:600;
          color:rgba(26,39,51,1);
          line-height:21px;
        }
        .tel{
          margin: 8px 0;
        }
        .signature{
          height:28px;
          font-size:10px;
          font-weight:400;
          line-height:14px;
          margin: auto;
          margin-bottom: 16px;
        }
      }
      .qrcode{
        margin-top: 30px;
        text-align: center;
        img{
          width: 64px;
          height: 64px;
          border-radius: 30px;
        }
        p{
          height:14px;
          font-size:10px;
          font-weight:400;
          color:rgba(145,149,153,1);
          line-height:14px;
          margin-top: 5px;
        }
      }
    }
    .item3{
      background: #fff url('../../../assets/img/user/share/bg1.png') no-repeat center bottom;
      background-size:100% 50px;
      box-shadow:0px 2px 17px 0px rgba(34,47,85,0.1);
      border-radius:4px;
      .type3-cnt{
        height: 100%;
        width: 100%;
        background: url('../../../assets/img/user/share/bg2.png') repeat left top;
        text-align: center;
      }
      .signature{
        width:200px;
        height:34px;
        font-size:12px;
        font-weight:400;
        color:rgba(26,39,51,1);
        line-height:17px;
        margin: 0 50px 25px;
        box-sizing: content-box;
        padding-top: 40px;
      }
      .pic{
        width:160px;
        height:160px;
        margin: 0 auto;
        img{
          width: 160px;
          height: 160px;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .agent-info{
        text-align: center;
        margin-top: 16px;
        color: #5C6166;
        font-size: 12px;
        .name{
          font-size:16px;
          font-weight:600;
          color:rgba(26,39,51,1);
          line-height:21px;
        }
        .tel{
          margin: 8px 0;
        }
        .worktime{
          margin-bottom: 16px;
          font-size: 10px;
        }
      }
      .qrcode{
        margin-top: 20px;
        text-align: center;
        img{
          width: 64px;
          height: 64px;
          border-radius: 30px;
        }
        p{
          height:14px;
          font-size:10px;
          font-weight:400;
          color:rgba(145,149,153,1);
          line-height:14px;
          margin-top: 5px;
        }
      }
    }
  .card-action{
    text-align: center;
    font-weight: 400;
    p{
      color: #1A2733;
      margin-top: 12px;
    }
    .btn{
      display: flex;
      margin: 15px 20px;
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
      span {
        display: inline-block;
        width: 24px;
        height: 72px;
        box-sizing: content-box;
        padding: 0 10px;
        margin-right: 30px;
        font-size: 10px;
        color: #666;
        text-align: center;
        &.reset {
          margin-left: 20px;
        }
        img {
          padding-top: 20px;
          width: 24px;
        }
      }
      button {
        width: 184px;
        height: 44px;
        background: rgba(0, 122, 230, 1);
        border-radius: 6px;
        color: #fff;
        border: none;
        margin-top: 19px;
        font-size: 14px;
      }
    }
  }
  // 预览名片
  .share-cover-img {
    width:300px;
    height:460px;
    background:rgba(255,255,255,1);
    margin: 16px auto;
    .img-box {
      height: 460px;
      width: 300px;
      img {
        box-shadow:0px 2px 17px 0px rgba(34,47,85,0.1);
        border-radius:4px;
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
  // 截图
  .cropper-box {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    .action {
      position: absolute;
      bottom: 20px;
      width: 100%;
      font-size: 14px;
      color: #fff;
      text-align: center;
      button {
        width: 120px;
        height: 40px;
        border: none;
        border-radius: 6px;
        margin: 0 15px;
        &.cancle {
          background-color: #999;
        }
        &.save {
          background-color: #0069ca;
        }
      }
    }
  }
}
</style>

