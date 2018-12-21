<template>
  <div class="user-edit-page">
    <cell-group class="user-base-info">
      <div class="user-avatar">
        <router-link to="/user/edit/userPortrait">
          <!-- <div class="bg_img self-avtar" slot="extra" :style="{backgroundImage:'url(' + userInfo.avatarUrl + ')'}"></div> -->
          <img :src="userInfo.avatarUrl?userInfo.avatarUrl:userEditIcon" class="editIcon-icon">
          <p class="user-avatar-clik">点击可编辑头像</p>
        </router-link>
      </div>
      <!-- <cell class="cell-item user-avatar" :to="'/user/edit/avatar'" title="我的头像" is-link>
        <div class="bg_img self-avtar" slot="extra" :style="{backgroundImage:'url(' + userInfo.avatarUrl + ')'}"></div>
      </cell>-->
      <cell
        class="cell-item"
        title="名字"
        is-link
        :to="{path:'/user/edit/username',query:{userName:userInfo.name}}"
        :value="userInfo.name"
      />
      <cell
        class="cell-item"
        title="手机号"
        :to="{path:'/user/edit/phone',query:{phoneNum:userInfo.tempPhone}}"
        is-link
        :value="userInfo.tempPhone"
      />
      <cell
        class="cell-item"
        title="微信号"
        :to="{path:'/user/edit/userWechat',query:{weChatNum:userInfo.wechatAccount}}"
        is-link
        :value="userInfo.wechatAccount"
      />
      <cell
        class="cell-item"
        title="主营区域"
        is-link
        :value="userInfo.majorRegion"
        @click="openAreaSelect()"
      />
      <cell
        class="cell-item"
        title="平台公司"
        :value="userInfo.distributorName"
        @click="godistributorName"
      />
      <!-- <cell class="cell-item" title="中介门店" is-link :value="`${userInfo.institutionName}-${userInfo.storeName}`" /> -->
      <!-- :to="'/user/edit/userMechanism'+'?distributorId='+userInfo.enterpriseId+'&enterpriseId='+userInfo.organizationId"-->
      <cell
        class="cell-item"
        title="我的机构"
        is-link
        :value="userInfo.institutionName"
        :to="{path:'/user/edit/userMechanism',query:{distributorId:userInfo.distributorId,enterpriseId:userInfo.enterpriseId}}"
      />
    </cell-group>
    <cell-group class="user-advance-info">
      <cell class="cell-item tag-edit" title="标签展示" is-link :to="'/user/edit/userLabel'">
        <div slot="extra" class="tag-show-container">
          <div
            class="tag-item"
            v-for="item in newLabelList"
            :key="item.labelId"
          >{{item.labelName}}</div>
        </div>
      </cell>
      <!-- :to="{path:'/user/edit/userIntroduction',query:{signature:userInfo.signature}}"  -->
      <cell class="cell-item user-signature" title="个人介绍"  :value="userInfo.signature"/>
    </cell-group>
    <area-select :show="this.isOpen" @confirm="this.getCityName" @cancel="this.cancelPopu"></area-select>
  </div>
</template>
<script>
import { Cell, CellGroup } from 'vant'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
import { Dialog } from 'vant'
import areaSelect from 'COMP/AreaSelect/index'
import userService from 'SERVICE/userService'
export default {
  components: {
    Cell,
    CellGroup,
    Dialog,
    areaSelect
  },
  created() {},
  data() {
    return {
      userEditIcon: require('IMG/user/collection/Article@2x.png'),
      isOpen: false
    }
  },
  methods: {
    godistributorName() {
      //此处不可进行操作
      //如果一个月内已经切换过一次分销平台公司，提示，否则跳转到平台选择页面
      // Dialog.alert({
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

    getCityName(data) {
      this.majorRegion = data[0].name + '/' + data[1].name + '/' + data[2].name
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
      if (result) {
        this.$store.dispatch('userInfo', Object.assign(this.userInfo, { majorRegion: this.majorRegion }))
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),

     newLabelList() {
      return this.userInfo.labelList.length > 3 ? this.userInfo.labelList.slice(0, 3) : this.userInfo.labelList
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
      padding: 32px 0;
      text-align: center;
      .editIcon-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .user-avatar-clik {
        font-size: 12px;

        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 122, 230, 1);
        line-height: 17px;
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
    margin-bottom: 10px;
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
      height: 110px;
      .van-cell__right-icon {
        position: absolute;
        right: 22px;
        top: 0px;
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
      overflow: auto;
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
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
