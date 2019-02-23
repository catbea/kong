<template>
  <div class="edit-body">
    <div class="input-body">
      <textarea
        class="input-content-body"
        placeholder="请输入自动回复内容"
        maxlength="50"
        v-model="replyContent"
      ></textarea>
    </div>
    <div class="bottom-body">
      <div class="cancel-view" @click="cancelReply">取消</div>
      <div class="sure-view" @click="saveReply">保存</div>
    </div>
  </div>
</template>

<script>
import userService from 'SERVICE/userService'

import { Dialog, Toast } from 'vant'

export default {
  data() {
    return {
      replyContent: '',
      statusFirst: this.$route.query.status,
      replyId: -1
    }
  },

  created() {
    let params = this.$route.query

    this.replyId = params.id

    if (params.status === 0 && params.content.length > 0) {
      document.title = '编辑内容'
      this.replyContent = params.content
    } else {
      document.title = '新增回复'
    }
  },

  methods: {
    async setReplyInfo(data) {
      const result = await userService.updataReplyInfo(data)
      if (result) {
        this.showDialogSuccessMsg()
      }
    },

    saveReply() {
      let editContent = this.replyContent
      if (editContent.length > 0) {
        if (editContent.length > 50) {
          Toast('输入内容不得超过50个字')
        } else {
          let obj = {}
          obj.content = this.replyContent
          obj.status = this.statusFirst
          obj.id = this.replyId
          this.setReplyInfo(obj)
        }
      } else {
        this.showDialogErrMsg()
      }
    },

    cancelReply() {
      this.$router.back(-1)
    },

    showDialogErrMsg() {
      Dialog.alert({
        title: '保存失败',
        message: '自动回复内容不可为空'
      }).then(() => {
        // on close
      })
    },

    showDialogSuccessMsg() {
      Dialog.alert({
        message: '保存成功'
      }).then(() => {
        // on close
        this.$router.back(-1)
      })
    }
  }
}
</script>


<style lang="less" scoped>
.edit-body {
  width: 100%;
  height: 100%;
  background: rgba(247, 249, 250, 1);

  > .input-body {
    width: 100%;
    background: white;
    padding-top: 24px;
    padding-bottom: 24px;
    padding-left: 16px;
    padding-right: 16px;

    > .input-content-body {
      width: 100%;
      font-size: 16px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      border: 0;
      height: 42px;
      color: #333333;
    }
  }

  > .bottom-body {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;

    > .cancel-view {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 163px;
      height: 44px;
      border-radius: 6px;
      border: 1px solid rgba(0, 122, 230, 1);
      color: #007ae6;
      font-size: 16px;
      margin-right: 8.5px;
    }

    > .sure-view {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 163px;
      height: 44px;
      background: rgba(0, 122, 230, 1);
      border-radius: 6px;
      color: white;
      margin-left: 8.5px;
      font-size: 16px;
    }
  }
}
</style>
