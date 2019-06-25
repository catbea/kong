<template>
    <div class="time_view" @mousewheel="imgScroll" @touchmove="imgScroll"> 
        <ul class="ul_view">
            <li class="li_view" v-for="(item,index) in ruleList" :key="index" @click="select(item)">
                <div class="li_left">
                    <div class="left_img">
                        <img :src="item.coverImgUrl" alt="" class="img">
                    </div>
                    <div class="left_icon" :class="fileType[item.format]">
                        {{['','图集','视频','PDF','H5'][item.format]}}
                    </div> 
                </div>
                <div class="li_right">
                    <div class="right_title">
                        {{item.title}}
                    </div>
                    <div class="right_info">
                        <div style="font-size:10px;">更新时间：{{item.updateTime}}</div>
                        <div style="font-size:10px;">{{item.browseNum}}查看</div>
                    </div>
                </div> 
            </li>
        </ul>
        <div class="finiish" v-if="total == ruleList.length">没有更多了</div>
    </div> 
</template>

<script>
import userService from 'SERVICE/userService'
import { mapGetters } from 'vuex'
export default {
    components: {
    ...mapGetters(['userInfo']), 
    },
    data:() =>({
        ruleList:[
        ],  
        current:1,
        size:5 ,
        page:"",
        title:'',
        total:"",
        fileType:{
            1: 'img',
            2: 'video',
            3: 'pdf',
            4: 'h5'
        }
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
            userService.getDevelopersMaterialList({linkerId:this.$route.query.linkerId,type:6,size:this.size,current:this.current
            }).then((result) => {  
                this.page = result.pages
                this.total = result.total
                if (result.pages > 1) {
                    this.ruleList = this.ruleList.concat(result.records)  
                }else {
                    this.ruleList = result.records
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        select(val) { 
            this.title = val.title
            switch (val.format) {
                case 1:
                this.$router.push(`/user/learn/thirdPage/img?id=${val.id}&developersId=${val.developersId}&linkerId=${val.linkerId}`)
                break
                case 3:
                this.$router.push(`/user/learn/thirdPage/pdf?id=${val.id}&developersId=${val.developersId}&linkerId=${val.linkerId}`) 
                break
                case 4:
                this.$router.push(`/user/learn/thirdPage/h5?id=${val.id}&developersId=${val.developersId}&linkerId=${val.linkerId}`)
                break
            } 
        },
    },
    beforeRouteLeave (to, from, next) {  
        to.meta.title = this.title
        next()
    }
}
</script>

<style lang="less" scoped>
.time_view {
    background: #ffffff;
    .ul_view {
        list-style: none;
        .li_view {
            display: flex;
            padding: 24px 16px 0px 16px;
            .li_left {
                border-radius: 6px;
                width: 120px;
                height: 90px;
                position: relative;
                margin-right: 12px;
                .left_img {
                    width: 120px;
                    height: 90px;
                    border-radius: 6px;
                    .img {
                        width: 120px;
                        height: 100%;
                        border-radius: 6px;
                    }
                }
                .left_icon {
                    width: 33px;
                    height: 15px;
                    background: #2882FF;
                    font-size: 10px;
                    color: #ffffff;
                    text-align: center;
                    line-height: 15px;
                    font-weight: 500;
                    position: absolute;
                    border-radius: 0px 6px 0px 6px;
                    top:0px; 
                    right: 0px;
                }
                .img {
                    background: #2882FF;
                }
                .pdf {
                    background: #FA6400;
                }
                .h5 {
                    background: #01B805;
                }
                
            }
            .li_right {
                height: 90px;
                width: 62%;
                .right_title {
                    height: 42px;
                    font-size: 14px;
                    color: #333333;
                    font-weight: bold;
                }
                .right_info {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 34px;
                    font-size: 10px;
                    color: #999999;
                }
            }
        }
    }
    .finiish{
        color: #969799;
        font-size: 0.34667rem;
        line-height: 1.33333rem;
        text-align: center;
    }
}
</style>
