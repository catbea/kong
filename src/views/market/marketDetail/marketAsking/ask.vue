<template>
  <div class="ask-page">
    <div class="ask-top">
      <div class="ask-title">百万选房师在线为你解答</div>
    </div>
    <div class="ask-content">
      <div class="ask-input-wrap">
        <textarea
          class="ask-textarea"
          placeholder="详细描述你买房的问题，描述的越清晰，越容易获得专家的解答（1-150字）"
          maxlength="150"
          rows="7"
          v-model="questionContent"
          @input="inputHandler"
          @blur="blurHandler"
        ></textarea>
      </div>
      <div class="ask-project-name">#{{linkerName}}#</div>
    </div>
    <div class="ask-bottom" @click="publishHandler">发布</div>
  </div>
</template>

<script>
import marketService from 'SERVICE/marketService'
export default {
  components: {},
  data: () => ({
    linkerId: '',
    linkerName: '',
    questionContent: ''
  }),
  created() {
    this.linkerId = this.$route.params.id
    this.linkerName = this.$route.query.linkerName
  },
  methods: {
    // 新增问题
    async insertQuestion() {
      let param = {
        interlocutionType: '1', // 1-评论、2-普通回复、3-管理员回复
        linkerId: this.linkerId,
        parentId: '',
        content: this.questionContent
      }
      const res = await marketService.insertQuestion(param)
      this.$router.go(-1)
    },
    inputHandler(val) {},
    blurHandler() {},
    publishHandler() {
      if (this.questionContent.length == 0) {
        this.$dialog.alert({ message: '请输入您要提的买房问题' })
        return
      }
      this.insertQuestion()
      this.questionContent = ''
    }
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


