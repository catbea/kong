<template>
  <div class="user-edit-customer-page">
    <div class="user-edit-customer">
      <p class="edit-customer-title">客户名称</p>
      <p class="edit-customer-conter">
        <material-input
          :type="'text'"
          class="edit-customer-input"
          :maxlength="8"
          placeholder="请输入客户名称"
          v-model.trim="name"
          @input="inputHandler"
        ></material-input>
      </p>
      <div class="edit-customer-bottom">
        <button class="edit-customer-select" @click="selectCustomerHandler">选择已有客户</button>
        <button class="edit-customer-sure" @click="sureHandler">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
import MaterialInput from 'COMP/MaterialInput'
import strFormat from '@/filters/strFormat'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
export default {
  components: {
    MaterialInput
  },
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.name = this.reportAddInfo.clientName
  },
  computed: {
    ...mapGetters(['reportAddInfo'])
  },
  methods: {
    inputHandler(event) {
      console.log(event)
      if (event && event.length > 0) {
        let inputStr = strFormat.fmtWebCode(this.name)
        console.log(this.name)
        setTimeout(() => {
          this.name = inputStr
        }, 1)
      }
    },
    selectCustomerHandler() {
      this.$router.push('/user/myReport/reportCustomer')
    },
    sureHandler() {
      if (this.name.length == 0) {
        this.$dialog
          .alert({
            message: '昵称不可为空'
          })
          .then(() => {
            // on close
          })
        return
      }
      let _reportAddInfo = {
        clientName: this.name
      }
      this.$store.commit(types.REPORT_INFO, _reportAddInfo)
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="less">
.van-dialog {
  border-radius: 12px;
  width: 72%;
  text-align: center;
}
.van-dialog__message {
  font-size: 15px;
  color: rgba(51, 51, 51, 1);
}
.van-button__text {
  font-size: 18px;
  color: rgba(0, 122, 230, 1);
}
.user-edit-customer-page {
  background: #ffffff;
  > .user-edit-customer {
    margin: 27px 16px;
    > .edit-customer-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-bottom: 12px;
    }

    > .edit-customer-conter {
      margin-bottom: 24px;
      > .edit-customer-input {
        font-size: 16px;
        font-weight: 500;
        color: #333;
        line-height: 35px;
        width: 99%;
        border: 0;
        border-bottom: 1px solid #eeeeee;
        &::-webkit-input-placeholder {
          color: rgba(187, 187, 187, 1);
        }
      }
    }
    > .edit-customer-bottom {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      > .edit-customer-select {
        font-size: 16px;
        font-weight: 400;
        color: #007ae6;
        line-height: 22px;
        height: 44px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        width: 50%;
        border: 1px solid #007ae6;
        margin-top: 35px;
        margin-right: 20px;
      }
      > .edit-customer-sure {
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        height: 44px;
        background: rgba(0, 122, 230, 1);
        border-radius: 4px;
        width: 50%;
        border: 0;
        margin-top: 35px;
      }
    }
  }
}
</style>
