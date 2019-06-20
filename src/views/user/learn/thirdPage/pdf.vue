<template>
    <div>
        <iframe id="eapPdf" :data-url="url" src="/static/pdf/index.html"   :style="{'height':height+'px', 'width': width+'px'}" > </iframe>        
    </div>
</template> 

<script>
import userService from 'SERVICE/userService'
export default {
    data:() => ({
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
        url:"",
        pdfUrl:''
    }),
    mounted() { 
        this.getList();
    },
    methods:{
        getList () {
            userService.getDevelopersMaterialDetail({id:this.$route.query.id
            }).then((result) => {    
                this.pdfUrl = result.content 
                this.getFile(this.pdfUrl)
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