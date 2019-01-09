<template>
    <div class="public">
        <div id="carousel" ref="el" >
          <ul class="touchLog" ref="ritem">
            <li v-for="(e, i) in imgs" :style="{backgroundImage: 'url('+ e.src +')'}" :key="i">{{i}}</li>
          </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
          startX: '',
          moveX:"",
          timer:'',
          sliderItem:'',
          distance:'',
          isMove:false,
           currentIndex:'',
           imgs: [
                {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
                {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
                {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
                {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
                {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
                {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'}
            ]
        }
    },
    mounted() {
      let divBox =document.getElementById("carousel");
      let ulBox =document.getElementById("touchLog");
      let width =this.$refs.el.offsetWidth
      const _this=this
      let index =1
      let distanceX = 0
      divBox.addEventListener('touchstart',function(e){
        //记录触发这个事件的时间
        this.startX = e.touches[0].clientX;  //记录起始X 
        console.log(e,1111111,e.touches[0].clientX,99999,this.startX); 
        
    });
    divBox.addEventListener('touchmove',function(e){
        this.isMove = true;  //证明滑动过
        //记录触发这个事件的时间
        this.moveX = e.touches[0].clientX;
        console.log(22222222,this.moveX);  
        distanceX = this.moveX - this.startX; //计算移动的距离
        _this.setTranslateX(-index * width + distanceX);  //实时的定位
    });
    divBox.addEventListener('touchend',function(e){
        //记录触发这个事件的时间
      //  this.endX = e.touches[0].clientX;
        console.log(33333333,_this.$refs.el.offsetWidth);
        if(this.isMove &&distanceX >width/3){
            // 5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向）*/
            if(distanceX > 0){  //上一张
                index --;
            }
            else{   //下一张
                index ++;
            }
            this.addTransition();    //加过渡动画
            _this.setTranslateX(-index * width);    //定位
            console.log('超过了');   
        }
    });
    },
    computed:{
       
    },
    methods: {
      addTransition(){
          let ulBox =this.$refs.ritem
        ulBox.transition = "all 0.3s";
        ulBox.webkitTransition = "all 0.3s";/*做兼容*/
      },
      setTranslateX(translateX){
          let ulBox =this.$refs.ritem.style
        ulBox.transform = "translateX("+translateX+"px)";
        ulBox.webkitTransform = "translateX("+translateX+"px)";
      }
    }
}
</script>
<style lang="less">
   .public{
     #carousel{
         width:343px;
       height:193px;
       overflow: hidden;
       position: relative;
       ul{
          //  display: flex;
          // display: -webkit-flex;
          // display: -webkit-box;
          position: absolute;
          white-space:nowrap;
         li{
           width:343px;
       height:193px;
          top: 0;
          left: 0;
          // transform: translateX(100%);
          border-radius:10px;
          display: inline-block;
         }
       }
     }
   }
</style>
