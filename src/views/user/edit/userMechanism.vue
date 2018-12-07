<template>
  <div class="user-edit-username-page">
    <div class="user-edit-username">
      <p class="edit-username-title">我的机构选择</p>
      <collapse-List :model="organizationList"></collapse-List>
      <button class="edit-username-query">确认修改</button>
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
      organizationList: []
    }
  },

  created() {
    let distributorId = this.$route.query.distributorId
    let enterpriseId = this.$route.query.enterpriseId
    this.queryOrganizationList(distributorId, enterpriseId)
  },

  methods: {
    async queryOrganizationList(distributorId, enterpriseId) {
      let obj = {}
      const result = await userService.obtainOrganizationInfo(distributorId, enterpriseId)

      if (result) {
        // this.organizationList
        let tempArr = this.formatData(result, '124')
        obj.children = tempArr
        this.organizationList = obj
      }
    },

    //递归遍历处理数据
    formatData(data, pId) {
      let result = []
      let temp = []
      for (let i in data) {
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
