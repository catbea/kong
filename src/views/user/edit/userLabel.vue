<template>
  <div class="user-edit-label-page">
    <div class="user-edit-label">
      <!-- <p class="edit-label-title">选择标签</p> -->
      <div class="edit-label-conter">
        <span v-for="(item,key) in agentLabel" :key="key" @click="selectLabel(key)">
          <!-- <input :id="item.id" type="checkbox" data-type="welfare" name="reason" :value="item.itemName" > -->
          <label :for="item.id" :class="{'checked': selectLabelList.indexOf(item) > -1}">{{item.itemName}}</label>
        </span>
      </div>
      <div class="edit-label-div">
        <button class="edit-self" @click="goEdit">自定义标签</button>
        <button class="edit-label-query" @click="SubLabel">确定修改</button>
      </div>
    </div>
  </div>
</template>
<script>
import userService from 'SERVICE/userService'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      agentLabel: [],
      itemCode: '',
      itemName: '',
      couponsMap: [],
      namelist: [],
      selectLabelList: []
    }
  },
  created() {
    this.getAgentLabelList()
  },

  computed: {
    ...mapGetters(['userInfo']),

    oldAgentLabel() {
      return this.userInfo.labelList
    }
  },

  methods: {
    // 跳转自定义标签
    goEdit() {
      this.$router.push('/user/edit/editLabel')
    },
    selectLabel(index) {
      let obj = this.agentLabel[index]

      let isExist = this.isExistElement(this.selectLabelList, obj)

      if (isExist) {
        //存在
        let index = this.selectLabelList.indexOf(obj)
        if (index > -1) {
          this.selectLabelList.splice(index, 1)
        }
      } else {
        if (this.selectLabelList.length >= 3) {
          return this.$toast('标签个数不得多于3个')
        }
        //不存在
        this.selectLabelList.push(obj)
      }
    },

    async getAgentLabelList() {
      const res = await userService.getAgentLabelList(1)
      this.agentLabel = res
      for (let i = 0; i < this.agentLabel.length; i++) {
        this.agentLabel[i].labelName = this.agentLabel[i].itemName
        this.agentLabel[i].labelId = this.agentLabel[i].id
      }
      let tags = this.$route.query.tags;
      if (tags) {
        tags = JSON.parse(this.$route.query.tags);
        let selectedTag = [];
        tags.map(tag => {
          const tagItem = this.agentLabel.filter((item, index) => tag.labelId == item.labelId)
          selectedTag.push(...tagItem);
        })
        this.selectLabelList = selectedTag
      }

    },

    async SubLabel() {
      var selectidlist = [] //将选中值拼接成字符串
      let obj = {}
      for (var i = 0; i < this.selectLabelList.length; i++) {
        selectidlist.push(this.selectLabelList[i].id)
      }
      if (!this.selectLabelList.length) {
        this.$dialog
          .alert({
            message: '请选择个性标签'
          })
          .then(() => {
            // on close
          })
      } else {
        if (this.selectLabelList.length > 3) {
          this.$dialog
            .alert({
              message: '标签个数不得多于3个'
            })
            .then(() => {
              // on close
            })
        } else {
          let userList = {
            lableList: selectidlist.join(',')
          }
          const res = await userService.upDateUserInfo(userList)
          if (res) {
            this.$store.dispatch('getUserInfo', Object.assign({}, this.userInfo, { labelList: this.selectLabelList }))
            this.$router.go(-1)
          }
        }
      }
    },

    isExistElement(arr, value) {
      if (arr.indexOf && typeof arr.indexOf == 'function') {
        var index = arr.indexOf(value)
        if (index >= 0) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="less">
.user-edit-label-page {
  background: #ffffff;
  height: 100%;
  .my-label-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: 0.15rem;
  }
  > .user-edit-label {
    height: 100%;
    display: flex;
    flex-direction: column;
    > .edit-label-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-bottom: 17px;
      margin-left: 16px;
    }
    > .edit-label-conter {
      margin-top: 20px;
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      align-items: center;
      span {
        flex: none;
        margin-bottom: 16px;
        font-size: 14px;
        font-weight: 500;
        background: #f2f5f9;
        color: #445166;
        text-align: center;
        margin-left: 14px;
        border-radius: 4px;
        min-width: 28%;
      }
    }
    > .edit-label-div {
      height: 140px;
      margin: 0 16px;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      > .edit-label-query {
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        height: 44px;
        background: rgba(0, 122, 230, 1);
        border-radius: 4px;
        width: 100%;
        border: 0;
        margin-top: 16px;
      }
      .edit-self {
        width: 100%;
        border: 0;
        font-size: 16px;
        font-weight: 400;
        height: 44px;
        background: rgba(242, 248, 254, 1);
        border-radius: 6px;
        color: #445166;
      }
    }
  }
}

label {
  display: block;
  padding: 8px 20px;
  font-size: 12px;
}

.checked {
  color: rgba(255, 255, 255, 1);
  background: rgba(0, 122, 230, 1);
  border-radius: 2px;
  font-weight: 500;
}
</style>
