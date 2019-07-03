import * as types from '@/store/mutation-types'
import userService from '@/services/userService'
import commonService from 'SERVICE/commonService'

const state = {
  // jssdkConfig: JSON.parse(localStorage.getItem('awMasterJssdkConfig')) || null,
  userStatus: 0,
  userInfo: JSON.parse(localStorage.getItem('awMasterUserInfo')) || ((process.env.VUE_APP_AW_ENV=='uat' || process.env.VUE_APP_AW_ENV=='prod' || location.href.indexOf('sit') > -1) ? {} : {
    jumpToDynamicDetail: 1, //是否跳动态详情 0:不跳 1:跳
    userStatus: 0, // 0启用 1禁用
    devMode: true,
    agentId: '1001527',
    avatarUrl: 'https://720ljq2test-10037467.file.myqcloud.com/ljqzs/user_head_img/women_007.png',
    distributorId: '124',
    distributorName: '广佛分公司',
    enterpriseId: '90',
    institutionId: '82',
    institutionLogo: '',
    institutionName: 'test',
    isOne: 0, // 1新用户 0老用户
    articleShareFlag: 1, //文章分享引导标志位，默认为0，0：未完成指引；1：已完成指引 ,
    isVip: '',
    vipDefaultCity: '深圳市',
    ifView: 1, //是否展示邀请有礼
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
    leavingStatus: 0,
    token:
      'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJmNWtjYnUiLCJzdWIiOiJhZ2VudElkOnd3OGY2ODAxYmE1ZmQyYTExMjoxMDAxNjA0IiwiZXhwIjoxNTYyMzAwNTQxLCJpYXQiOjE1NjE2OTU3NDF9.Ez1S04qkoOGsMJmMkWZIhJcEeY_ZfUyDCAh1XNRT9w_xv4RZPAxcWFhB0JyFbh4NMBKC76aGEGM4fvMs2ecw_A',
    majorCity: '深圳市',
    majorRegion: '广东省/深圳市/南山区',
    name: '周丹Nike',
    nickName: '周丹Nike',
    // payCorpId: 'onXUy1sGkPMX-Z34buMYLs5q2',
    payOpenId: 'oeKML1Lx2W1E-uDyUJCOkTTJdKCY',
    // pcOpenid: 'oPeLD1Mdkzf8nnZ4yHaHfF2YBYUo',
    price: 984200,
    registerMobile: '18603000246',
    signature: 'mwwwwwwwmm',
    tempPhone: '18603000246',
    vipDefaultCity: '',
    vipInfo: '',
    wechatAccount: '',
    workingTime:'100',
    saleType:1
  }),
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
    clientPhoneType: 'all', // all/star
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
    name: '',
    disabled: true, // 获取验证码默认不可点击
    registDisabled: true, // 默认注册按钮不可点击
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
    dynamics: false,
    marketFirst: false, //首次注册
    article: false //0未完成文章详情引导，1完成
  }
}

const getters = {
  userStatus: state => state.userStatus,
  userInfo: state => {
    return state.userInfo
  },
  guidance: state => {
    return state.guidance
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
    // alert('actions'+userInfo)
    localStorage.setItem('awMasterUserInfo', _userInfo)
    // alert('localStorage')
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
    // alert('mutations'+data)
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
  [types.FIRST](state, data) {
    state.guidance.marketFirst = data
  },
  [types.ARTICLE_SHARE_FLAG](state, data) {
    state.guidance.article = data
  },
  [types.GUIDANCE](state, data) {
    state.guidance = Object.assign(state.guidance, data)
  },
  [types.USER_STATUS](state, data) {
    state.userStatus = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
