<template>
  <div class="opinion-feedback-page">
    <ul>
      <router-link tag="li" to="/user/opinionFeedback/describe">
        <div class="opinion-feedback-page-title">请选择问题类型</div> 
        <p>感谢您的反馈，您的意见对我们非常重要</p>
     </router-link>
     <router-link tag="li" to="/user/opinionFeedback/describe">
        1:遇到了问题
        <p>使用途中遇到无法加载等问题</p>
        <span class="bg_img" :style="{backgroundImage:'url('+detailImg+')'}"></span>
      </router-link>
      <router-link tag="li" to="/user/opinionFeedback/describe">
       2:想要新功能
        <p>期望添加新的额功能，优化使用体验</p>
        <span class="bg_img" :style="{backgroundImage:'url('+detailImg+')'}"></span>
      </router-link>
      <router-link tag="li" to="/user/opinionFeedback/describe">
        3:不知道怎么玩
        <p>对aw大师小程序的使用有不懂的地方</p>
        <span class="bg_img" :style="{backgroundImage:'url('+detailImg+')'}"></span>
      </router-link>
      <router-link tag="li" to="/user/opinionFeedback/describe">
        4:我要吐槽
        <p>用的不爽，吐槽两句</p>
        <span class="bg_img" :style="{backgroundImage:'url('+detailImg+')'}"></span>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    detailImg: require('IMG/user/arrow2@2x.png')
  })
}
</script>
<style lang="less">
.opinion-feedback-page {
  ul {
    margin-left: 16px;
    margin-top: 19px;
    width: 345px;
    li {
      position: relative;
      display: flex;
      flex-direction: column;
      margin-bottom: 50px;
      font-size: 20px;
      
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      p {
        font-size: 12px;
        
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      span {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 50%;
        right: 0;
      }
      .opinion-feedback-page-title {
        font-size: 24px;
      }
    }
  }
}
</style>
