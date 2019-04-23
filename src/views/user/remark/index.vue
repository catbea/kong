<template>
    <div class="remark_pages">
        <div class="pages_content" v-if="remarkData!=false" @mousewheel="imgScroll" @touchmove="imgScroll">
            <ul class="cart-list">
                <li class="list-item" v-for="(item,index) in remarkData " data-type="0" :key="index">
                    <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
                        <div class="details">
                            <div class="details_title">
                                <p>{{item.linkerName}}</p><p>{{item.createTime}}</p>    
                            </div> 
                            <div>{{item.content}}</div>
                        </div>
                        <div>
                            <swiper :options="swiperOption">
                                <swiper-slide
                                v-for="(a,index) in item.list"
                                class="swiper-slide"
                                :key="index"
                                > 
                                    <div>
                                        <img :src="a.imgUrl" alt=""  style="height:60px;margin-top:12px;margin-bottom:0px;width:80px;border-radius:6px;" @click.stop="houseTypeHandle(item.list,index)">   
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </div>
                    </div>
                    <div class="delete" @click="deleteItem(item,index)" :data-index="index">
                        <p>删除</p>
                    </div>
                </li>
            </ul> 
        </div>
        <div class="page_kong" v-else>
            <img src="../../../assets/img/user/GroupCopy@2x.png" alt="暂无">
            <p>暂无信息</p>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import marketService from 'SERVICE/marketService'
import { ImagePreview } from 'vant'
export default { 
    components: {
        swiper,
        swiperSlide
    },
    data () { 
        return { 
            startX : 0 ,
            endX : 0 ,
            moveX:0,
            moveY:0,
            remarkData: [],
            img:[],
            swiperOption: {
                slidesPerView: 'auto',
                // spaceBetween: 12
            },  
            current:1,
            page:"",
            arr:null
        }
    },   
    mounted () { 
        this.getList();  
        window.addEventListener('scroll',this.hide);
    },
    methods : { 
        imgScroll() { 
            this.restSlide();  
            if (this.page > this.current) { 
                this.current = this.current + 1;
                this.getList(this.current);
            } 
        },
        houseTypeHandle(a,index) {
        //查看户型图片预览
            this.arr = [] 
            for (let i = 0;i<a.length;i++) {
                const url = a[i].imgUrl
                this.arr.push(url)
            } 
            debugger
            this.instance = ImagePreview({
                images: this.arr,
                startPosition: 0,
                showIndex:true
            })
        },
        async getDetailInfo(id) {
            const res = await marketService.getLinkerDetail(id)
            this.remarkData = res.linkerOtherList
        },
        calc(item, minusOrPlus,index) {
            if (minusOrPlus === 1) {
                item.num++;
            } else if (minusOrPlus === 0) {
                item.num--;
            }
        },
        skip(){
            if( this.checkSlide() ){
                this.restSlide();
            }
        }, 
        touchStart(e){  
            // 记录初始位置
            this.startX = e.touches[0].clientX;
        },
        //滑动结束
        touchEnd(e){  
            // 当前滑动的父级元素 
            let parentElement = e.currentTarget.parentElement;
            // 记录结束位置
            this.endX = e.changedTouches[0].clientX;
            // 左滑
            if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){
                this.restSlide();
                parentElement.dataset.type = 1;
            }
            // 右滑
            if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
                this.restSlide();
                parentElement.dataset.type = 0;
            }
            this.startX = 0;
            this.endX = 0;
        },
        //判断当前是否有滑块处于滑动状态
        checkSlide(){
            let listItems = document.querySelectorAll('.list-item');
            for( let i = 0 ; i < listItems.length ; i++){
                if( listItems[i].dataset.type == 1 ) {
                    return true;
                }
            }
            return false;
        },
        //复位滑动状态
        restSlide(){
            let listItems = document.querySelectorAll('.list-item');
            // 复位
            for( let i = 0 ; i < listItems.length ; i++){
                listItems[i].dataset.type = 0;
            }
        },
        //删除
        deleteItem(item,index){ 
            // 当前索引
            // let index = e.currentTarget.dataset.index;  
            // 删除
            this.$dialog.confirm({
                title: '确认删除？', 
            }).then(() => { 
                marketService.getdelComment({commentId:item.commentId,linkerId:item.linkerId})
                .then((result) => {  
                        // 复位
                        this.restSlide();
                        // 删除            
                        this.remarkData.splice(index,1); 
                })
                .catch((err) => {
                    this.restSlide();                     
                }) 

            }).catch(() => { 
                this.restSlide(); 
            }) 
        } ,
        getList (index) { 
            marketService.getlinkerList({current:this.current
            }).then((result) => { 
                this.page = result.pages
                if (result.pages > 1) {
                    this.remarkData = this.remarkData.concat(result.records)  
                }else {
                    this.remarkData = result.records
                }
                console.log(this.remarkData)
            }).catch((err) => {
                console.log(err)
            })
        } 
    }
}
</script>

<style lang="less" scoped>
.remark_pages {  
    background: #ffffff; 
    .pages_content {   
         .cart-list{
            .list-item{ 
                position: relative;
                -webkit-transition: all 0.2s;
                transition: all 0.2s;
                margin-top: 0;
                padding: 0 16px;
                .delete{
                    width: 80px;
                    height: 100%; 
                    background: #EA4D2E;
                    font-size: 16px;
                    line-height: 133px;
                    color: #fff; 
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    top:0;
                    right: -80px;
                }
            }
            .list-item[data-type="0"]{
                transform: translate3d(0,0,0);
            }
            .list-item[data-type="1"]{
                transform: translate3d(-80px,0,0);
            }
            .list-box{
                height: 100%;
                padding: 20px 0;
                background: #fff;
                display: flex;
                flex-direction: column;
                border-bottom: 1px solid #DEDEDE;
                font-size: 14px;
                .details{
                    flex: 1;
                    // display: inline-flex;
                    vertical-align: top;
                    .details_title { 
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        p:nth-child(1) { 
                            font-size:20px;
                            font-family:PingFangSC-Semibold;
                            font-weight:600;
                            color:rgba(51,51,51,1);
                            line-height:28px; 
                        }
                        p:nth-child(2) { 
                            font-size:12px;
                            font-family:PingFangSC-Regular;
                            font-weight:400;
                            color:rgba(153,153,153,1);
                            line-height:34px;
                        }
                    } 
                    div:nth-child(2) {
                        margin-left: 1px; 
                        font-size:16px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        line-height:22px;
                    }
                }
            }
        }
    }
    .page_kong {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 105px;
        img {
            width: 88px;
            height: 88px;
        }
        p {
            font-size: 12px;
            color: #999999;
        }
    }
} 
.swiper-slide {
    width: 80px !important;
    margin-right: 8px;
}
</style>