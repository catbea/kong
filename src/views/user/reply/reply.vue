<template>
    <div class="content-body">
        <div class="reply-body">
            <div class="relpy-list">
                <div class="text-context">{{editMsg|textOver()}}</div>
                <div class="select-icon">1</div>
            </div>
            <div class="edit-relpy" @click="goToReplyContent">编辑自动回复</div>
        </div>
        <div class="reply-save">保存选择</div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      editMsg: '手机号会计师福克斯地方手机号会计师福克斯地方开始福克斯电话费康师傅开始福克斯电话费康师傅'
    }
  },

  methods: {
    goToReplyContent() {
      this.$router.push('/user/reply/replyContent')
    }
  }
}
</script>

<style lang="less">
.content-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(247, 249, 250, 1);

  > .reply-body {
    width: 100%;
    height: 90%;

    > .relpy-list {
      margin-bottom: 20px;
      background: white;
      display: flex;
      align-items: center;

      .text-context {
        width: 87%;
        height: 96px;
        background: green;
        display: flex;
        align-items: center;
        padding-left: 16px;
        size: 16px;
        color: #333333;
      }

      .select-icon {
        width: 22px;
        height: 22px;
        background: red;
        margin-left: 15px;
      }
    }

    > .edit-relpy {
      height: 56px;
      display: flex;
      align-items: center;
      padding-left: 16px;
      color: #445166;
      size: 16px;
      background-color: white;
    }
  }

  > .reply-save {
    width: 343px;
    height: 44px;
    background: rgba(0, 122, 230, 1);
    border-radius: 6px;
    color: white;
    text-align: center;
    align-items: center;
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>

