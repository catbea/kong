<template>
    <div class="main_pages">
        <div class="pges_content">
            <div class="pages_tabs"> 
                <van-tabs v-model="active" color="#007AE6" :line-width="15" :swipe-threshold="6" sticky animated title-active-color="#007AE6" @click="getanswersList(active)">
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
            typeId :""
        }
    },
    mounted () {
        this.getanswersList(0);
    },
    methods : {
        getanswersList (data) { 
            this.active = data
            if (this.active ==  0) {
                this.typeId = 2
            }else{
                this.typeId = 1
            }
            marketService.getqueryMyList({interlocutionType:this.typeId
            }).then((result) => {
                if (this.typeId == 2) {
                    this.questionData = result.records  
                }else {
                    this.answersData = result.records  
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
