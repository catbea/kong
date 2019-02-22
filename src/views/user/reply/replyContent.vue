<template>
  <div class="replys-body">
    <div class="reply-body">
      <div
        class="relpy-list"
        v-for="(item,index) in relpyList"
        :key="index"
        @click="enterEditPage(item.id,item.content)"
      >
        <div class="text-context">{{item.content|textOver()}}</div>
        <img class="select-icon" :src="arrowIcon">
      </div>
      <div class="edit-relpy" @click="goToReplyContent">
        <img class="add-img" :src="addReplyIcon">
        <span>新增自动回复</span>
      </div>
    </div>
    <!-- <div class="reply-save">
      <div class="cancel-view">取消</div>
      <div class="sure-view">确定</div>
    </div>-->
  </div>
</template>


<script>
import userService from 'SERVICE/userService'

export default {
  data() {
    return {
      arrowIcon: require('IMG/user/arrow2@2x.png'),
      addReplyIcon: require('IMG/user/add_reply.png'),
      relpyList: []
    }
  },

  mounted() {
    this.getRelpyList()
  },

  methods: {
    goToReplyContent() {
      if (this.relpyList.length > 0) {
        let params = {}
        params.id = -1
        params.status = 1
        params.content = ''
        this.$router.push({ path: '/user/reply/editReply', query: params })
      } else {
        let params = {}
        params.id = -1
        params.status = 0
        params.content = ''
        this.$router.push({ path: '/user/reply/editReply', query: params })
      }
    },

    async getRelpyList() {
      const result = await userService.queryReplyList()
      if (result) {
        this.relpyList = result
      }
    },

    enterEditPage(id, content) {
      let params = {}
      params.id = id
      params.status = 0
      params.content = content
      this.$router.push({ path: '/user/reply/editReply', query: params })
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
      border-bottom: 1px #eeeeee solid;

      > .text-context {
        width: 87%;
        height: 96px;
        display: flex;
        align-items: center;
        padding-left: 16px;
        font-size: 16px;
        color: #333333;
      }

      > .select-icon {
        width: 22px;
        height: 22px;
        margin-left: 15px;
      }
    }

    > .edit-relpy {
      height: 56px;
      display: flex;
      align-items: center;
      color: #445166;
      font-size: 16px;
      background-color: white;
      margin-top: 20px;

      > .add-img {
        width: 22px;
        height: 22px;
        margin-left: 20px;
      }

      span {
        margin-left: 10px;
        width: 100%;
      }
    }
  }

  > .reply-save {
    width: 343px;
    height: 44px;
    margin-top: 10px;
    display: flex;
    justify-content: center;

    > .cancel-view {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 163px;
      height: 44px;
      border-radius: 6px;
      border: 1px solid rgba(0, 122, 230, 1);
      color: #007ae6;
      margin-right: 10px;
      font-size: 14px;
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
      margin-left: 10px;
      font-size: 14px;
    }
  }
}
</style>
