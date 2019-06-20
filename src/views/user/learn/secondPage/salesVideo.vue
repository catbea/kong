<template>
    <div class="video_view" @mousewheel="imgScroll" @touchmove="imgScroll"> 
        <ul class="ul_view">
            <li class="li_view" v-for="(item,index) in videoList" :key="index" >
                <div class="li_video">
                     <video
                        width="100%"
                        height="100%"
                        ref="videoplay"
                        preload="true"
                        controls="showControls"
                        style="object-fit:fill;border-radius: 6px;                        "
                        webkit-playsinline="true"
                        :poster="item.coverImgUrl"
                        playsinline="true"
                        x-webkit-airplay="allow"
                        x5-video-player-type="h5"
                        x5-video-player-fullscreen="true"
                    >
                        <!-- <div v-for="(a,index) in item.content" :key="index+3"> -->
                            <source :src="item.content.url" type="video/mp4">
                        <!-- </div> -->
                    </video> 
                </div>
                <div class="li_title" >
                    {{item.title}}
                </div>
                <div class="li_text">
                    <div style="font-size:10px;">更新时间：{{item.updateTime}}</div>
                    <div style="font-size:10px;">{{item.browseNum}}查看</div>
                </div>
            </li>
        </ul>
    </div> 
</template>

<script>
import userService from 'SERVICE/userService'
export default {
    data:() =>({
        videoList:[], 
        current:1,
        size:2 ,
        page:"",
        urlList:{}
    }),
    mounted() {  
        this.getList();        
    },
    methods: {
        imgScroll() {   
            if (this.page > this.current) { 
                this.current = this.current + 1;
                this.getList(this.current);
            } 
        },
        getList () {
            userService.getDevelopersMaterialList({linkerId:this.$route.query.linkerId,type:3,size:this.size,current:this.current
            }).then((result) => {  
                this.page = result.pages
                if (result.pages > 1) {
                    this.videoList = this.videoList.concat(result.records)  
                }else {
                    this.videoList = result.records
                } 
                result.records.map((item,index)=>{
                    this.videoList[index].content = JSON.parse(item.content);
                }) 
            }).catch((err) => {
                console.log(err)
            })
        },
    }
}
</script>

<style lang="less" scoped>
.video_view {
    background: #ffffff;
    .ul_view {
        list-style: none;
        .li_view { 
            padding: 25px 16px 0px 16px;
            .li_video {
                width: 100%;
                height: 193px;
                position: relative;
                overflow: hidden;
                .img {
                    width: 100%;
                    height: 193px;
                    border-radius: 6px;
                }
                .span {
                    position: absolute;
                    right: 15px;
                    font-size: 10px;
                    color: #ffffff;
                    bottom: 9px;
                }
                .close-video {
                    position: absolute;
                    top: 45px;
                    right: 5px;
                    font-size: 12px;
                    color: #fff;
                    background-color: rgba(0, 0, 0, 0.5);
                    width: 64px;
                    height: 24px;
                    line-height: 24px;
                    border-radius: 12px;
                    text-align: center;
                    z-index: 9999;
                }
            }
            .li_title {
                margin-top:8px;
                color: #333333;
                font-size: 14px;
                font-weight: bold;
                width: 100%;
                height: 42px;
            }
            .li_text {
                margin-top: 8px;
                display: flex;
                justify-content: space-between;
                color: #999999;
            }
        }
    }
}
</style>
