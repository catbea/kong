<template>
  <div class="user-edit-phone-page">
    <div class="user-edit-phone">
      <b class="title">手机号</b>
      <p class="phone-number scale-1px-bottom">
        <input type="text" placeholder="请输入手机号码" maxlength="11" v-model="Cphone">
      </p>
      <p class="tips">
        号码显示方式：前三后四显示
      </p>
      <!-- <p class="edit-phone-conter">
        <material-input placeholder="请输入手机号码" :type="'number'" :maxlength="11" v-model="Cphone"></material-input>
      </p>
      <div class="edit-phone-way">
        <p class="edit-phone-tip">号码显示方式</p>
        <div class="edit-phone-list">
          <div class="edit-phone-star" @click="selectHandler('star')">
            <div class="edit-phone-left" :style="{color:phoneType === 'star'?'#007AE6':'#333333'}">前三后四显示</div>
            <div
              class="bg_img edit-phone-right"
              :style="{backgroundImage:'url('+(phoneType === 'star'?checkSelImg:checkImg)+')'}"
            ></div>
          </div>
          <div class="edit-phone-all" @click="selectHandler('all')">
            <div class="edit-phone-left" :style="{color:phoneType === 'all'?'#007AE6':'#333333'}">全号码显示</div>
            <div
              class="bg_img edit-phone-right"
              :style="{backgroundImage:'url('+(phoneType === 'all'?checkSelImg:checkImg)+')'}"
            ></div>
          </div>
        </div>
      </div> -->
      <button class="edit-phone-query" @click="godSub">确认</button>
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
      Cphone: '',
      phoneType: '',
      checkSelImg: require('IMG/user/check_sel.png'),
      checkImg: require('IMG/user/check_nor.png')
    }
  },
  created() {
    this.Cphone = this.reportAddInfo.clientPhone
    this.phoneType = this.reportAddInfo.clientPhoneType || 'star'
  },
  computed: {
    ...mapGetters(['reportAddInfo'])
  },
  methods: {
    selectHandler(val){
      this.phoneType = val
    },
     godSub() {
       let reg = /^1[3-9]\d{9}$/g
       if (!reg.test(this.Cphone)) {
         return this.$dialog.alert({message: '手机号码不正确，请重新输入！'})
       }
      // if (Number(this.Cphone).length == 0) {
      //   this.$dialog
      //     .alert({
      //       message: '名片展示手机号不可为空'
      //     })
      //     .then(() => {
      //       // on close
      //     })
      //   return
      // }
      // if (this.Cphone.length != 11) {
      //   this.$dialog
      //     .alert({
      //       message: '请输入正确手机号'
      //     })
      //     .then(() => {
      //       // on close
      //     })
      //   return
      // }
      let _reportAddInfo = {
        clientPhone: this.Cphone,
        // clientPhoneType: this.phoneType
        clientPhoneType: 'star'
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
.material-input__component .material-input {
  padding-left: 16px;
}
.user-edit-phone-page {
  .title{
    display: block;
    font-size: 20px;
    font-weight: 600;
    margin: 25px 0 0 16px;
    color: #333;
  }
  .phone-number{
    margin: 20px 16px;
    font-size: 16px;
    input{
      width: 100%;
      line-height: 40px;
      border:none;
      &::placeholder{
        color: #bbb;
      }
    }
  }
  .tips{
    font-size: 12px;
    color: #bbb;
    margin: 12px 16px;
  }
  // background: #f7f9fa;
  > .user-edit-phone {
    // margin: 27px 16px;
    > .edit-phone-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-bottom: 12px;
    }

    > .edit-phone-conter {
      margin-bottom: 30px;
      line-height: 30px;
      .material-input {
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

    > .edit-phone-way {
      width: 100%;
      // margin: 16px;
      > .edit-phone-tip {
        color: #969ea8;
        font-size: 12px;
        height: 20px;
        padding-left: 16px;
      }
      > .edit-phone-list {
        background-color: white;
        border-top: 1px solid #e2e2e3;
        border-bottom: 1px solid #e2e2e3;
        > .edit-phone-all,
        .edit-phone-star {
          height: 50px;
          line-height: 50px;
          margin-left: 16px;
          position: relative;
          > .edit-phone-left {
            font-size: 16px;
          }
          > .edit-phone-right {
            width: 22px;
            height: 20px;
            position: absolute;
            right: 16px;
            top: 20px;
          }
        }
        > .edit-phone-star {
          border-bottom: 1px solid #e2e2e3;
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
      width: 90%;
      border: 0;
      margin: 35px 16px;
    }
  }
}
</style>
