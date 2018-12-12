<template>
  <div class="customer-edit-remarkname-page">
    <div class="customer-edit-remarkname">
      <p class="edit-remarkname-title">修改备注名称</p>
      <p class="edit-remarkname-conter">
        <!-- <input type="text" class="edit-remarkname-input" maxlength="8" v-model="remarkName"> -->
        <material-input
          class="van-hairline--bottom"
          placeholder="请输入备注名称"
          :type="'text'"
          :maxlength="8"
          v-model="remarkName"
          @focus="focusHandler"
        ></material-input>
      </p>
      <button class="edit-remarkname-query" @click="saveRemarkName">保存</button>
    </div>
  </div>
</template>
<script>
import MaterialInput from 'COMP/MaterialInput'
import CustomService from 'SERVICE/customService'
import { Dialog } from 'vant'
export default {
  components: {
    Dialog,
    MaterialInput
  },

  data() {
    return {
      clientId: '',
      remarkName: ''
    }
  },

  created() {
    let remarkName = this.$route.query.remarkName
    this.clientId = this.$route.query.clientId
    this.remarkName = remarkName
  },

  computed: {
    
  },

  methods: {
    focusHandler(focus) {
      console.log('focus')
      var specialKey = "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"
      var realkey = String.fromCharCode(this.remarkName)
      debugger
      var flg = false
      flg = specialKey.indexOf(realkey) >= 0
      if (flg) {
        Dialog.alert({
          message: '请勿输入特殊字符'
        }).then(() => {
          // on close
        })
      }
    },
    //更新用户名
    async updateRemarkName(params) {
      const result = await CustomService.updateCustomerInfo(params)
      this.$router.go(-1)
    },

    saveRemarkName() {
      let remarkName = this.remarkName
      if (remarkName.length == 0) {
        Dialog.alert({
          message: '备注名称不可为空'
        }).then(() => {
          // on close
        })
      } else {
        let params = {
          clientId: this.clientId,
          remarkName: this.remarkName
        }
        this.updateRemarkName(params)
      }
    }
  }
}
</script>

<style lang="less">
.material-input__component {
  margin-top: 0;
}
.customer-edit-remarkname-page {
  background: #ffffff;
  padding: 30px 15px;
  box-sizing: border-box;
  > .customer-edit-remarkname {
    box-sizing: border-box;
    > .edit-remarkname-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-bottom: 22px;
    }
    > .edit-remarkname-conter {
      > .edit-remarkname-input {
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

    > .edit-remarkname-query {
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
