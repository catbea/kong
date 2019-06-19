<template>
    <div class="h5_view">
        <div class="h5_main">
            <div class="h5_title">
                {{title}}
            </div>
            <div class="h5_info">
                <div>更新时间：{{time}}</div>
                <div>浏览量：{{num}}</div>
            </div>
            <div class="h5_content" v-html=""></div>
        </div>
    </div>
</template>
<script>
export default {
    data:() => ({
        title:"楼盘推介项目介绍资料学习，学习查看楼盘推介项",
        time:'2019/05/13',
        num:'912'
    })
}
</script>
<style lang="less" scoped>
.h5_view {
    background: #ffffff;
    .h5_main {
        padding: 20px 16px 0 16px;
        .h5_title {
            color: #333333;
            font-size: 22px;
            font-weight: bold;
        }
        .h5_info {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #969EA8;
            margin-top:14px;
        }
        .h5_content {
            margin-top: 21px;
            color: #666666;
            font-size: 17px;
        }
    }
}
</style>
