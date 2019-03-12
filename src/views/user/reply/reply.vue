<template>
  <div class="reply-body">
    <div class="reply-list">
      <div
        class="reply-item"
        v-for="(item,index) in relpyList"
        :key="index"
        @click="clickToSave(index)"
      >
        <div class="text-context">{{item.content|textOver()}}</div>
        <div
          class="select-icon"
          :style="{backgroundImage:'url(' + (item.status===1 ? check_pass : check_nor) + ')'}"
        ></div>
      </div>
    </div>
    <div class="reply-edit" @click="goToReplyContent">编辑欢迎语</div>
    <div class="reply-save" @click="saveMySelect">保存选择</div>
  </div>
</template>


<script>
import userService from 'SERVICE/userService'
import { Toast } from 'vant'

export default {
  data() {
    return {
      relpyList: [],
      selectItemInfo: {},
      check_pass: require('IMG/user/check_reply.png'),
      check_nor: require('IMG/user/check_nor.png')
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
        this.relpyList = JSON.parse(JSON.stringify(result))
      }
      for (let item of this.relpyList) {
        if (item.status == 1) {
          this.selectItemInfo = item
        }
      }
    },

    clickToSave(index) {
      this.selectItemInfo = this.relpyList[index]
      for (var i = 0; i < this.relpyList.length; i++) {
        this.relpyList[i].status = 0
      }
      this.relpyList[index].status = 1
    },

    /**
     * 保存选择
     */
    async saveMySelect() {
      let params = this.selectItemInfo
      var arr = Object.keys(this.selectItemInfo)
      if (arr.length == 0) {
        Toast('请选择要设置默认的欢迎语')
      } else {
        let obj = {}
        obj.content = params.content
        obj.status = 1
        obj.id = params.id

        const result = await userService.updataReplyInfo(obj)
        if (result) {
          Toast('欢迎语设置成功')

          setTimeout(() => {
            this.$router.back(-1)
          }, 1000)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.reply-body {
  background: rgba(247, 249, 250, 1);

  .reply-list {
    position: absolute;
    width: 100%;
    bottom: 80px;
    top: 0px;
    overflow: auto;

    .reply-item {
      background: white;
      display: flex;
      align-items: center;
      border-bottom: 1px #eeeeee solid;
      overflow: auto;

      .text-context {
        width: 85%;
        max-height: 96px;
        margin-top: 24px;
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        padding-left: 16px;
        font-size: 16px;
        color: #333333;
      }

      .select-icon {
        width: 25px;
        height: 25px;
        margin-left: 8px;
        line-height: 30px;
        background-size:cover;
      }
    }
  }

  .reply-edit {
    position: absolute;
    width: 100%;
    bottom: 65px;
    height: 56px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    color: #445166;
    font-size: 12px;
    background-color: white;
    margin-top: 20px;
  }

  .reply-save {
    position: absolute;
    bottom: 10px;
    width: 90%;
    margin-left: 5%;
    height: 44px;
    background: rgba(0, 122, 230, 1);
    border-radius: 6px;
    color: white;
    text-align: center;
    align-items: center;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    font-size: 16px;
  }
}
</style>

