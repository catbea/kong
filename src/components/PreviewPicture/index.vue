<template>
  <div class="preview-picture-page">
    
  </div>
</template>
<script>
import { ImagePreview } from 'vant';
export default {
  created() {
    let _this=this
    ImagePreview({
  images:this.$route.query.arr,
  startPosition: 0,
  onClose() {
    _this.$router.go(-1) 
  }
  });
 console.log(this.$route.query.arr)
  },
  data() {
    return {
      arr:null
    }
  },
  props:{
    
  },
  methods: {
    
  },
}
</script>
<style lang="less">

</style>
