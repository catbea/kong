<template>
    <div>
        <iframe id="eapPdf" :data-url="url" src="http://192.168.17.204/static/pdf/index.html"  :style="{'height':height+'px', 'width': width+'px'}" > </iframe>        
    </div>
</template>

<script>
export default {
    data:() => ({
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
        url:""
    }),
    mounted() { 
        this.getFile();
    },
    methods:{
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