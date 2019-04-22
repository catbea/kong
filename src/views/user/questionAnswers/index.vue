<template>
    <div class="main_pages">
        <div class="pges_content" @mousewheel="isShow" @touchmove="isShow">
            <div class="pages_tabs"> 
                <van-tabs v-model="active" color="#007AE6" :line-width="15" :swipe-threshold="6" sticky animated title-active-color="#007AE6" @click="getanswersList(active,current)">
                    <van-tab v-for="item in tabs" :key="item.index" :title="item.typeName"></van-tab>
                </van-tabs>
            </div>
            <div class="pages_dataCenter">
                <div class="pages_dataCenter_question" v-if="active === 0 ">
                    <my-question :questionData="questionData"></my-question> 
                </div>
                <div class="pages_dataCenter_answers" v-if="active === 1 ">
                    <my-answers :answersData="answersData"></my-answers>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyQuestion from '../../../components/QuestoinAnswers/MyQuestion'
import myAnswers from '../../../components/QuestoinAnswers/myAnswers'
import marketService from 'SERVICE/marketService'
export default {
    components: {
        MyQuestion, 
        myAnswers,
    },
    computed: {
        ...mapGetters(['currDataDynamicsTab'])
    },
    data () {
        return {
            tabs: [
                { index: 0, type: '', typeName: '我的回答', page: 0, finished: false, list: [] },
                { index: 1, type: '', typeName: '我的提问', page: 0, finished: false, list: [] },
            ],
            active: this.currDataDynamicsTab,
            finished: false, 
            questionData:[],
            answersData:[],
            loading: false,
            typeId :"",
            current:1,
            page :""
        }
    },
    mounted () {
        this.getanswersList(0,1);
    },
    methods : {
        isShow () {  
            if (this.page > this.current) { 
                this.current = this.current + 1; 
                this.getanswersList(this.active,this.current);
            } 
        },
        getanswersList (data,current) {   
            this.active = data
            this.current = current
            if (this.active ==  0) {
                this.typeId = 2
            }else{
                this.typeId = 1
            }
            marketService.getqueryMyList({interlocutionType:this.typeId,current:this.current,size:20
            }).then((result) => { 
                this.page = result.pages
                if (this.typeId == 2) {
                    // this.questionData = result.records  
                    this.questionData = this.questionData.concat(result.records)
                    console.log(this.questionData)
                }else {
                    // this.answersData = result.records  
                    this.answersData = this.answersData.concat(result.records)
                    console.log(this.answersData)
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>
