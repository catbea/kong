<template>
 <div class="page positer">
   <!-- <m-header>
			<span slot="left"></span>
			<span slot="title" class="title">店铺海报</span>
		</m-header> -->
   <div class="page-content page_positer" id="pagecontent">
     <img class="img" :src=uesrUrl alt=""/>
     <div class="btn_bottom">保存</div>
   </div>
 </div>
</template>

<script>
export default {
 data() {
  return {
    uesrUrl:"",
    img:[
      'http://img5.imgtn.bdimg.com/it/u=2767762500,409213559&fm=26&gp=0.jpg',
      'http://img0.imgtn.bdimg.com/it/u=926388866,3484051118&fm=26&gp=0.jpg',
      'http://img5.imgtn.bdimg.com/it/u=3048825819,2029164636&fm=26&gp=0.jpg'
      ],
  }
 },
 components: {

 },
 mounted(){
   this.getpoister()
 },
 methods: {
   getpoister(){
      let canvas = document.createElement('canvas')
      document.getElementById('pagecontent').appendChild(canvas);
      canvas.width = "750"
      canvas.height = "1126" //创建画布，并设置宽高
      //注意canvas元素本身并没有绘制能力（它仅仅是图形的容器
      //getContext()方法可返回一个对象，该对象提供了用于在画布上绘图的方法和属性
      let ctx = canvas.getContext("2d")
      ctx.rect(0,0, 750, 1126) //矩形坐标，大小 (距离左上角x坐标,距离左上角y坐标,宽度,高度)
      ctx.fillStyle = "#f7f7f7" //矩形的颜色
      ctx.fill() //填充
    
      this.loadImg(this.img).then(([img1, img2,img3])=> {
          ctx.drawImage(img1, 0, 0, 750, 760) //画布上先绘制人物图`
          ctx.drawImage(img2, 500, 833, 173, 173) //再绘制二维码图，根据设计图设置好坐标。`
          ctx.drawImage(img3, 90, 833, 173, 173) //再绘制头像图，根据设计图设置好坐标。`
          ctx.font="24px 微软雅黑 ";//字体大小和字体名字
          ctx.fillStyle = "#000";//字体颜色
          ctx.fillText("小白",155,833+210);
          ctx.fillText("扫码/长按可进入店铺",465,833+210);
          canvas.style.display = "none"
          this.uesrUrl=canvas.toDataURL("image/png")
      });
   },
   loadImg(src) {
      let paths = Array.isArray(src) ? src : [src]
      let promise = paths.map((path) => {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.setAttribute("crossOrigin", 'anonymous')
            img.src = path//只是更新了DOM对象,图片数据信息还未加载完成，加载资源是异步执行的,需要监听load事件的,事件发生后,就能获取资源
            img.onload = () => {
                resolve(img)
            }
            img.onerror = (err) => {
                alert('图片加载失败')
            }
        })
      })
      return Promise.all(promise)
	  },
 },
}
</script>

<style scoped lang="less">
  .page_positer{
    background: #f7f7f7;
    .btn_bottom{
      width: 100%;
      height: 0.8rem;
      font-size: 0.26rem;
      line-height: 0.8rem;
      text-align: center;
      background: #ed832f;
      color: #fff;
    }
  }
  .img{
    width: 100%;
  }
</style>
