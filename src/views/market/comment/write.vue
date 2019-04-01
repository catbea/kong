<template>
  <div class="comment-write">
    <div class="comment-write-info">
      <div class="house">
        <h3>你看过该楼盘啊吗？</h3>
        <p><span v-for="(item,index) in houseTag" :key="index" :class="{'active': userTag === index}" @click="userTag=index">{{item}}</span></p>
      </div>
      <div class="star-box">
        <b>楼盘点评</b>
        <div class="star">
          <van-rate v-model="star" :size="24" :count="5"  color="#ED8147" />
        </div>
      </div>
      <div class="info">
        <div class="textarea">
          <textarea class="" name="" id="" cols="30" rows="10" v-model.trim="content" maxlength="150" @blur="blur" placeholder="你觉得该楼盘的位置如何，环境怎样，配套规划满意吗？（1-150字）"></textarea>
        </div>
        <div class="img-box">
          <div class="img-item" v-for="(item,index) in imgList" :key="index">
            <img class="pic" :src="item" alt="">
            <van-icon name="clear"  @click="deleteImg(index)"/>
          </div>
          <div class="uploader-box" v-show="imgList.length < 12">
            <van-uploader :after-read="onRead" accept="image/*">
                <img class="photo" src="../../../assets/img/market/comment/photo.png" alt="">
                <p class="tips">添加照片</p>
            </van-uploader>
          </div>
        </div>
      </div>
      <div class="agrees">查看 《用户点评行为规范》</div>
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
      houseTag: ['实地看房', '未实地看房'],
      userTag: 0,
      star: 5,
      cos: null,
      appId: '10037467',
      bucket: '720ljq2test',
      region: 'sh',
      imgList: [],
      showLoading: false,
      content: ''
    }
  },
  created () {
    this.initCos()
    this.marketId = this.$route.params.id
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
      this.showLoading = true
      let result = await marketService.insertLinkerComment({
        commentType: 1,
        content: this.content,
        imgList: this.imgList,
        starLevel: this.star,
        linkerId: this.marketId,
        userTag: this.userTag + 1
      })
      this.showLoading = false
      this.$toast('楼盘评论成功！')
      setTimeout(()=>{
        this.$router.go(-1)
      }, 1000)

    },
    // 图片上传组件
    onRead(file) {
      let data = file.content
      this.uploadCropperImg(data)
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
        .img-item{
          flex: 0 1 80px;
          position: relative;
          margin-right: 15px;
          border: 1px solid #E2E2E2;
          border-radius: 6px;
          height: 60px;
          .pic{
            width: 80px;
            height: 60px;
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

