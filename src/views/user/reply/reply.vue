<template>
  <div class="replys-body">
    <div class="reply-body">
      <div
        class="relpy-list"
        v-for="(item,index) in relpyList"
        :key="index"
        @click="clickToSave(item,index)"
      >
        <div class="text-context">{{item.content|textOver()}}</div>
        <div
          class="select-icon"
          :style="{backgroundImage:'url(' + (item.status===1 ? check_pass : check_nor) + ')'}"
        ></div>
      </div>
      <div class="edit-relpy" @click="goToReplyContent">编辑自动回复</div>
    </div>
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
        this.relpyList =  JSON.parse(JSON.stringify(result)) 
      }
    },

    clickToSave(data, index) {
      this.selectItemInfo = data
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
        Toast('请选择要设置......')
      } else {
        let obj = {}
        obj.content = params.content
        obj.status = 1
        obj.id = params.id

        const result = await userService.updataReplyInfo(obj)
        if (result) {
          Toast('设置成功')
        } else {
          Toast('请选择要设置......')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.replys-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(247, 249, 250, 1);

  > .reply-body {
    width: 100%;

    > .relpy-list {
      background: white;
      display: flex;
      align-items: center;
      border-bottom: 1px #eeeeee solid;
      overflow: auto;
      

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
        width: 50px;
        height: 50px;
        margin-left: 15px;
        line-height: 22px;
      }
    }

    > .edit-relpy {
      height: 56px;
      display: flex;
      align-items: center;
      padding-left: 16px;
      color: #445166;
      font-size: 12px;
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
    font-size: 16px;
    
  }
}
</style>

