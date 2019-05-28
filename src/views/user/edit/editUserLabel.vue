<template>
  <div class="edit-user-label">
    <div class="title">
      编辑标签
    </div>
    <div class="content">
      <div class="item scale-1px-bottom" @click="addLabel">
        <img class="add" src="../../../assets/img/user/userLabel/add.png" alt="">
        新增标签
      </div>
      <div class="item scale-1px-bottom" v-for="(item,index) in agentLabelList" :key="index">
        <img class="delete" src="../../../assets/img/user/userLabel/delete.png" alt="" @click="deleteLabel(index)">
        <input class="label" :ref="item.itemCode" type="text" v-model.trim="item.itemName" @focus="currentIndex=index" @blur="blur(index)">
        <img v-show="index===currentIndex" class="clear" src="../../../assets/img/user/userLabel/clear.png" alt="" @click="clearLabel(index)">
      </div>
    </div>
    <div class="action" @click="saveLabel">
      提交
    </div>
  </div>
</template>

<script>
import userService from 'SERVICE/userService'
export default {
  data () {
    return {
      agentLabelList: [],
      currentIndex: ''
    }
  },
  created () {
    this.getAgentLabelList()
  },
  methods: {
    getAgentLabelList () {
      userService.getAgentLabelList(1).then(res => {
        this.agentLabelList = res
      }).catch()
    },
    addLabel () {
      let obj = {
        classify: 'user_tag',
        createId: '',
        createTime: '',
        id: '',
        itemCode: '',
        itemName: '',
        selectFlag: '',
        sort: '',
        status: '',
        updateTime: ''
      }
      this.agentLabelList.unshift(obj)
    },
    deleteLabel (index) {
      this.$dialog.confirm({
        title: '删除提示',
        message: '是否确认删除该标签？'
      }).then(() => {
        this.agentLabelList.splice(index,1)
      }).catch()
    },
    clearLabel (index) {
      this.agentLabelList[index].itemName = ''
    },
    saveLabel () {
      let empty = false
      this.agentLabelList.forEach(item => {
        if (!item.itemName) {
          empty = true
        }
      })
      if (empty) {
        return this.$dialog.alert({
          message: '有标签为空，请处理后保存'
        })
      }
    },
    blur (index) {
      this.currentIndex = ''
      setTimeout(()=>{document.activeElement.scrollIntoViewIfNeeded(true)},10)
    }
  }
}
</script>

<style lang="less" scoped>
.edit-user-label{
  background-color: #F7F9FA;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  .title{
    margin: 20px 16px 10px;
    font-size: 14px;
    color: #969EA8;
  }
  .content{
    flex: 1;
    background-color: #fff;
    overflow-y: scroll;
    padding: 5px 16px;
    height: 50px;
    line-height: 50px;
    .item{
      height: 50px;
      line-height: 50px;
      display: flex;
      input{
        flex: 1;
        border: none;
        height: 30px;
        line-height: 30px;
        padding: 10px 0;
        box-sizing: content-box;
      }
      .delete,.add{
        width: 22px;
        height: 22px;
        margin-right: 5px;
        margin-top: 14px;
      }
      .clear{
        width: 16px;
        height: 16px;
        margin-left: 5px;
        margin: 17px 5px;
      }
    }
  }
  .action{
    height: 44px;
    margin: 10px 16px;
    background:rgba(0,122,230,1);
    border-radius:6px;
    color: #fff;
    line-height: 44px;
    text-align: center;
  }
}
</style>
