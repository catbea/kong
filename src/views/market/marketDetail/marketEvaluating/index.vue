<template>
    <div class="html-body">
        <div v-html="htmlContent"></div>
        <div class="thumbs-up">
            <img class="thumb-img" :src="thumbImg">
            <span class="thumb-num">赞(32)</span>
        </div>
    </div>
</template>


<script>
export default {
  data: () => ({
    htmlContent: '',
    thumbImg: require('IMG/market/thumb.png')
  })
}
</script>


<style lang="less" scoped>
.html-body {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 32px;

  .thumbs-up {
    display: flex;
    width: 80px;
    height: 80px;
    background: rgba(250, 133, 72, 1);
    border-radius: 50%;
    align-items: center;    
    flex-direction: column;

    .thumb-img {
      margin-top: 16px;
      width: 33px;
      height: 33px;
    }

    .thumb-num{
        font-size: 12px;
        color: #ffffff;
        margin-top: 5px;
    }
  }
}
</style>

