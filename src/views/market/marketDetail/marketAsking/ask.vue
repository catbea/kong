<template>
  <div class="ask-page">
    <div class="ask-top">
      <div class="ask-title">百万选房师在线为你解答</div>
    </div>
    <div class="ask-content">
      <div class="ask-input-wrap">
        <textarea
          class="ask-textarea"
          placeholder="详细描述你买房的问题，描述的越清晰，越容易获得 专家的解答（1-150字）"
          maxlength="150"
          rows="7"
          v-model="commentContent"
          @input="inputHandler"
          @blur="blurHandler"
        ></textarea>
      </div>
      <div class="ask-project-name">#碧桂园·山水江南#</div>
    </div>
    <div class="ask-bottom">发布</div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({}),
  methods: {
    inputHandler() {},
    blurHandler() {}
  }
}
</script>

<style lang="less" scoped>
.ask-page {
  > .ask-top {
    box-sizing: border-box;
    width: 100%;
    padding: 16px;
    > .ask-title {
      color: #333;
      font-size: 24px;
      font-weight: bold;
      line-height: 33px;
    }
  }
  > .ask-content {
    box-sizing: border-box;
    width: 100%;
    padding: 0 16px;
    > .ask-input-wrap {
      width: 100%;
      height: 200px;
      border: 1px solid #e4e4e4;
      > .ask-textarea {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 10px;
        color: #333;
        font-size: 14px;
        line-height: 22px;
        border: none;
      }
      .ask-textarea::-webkit-input-placeholder {
        color: #999;
        font-size: 14px;
      }
      .ask-textarea::-moz-placeholder {
        color: #999;
        font-size: 14px;
      }
      .ask-textarea:-moz-placeholder {
        color: #999;
        font-size: 14px;
      }
      .ask-textarea:-ms-input-placeholder {
        color: #999;
        font-size: 14px;
      }
    }
    > .ask-project-name {
      color: #666;
      font-size: 16px;
      margin-top: 16px;
    }
  }
  > .ask-bottom {
    box-sizing: border-box;
    //   width: 100%;
    height: 44px;
    line-height: 44px;
    // padding: 16px;
    text-align: center;
    background-color: #007ae6;
    border-radius: 6px;
    color: #ffffff;
    font-size: 16px;
    position: fixed;
    left: 16px;
    right: 16px;
    bottom: 16px;
  }
}
</style>


