<template>
    <div class="img_view">
        <div class="img-preview" >
            <div class="img-box">
                <van-swipe @change="onChange" :initial-swipe="inde" :loop="false" :show-indicators="false">
                    <van-swipe-item v-for="(item,index) in arr" :key="index">
                        <img :src="item" alt="" srcset=""> 
                    </van-swipe-item> 
                </van-swipe>
                <!-- <swiper :options="swiperOption" @change="onChange" style="background:blue;">
                    <swiper-slide v-for="(item,index) in arr" :key="index" >
                        <div>
                            <img :src="item" alt="" srcset="">   
                        </div>
                    </swiper-slide>
                </swiper> -->
                <div class="custom-indicator">
                    {{ inde + 1 }}/{{arr.length}}
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'
import userService from 'SERVICE/userService'
export default {
    data:() => ({
        inde: 0,
        arr: [],
        developersId:"",
        swiperOption: {
            slidesPerView: 1,
            spaceBetween: 12,
        },
    }),
    mounted() {
        this.getImg()
    },
    components:{
        swiper,
        swiperSlide,
    },
    computed: {
    ...mapGetters(['userInfo']),
    },
    methods:{
        gostudyAdd() {
            userService.getDevelopersMaterialadd({materialId:this.$route.query.id,agentId:this.userInfo.agentId,developersId:this.developersId,linkerId:this.$route.query.linkerId 
            }).then((result) => { 
            }).catch((err) => {
                console.log(err)
            })
        }, 
        onChange(index) {
            this.inde  = index
        },
        getImg () {
            userService.getDevelopersMaterialDetail({id:this.$route.query.id
            }).then((result) => {   
                this.arr = result.content.split(',') ;
                this.developersId = result.developersId;
                this.gostudyAdd();
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.img_view {
    background: #ffffff; 
    .img-preview{
        margin: 0 16px; 
        overflow-y: hidden;
        .img-box{
            height: 100vh; 
            line-height: 100vh;
            position: relative;
            img{
                min-width: 100%;
                min-height: 100%;
                height: 100vh;
                object-fit: contain;
            }
        }
        .custom-indicator{
            position: absolute;
            bottom: 18px;
            left: 50%;
            margin-left: -24px;
            height: 20px;
            width: 48px;
            font-size:12px;
            font-weight: 400;
            color: #333333;
            text-align: center;
            line-height: 20px;
            z-index: 20;
        }
    }
}
</style>
