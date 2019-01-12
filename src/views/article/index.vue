<template>
  <div class="article-box">
    <Guide v-if="showGuide" @hideGuide="hideStep"/>
    <div class="tab-bar scale-1px-bottom">
      <span class="recommend">推荐</span>
      <span>深圳</span>
      <span>行情</span>
      <span>大佬说</span>
    </div>
    <div class="article-list">
      <div class="article-item">
        <div class="content scale-1px-bottom">
          <div class="left-cnt">
            <h3 class="title"></h3>
            <div class="attr">
              <p class="source">
                <span class="name"></span>
                <span class="time"></span>
              </p>
              <span class="read"></span>
            </div>
          </div>
          <div class="img"></div>
        </div>
        <div class="comment">
          <div class="like-cnt">
            <div class="like-box">
              <span class="name"></span>
            </div>
            <div class="comment-box">
              <p class="comment-item"></p>
            </div>
          </div>
          <div class="action">
            <span class="like-icon"></span>
            <span class="comment-icon"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Guide from './guide'
export default {
  components: {
    Guide
  },
  data () {
    return{
      showGuide: false
    }
  },
  created () {
    this.showGuide = JSON.parse(window.localStorage.getItem('guideStatus')) 
  },
  mounted () {
  },
  methods: {
    // 隐藏引导页
    hideStep () {
      this.showGuide = false
      window.localStorage.setItem('guideStatus', false)
    }
  }
}
</script>

<style lang="less" scoped>
.article-box{
  .tab-bar{
    font-size: 14px;
    color: #333;
    height: 20px;
    line-height: 20px;
    padding: 12px 16px;
    height: 54px;
    span{
      display: inline-block;
      margin-right: 32px;
    }
    .recommend{
      font-size: 24px;
      height: 34px;
      line-height: 34px;
    }
  }
}
</style>
