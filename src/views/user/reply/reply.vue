<template>
  <div class="replys-body">
    <div class="reply-body">
      <div class="relpy-list" v-for="(item,index) in relpyList" :key="index">
        <div class="text-context">{{item.content|textOver()}}</div>
        <div class="select-icon">1</div>
      </div>
      <div class="edit-relpy" @click="goToReplyContent">编辑自动回复</div>
    </div>
    <div class="reply-save">保存选择</div>
  </div>
</template>


<script>
import userService from 'SERVICE/userService'

export default {
  data() {
    return {
      relpyList: []
    }
  },

  created() {
    this.getRelpyList()
  },

  methods: {
    goToReplyContent() {
      this.$router.push('/user/reply/replyContent')
    },

    /**
     * 获取回复列表的接口
     */
    async getRelpyList() {
      const result = await userService.queryReplyList()
      if (result) {
        this.relpyList = result
      }
    }
  }
}
</script>

<style lang="less" scoped>
.replys-body {
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
      background: white;
      display: flex;
      align-items: center;
      border-bottom: 1px #EEEEEE solid;

      .text-context {
        width: 87%;
        height: 96px;
        display: flex;
        align-items: center;
        padding-left: 16px;
        size: 16px;
        color: #333333;
      }

      .select-icon {
        width: 22px;
        height: 22px;
        margin-left: 15px;
      }
    }

    > .edit-relpy {
      height: 56px;
      display: flex;
      align-items: center;
      padding-left: 16px;
      color: #445166;
      size: 12px;
      background-color: white;
      margin-top: 20px;
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
    size: 16px;
  }
}
</style>

