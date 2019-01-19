<template>
  <div class="user-edit-phone-page">
    <div class="user-edit-phone">
      <p class="edit-phone-title">手机号</p>
      <p class="edit-phone-conter">
        <!-- <input type="number" class="edit-phone-input" maxlength="11" placeholder="请输入手机号码" v-model.trim="Cphone"> -->
        <material-input placeholder="请输入手机号码" :type="'number'" :maxlength="11" v-model="Cphone"></material-input>
      </p>
      <button class='edit-phone-query' @click="godSub">确认</button>
    </div>
  </div>
</template>
<script>
import MaterialInput from 'COMP/MaterialInput'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
export default {
  components: {
    MaterialInput
  },
  data() {
    return {
      Cphone: ''
    }
  },
  created() {
    this.Cphone = this.reportAddInfo.clientPhone
  },
  computed: {
    ...mapGetters(['reportAddInfo'])
  },
  methods: {
    godSub() {
      if (Number(this.Cphone).length == 0) {
        this.$dialog
          .alert({
            message: '名片展示手机号不可为空'
          })
          .then(() => {
            // on close
          })
        return
      }
      if (this.Cphone.length != 11) {
        this.$dialog
          .alert({
            message: '请输入正确手机号'
          })
          .then(() => {
            // on close
          })
        return
      }
      let _reportAddInfo = {
        clientPhone: this.Cphone
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
.user-edit-phone-page {
  background: #ffffff;
  > .user-edit-phone {
    margin: 27px 16px;
    > .edit-phone-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-bottom: 12px;
    }

    > .edit-phone-conter {
      margin-bottom: 24px;
      .material-input{
        color: #757575;
      }
      > .edit-phone-input {
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
      margin-top: 35px;
    }
  }
}
</style>
