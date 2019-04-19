<template>
    <div class="question_pages">
        <div class="pages_content" v-if="questionData" @mousewheel="imgScroll" @touchmove="imgScroll"> 
            <ul class="cart-list">
                <li class="list-item" v-for="(item,index) in questionData " data-type="0">
                    <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
                        <div class="details">
                            {{item.content}}
                        </div>
                    </div>
                    <div class="delete" @click="deleteItem(item.interlocutionId,index)" :data-index="index">删除</div>
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
        questionData: { type: Array }, 
    },
    data () { 
        return {   
            startX : 0 ,
            endX : 0 ,
            id:"" //问答id
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
                    title: '确认删除？', 
                }).then(() => { 
                    marketService.getqueryDelete({interlocutionId:item})
                    .then ((result) => {
                        // 复位
                        this.restSlide();
                        // 删除
                        this.questionData.splice(index,1);
                    })                    
                    
                }).catch(() => { 
                    this.restSlide(); 
                }) 
            },
            // getList () { 

            // }
        
    }
}
</script>



<style lang="less" scoped> 
.question_pages {  
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
                    height: 102px; 
                    background: #EA4D2E;
                    font-size: 16px;
                    line-height: 102px;
                    color: #fff;
                    text-align: center;
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
                height: 102px;
                padding: 20px 0;
                background: #fff;
                display: flex;
                border-bottom: 1px solid #DEDEDE;
                font-size: 14px;
                .details{
                    flex: 1;
                    display: inline-flex;
                    vertical-align: top; 
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

 