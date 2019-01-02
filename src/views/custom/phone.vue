<template>
  <div class="customer-edit-phone-page">
    <div class="customer-edit-phone">
      <p class="edit-phone-title">修改手机号</p>
      <p class="edit-phone-conter">
        <material-input
          class="van-hairline--bottom"
          placeholder="请输入手机号"
          :type="'number'"
          :maxlength="11"
          v-model="phone"
          @focus="focusHandler"
        ></material-input>
      </p>
      <button class="edit-phone-query" @click="savePhone">保存</button>
    </div>
  </div>
</template>
<script>
import MaterialInput from 'COMP/MaterialInput'
import CustomService from 'SERVICE/customService'
export default {
  components: {
    MaterialInput
  },

  data() {
    return {
      clientId: '',
      phone: ''
    }
  },

  created() {
    let phone = this.$route.query.phone
    this.clientId = this.$route.query.clientId
    this.phone = phone
  },

  computed: {},

  methods: {
    focusHandler(focus) {},
    //更新手机号
    async updatePhone(params) {
      const result = await CustomService.updateCustomerInfo(params)
      this.$router.go(-1)
    },

    savePhone() {
      let phone = this.phone
      if (phone.length == 0) {
        this.$dialog.alert({
          message: '手机号不可为空'
        }).then(() => {
          // on close
        })
        return
      }
      if (phone.length < 11) {
        this.$dialog.alert({
          message: '请输入正确手机号'
        }).then(() => {
          // on close
        })
        return
      }

      let params = {
        clientId: this.clientId,
        phone: this.phone
      }
      this.updatePhone(params)
    }
  }
}
</script>

<style lang="less">
.material-input__component {
  margin-top: 0;
}
.customer-edit-phone-page {
  background: #ffffff;
  padding: 30px 15px;
  box-sizing: border-box;
  > .customer-edit-phone {
    box-sizing: border-box;
    > .edit-phone-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-bottom: 22px;
    }
    > .edit-phone-conter {
      > .edit-phone-input {
        font-size: 15px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        height: 21px;
        line-height: 21px;
        width: 99%;
        border: 0;
        border-bottom: 1px solid #eeeeee;
      }
    }

    > .edit-phone-query {
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
