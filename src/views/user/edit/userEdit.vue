<template>
  <div class="user-edit-page">
    <van-cell-group class="user-base-info">
      <!-- <div class="user-avatar">
        <router-link to="/user/edit/userPortrait">
          <div class="editIcon-icon">
            <img :src="userInfo.avatarUrl?userInfo.avatarUrl:userEditIcon">
          </div>
          <p class="user-avatar-clik">点击可编辑头像</p>
        </router-link>
      </div> -->
      <van-cell title="头像" is-link :to="{path:'/user/edit/userPortrait'}" class="user-newavatar">
        <template slot="title"> 
          <div class="editIcon-icon">
            <div>
              <span>头像</span>
            </div>
            <div>
              <img :src="userInfo.avatarUrl?userInfo.avatarUrl:userEditIcon">
            </div>
          </div>
        </template>
      </van-cell>
      <van-cell class="cell-item" title="名字" is-link :to="{path:'/user/edit/username',query:{userName:userInfo.name}}" :value="userInfo.name"/>
      <van-cell class="cell-item" title="联系电话" :to="{path:'/user/edit/phone',query:{phoneNum:userInfo.tempPhone}}" is-link :value="userInfo.tempPhone"/>
      <van-cell class="cell-item" title="微信号" :to="{path:'/user/edit/userWechat',query:{weChatNum:userInfo.wechatAccount}}" is-link :value="userInfo.wechatAccount"/>
      <van-cell class="cell-item" title="主营区域" is-link :value="userInfo.majorRegion" @click="openAreaSelect()"/>
      <van-cell class="cell-item" title="从业时间" is-link :value="userInfo.workingTime==''?'1-3年':['1-3年','3-5年','5-8年','10年以上'][userInfo.workingTime-100]"  @click="openTimeSelect()"/>
      <van-cell class="cell-item" title="销售类型" is-link :value="userInfo.saleType==''?'买卖经纪人':userInfo.saleType" @click="openShopSelect()"/>
      <van-actionsheet v-model="show" :actions="actions" @select="onSelect"/>
      <van-actionsheet v-model="isshow" :actions="isActions" @select="shopSelect"/>
      <!-- <van-cell class="cell-item" title="平台公司" :to="{path:'/user/edit/userCompany'}" is-link :value="userInfo.distributorName" @click="godistributorName"/>
      <van-cell class="cell-item" title="我的机构" is-link :value="userInfo.institutionName" @click="goEdit" /> --> 
    </van-cell-group>
    <van-cell-group class="user-advance-info">
      <van-cell class="cell-item tag-edit" title="" is-link :to="'/user/edit/userLabel'">
        <template slot="title">
          <span class="custom-text">标签展示</span>
          <div class="user-tag"><van-tag  v-for="item in newLabelList" :key="item.labelId">{{item.labelName}}</van-tag></div>
        </template>
        <!-- <div slot="extra" class="tag-show-container">
          <div class="tag-item" v-for="item in newLabelList" :key="item.labelId">{{item.labelName}}</div>
        </div> -->
      </van-cell>
      <van-cell class="cell-item" title="个人介绍" is-link :to="{path:'/user/edit/userIntroduction',query:{signature:userInfo.signature}}" :value="userInfo.signature | textOver(10)"/>
    </van-cell-group>
    <area-select :show="this.isOpen" @confirm="this.getCityName" @cancel="this.cancelPopu" :code="cityCode" :areaList="areaList"/>
  </div>
</template>
<script>
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
import areaSelect from 'COMP/AreaSelect/index'
import userService from 'SERVICE/userService'
import { fullArea } from '@/utils/fullArea'
import { Toast } from 'vant';
export default {
  components: {
    areaSelect
  },
  created() {
    this.fullArea = fullArea
    this.getAreaList(fullArea)
  },
  data() {
    return {
      userEditIcon: require('IMG/user/collection/Article@2x.png'),
      isOpen: false,
      fullArea: '',
      areaList: {},
      show:false,
      actions:[
        { name: '1-3年',workingTime :'100' },
        { name: '3-5年',workingTime :'101' },
        { name: '5-8年',workingTime :'102' },
        { name: '10年以上',workingTime :'103' },
      ],
      isshow:false,
      isActions:[
        { name: '买卖经纪人',saleType  :'0' },
        { name: '内场销售',saleType  :'1' },
        { name: '销售专家',saleType  :'2' }, 
      ]
    }
  },
  methods: {
    // areaList 获取
    getAreaList () {
      let keys =  Object.keys(this.fullArea.city_list)
      let data = {}
      keys.forEach(ele => {
        data[ele] = '不限'
      })
      let county_list = Object.assign({},this.fullArea.county_list, data)
      this.areaList = Object.assign({},this.fullArea,{county_list: county_list})
    },
    goEdit() {
      if (!this.userInfo.institutionName) {
        this.$router.push({ path: '/user/edit/userMechanism', query: { distributorId: this.userInfo.distributorId, enterpriseId: this.userInfo.enterpriseId } })
      } else {
        this.$router.push('/user/edit/userPlatform')
      }
    },

    godistributorName() {
      //此处不可进行操作
      //如果一个月内已经切换过一次分销平台公司，提示，否则跳转到平台选择页面
      // this.$dialog.alert({
      //   message: '你最近一个月内已经切换过一次分销平台公司，暂时无法切换'
      // }).then(() => {
      //   // on close
      // })
    },

    //选择地区
    openAreaSelect() {
      if (this.isOpen) {
        this.isOpen = !this.isOpen
      } else {
        this.isOpen = !this.isOpen
      }
    },
    openTimeSelect() {
      this.show = true
    },
    openShopSelect () {
      this.isshow = true
    },
    onSelect(item) {  
      userService.upDateUserInfo({workingTime:item.workingTime
      }).then((result) => {  
          this.show = false 
      }).catch((err) => {
          console.log(err)
      })
    },
    shopSelect(item) {
      userService.upDateUserInfo({saleType:item.name
      }).then((result) => { 
          this.isshow = false           
      }).catch((err) => {
          console.log(err)
      })
    },
    getCityName(data) {
      this.majorRegion = data[0].name + '/' + data[1].name
      if (data[2] && data[2].name) this.majorRegion += '/' + data[2].name
      this.majorCity = data[1].name
      this.isOpen = false
      this.upDateUserName(this.majorRegion)
    },
    cancelPopu() {
      this.isOpen = false
    },

    async upDateUserName(obj) {
      let nameObj = {
        majorRegion: obj
      }
      const result = await userService.upDateUserInfo(nameObj)
      // this.userInfo.majorRegion = this.majorRegion
      // this.userInfo.majorCity = this.majorCity
      if (result) {
        // this.$store.getUserInfo(types.USER_INFO, this.userInfo)
        let data =  Object.assign({},this.userInfo,{
          majorRegion: this.majorRegion,
          majorCity: this.majorCity
        })
        this.$store.dispatch('getUserInfo', data)
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),

    newLabelList() {
      return this.userInfo.labelList.length > 3 ? this.userInfo.labelList.slice(0, 3) : this.userInfo.labelList
    },
    cityCode() {
      let codes = Object.keys(this.fullArea.city_list)
      let cityList = Object.values(this.fullArea.city_list)
      let i = ''
      cityList.forEach((el, index) => {
        if (el === this.userInfo.majorCity) {
          return (i = index)
        }
      })
      return codes[i]
    }
  },
  watch: {
    userInfo(v) {}
  }
}
</script>
<style lang="less">
.van-cell__value {
  overflow: hidden;
  text-align: right;
  position: relative;
  vertical-align: middle;
  color: rgba(153, 153, 153, 1);
}
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
.user-edit-page {
  width: 100%;
  height: 100%;
  background: #f2f5f9;
  > .user-base-info,
  > .user-advance-info {
    background: #fff;

    > .user-avatar {
      padding: 32px 0 18px 0;
      border-bottom: 10px solid #f2f5f9;
      text-align: center;
      // .editIcon-icon {
      //   width: 80px;
      //   height: 80px;
      //   margin: auto;
      //   img{
      //     width: 100%;
      //     height: 100%;
      //     object-fit: cover;
      //     border-radius: 100%;
      //   }
      // }
      .user-avatar-clik {
        font-size: 12px; 
        font-weight: 400;
        color: rgba(0, 122, 230, 1);
        line-height: 17px;
      }
    }
    > .user-newavatar {
        line-height: 92px;
        padding: 0 20px;
        .van-cell__title {
          font-size: 16px;
          font-weight: 400;
          color: #333333;
        }
        .editIcon-icon {  
          height: 92px;
          display: flex;
          div:nth-child(1) {
            width:50%;
          }
          div:nth-child(2) {
            width: 49%;
            height: 92px;
            >img {
              width:60px;
              height: 60px;
              border-radius: 100%;
              margin-left: 60%;
              object-fit: cover; 
              margin-top: 16px;
              // text-align: right;
            }
          } 
        }
        .van-cell__right-icon {
          padding: 38px 0;
        }
    }
    .cell-item {
      // height: 56px;
      line-height: 56px;
      padding: 0 20px;
      &.user-avatar {
        height: 80px;
        line-height: 80px;
        .self-avtar {
          margin: 20px 0;
        }
        .van-cell__right-icon {
          padding: 30px 0;
        }
      }
      .van-cell__title {
        font-size: 16px;
        font-weight: 400;
        color: #333333;
      }
      .van-cell__right-icon {
        padding: 15px 0;
      }
    }
  }
  > .user-base-info {
    // margin-bottom: 10px;
    .cell-item {
      position: relative;
      .self-avtar {
        position: absolute;
        width: 40px;
        height: 40px;
        right: 40px;
        border-radius: 4px;
      }
    }
  }
  > .user-advance-info {
    .tag-edit {
      position: relative;
      display: block;
      // height: 110px;
      border-bottom: 0px solid #f2f5f9;
      .user-tag {
        float: right;
        margin-right: 20px;
      }
      .van-tag {
        background-color: #fff !important;
        padding: 0 0.1rem !important;
        color: #445166;
        font-size: 14px;
        vertical-align: middle;
      }
      .van-cell__right-icon {
        position: absolute;
        right: 22px;
        top: 3px;
      }
      .tag-show-container {
        display: flex;
        .tag-item {
          height: 20px;
          line-height: 10px;
          display: inline-block;
          font-size: 12px;
          color: #666666;
          background: #f2f5f9;
          padding: 5px 5px;
          margin: 0 5px;
        }
      }
    }
    .user-signature {
      // overflow: auto;
      // text-align: left;
      .van-cell__value {
        position: absolute;
        left: 100px;
        width: 200px;
        line-height: 16px;
        text-align: right;
        padding: 20px;
        > span {
          word-break: break-all;
          overflow: auto;
          font-size: 14px;
          text-align: left;
        }
      }
    }
  }
}
</style>
