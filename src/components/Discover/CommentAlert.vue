<template>
  <div class="comment-alert-container" v-if="show">
    <!-- <div class="comment-alert" :style="{height:info.contentHeight + 'px'}"> -->
    <div class="comment-alert">
      <div class="comment-top">
        <div class="comment-cancel" @click="cancelHandler">取消</div>
        <div class="comment-publish" @click="publishHandler">发布</div>
      </div>
      <div class="comment-title" :style="{margin:(info&&info.title) ? '16px 0' : '20px 0 0 0'}">
        <!-- <span class="comment-name" v-if="info.receiverName">{{info&&info.receiverName}}：</span> -->
        <!-- <div class="comment-content">{{info&&info.title}}</div> -->
        <div class="comment-content">{{info&&info.title}}</div>
      </div>
      <div class="comment-input-wrap">
        <textarea class="comment-textarea" :placeholder="info&&info.placeholder" :maxlength="maxlength" rows="5" v-model.trim="commentContent" @input="inputHandler" @blur="blur"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    show: { type: Boolean, default: false },
    info: {
      type: Object
    },
    maxlength: {
      type: Number,
      default: 140
    }
  },
  data: () => ({
    commentContent: ''
  }),
  methods: {
    inputHandler() {
      this.$emit('input', this.commentContent)
    },
    cancelHandler() {
      this.commentContent = ''
      this.$emit('cancel')
    },
    publishHandler() {
      this.commentContent = ''
      this.$emit('publish')
    },
    blur() {
      document.activeElement.scrollIntoViewIfNeeded(true)
    }
  }
}
</script>
<style lang="less" scoped>
.comment-alert-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 10;
  > .comment-alert {
    position: fixed;
    bottom: 0;
    // top: 64px;
    background-color: #ffffff;
    padding: 20px 16px;
    width: 100%;
    // height: 667px;
    > .comment-top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      > .comment-cancel {
        color: #333333;
        font-size: 16px;
      }
      > .comment-publish {
        color: #ffffff;
        font-size: 14px;
        border-radius: 6px;
        background-color: #007ae6;
        width: 56px;
        height: 32px;
        line-height: 32px;
        text-align: center;
      }
    }
    > .comment-title {
      display: flex;
      // margin: 16px 0;
      > .comment-name {
        font-size: 16px;
        color: #666666;
        font-weight: 500;
        margin: 2px 0 2px 3px;
        flex: 1;
      }
      > .comment-content {
        font-size: 16px;
        color: #666666;
        line-height: 1.5;
        // margin: 1px 0 0 3px;
        // flex: 6;
      }
    }
    > .comment-input-wrap {
      width: 100%;
      > .comment-textarea {
        width: 100%;
        background-color: rgba(150, 158, 168, 0.08);
        font-size: 16px;
        border: 0;
        padding: 7px 10px;
        color: #13294f;
        line-height: 1.5;
      }
    }
  }
}
</style>
