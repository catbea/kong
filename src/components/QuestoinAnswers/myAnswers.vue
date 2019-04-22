<template>
    <div class="answers_pages">
        <div class="pages_content" v-if="answersData!=false" @mousewheel="imgScroll" @touchmove="imgScroll">
            <ul class="cart-list">
                <li class="list-item" v-for="(item,index) in answersData " data-type="0">
                    <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
                        <div class="details">
                            <div class="line_logo">问</div>
                            <div class="line_right">{{item.content}}</div> 
                        </div>
                    </div>
                    <div class="delete" @click="deleteItem(item.interlocutionId,index)" :data-index="index">
                        <p>删除</p>
                    </div>
                </li>
            </ul> 
        </div>
        <div class="page_kong" v-else>
            <img src="../../../src/assets/img/user/GroupCopy@2x.png" alt="暂无">
            <p>暂无信息</p>
        </div>
    </div>
</template>

<script>
import marketService from 'SERVICE/marketService'
export default {
    props: {
        answersData: { type: Array }, 
    },
    data () {
        return { 
            startX : 0 ,
            endX : 0 ,
            list: []
        }
    },
    methods : { 
        imgScroll() {
            this.restSlide();   
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
        //滑动开始
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
            this.$dialog.confirm({
                title: '确认删除该提问？', 
                message:"删除该提问后，提问下面的相关回答都会被删除哦"
            }).then(() => { 
                marketService.getqueryDelete({interlocutionId:item})
                .then ((result) => {
                    // 复位
                    this.restSlide();
                    // 删除
                    this.answersData.splice(index,1);
                })   
            }).catch(() => { 
                this.restSlide(); 
            }) 
        } 
    }
}
</script>

<style lang="less" scoped>
.answers_pages {  
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
                    color: #fff; 
                    position: absolute;
                    top:0;
                    right: -80px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
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
                border-bottom: 1px solid #DEDEDE;
                font-size: 14px;
                .details{
                    flex: 1;
                    display: inline-flex;
                    vertical-align: top;
                    .line_logo {
                        width:22px !important;
                        height:22px;
                        background:rgba(235,108,82,1);
                        border-radius:6px;
                        color: #fff;
                        text-align: center;
                        line-height: 22px;
                        margin-right: 5px;
                    } 
                    .line_right {
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
</style>