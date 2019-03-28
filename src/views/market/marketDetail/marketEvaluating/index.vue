<template>
    <div class="html-body">
        <div v-html="htmlContent"></div>

        <div class="thumbs-up">

        </div>
    </div>
</template>


<script>
export default {
  data: () => ({
      htmlContent:'',

  })
}
</script>


<style lang="less" scoped>

   .html-body{
       width: 100%;



       .thumbs-up{
           width: 80px;
           height: 80px;
           background:rgba(250,133,72,1);
           border: 50%;
       }
   }

</style>

