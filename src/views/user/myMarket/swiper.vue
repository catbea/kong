<template>
    <div class="public">
        <div class="carousel">
          <ul class="car" ref="swiper">
            <li ref="ritem" v-for="(item, index) in list" :style="{backgroundImage: 'url('+ item.src +')'}" :key="index">{{index}}</li>
          </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
          startX: '',
           moveX: '',
           list: [
                {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
                {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
                {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
                {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
                {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
                {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'}
            ]
        }
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
       ul{
           width:343px;
           height:193px;
           display: flex;
           
         li{
           width:343px;
           height:100%;
           border-radius:10px;
           
         }
       }
     }
   }
</style>
