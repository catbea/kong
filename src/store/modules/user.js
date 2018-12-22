import * as types from '@/store/mutation-types'
import userService from '@/services/userService'
import commonService from 'SERVICE/commonService'

const state = {
  jssdkConfig: JSON.parse(localStorage.getItem('awMasterJssdkConfig')) || null,
  userInfo: JSON.parse(localStorage.getItem('awMasterUserInfo')) || {
    isVip: '1',
    vipInfo: {
      city: '广州市'
    },
    majorCity: '南京市',
    address: '',
    agentMinOpenid: '',
    agentUpdateId: '',
    agentId: '705',
    attentAccount: '',
    avatarUrl: 'http://720ljq2test-10037467.cossh.myqcloud.com/ljqzs/shareImg/Time91438ec3-33e2-4024-9ab9-50393f28370e.png',
    avatarUrlTwo: 'http://720ljq2test-10037467.cossh.myqcloud.com/1536198363904JeBNbFsYAKSbAJYm.png',
    cardFirstView: '',
    cardProjectFirstView: '',
    channelId: '',
    companyLogo: '',
    companyName: '',
    createTime: '2018-09-01 10:06:48',
    createType: 2,
    customEnterpriseName: '',
    deleteFlag: 0,
    distributorId: '124',
    distributorName: '垃圾垃圾',
    enterpriseId: '90',
    enterpriseName: '尊豪科技SIT',
    organizationName: '机构',
    existNewCoupons: '',
    existNewProject: '',
    givePrice: 0,
    id: '705',
    ifView: false,
    institutionId: '46',
    institutionLogo: '',
    institutionName: '分销商小李',
    isOne: 0,
    is_update: false,
    likeNum: '0',
    linkerGuide: 1,
    loginCount: 1,
    loginTime: '2018-11-10 02:28:16',
    logoUrl: '',
    majorCity: '',    // 主营区域
    majorRegion: '111111',
    masterRecommendTip: '',
    minOpenid: '',
    mobile: '18676652795',
    registerMobile: '13100000000',
    mpOpenid: '',
    myLinkerGuide: 0,
    name: '嗨我是你的益达吗',
    nameGuide: 0,
    nickName: '离园则',
    parentUserId: '',
    // payCorpId: "ww5e4d879ddc307ea1",
    cropId: "ww8f6801ba5fd2a112",
    // pcOpenid: "oPeLD1HXPuZsdwb1WdN9HB8eRIw4",
    payOpenId: 'oeKML1F_vZxBRzcW_pKjGsLkiVgQ',
    position: '',
    price: 2000,
    qrCode: 'https://720ljq2test-10037467.file.myqcloud.com/ljqzs/cardQrcode/4149/Timef021faa6-738d-4f03-8b5f-c8840b555494.jpg',
    recommendTip: '',
    registerType: '10',
    shareNum: '0',
    signature: '别问我是谁，请叫我大湿', 
    status: 1,
    storeId: '224',
    storeName: '',
    switchTime: '',
    tempPhone: '18676652795',
    token:
    'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJrYnlvN2giLCJzdWIiOiJhZ2VudElkOnd3OGY2ODAxYmE1ZmQyYTExMjo3MDUiLCJleHAiOjE1NDgxNDA5NTYsImlhdCI6MTU0NTEzNjE1Nn0.C9AdO_CIUA6Da3ZpdCTWKL9zYjSiEz8xd7MmWc2Z5C0Fgnyfox7S3qD9I7pXRZQQLzDLTSmo515sDnLduwPCkw',
    updateTime: '2018-10-19 17:37:47',
    viewNum: 101,
    wechatAccount: '112110',
    labelList: [
      {
        labelId: '001',
        labelName: '价格屠夫'
      },
      {
        labelId: '002',
        labelName: '喜欢睡觉'
      },
      {
        labelId: '003',
        labelName: '不愿加班'
      },
      {
        labelId: '004',
        labelName: '呵呵死你'
      }
    ]
  },
  userVipInfo: {},
  userArea: {
    longitude: '', // 经度
    latitude: '', // 纬度
    province: '', // 省
    city: '深圳市', // 市
    selectedCity: '深圳市',
    marketSelectedCity: null, //楼盘列表城市选择
    vipSelectedCity: null,
    myMarketSelectedCity: null, //我的楼盘城市选择
    myReportCity: '',   // 报备楼盘
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
    distributorId: '124', // 公司ID
    distributorName: 'AW大师',
    institutionId: '190', // 机构ID
    institutionName: 'AW大师'
  },

  //点击选中的楼盘id
  buildId: '',

  imUserSig: null
}

const getters = {
  userInfo: state => { return state.userInfo },
  userVipInfo: state => state.userVipInfo,
  userArea: state => state.userArea,
  reportAddInfo: state => state.reportAddInfo,
  treeInfo: state => state.treeInfo,
  jssdkConfig: state => { return state.jssdkConfig },
  userRegistInfo: state => state.userRegistInfo,
  buildId: state => state.buildId,
  imUserSig: state => state.imUserSig,
}

const actions = {
  async getUserInfo({ commit }, userInfo) {
    let _userInfo = JSON.stringify(userInfo)
    await localStorage.setItem('awMasterUserInfo', _userInfo)
    commit(types.USER_INFO, userInfo)
  },
  async getImUserSig({ commit }) {//im签名
    const res = await commonService.getUserSig()
    commit(types.IM_USER_SIG, res)
  },
  setJssdkConfig({ commit }, jssdkConfig) {
    localStorage.setItem('awMasterJssdkConfig', JSON.stringify(jssdkConfig))
    commit([types.WX_JSSDK], jssdkConfig)
  },
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
  [types.WX_JSSDK](state, jssdkConfig) {
    state.jssdkConfig = jssdkConfig
  },
  [types.USER_REGIST_INFO](state, data) {
    state.userRegistInfo = Object.assign(state.userRegistInfo, data)
  },
  [types.USER_BUILD_INFO](state, data) {
    state.buildId = data
  },
  [types.IS_ONE](state, data) {
    state.isOne = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
