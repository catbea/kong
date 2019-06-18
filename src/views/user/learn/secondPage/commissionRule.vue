<template>
    <div class="rule_view"> 
        <ul class="ul_view">
            <li class="li_view" v-for="(item,index) in ruleList" :key="index" >
                <div class="li_left">
                    <div class="left_img">
                        {{item.name}}
                    </div>
                    <div class="left_icon">
                    </div>
                </div>
                <div class="li_right">
                    {{item.name}}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data:() =>({
        ruleList:[
            {name:'inin'}
        ]
    })
}
</script>

<style lang="less" scoped>
.rule_view {
    background: #ffffff;
    .ul_view {
        list-style: none;
        .li_view {
            background: yellow;
            display: flex;
            .li_left {
                .left_img {
                    width: 120px;
                    height: 90px;
                    background: red;
                }
            }
        }
    }
}
</style>
