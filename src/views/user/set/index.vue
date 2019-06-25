<template>
    <div class="div_view">
        <ul class="ul_view">    
            <li class="li_view van-hairline--bottom" v-for="(item,index) in btnIcons" :key="index"  @click="selectedHeads(index)"> 
                <div class="li van-hairline--bottom">
                    <span  style="font-size:14px;">{{item.title}}</span> 
                </div>
                <div class="li van-hairline--bottom">
                    <van-switch v-model="checked" @change="changeSwitch" v-if="item.title == 'AI客服'" class="switch" size="22px"/>
                    <img src="../../../assets/img/user/setright.png" class="icon" alt="" v-else>
                </div> 
            </li>
            
        </ul>
    </div>
</template>
<script>
import userService from 'SERVICE/userService'
export default {
    data:() => ({
        btnIcons: [{ title: '勿扰模式'},{title: 'AI客服'},{ title: '欢迎语设置'}, { title: '意见反馈'}, ],
        checked: false
    }),
    created() {
        this.getAI()
    },
    methods:{
        changeSwitch () {
            userService.updateAI({status: this.checked ? 1 : 0}).then(res => {
                if (this.checked) {
                this.$toast('AI客服开启成功')
                } else {
                this.$toast('AI客服关闭成功')
                }
            }).catch()
        },
        getAI () {
            userService.getAI({}).then(res => {
                this.checked = !!res
            }).catch()
        },
        selectedHeads(index) {
            switch (index) {
                case 0:
                this.$router.push('/user/noDisturb')
                break
                case 1: 
                break
                case 2:
                this.$router.push('/user/reply')
                break
                case 3:
                window.location = 'https://support.qq.com/product/31776' 
                break
            }
        }
    }
}
</script>
<style lang="less" scoped>
.div_view {
    background: #F7F9FA;
    .ul_view {  
        list-style:none;
        padding-left: 17px;
        background: #fff;  
        .li_view {
            width: 100%;
            height: 52px;
            display: flex;
            justify-content: space-between;
            background: #fff;
            .icon{
                width:16px;
                height:16px;
                margin-right:15px;
            }
            .switch {
                margin-right:15px;
            }
            .li {
                display: flex;
                align-items:center;
            }
        }
    }
}
</style>
