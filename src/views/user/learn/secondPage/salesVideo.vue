<template>
    <div class="video_view"> 
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
                        :poster="headImgUrl"
                        playsinline="true"
                        x-webkit-airplay="allow"
                        x5-video-player-type="h5"
                        x5-video-player-fullscreen="true"
                    >
                        <source :src="item.url" type="video/mp4">
                    </video>
                    <!-- <div class="close-video" @click="videoHide(index)">退出视频</div> -->
                    <!-- <div class="span">
                        67:32
                    </div> -->
                </div>
                <div class="li_title" >
                    {{item.text}}
                </div>
                <div class="li_text">
                    <div style="font-size:10px;">更新时间：{{item.name}}</div>
                    <div style="font-size:10px;">{{item.name}}查看</div>
                </div>
            </li>
        </ul>
    </div> 
</template>

<script>
export default {
    data:() =>({
        videoList:[
            {name:'pdf',text:'楼盘推介项目介绍资料学习，学习查看楼盘推介项你好hi海海海岸hi阿海',url:'http://720ljq2-10037467.file.myqcloud.com/linker/proxy/video/e13ea36267244971adac1be57f86ee8d.mp4'},
            {name:'inin',text:'楼盘推介项目介绍资料学习，学习查看楼盘推介项',url:'http://720ljq2-10037467.file.myqcloud.com/linker/proxy/video/073fd4cf7cbe49ccb981efc021305bf1.mp4'},
        ],
        isTpye:1, 
        showControls: true,
        headImgUrl:'http://720ljq2-10037467.file.myqcloud.com/linker/proxy/261c13494b6b4f25bbaeac8638e169ce.png'
    }),
    mounted() {  
    },
    methods: {
        // 关闭视频
        videoHide(index) { 
            this.$refs.videoplay[index].pause()
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
