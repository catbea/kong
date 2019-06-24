<template>
    <div>
        <iframe id="eapPdf" v-if="url.length>0" :data-url="url" src="/static/pdf/index.html"   :style="{'height':height+'px', 'width': width+'px'}" > </iframe> 
        <div v-if="url.length==0" class="loading-box">
            <van-loading type="spinner" color="#1989fa" class="loading_in"/>
        </div>       
    </div>
</template> 

<script>
import userService from 'SERVICE/userService' 
import { mapGetters } from 'vuex'
export default {
    data:() => ({
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
        url:"",
        pdfUrl:'',
        developersId:""
    }),
    computed: {
    ...mapGetters(['userInfo']),
    },
    created () {
        console.log(this.userInfo, 11111)  
    },
    mounted() { 
        this.getList();
        // this.gostudyAdd();
    },
    methods:{
        gostudyAdd() {
            userService.getDevelopersMaterialadd({materialId:this.$route.query.id,agentId:this.userInfo.agentId,developersId:this.developersId,linkerId:this.$route.query.linkerId 
            }).then((result) => { 
            }).catch((err) => {
                console.log(err)
            })
        }, 
        getList () {
            userService.getDevelopersMaterialDetail({id:this.$route.query.id
            }).then((result) => { 
                this.pdfUrl = result.content;
                this.developersId = result.developersId; 
                this.getFile(this.pdfUrl);
                this.gostudyAdd();
            }).catch((err) => {
                console.log(err)
            })
        },
        getFile(data) {  
            const url = data
            // const url = 'http://192.168.17.204/static/pdf/1.pdf'
            let $this = this;
            let xhr = new XMLHttpRequest();
            xhr.open("get", url , true);
            xhr.responseType = "blob";
            xhr.onload = function() {
                if (this.status == 200) {
                    let blob = new Blob([this.response]);
                    $this.url = URL.createObjectURL(blob);
                    console.log($this.url)
                }
            };
            xhr.send();
        }
    }
    
}
</script>
<style lang="less" scoped>
div {
    .loading-box {
        z-index: 22px;
        display: flex;
        justify-content: center; 
        align-items: center;
        width: 100%;
        height: 100vh;
    }
}
</style>
