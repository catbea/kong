<template>
  <div class="user-edit-username-page">
    <div class="user-edit-username">
      <p class="edit-username-title">我的机构选择</p>
      <collapse-List :model="organizationList" @click="refreshList"></collapse-List>
      <button class="edit-username-query" @click="commitChangeInfo">确认修改</button>
    </div>
  </div>
</template>
<script>
import userService from 'SERVICE/userService'
import collapseList from 'COMP/Collapse/index'
export default {
  components: {
    collapseList
  },

  data() {
    return {
      organizationList: [],
      organizationInfo: []
    }
  },

  created() {
    let distributorId = this.$route.query.distributorId
    let enterpriseId = this.$route.query.enterpriseId
    this.queryOrganizationList(distributorId, enterpriseId)
  },

  methods: {
    //提交更新信息
    commitChangeInfo() {},

    async upDateInfo(id) {
      let obj = {}
      obj.distributorId = id
      const result = await userService.upDateUserInfo(obj)
      console.log(result)
    },

    //刷新列表
    refreshList(val) {
      for (let i = 0; i < this.organizationInfo.length; i++) {
        this.organizationInfo[i].checked = false
        if (this.organizationInfo[i].id == val) {
          this.organizationInfo[i].checked = true
        }
      }
     

      let organizationInfo = this.organizationInfo
      // this.organizationList
      let tempArr = this.formatData(organizationInfo, organizationInfo[0].pId)
      obj.children = tempArr
      obj.name = '选择机构'
      this.organizationList = obj
    },

    async queryOrganizationList(distributorId, enterpriseId) {
      let obj = {}
      const result = await userService.obtainOrganizationInfo(distributorId, enterpriseId)

      if (result.length > 0) {
        let organizationInfo = result
        // this.organizationList
        let tempArr = this.formatData(result, result[0].pId)
        obj.children = tempArr
        obj.name = '选择机构'
        this.organizationList = obj
      } else {
        obj.name = '暂无可供选择的数据'
        obj.children = []
        this.organizationList = obj
      }
    },

    //递归遍历处理数据
    formatData(data, pId) {
      let result = []
      let temp = []
      for (let i in data) {
        data[i].checked = false
        if (data[i].pId == pId) {
          result.push(data[i])
          temp = this.formatData(data, data[i].id)
          if (temp.length > 0) {
            data[i].children = temp
          }
        }
      }
      return result
    }
  }
}
</script>

<style lang="less">
.user-edit-username-page {
  background: #ffffff;
  > .user-edit-username {
    margin: 27px 16px;
    > .edit-username-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
    > .edit-username-conter {
      > .edit-username-input {
        font-size: 15px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
        width: 99%;
        border: 0;
        border-bottom: 1px solid #eeeeee;
      }
    }

    > .edit-username-query {
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      height: 44px;
      background: rgba(0, 122, 230, 1);
      border-radius: 4px;
      width: 100%;
      border: 0;
      margin-top: 25px;
    }
  }
}
</style>
