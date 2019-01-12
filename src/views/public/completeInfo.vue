<template>
  <div class="info-container">
    <div class="top-container">
      <div class="top-text">您有未完善的信息</div>
      <div class="top-detail">信息不完整会影响您的正常使用</div>
    </div>
    <div class="bottom-container">
      <div class="name-cell">
        <material-input
          placeholder="请输入姓名"
          v-model="name"
          :type="'text'"
          @input="inputHandler"
          :disabled="false"
        ></material-input>
      </div>
      <div class="van-hairline--bottom major-cell" @click="popAreaHandler">
        <p class="value" v-if="userInfo.majorRegion">
          {{userInfo.majorRegion}}
          <i class="icon iconfont icon-arrow"></i>
        </p>
        <p v-else class="placeholder">
          请选择您的主营区域
          <i class="icon iconfont icon-arrow"></i>
        </p>
      </div>
      <div class="van-hairline--bottom company-cell" @click="seachCompanyHandler">
        <p class="value" v-if="userInfo.distributorName">
          {{userInfo.distributorName}}
          <i class="icon iconfont icon-arrow"></i>
        </p>
        <p v-else class="placeholder">
          请输入所属公司
          <i class="icon iconfont icon-arrow"></i>
        </p>
      </div>
      <div class="van-hairline--bottom institution-cell" @click="selectInstitutionHandler">
        <p class="value" v-if="userInfo.institutionName">
          {{userInfo.institutionName}}
          <i class="icon iconfont icon-arrow"></i>
        </p>
        <p v-else class="placeholder">
          请选择您的机构
          <i class="icon iconfont icon-arrow"></i>
        </p>
      </div>
    </div>
    <div class="bottom-bar" @click="sureHandler">确定</div>
    <area-select
      :show.sync="areaShow"
      :code.sync="areaCode"
      :title="areaTitle"
      @cancel="cancelHandler"
      @confirm="confirmHandler"
    ></area-select>
  </div>
</template>
<script>
import MaterialInput from 'COMP/MaterialInput'
import AreaSelect from 'COMP/AreaSelect'
import { checkStrLength, checkStrType } from '@/utils/tool'
import strFormat from '@/filters/strFormat'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import DynamicsService from 'SERVICE/dynamicsService'
import UserService from 'SERVICE/userService'
export default {
  components: {
    MaterialInput,
    AreaSelect
  },
  data: () => ({
    maxLength: 16,
    name: '',
    majorRegion: '',
    city: '',
    area: '',
    areaShow: false,
    areaTitle: '请选择区域',
    areaCode: '440305',
    enterpriseId: '',
    distributorId: '',
    institutionId: ''
  }),
  created() {
    this.name = this.userInfo.name
    this.majorRegion = this.userInfo.majorRegion
    this.enterpriseId = this.userInfo.enterpriseId

    if (this.userInfo.majorRegion) {
      var arr = this.majorRegion.split('/')
      if (arr && arr.length > 2) {
        this.city = arr[1]
        this.area = arr[2]
      } else {
        this.city = arr[1]
        this.area = ''
      }
    }
    if ((window.localStorage.getItem('distributorDisabled') == null || window.localStorage.getItem('distributorDisabled') === 'true') && this.userInfo.distributorId) {
      window.localStorage.setItem('distributorDisabled', true)
    } else {
      window.localStorage.setItem('distributorDisabled', false)
    }
    if ((window.localStorage.getItem('institutionDisabled') == null || window.localStorage.getItem('institutionDisabled') == 'true') && this.userInfo.institutionId) {
      window.localStorage.setItem('institutionDisabled', true)
    } else {
      window.localStorage.setItem('institutionDisabled', false)
    }
  },
  methods: {
    inputHandler(event) {
      console.log(event)
      if (event && event.length > 0) {
        //   let isMaxLength = checkStrLength(event, this.maxLength)
        //   let isValid = checkStrType(event)
        //   console.log('isMaxLength===' + isMaxLength, 'isValid===' + isValid)
        //   let inputStr = strFormat.fmtWebCode(this.name)
        //   console.log(this.name)
        //   setTimeout(() => {
        //     this.name = inputStr
        //   }, 1)
        this.$store.dispatch('userInfo', Object.assign(this.userInfo, { name: this.name }))
      }
    },
    focusHandler(focus) {},
    blurHandler(focus) {},
    /**
     * 弹出主营区域选择框
     */
    popAreaHandler() {
      this.areaShow = !this.areaShow
    },
    cancelHandler(val) {
      this.areaShow = false
    },
    confirmHandler(val) {
      this.areaShow = false
      if (val[2]) {
        this.majorRegion = val[0].name + '/' + val[1].name + '/' + val[2].name
        this.city = val[1].name
        this.area = val[2].name
      } else {
        this.majorRegion = val[0].name + '/' + val[1].name
        this.city = val[1].name
        this.area = ''
      }
      this.$store.dispatch('userInfo', Object.assign(this.userInfo, { majorRegion: this.majorRegion }))
    },
    /**
     * 搜索公司
     */
    seachCompanyHandler() {
      if (window.localStorage.getItem('distributorDisabled') === 'true') {
        return
      }
      let params = {
        enterpriseId: this.enterpriseId,
        city: this.city,
        area: this.area
      }
      this.$router.push({ path: '/register/searchCompany', query: params })
    },
    /**
     * 选择机构
     */
    selectInstitutionHandler() {
      if (window.localStorage.getItem('institutionDisabled') === 'true') {
        return
      }
      let params = {
        enterpriseId: this.enterpriseId,
        distributorId: this.userInfo.distributorId
      }
      this.$router.push({ path: '/user/edit/userMechanism', query: params })
    },
    sureHandler() {
      if (!this.name) {
        return this.$toast('昵称不能为空')
      }
      if (!checkStrLength(this.name, 16)) {
        return this.$toast('昵称最多8个汉字(或16个字符)')
      }
      if (!checkStrType(this.name)) {
        return this.$toast('昵称只支持中文、英文和数字')
      }
      if (this.name && this.majorRegion && this.userInfo.distributorId && this.userInfo.institutionId) {
        this.$dialog
          .confirm({
            title: '是否确定提交信息',
            message: '所属公司编辑后，仅能通过后台进行修改，请慎重选择。',
            showCancelButton: true
          })
          .then(() => {
            this.updateAgentInfo()
          })
          .catch(() => {})
      } else {
        this.$dialog.alert({
          title: '请完善所有信息',
          message: '请确认后重新输入'
        })
      }
    },
    async updateAgentInfo() {
      let params = {
        agentName: this.name,
        majorRegion: this.majorRegion,
        distributorId: this.userInfo.distributorId,
        institutionId: this.userInfo.institutionId
      }
      const result = await DynamicsService.updateAgentInfo(params)
      // 完善信息成功之后请求接口获取最新经纪人信息存储到vuex
      this.updateUserInfo()
      this.$router.back(-1)
      window.localStorage.removeItem('distributorDisabled')
      window.localStorage.removeItem('institutionDisabled')
    },
    async updateUserInfo() {
      const res = await UserService.getUserInfo()
      this.$store.dispatch('userInfo', Object.assign(this.userInfo, res))
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    var height = $(window).height()
    window.addEventListener('resize', function() {
      if ($(window).height() < height) {
        $('.bottom-bar').hide()
      } else {
        $('.bottom-bar').show()
      }
    })
  }
}
</script>
<style lang="less" scoped>
.info-container {
  display: flex;
  flex-direction: column;
  > .top-container {
    margin: 25px 16px 0;
    > .top-text {
      color: #333;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    > .top-detail {
      color: #666;
      font-size: 12px;
    }
  }
  > .bottom-container {
    margin: 10px 16px;
    > .name-cell {
    }
    > .major-cell {
      display: flex;
      margin: 30px 0;
      justify-content: space-between;
      padding-bottom: 12px;
    }
    > .company-cell {
      display: flex;
      margin: 30px 0;
      justify-content: space-between;
      padding-bottom: 12px;
    }
    > .institution-cell {
      display: flex;
      margin: 30px 0;
      justify-content: space-between;
      padding-bottom: 12px;
    }
    .value {
      font-size: 16px;
    }
    .placeholder {
      color: #969ea8;
      font-size: 16px;
    }
    .icon-arrow {
      position: absolute;
      right: 0;
      top: 0;
      color: #cbcfd4;
      font-size: 12px;
    }
  }
  > .bottom-bar {
    margin: 10px 16px;
    width: 90%;
    position: absolute;
    bottom: 32px;
    text-align: center;
    height: 44px;
    line-height: 44px;
    background-color: #007ae6;
    color: white;
    font-size: 16px;
    border-radius: 6px;
  }
}
</style>
