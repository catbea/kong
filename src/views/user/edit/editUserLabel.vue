<template>
  <div class="edit-user-label">
    <div class="title">
      编辑标签
    </div>
    <div class="content">
      <div class="item scale-1px-bottom" @click="addLabel" v-show="agentLabelList.length < 5">
        <img class="add" src="../../../assets/img/user/userLabel/add.png" alt="">
        新增标签
      </div>
      <div class="item scale-1px-bottom" v-for="(item,index) in agentLabelList" :key="index">
        <img class="delete" src="../../../assets/img/user/userLabel/delete.png" alt="" @click="deleteLabel(index)">
        <input class="label" :ref="item.itemCode" type="text" v-model.trim="item.labelName" maxlength="4" @focus="currentIndex=index" @blur="blur()">
        <img v-show="index===currentIndex && item.labelName" class="clear" src="../../../assets/img/user/userLabel/clear.png" alt="" @click="clearLabel(index)">
      </div>
      <div class="tips">
        提示：最多只能新增5个自定义标签
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
      currentIndex: '',
      btnStatus: false
    }
  },
  created () {
    this.getUserLabel()
  },
  methods: {
    // 获取用户自定义标签
    getUserLabel () {
      userService.getUserLabel({}).then(res => {
        this.agentLabelList = res
        console.log(res, 'res');
      }).catch()
    },
    // 更新用户自定义标签
    updateUserLabel () {
      userService.updateUserLabel(this.agentLabelList).then(res => {
        this.$toast('自定义标签提交成功')
        this.$router.go(-1)
      }).catch()
    },
    // 新增标签
    addLabel () {
      if (this.agentLabelList.length >=5) {
        return this.$toast('最多只能添加5个自定义标签')
      }
      let obj = {
        labelName: ''
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
      this.agentLabelList[index].labelName = ''
    },
    saveLabel () {
      if (this.btnStatus) {
        return this.$toast('正在保存请稍后')
      }
      this.btnStatus = true
      // if (!this.agentLabelList.length) {
      //   this.btnStatus = false
      //   return this.$toast('您没有新增自定义标签，无法保存')
      // }
      let empty = false
      this.agentLabelList.forEach(item => {
        if (!item.labelName) {
          empty = true
        }
      })
      if (empty) {
        this.btnStatus = false
        return this.$toast('自定义标签内容不能为空')
      }
      this.updateUserLabel()
    },
    blur () {
      setTimeout(()=>{document.activeElement.scrollIntoViewIfNeeded(true)},10)
      // 隐藏清空图标
      setTimeout(() => {
        this.currentIndex = ''
      }, 100)
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
    .tips{
      font-size: 10px;
      color: #969EA8;
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
