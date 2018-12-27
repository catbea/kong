import * as types from '@/store/mutation-types'
import userService from '@/services/userService'
import commonService from 'SERVICE/commonService'

const state = {
  // jssdkConfig: JSON.parse(localStorage.getItem('awMasterJssdkConfig')) || null,
  userInfo: JSON.parse(localStorage.getItem('awMasterUserInfo')) || {
    agentId: '1',
    avatarUrl: 'https://720ljq2test-10037467.file.myqcloud.com/ljqzs/user_head_img/women_007.png',
    distributorId: '124',
    distributorName: '广佛分公司',
    enterpriseId: '91',
    institutionId: '82',
    institutionName: '',
    isOne: false, // true新用户 false老用户
    isVip: '',
    ifView: true, //是否展示邀请有礼
    labelList: [
      {
        id: '',
        labelId: '116',
        labelName: '小鲜肉',
        userId: ''
      },
      {
        id: '',
        labelId: '122',
        labelName: '豪宅专家',
        userId: ''
      },
      {
        id: '',
        labelId: '121',
        labelName: '佛系卖房',
        userId: ''
      },
      {
        id: '',
        labelId: '124',
        labelName: '高端盘专家',
        userId: ''
      }
    ],
    ifView:'0',
    token:
      'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiI4ZXV4YmwiLCJzdWIiOiJhZ2VudElkOnd3OGY2ODAxYmE1ZmQyYTExMjo0MTkzIiwiZXhwIjoxNTQ4OTA4Nzc0LCJpYXQiOjE1NDU5MDM5NzR9.ZooERUQw6PEdarITefqyPAvNuHLv2rpwZ-QzZZguo3BT12ZKNW_tppj0HBlulMDh9T228Dwb66MtGHWurc78zw',
    majorCity: '广州市',
    majorRegion: '山西省/长治市/襄垣县',
    name: '周丹',
    nickName: '',
    payOpenId: 'oeKML1Lx2W1E-uDyUJCOkTTJdKCY',
    pcOpenid: 'onXUy1sGkPMX-Z34buMYLs5q2IEc',
    price: 874400,
    registerMobile: '18603000246',
    signature: 'mwwwwwwwmm',
    tempPhone: '18603000246',
    vipInfo: '',
    wechatAccount: '',
    ifView:'0'
  },
  userVipInfo: {},
  userArea: {
    longitude: '', // 经度
    latitude: '', // 纬度
    province: '', // 省
    city: '深圳市', // 市
    selectedCity: null,
    marketSelectedCity: null, //楼盘列表城市选择
    vipSelectedCity: null,
    myMarketSelectedCity: null, //我的楼盘城市选择
    myReportCity: '', // 报备楼盘
    county: '' // 区
  },
  reportAddInfo: {
    linkerId: '',
    linkerName: '',
    clientId: '',
    clientName: '',
    clientPhone: '',
    distributorId: '',
    institutionId: ''
  },
  //用户头像
  treeInfo: {
    id: '',
    name: ''
  },
  userRegistInfo: {
    registerMobile: '', // 注册手机号
    registerCode: '', // 注册验证码
    majorRegion: '广东省/深圳市/南山区',
    city: '深圳市',
    area: '南山区',
    distributorId: '', // 公司ID
    distributorName: 'AW大师',
    institutionId: '', // 机构ID sit环境190 uat环境42/44 pro环境
    institutionName: 'AW大师'
  },
  //点击选中的楼盘id
  buildId: '',
  imUserSig: null,
  guidance: {
    dynamics: false
  }
}

const getters = {
  userInfo: state => {
    return state.userInfo
  },
  userVipInfo: state => state.userVipInfo,
  userArea: state => state.userArea,
  reportAddInfo: state => state.reportAddInfo,
  treeInfo: state => state.treeInfo,
  // jssdkConfig: state => {
  //   return state.jssdkConfig
  // },
  userRegistInfo: state => state.userRegistInfo,
  buildId: state => state.buildId,
  imUserSig: state => state.imUserSig,
  userGuidance: state => state.guidance
}

const actions = {
  async getUserInfo({ commit }, userInfo) {
    let _userInfo = JSON.stringify(userInfo)
    await localStorage.setItem('awMasterUserInfo', _userInfo)
    commit(types.USER_INFO, userInfo)
  },
  async getImUserSig({ commit }) {
    //im签名
    const res = await commonService.getUserSig()
    commit(types.IM_USER_SIG, res)
  },
  // setJssdkConfig({ commit }, jssdkConfig) {
  //   localStorage.setItem('awMasterJssdkConfig', JSON.stringify(jssdkConfig))
  //   commit([types.WX_JSSDK], jssdkConfig)
  // },
  async getUserVipInfo({ commit }) {
    const res = await userService.getVipAndPackage()
    // 后端坑爹,是vip时vipStatus为0,加入isvip区分
    res.isvip = res.vipStatus === 0
    commit(types.USER_VIP_INFO, res)
  },
  getReportAddInfo({ commit }, data) {
    commit(types.REPORT_INFO, data)
  },
  getTreeInfo({ commit }, data) {
    commit(types.TREE_INFO, data)
  },
  getUserRegistInfo({ commit }, data) {
    commit(types.USER_REGIST_INFO, data)
  },
  getUserbuildInfo({ commit }, data) {
    commit(types.USER_BUILD_INFO, data)
  }
}

const mutations = {
  [types.USER_INFO](state, data) {
    state.userInfo = data
  },
  [types.IM_USER_SIG](state, data) {
    state.imUserSig = data
  },
  [types.USER_VIP_INFO](state, data) {
    state.userVipInfo = data
  },
  [types.USER_AREA](state, data) {
    state.userArea = Object.assign(state.userArea, data)
  },
  [types.REPORT_INFO](state, data) {
    state.reportAddInfo = Object.assign(state.reportAddInfo, data)
  },
  [types.TREE_INFO](state, data) {
    state.treeInfo = data
  },
  // [types.WX_JSSDK](state, jssdkConfig) {
  //   state.jssdkConfig = jssdkConfig
  // },
  [types.USER_REGIST_INFO](state, data) {
    state.userRegistInfo = Object.assign(state.userRegistInfo, data)
  },
  [types.USER_BUILD_INFO](state, data) {
    state.buildId = data
  },
  [types.IS_ONE](state, data) {
    state.userInfo.isOne = data
  },
  [types.GUIDANCE](state, data) {
    state.guidance = Object.assign(state.guidance, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
