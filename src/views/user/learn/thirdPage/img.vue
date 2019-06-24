<template>
    <div class="img_view">
        <div class="img-preview" >
            <div class="img-box">
                <van-swipe @change="onChange" :initial-swipe="inde" :loop="false" :show-indicators="false">
                    <van-swipe-item v-for="(item,index) in arr" :key="index">
                        <img :src="item" alt="" srcset="">
                    </van-swipe-item>
                </van-swipe>
                <div class="custom-indicator">
                    {{ inde + 1 }}/{{arr.length}}
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import userService from 'SERVICE/userService'
export default {
    data:() => ({
        inde: 0,
        arr: [],
    }),
    mounted() {
        this.getImg()
        this.gostudyAdd()
    },
    computed: {
    ...mapGetters(['userInfo']),
    },
    methods:{
        gostudyAdd() {
            userService.getDevelopersMaterialadd({materialId:this.$route.query.id,agentId:this.userInfo.agentId,developersId:this.$route.query.developersId,linkerId:this.$route.query.linkerId 
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
                this.arr = result.content.split(',') 
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
    height: 100vh;
    .img-preview{
        padding: 43px 16px 43px 16px;
        width: 100%;
        height: 100%;
        .img-box {
            height: 100%;
            width: 100%;  
            display: flex;
            flex-direction: column;
            justify-content: center; 
            img {
                width: 100%; 
            }
            .custom-indicator {
                text-align: center;
                color: #333333;
                font-size: 14px;
                margin-top: 18px;
            }
        }
    }
}
</style>
