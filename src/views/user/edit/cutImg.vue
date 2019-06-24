<template>
  <div></div>
</template>

<script>
import Cropper from 'cropperjs'
import CosCloud from 'cos-js-sdk-v4'
import userService from 'SERVICE/userService'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      cos: null,
      appId: '10037467',
      bucket: '720ljq2test',
      region: 'sh'
    }
  },

  created() {
    this.pic()
    this.initCos()
  },

  beforeDestroy() {
    this.destoried()
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  methods: {
    initCos() {
      this.getSign()
    },

    async getSign() {
      const result = await userService.getCosAppSign()
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

    createElement: function() {
      //初始化图片为空对象
      this.preview = null

      let str = '<div><img id="clip_image" src="originUrl"></div><button type="button" id="cancel_clip">取消</button><button type="button" id="clip_button">完成</button>'
      str += '<div class="crop_loading"><div class="crop_content"><img style="width:.32rem;height:.32rem;" src="../static/loading10.svg" /><div class="crop_text">图片上传中</div></div></div>'
      str += '<div class="crop_success"><div class="crop_success_text">上传成功</div></div></div>'

      let body = document.getElementsByTagName('body')[0]
      this.reagion = document.createElement('div')
      this.reagion.id = 'clip_container'
      this.reagion.className = 'container'
      this.reagion.innerHTML = str

      //添加创建好的DOM元素
      body.appendChild(this.reagion)
      this.preview = document.getElementById('clip_image')

      //绑定一些方法
      this.initFunction()
    },

    //初始化一些函数绑定
    initFunction: function() {
      let self = this
      this.clickBtn = document.getElementById('clip_button')
      this.cancelBtn = document.getElementById('cancel_clip')
      //确定事件
      this.addEvent(this.clickBtn, 'click', function() {
        self.crop()
      })
      //取消事件
      this.addEvent(this.cancelBtn, 'click', function() {
        self.destoried()
        self.$router.go(-1)
      })
    },

    pic() {
      let e = this.$route.query.originUrl
      this.clip(e, {
        aspectRatio: 1
      })
    },
    clip: function(e, opt) {
      let self = this
      this.initilize(opt)

      //调用方法转成url格式
      this.originUrl = e

      //每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.originUrl)
      }
    },

    initilize: function(opt) {
      let self = this
      this.options = opt
      //创建dom
      this.createElement()
      // this.resultObj = opt.resultObj;
      //初始化裁剪对象
      this.cropper = new Cropper(this.preview, {
        aspectRatio: 1, //5/4 ,
        autoCropArea: opt.autoCropArea || 0.8,
        viewMode: 1,
        guides: false,
        guides: opt.aspectRatio == 'Free' ? false : true,
        cropBoxResizable: opt.aspectRatio == 'Free' ? false : true,
        cropBoxMovable: opt.aspectRatio == 'Free' ? false : true,
        dragCrop: false,
        background: false,
        checkOrientation: true,
        checkCrossOrigin: true,

        dragMode: 'move',

        cropBoxMovable: false,
        cropBoxResizable: false,
        center: false,
        movable: true,
        guides: false,
        resizable: false,
        touchDragZoom: false,
        mouseWheelZoom: false,
        toggleDragModeOnDblclick: false,
        ready: function() {
          if (opt.aspectRatio == 'Free') {
            let cropBox = self.cropper.cropBox
            cropBox.querySelector('span.cropper-view-box').style.outline = 'none'
            self.cropper.disable()
          }
        }
      })
    },

    //图片转码方法
    getObjectURL: function(file) {
      let url = null
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    //点击确定进行裁剪
    crop: function() {
      let self = this
      let image = new Image()
      let croppedCanvas
      let roundedCanvas

      // Crop
      document.querySelector('.crop_loading').style.display = 'block'

      setTimeout(function() {
        croppedCanvas = self.cropper.getCroppedCanvas()
        // Round
        roundedCanvas = self.getRoundedCanvas(croppedCanvas)

        let imgData = roundedCanvas.toDataURL()
        image.src = imgData

        //判断图片是否大于100k,不大于直接上传，反之压缩
        if (imgData.length < 100 * 1024) {
          self.postImg(imgData)
        } else {
          image.onload = function() {
            //压缩处理
            let data = self.compress(image, self.Orientation)
            self.postImg(data)
          }
        }
      }, 20)
    },

    //获取裁剪图片资源
    getRoundedCanvas: function(sourceCanvas) {
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      let width = sourceCanvas.width
      let height = sourceCanvas.height

      canvas.width = width
      canvas.height = height

      context.imageSmoothingEnabled = true
      context.drawImage(sourceCanvas, 0, 0, width, height)
      context.globalCompositeOperation = 'destination-in'
      context.beginPath()
      context.rect(0, 0, width, height)
      context.fill()

      return canvas
    },

    //销毁原来的对象
    destoried: function() {
      let self = this
      //移除事件
      this.removeEvent(this.clickBtn, 'click', null)
      this.removeEvent(this.cancelBtn, 'click', null)
      // this.removeEvent( this.fileObj , 'click' , null );
      //移除裁剪框
      if (this.reagion && this.reagion.parentNode) this.reagion.parentNode.removeChild(this.reagion)

      //销毁裁剪对象
      if (this.cropper) this.cropper.destroy()
      this.cropper = null
    },
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    randomString(len) {
      len = len || 32
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = $chars.length
      var pwd = ''
      for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      var timestamp = new Date().getTime()
      return timestamp + pwd + '.png'
    },

    postImg: function(imageData) {
      //这边写图片的上传
      var file = this.dataURLtoBlob(imageData)
      this.cos.uploadFile(this.uploadSuccess, this.uploadError, null, this.bucket, this.randomString(16), file, 0, null)

      // let self = this;
      // self.destoried();
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

    //添加事件
    addEvent: function(obj, type, fn) {
      if (obj.addEventListener) {
        obj.addEventListener(type, fn, false)
      } else {
        obj.attachEvent('on' + type, fn)
      }
    },
    //移除事件
    removeEvent: function(obj, type, fn) {
      if (obj.removeEventListener) {
        obj.removeEventListener(type, fn, false)
      } else {
        obj.detachEvent('on' + type, fn)
      }
    },

    //web 上传图片到服务器
    async upHeaderImg(obj) {
      const result = await userService.upHeaderImg(obj)

      if (result) {
      } else {
        this.$store.dispatch('getUserInfo', Object.assign(this.userInfo, { avatarUrl: this.avatar }))
        this.destoried()
        this.$router.go(-1)
      }
    },

    //上传
    uploadSuccess(result) {
      var res_data = result.data
      if (res_data) {
        this.avatar = res_data.access_url
        let obj = {
          avatarUrl: this.avatar
        }
        this.upHeaderImg(obj)
      } else {
        console.log('上传失败')
      }
    }
  }
}
</script>
<style lang="less">
#clip_button {
  position: absolute;
  right: 10%;
  bottom: 20px;
  width: 120px;
  height: 40px;
  border: none;
  font-size: 0.36rem;
  border-radius: 6px;
  background-color: #0069ca;
  color: #fff;
}
#cancel_clip {
  position: absolute;
  left: 10%;
  bottom: 20px;
  width: 120px;
  height: 40px;
  border: none;
  font-size: 0.36rem;
  border-radius: 6px;
  color: #fff;
  background-color: #999;
}
#clip_container.container {
  z-index: 99;
  position: fixed;
  /* padding-top: 60px; */
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #000;
}
#clip_container.container > div {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#clip_image {
  max-width: 100%;
}

.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}
.crop_loading,
.crop_success {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}
.crop_loading .crop_content {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  height: 100px;
  width: 100px;
  vertical-align: middle;
  color: #fff;
  padding-top: 20px;
  font-size: 16px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.crop_loading .crop_content img {
  margin-top: 15px;
  margin-bottom: 10px;
}
.crop_success .crop_success_text {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  width: 120px;
  height: 30px;
  color: #fff;
  line-height: 30px;
  font-size: 16px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}

.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.cropper-wrap-box {
  overflow: hidden;
}

.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}

.cropper-modal {
  opacity: 0.5;
  background-color: #232428;
}

.cropper-view-box {
  display: block;
  overflow: hidden;

  width: 100%;
  height: 100%;

  outline: 2px solid #fff;
  /* outline-color: rgba(51, 153, 255, 0.75); */
}

.cropper-dashed {
  position: absolute;

  display: block;

  opacity: 0.5;
  border: 0 dashed #eee;
}

.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}

.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}

.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;

  width: 0;
  height: 0;

  opacity: 0.75;
}

.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: ' ';
  background-color: #eee;
}

.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}

.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}

.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;

  display: block;

  width: 100%;
  height: 100%;

  opacity: 0.1;
}

.cropper-face {
  top: 0;
  left: 0;

  background-color: #fff;
}

.cropper-line {
  background-color: #39f;
}

.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}

.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}

.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}

.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}

.cropper-point {
  width: 5px;
  height: 5px;

  opacity: 0.75;
  background-color: #39f;
}

.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}

.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}

.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}

.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}

.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}

.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}

.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}

.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1;
}

@media (min-width: 768px) {
  .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}

@media (min-width: 992px) {
  .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}

@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}

.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: ' ';
  opacity: 0;
  background-color: #39f;
}

.cropper-invisible {
  opacity: 0;
}

.cropper-bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}

.cropper-hide {
  position: absolute;

  display: block;

  width: 0;
  height: 0;
}

.cropper-hidden {
  display: none !important;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>
