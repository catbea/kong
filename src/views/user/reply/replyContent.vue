<template>
  <div class="content-body">
    <div class="reply-body">
      <div class="relpy-list">
        <div class="text-context">123</div>
        <img class="select-icon" :src="arrowIcon">
      </div>
      <div class="edit-relpy" @click="goToReplyContent">
        <img class="add-img" :src="addReplyIcon">
        <span>新增自动回复</span>
      </div>
    </div>
    <div class="reply-save">
      <div class="cancel-view">取消</div>
      <div class="sure-view">确定</div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      arrowIcon: require('IMG/user/arrow2@2x.png'),
      addReplyIcon: require('IMG/user/add_reply.png'),
      relpyList: []
    }
  },

  methods: {
    goToReplyContent() {}
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
      color: #445166;
      size: 16px;
      background-color: white;

      > .add-img {
        width: 22px;
        height: 22px;
      }

      span {
        margin-left: 10px;
      }
    }
  }

  > .reply-save {
    width: 343px;
    height: 44px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;


    > .cancel-view {
      width: 163px;
      height: 44px;
      border-radius: 6px;
      border: 1px solid rgba(0, 122, 230, 1);
      color: #007AE6;
      margin-right: 10px;
      size: 14px;
    }

    > .sure-view {
      width: 163px;
      height: 44px;
      background: rgba(0, 122, 230, 1);
      border-radius: 6px;
      color: white;
      margin-left: 10px;
      size: 14px;
    }
  }
}
</style>
