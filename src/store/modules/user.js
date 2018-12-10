import * as types from '@/store/mutation-types'
import userService from '@/services/userService'

const state = {
  jssdkConfig: JSON.parse(localStorage.getItem('awMasterJssdkConfig')) || null,
  userInfo: JSON.parse(localStorage.getItem('awMasterUserInfo')) || {
    address: '',
    agentMinOpenid: '',
    agentUpdateId: '',
    agentid: '',
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
    id: '4149',
    ifView: false,
    institutionId: '46',
    institutionLogo: '',
    institutionName: '',
    isOne: 0,
    is_update: false,
    likeNum: '0',
    linkerGuide: 1,
    loginCount: 1,
    loginTime: '2018-11-10 02:28:16',
    logoUrl: '',
    majorCity: '',
    majorRegion: '111111',
    masterRecommendTip: '',
    minOpenid: '',
    mobile: '18676652795',
    mpOpenid: '',
    myLinkerGuide: 0,
    name: '离园则90',
    nameGuide: 0,
    nickName: '离园则',
    parentUserId: '',
    // payCorpId: "ww5e4d879ddc307ea1",
    // cropId: "ww8f6801ba5fd2a112",
    // pcOpenid: "oPeLD1HXPuZsdwb1WdN9HB8eRIw4",
    payOpenId: 'o_iHQ0j9FdSX9B7-1jhI9-0-4d7Y',
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
      'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJmYmFqYXoiLCJzdWIiOiJhZ2VudElkOnd3OGY2ODAxYmE1ZmQyYTExMjo3MDUiLCJleHAiOjE1NDQ1MjQ2MDcsImlhdCI6MTU0MzkxOTgwN30.U-QkrUG6M00Q4z3SbRdoJ1QEJtepaJgOxebXhx3ucVFo_fobIvF_3KNtmNOuRme6isTNux7BSKJGfENlIgYlRQ',
    updateTime: '2018-10-19 17:37:47',
    viewNum: 101,
    wechatAccount: '112110',
    labelList: [
      {
        labelId: '001',
        labelName: '价格屠夫'
      }
    ]
  },
  userVipInfo: {},
  userArea: {
    longitude: '', // 经度
    latitude: '', // 纬度
    province: '', // 省
    city: '深圳市', // 市
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
    distributorId: '124', // 公司ID
    distributorName: 'AW大师',
    institutionId: '190', // 机构ID
    institutionName: 'AW大师'
  }
}

const getters = {
  userInfo: state => state.userInfo,
  userVipInfo: state => state.userVipInfo,
  userArea: state => state.userArea,
  reportAddInfo: state => state.reportAddInfo,
  treeInfo: state => state.treeInfo,
  jssdkConfig: state => {
    return state.jssdkConfig
  },
  userRegistInfo: state => state.userRegistInfo
}

const actions = {
  async getUserInfo({ commit }, userInfo) {
    let _userInfo = JSON.stringify(userInfo)
    await localStorage.setItem('awMasterUserInfo', _userInfo)
    commit(types.USER_INFO, userInfo)
  },
  setJssdkConfig({ commit }, jssdkConfig) {
    localStorage.setItem('awMasterJssdkConfig', JSON.stringify(jssdkConfig))
    commit([types.WX_JSSDK], jssdkConfig)
  },
  async getUserVipInfo({ commit }, payload) {
    const res = await userService.getUserVipInfo(payload)
    // 后端坑爹,是vip时vipStatus为0,加入isvip区分
    res.data.isvip = res.data.vipStatus === 0
    commit(types.USER_VIP_INFO, res.data)
  },
  getReportAddInfo({ commit }, data) {
    commit(types.REPORT_INFO, data)
  },
  getTreeInfo({ commit }, data) {
    commit(types.TREE_INFO, data)
  },
  getUserRegistInfo({ commit }, data) {
    commit(types.USER_REGIST_INFO, data)
  }
}

const mutations = {
  [types.USER_INFO](state, data) {
    state.userInfo = data
  },
  [types.USER_VIP_INFO](state, data) {
    state.userVipInfo = data
  },
  [types.USER_AREA](state, data) {
    state.userArea = Object.assign(state.userArea, data)
  },
  [types.REPORT_INFO](state, data) {
    state.reportAddInfo = data
  },
  [types.TREE_INFO](state, data) {
    state.treeInfo = data
  },
  [types.WX_JSSDK](state, jssdkConfig) {
    state.jssdkConfig = jssdkConfig
  },
  [types.USER_REGIST_INFO](state, data) {
    state.userRegistInfo = Object.assign(state.userRegistInfo, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
