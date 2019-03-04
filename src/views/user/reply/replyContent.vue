<template>
  <div class="replys-body">
    <div class="reply-body">
      <div v-for="(item,index) in relpyList" :key="index">
        <van-swipe-cell :right-width="80" :ref="`replyItem-${index}`">
          <van-cell-group>
            <div class="van-hairline--bottom relpy-list">
              <img :src="editIcon" class="editIcon" @click="toDeleClick(index)">
              <div
                class="text-context"
                @click="enterEditPage(item.id,item.content)"
              >{{item.content|textOver()}}</div>
              <img :src="arrowIcon" class="arrowIcon">
            </div>
          </van-cell-group>
          <span slot="right" class="dele-item" @click="deleReply(index,item)">删除</span>
        </van-swipe-cell>
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
import { Toast } from 'vant'

export default {
  data() {
    return {
      arrowIcon: require('IMG/user/arrow2@2x.png'),
      editIcon: require('IMG/user/edit_status.png'),
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
        if (this.relpyList.length >= 5) {
          Toast('无法添加更多欢迎语')
        } else {
          let params = {}
          params.id = -1
          params.status = 0
          params.content = ''
          this.$router.push({ path: '/user/reply/editReply', query: params })
        }
      } else {
        let params = {}
        params.id = -1
        params.status = 1
        params.content = ''
        this.$router.push({ path: '/user/reply/editReply', query: params })
      }
    },

    deleReply(index, item) {
      if (this.relpyList[index].status === 1) {
        //表示当前选择的是被设置成默认的欢迎语的选项,不可用于删除
        Toast('无法删除默认的欢迎语')
        return
      } else {
        //执行清除操作
        var id = this.relpyList[index].id
        this.toDeleReply(id, item)
      }
    },

    async toDeleReply(id, item) {
      const result = await userService.deleReply(id)

      if (result == '') {
        for (var i = 0; i < this.relpyList.length; i++) {
          if (this.relpyList[i] == item) {
            this.relpyList.splice(i, 1) //删除下标为i的元素
          }
        }

        Toast('删除欢迎语成功')
      }
    },

    async toDeleClick(index) {
      const tempComp = this.$refs[`replyItem-${index}`][0]
      setTimeout(() => {
        tempComp.open()
      }, 1)
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
      params.status = 1
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
  }

  > .reply-save {
    width: 100%;
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

  .relpy-list {
    background: white;
    width: 100%;
    border-bottom: 1px #eeeeee solid;
    height: 96px;
    display: flex;
    align-items: center;
    padding-left: 16px;

    > .editIcon {
      width: 22px;
      height: 22px;
      line-height: 96px;
    }

    > .arrowIcon {
      width: 18px;
      height: 18px;
    }

    > .text-context {
      padding-left: 16px;
      font-size: 16px;
      color: #333333;
      width: 85%;
    }
  }

  .edit-relpy {
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

  .dele-item {
    display: block;
    height: 96px;
    width: 80px;
    line-height: 96px;
    color: #fff;
    font-size: 16px;
    background-color: #ea4d2e;
    text-align: center;
  }
}
</style>
