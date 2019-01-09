<template>
    <div class="public">
        <div class="carousel">
          <ul id="touchLog" ref="imagesWrapper">
            <li ref="ritem" v-for="(e, i) in imgs" :style="{backgroundImage: 'url('+ e.src +')'}" :key="i">{{i}}</li>
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
          distanceX:"",
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
      let ulBox =document.getElementById("touchLog");
      ulBox.addEventListener('touchstart',function(e){
        //记录触发这个事件的时间
        this.startX = e.touches[0].clientX;  //记录起始X 
        console.log(e,1111111,e.touches[0].clientX,99999,this.startX); 
        
    });
    ulBox.addEventListener('touchmove',function(e){
        isMove = true;  //证明滑动过
        //记录触发这个事件的时间
        this.moveX = e.touches[0].clientX;
        console.log(22222222,this.moveX);  
        this.distanceX = this.moveX - this.startX; //计算移动的距离
    });
    ulBox.addEventListener('touchend',function(e){
        //记录触发这个事件的时间
      //  this.endX = e.touches[0].clientX;
        console.log(33333333);  
        if(isMove && this.distanceX > width/3){
            //5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向）*/
            // if(this.distanceX > 0){  //上一张
            //     this.index --;
            // }
            // else{   //下一张
            //     index ++;
            // }
            console.log('超过了');
            
        }
    });
    },
    computed:{
       
    },
    methods: {
      
    }
}
</script>
<style lang="less">
   .public{
     .carousel{
       width:343px;
       height:193px;
       overflow: hidden;
       position: relative;
       ul{
          //  display: flex;
          // display: -webkit-flex;
          // display: -webkit-box;
          position: absolute;
         li{
           width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          // transform: translateX(100%);
          border-radius:10px;
          float: left;
         }
       }
     }
   }
</style>
