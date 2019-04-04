<template>
  <div class="comment-write">
    <div class="comment-write-info">
      <div class="house">
        <h3>你看过该楼盘吗？</h3>
        <p><span v-for="(item,index) in houseTag" :key="index" :class="{'active': userTag === index}" @click="userTag=index">{{item}}</span></p>
      </div>
      <div class="star-box">
        <b>楼盘点评</b>
        <div class="star">
          <van-rate v-model="star" :size="24" :count="5"  color="#ED8147"  void-icon="star" />
        </div>
      </div>
      <div class="info">
        <div class="textarea">
          <textarea class="" name="" id="" cols="30" rows="10" v-model.trim="content" maxlength="150" @blur="blur" placeholder="你觉得该楼盘的位置如何，环境怎样，配套规划满意吗？（1-150字）"></textarea>
        </div>
        <div class="img-box">
          <div class="img-item" v-for="(item,index) in imgList" :key="index">
            <div class="pic-box">
              <img class="pic" :src="item" alt="">
            </div>
            <van-icon name="clear"  @click="deleteImg(index)"/>
          </div>
          <div class="uploader-box" v-show="imgList.length < 12">
            <van-uploader :after-read="onRead" accept="image/*" multiple="multiple">
                <img class="photo" src="../../../assets/img/market/comment/photo.png" alt="">
                <p class="tips">添加照片</p>
            </van-uploader>
          </div>
          <div class="uploader-box" @click="chooseImg">
            <img class="photo" src="../../../assets/img/market/comment/photo.png" alt="">
            <p class="tips">添加照片</p>
          </div>
        </div>
      </div>
      <div class="agrees" @click="goStandard">查看 《用户点评行为规范》</div>
    </div>
    <div class="comment-submit" @click="saveComment">
      提交点评
    </div>
    <div class="loading"  v-show="showLoading" >
       <van-loading type="spinner" color="white" class="van-loading"/>
    </div>
  </div>
</template>

<script>
import CosCloud from 'cos-js-sdk-v4'
import { randomString, dataURLtoBlob } from '@/utils/tool'
import marketService from 'SERVICE/marketService'
import userService from 'SERVICE/userService'
export default {
  data () {
    return {
      marketId: '',
      houseTag: ['未实地看房', '实地看房'],
      userTag: 0,
      star: 5,
      cos: null,
      appId: '10037467',
      bucket: '720ljq2test',
      region: 'sh',
      imgList: [],
      showLoading: false,
      content: '',
      debounce: false, // 重复提交
      localIds: [],
      localData: []
    }
  },
  created () {
    this.initCos()
    this.marketId = this.$route.params.id
    // 获取缓存数据
    let data = window.sessionStorage.getItem('commentData')
    if (data) {
      let item = JSON.parse(data)
      this.userTag = item.userTag,
      this.star = item.star,
      this.content = item.content,
      this.imgList = item.imgList
      window.sessionStorage.removeItem('commentData')
    }
  },
  methods: {
    // 提交评论
    saveComment () {
      let content = this.content.trim()
      if (!content) {
        return this.$toast('楼盘评论不能为空！')
      }
      if (content.length > 150) {
        return this.$toast('楼盘评论不能超过150个字！')
      }
      this.insertLinkerComment()
    },
    // 新增楼盘评论
    async insertLinkerComment () {
      if (this.debounce) {return false}
      this.debounce = true
      this.showLoading = true
      let result = await marketService.insertLinkerComment({
        commentType: 1,
        content: this.content,
        imgList: this.imgList,
        starLevel: this.star,
        linkerId: this.marketId,
        userTag: (this.userTag === 1) ? 1 : 2 // 1-实看用户、2-未实看用户、3-管理员
      })
      this.showLoading = false
      this.$toast('提交成功！')
      this.debounce = false
      setTimeout(()=>{
        this.$router.push(`/market/comment/list/${this.marketId}`)
      }, 1000)

    },
    // 微信选择图片
    chooseImg () {
      alert(wx)
      let _this = this
      let num = 12 - this.imgList.length
      alert(num)
      wx.chooseImage({
        count: 12, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(' res.localIds',  res.localIds)
          _this.localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          _this.localIds.forEach(ele => {
            _this.getLocalImgData(ele)
          })
        }
      })
    },
    // 获取微信图片base64
    getLocalImgData (localId) {
      alert(wx)
      let _this = this
      wx.getLocalImgData({
        localId: localId, // 图片的localID
        success: function (res) {
          console.log('_this.localData', res.localData)
          _this.localData.push(res.localData) // localData是图片的base64数据，可以用img标签显示
        }
      })
    },
    // 图片上传组件
    onRead(file) {
      if(file.length > 12 || file.length + this.imgList.length > 12) {
        return this.$toast('最多只能上传12张图片！')
      }
      if (file.length) {
        file.forEach(element => {
          let data = element.content
          this.uploadCropperImg(data)
        })
      } else {
        let data = file.content
        this.uploadCropperImg(data)
      }
    },
    // 图片压缩上传
    uploadCropperImg(imgData) {
      this.showLoading = true
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
    //图片的上传
    postImg(imageData) {
      var file = dataURLtoBlob(imageData)
      this.cos.uploadFile(this.uploadSuccess, this.uploadError, null, this.bucket, randomString(16), file, 0, null)
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
    uploadSuccess(result) {
      let res_data = result.data
      if (res_data) {
        this.imgList.push(res_data.access_url)
      } else {
        this.$toast('上传失败')
      }
      this.showLoading = false
    },
    uploadError(err) {
      this.showLoading = false
      this.$toast(err)
    },
    // 删除照片
    deleteImg (index) {
      this.imgList.splice(index,1)
    },
    // 键盘遮挡
    blur() {
      setTimeout(()=>{document.activeElement.scrollIntoViewIfNeeded(true)},10)
    },
    // 缓存数据
    cacheData () {
      let cacheData = {
        userTag: this.userTag,
        star: this.star,
        content: this.content,
        imgList: this.imgList
      }
      window.sessionStorage.setItem('commentData', JSON.stringify(cacheData))
    },
    // 跳转评论详情页面
    goStandard () {
      this.cacheData()
      this.$router.push('/market/comment/standard')
    }
  }
}
</script>

<style lang="less" scoped>
.comment-write{
  font-size: 12px;
  display: flex;
  flex-direction: column;
  .comment-write-info{
    flex: 1;
    overflow-y: scroll;
    margin: 20px 16px 0;
    .house{
      h3{
        font-size: 24px;
      }
      p{
        margin-top: 15px;
        display: flex;
        span{
          width: 108px;
          margin-right: 10px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 15px;
          background-color: #F2F5F9;
          color: #8B97A7;
          &.active{
            background-color: #C8E8FF;
            color: #007AE6;
          }
        }
      }
    }
    .star-box{
      margin: 25px 0 0;
      display: flex;
      b{
        font-size: 18px;
        color: #333;
        margin-right: 16px;
        line-height: 25px;
      }
      .star{
        flex: 1;
      }
    }
    .info{
      margin-top: 15px;
      .textarea{
        border:1px solid #E4E4E4;
      }
      textarea{
        width: 100%;
        font-size: 14px;
        padding: 5px;
        height: 200px;
        border: none;
      }
      ::-webkit-input-placeholder{
        color: #999;
        line-height: 1.5;
      }
      .img-box{
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        .img-item{
          flex: 0 1 78px;
          position: relative;
          margin-right: 8px;
          height: 60px;
          margin-bottom: 10px;
          &:nth-child(4n+4) {
            margin-right: 0;
          }
          .pic-box{
            width: 78px;
            height: 60px;
            overflow: hidden;
            border-radius: 6px;
          }
          .pic{
            min-width: 80px;
            min-height: 60px;
            border-radius: 6px;
          }
          .van-icon-clear{
            font-size: 18px;
            color: #EA4D2E;
            position: absolute;
            top: -5px;
            right: -8px;
          }
        }
        .uploader-box{
          border: 1px solid #E2E2E2;
          border-radius: 4px;
          color: #999;
          width: 80px;
          height: 60px;
          text-align: center;
          img{
            width: 32px;
            height: 32px;
          }
        }
      }
    }
    .agrees{
      margin-top: 24px;
      font-size: 14px;
      color: #007AE6;
    }
  }
  .comment-submit{
    height: 44px;
    margin: 20px 16px;
    text-align: center;
    line-height: 44px;
    border-radius: 6px;
    background-color: #007AE6;
    color: #fff;
    font-size: 16px;
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

