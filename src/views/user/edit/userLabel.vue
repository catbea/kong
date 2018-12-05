<template>
  <div class="user-edit-label-page">
    <div class="user-edit-label">
      <p class="edit-label-title">选择标签</p>
      <p class="edit-label-conter">
        <span v-for="(item,key) in agentLabel" :key="key">
          <input
            :id="item.id"
            type="checkbox"
            data-type="welfare"
            name="reason"
            :value="item.itemName"
          >
          <label :for="item.id">{{item.itemName}}</label>
        </span>
      </p>
      <div class="edit-label-div">
        <button class="edit-label-query" @click="SubLabel">确认修改</button>
      </div>
    </div>
  </div>
</template>
<script>
import userService from 'SERVICE/userService'
import { Checkbox, CheckboxGroup ,Dialog} from 'vant'

export default {
  components: {
    Checkbox,
    CheckboxGroup,
    Dialog
  },
  data() {
    return {
      agentLabel: [],
      itemCode: '',
      itemName: '',
      couponsMap: [],
      namelist: []
    }
  },
  created() {
    this.getAgentLabelList()
  },
  methods: {
    async getAgentLabelList() {
      const res = await userService.getAgentLabelList(1)
      this.agentLabel = res
    },

    async SubLabel() {
      var selectidlist = '' //将选中值拼接成字符串
      var check = document.getElementsByName('reason')
      for (var i = 0; i < check.length; i++) {
        if (check[i].checked == true) {
          selectidlist = selectidlist + check[i].id + ','
        }
      }
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' + selectidlist)
      if (selectidlist.length <= 0) {
        Dialog.alert({
          message: '请选择个性标签'
        }).then(() => {
          // on close
        })
      } else {
        let userList = {
          lableList: selectidlist
        }
        const res = await userService.upDateUserInfo(userList)
        if(res){
          this.$router.go(-1)
        }
      }
    }
  }
}
</script>

<style lang="less">
.user-edit-label-page {
  background: #ffffff;
  .my-label-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: 0.15rem;
  }
  > .user-edit-label {
    margin: 27px 0;
    > .edit-label-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-bottom: 17px;
      margin-left: 16px;
    }
    > .edit-label-conter {
      margin-left: 2px;
    }
    > .edit-label-div {
      margin: 0 16px;
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
        margin-top: 25px;
      }
    }
  }
}
input[type='checkbox'] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

input[type='checkbox'] + label {
  display: block;
  padding: 6px 24px;
  font-size: 14px;
  font-weight: 500;
  background: rgba(143, 159, 177, 0.15);
  color: #666666;
  text-align: center;
  float: left;
  margin-left: 14px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 16px;
}

input[type='checkbox']:checked + label {
  color: rgba(255, 255, 255, 1);
  background: rgba(0, 122, 230, 1);
  border-radius: 2px;
  font-weight: 500;
}
</style>
