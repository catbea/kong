<template>
    <div class="rule_view"> 
        <ul class="ul_view">
            <li class="li_view" v-for="(item,index) in ruleList" :key="index" >
                <div class="li_left">
                    <div class="left_img">
                        <img src="../../../../assets/img/user/invitation/aw-banner1@2x.png" alt="" class="img">
                    </div>
                    <div class="left_icon">
                        {{item.name}}
                    </div> 
                </div>
                <div class="li_right">
                    <div class="right_title">
                        {{item.name}}
                    </div>
                    <div class="right_info">
                        <div style="font-size:10px;">更新时间：{{item.name}}</div>
                        <div style="font-size:10px;">{{item.name}}查看</div>
                    </div>
                </div> 
            </li>
        </ul>
                <iframe id="eapPdf" :data-url="url" src="http://192.168.17.204/static/pdf/index.html"  :style="{'height':height+'px', 'width': width+'px'}" > </iframe>
<!-- http://192.168.17.204/static/pdf/1.pdf -->
    </div> 
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    components: {
    ...mapGetters(['userInfo']), 
    },
    data:() =>({
        ruleList:[
            {name:'pdf'},
            {name:'inin'},
        ],
        isTpye:1,
        height: document.documentElement.clientHeight - 10,
        width: document.documentElement.clientWidth - 15,
        url:""
    }),
    mounted() { 
        this.getFile();
    },
    methods: {
        getFile() {
            const url ='http://720ljq2-10037467.file.myqcloud.com/linker/project/application/8d0ca0d59ed145af9696cd44363509a6.pdf'
            let $this = this;
            let xhr = new XMLHttpRequest();
            xhr.open("get", url , true);
            xhr.responseType = "blob";
            xhr.onload = function() {
            if (this.status == 200) {
                let blob = new Blob([this.response]);
                $this.url = URL.createObjectURL(blob);
                }
            };
            xhr.send();
        }
    }
}
</script>

<style lang="less" scoped>
.rule_view {
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
                .left_icon1 {
                    width: 33px;
                    height: 15px;
                    background: #FA6400;
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
                .left_icon2 {
                    width: 33px;
                    height: 15px;
                    background: #01B805;
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
            }
            .li_right {
                height: 90px;
                width: 62%;
                .right_title {
                    height: 42px;
                    font-size: 20px;
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
}
</style>
