<template>
  <div class="business-card-container">
    <div class="business-card-box">
      <div class="bg_img info-box" > 
        <div @click="editCLickHandler" class="info">
          <!-- <avatar class="user-avatar" :avatar="userInfo.avatarUrl" /> -->
          <div class="user-info-content">
            <!-- 姓名、主营区域 -->
            <div class="user-detail-box" style="display:flex;">
              <div style="margin-top:24px;margin-left:16px;">
                <avatar class="user-avatar" :avatar="userInfo.avatarUrl"/>
              </div>
              <div style="margin-left:10px;width:77%;">
                <div class="username-box" >
                  <span class="username-text">{{userInfo.name}}</span>
                </div>
                <div class="main-camp-view">
                  <p>
                    <span>主营：</span>
                    <span>{{city}}</span>
                    <span>{{area}}</span>
                  </p> 
                  <svg class="icon" aria-hidden="true" style="width:16px;height:16px;margin-right:16px;">
                    <use xlink:href="#icon-arrow-"></use>
                  </svg> 
                </div>
              </div> 
            </div> 
          </div> 
        </div> 
        <!-- 快捷入口 -->
        <div class="shortcut-box">
          <div v-for="(img,index) in shortcutIcons" :key="index" class="head-img" @click="selectedShortcut(index)"> 
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="img.Icon"></use>
            </svg>
                <p class="grou1Icon-p" :class="index === 3?'grou1Icon':'grou1Icon-p'">{{img.title}}</p>
          </div>
        </div>
      </div> 
    </div> 
    <div class="business-box">
      <router-link tag="div" to="/user/myMember" class="box_info">
        <div>
          <img :src="crownIcon">
        </div>
        <div>
          <p class="vip-status">{{isVipInfo}}</p>
          <p class="welfare-desc" :class="goType === true?'welfare':'welfare-desc'">{{vipTimeInfo}}</p>
        </div>
        <div>
          <div class="info-btn" v-if="goType==false"> 
            <img src="../../assets/img/user/ktpng.png" alt="" class="btn">
          </div>
          <div class="info-btn_text" v-else>  
              <span style="font-size:10px;">{{vipText}}</span> 
              <!-- <p> -->
                <svg class="icon" aria-hidden="true" style="width:16px;height:16px;margin-right:16px;">
                  <use xlink:href="#icon-arrow-"></use>
                </svg> 
              <!-- </p>  -->
          </div>
        </div>
      </router-link> 
    </div>
  </div>
</template>
<script>
import Avatar from 'COMP/Avatar'
import TagGroup from 'COMP/TagGroup'
import { mapGetters } from 'vuex'
import marketService from 'SERVICE/marketService'
export default {
  components: {
    TagGroup,
    Avatar
  },
  data: () => ({
    modifyImg: require('IMG/user/usercard_bg@2x.png'),
    crownIcon: require('IMG/user/newCardGroup5@2x.png'),
    discountIcon: require('IMG/user/SetmealGroup17@2x.png'),
    vipInfo: '',
    shortcutIcons:[
      { title: '我的报备', Icon: '#icon-wodebaobei' }, 
      { title: '我的写一写', Icon: '#icon-wodexieyixie' }, 
      { title: '培训学院', Icon: '#icon-peixunxueyuan' }, 
      { title: '名片分享', Icon: '#icon-fenxiang' }, 
    ],
    goType:false,  
    majorName:[],
    city:"内蒙古自治区",
    area:"",
    vipText:"",
    listIndex:[]
  }),
  created () {
    this.getVipInfo(); 
    let majorRegion = this.userInfo.majorRegion
    this.majorName = majorRegion.split('/')
    this.city = this.majorName[1].replace('市','') 
    this.area = this.majorName[2].replace('区','')
    console.log(this.city,1111111111111)
  },
  methods: {
  async getVipInfo() {
    let res = await marketService.vipInfo()
    this.vipInfo = res  
  },
    editCLickHandler() {
      this.$router.push('/user/edit')
    },

    showQrCode() {
      this.$emit('showPopup', '')
    },

    shareUserCard() {
      this.$emit('shareUserCard', '')
    },
    selectedShortcut (index) {
      this.$emit('selectedShortcut',index)
    }, 
  },
  computed: {
    ...mapGetters(['userInfo', 'userVipInfo']),
    dredgeText () {
      if (this.vipInfo) { 
        let time = this.vipInfo.expireTimestamp
        let text = '立即续费'
        if (time > +new Date()) {
          text = '开通更多'
        }
        return text
      } else {
        return ''
      }
    },
    isVipInfo() { 
      if (this.vipInfo) { 
        let text = '开通VIP会员'
        if (this.goType == true) {
          text = '我的VIP会员'
        }
        return text
      } else {
        return ''
      }
      // return this.userVipInfo.isvip ? '我的vip会员':'开通VIP会员'
    },
    vipTimeInfo() { 
      if(this.vipInfo) { 
        // debugger 
        let text = '楼盘开通不限量'
        let list = this.vipInfo.vipList;
        this.goType = false;
        // let goType = false ,//false 没过期，true,有过期
        let saveIndex = 0;
        list.map((item,index)=>{
          //部分过期
          if(!item.vipValid) {
            // debugger
            this.listIndex.push(index)
            this.goType = true;
            saveIndex = index;           
          }         
        })  
        if(!this.goType){ 
          if(this.vipInfo.vipList.length == 0) {
            return text
          }
          let cityList = [];
          let curList = list.splice(0,3);
          for (let j of curList) { 
            cityList.push(j.city);
          }
          cityList = cityList.join(",");
          if(list.length>3){
            text = `已开通${cityList}等城市`;
            this.vipText ="开通更多"  
          }else{
            text = `已开通${cityList}城市`;
            this.vipText ="开通更多"  
          } 
          return text
        } 
        else if(this.goType&&this.listIndex.length!==list.length&&list.length!==1){  
          // debugger
          let d = list[saveIndex].city 
          text = `您开通${d}VIP已过期请续费`; 
          this.vipText ="续费"  
          console.log("asas?>>>>",text);
          return  text;
        }else{
          this.vipText ="立即续费";
          console.log(this.listIndex.length,'00000000000000000000000000') 
          return text = `您开通的城市VIP已全部到期`; 
        } 
      }else {
        return ''
      }
    },
    vipPackage() {
      return this.userVipInfo.packageStatus == 2 ? '任选10个盘' : this.userVipInfo.packageRemark
    },
    newLabelList() {
      return this.userInfo.labelList.length > 3 ? this.userInfo.labelList.slice(0, 3) : this.userInfo.labelList
    }, 
  }
}
</script>   
<style lang="less">
.business-card-container {
  // background: #fff;
  > .business-card-box {
    > .info-box { 
      height: 100%; 
      background: #ffffff;
      >.info {
        > .user-info-content { 
          // padding-bottom: 0px;
          > .user-detail-box { 
            .user-avatar { 
              width: 60px;
              height: 60px;
              // margin-top: 24px;
              // margin-left: 16px;
            }
            div {
              > .username-box {
                margin-top: 28px;
                color: #1A2733;
                > .username-text { 
                  font-size: 20px;
                  font-weight: bold;
                }
                > .username-edit-icon {
                  color: rgba(255, 255, 255, 0.15);
                }
              }
              > .main-camp-view {
                margin-top: 7px;
                color: #1A2733;
                font-size: 12px;
                margin-right: 16px; 
                display: flex;
                align-items: center;
                width: 100%;
                right: 16px;
                justify-content: space-between;
                span {
                  margin-right: 4px;
                }
              }
            }
            
            
          }
        }
      } 
      >.shortcut-box {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
          margin-bottom: 5px;
        .head-img { 
          margin-left: 16px;
          // margin-bottom: 8px;
          height: 60px;
          width: 65px; 
          margin-right: 10px;
          text-align: center;
          .icon {
            height: 24px;
            width: 24px;
          }
          > .grou1Icon-p {
            font-size: 10px;
            font-weight: 400;
            color: #333333;
            // line-height: 17px;
            // margin-top: 6px;
          } 
          > .grou1Icon {
            color: #E7602E;
          }
        }
      }
    } 
  }

  > .business-status-title {
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    padding: 5px 16px 15px !important;
  }

  > .business-status-box {
    background-color: #ffffff;
    width: 100%; 
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 10;
    box-sizing: content-box;
    > div {
      position: relative; 
      height: 80px; 
      line-height:80px;
      background: #ffffff;
      border-radius: 3px;
      margin-top: 6px;
      > img {
        margin: 18px 10px;
        width: 46px;
        height: 46px;
      }
      .info-title {
        position: absolute;
        top: 16px;
        left: 66px;
        font-size: 18px;
        font-weight: 600;
        color: #1A2733;
        line-height: 1.5;
      }
      .info-desc {
        position: absolute;
        top: 43px;
        left: 66px;
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        line-height: 22px;
      }
      .info-btn{
        position: absolute;
        top: 24px;
        left: 71%;  
        line-height: 22px; 
        .btn {
          width:80px;
          height:32px;
          border: none;
          border-radius:16px;
          color:#66421F;
          box-shadow:2px 2px rgba(225, 161, 85, 0.4);
          font-size:12px;
          background: linear-gradient(90deg, rgba(255, 209, 116, 1) 0%, rgba(215, 145, 75, 1) 100%);
        }
      }
      // .info-btn_text {
      //   position: absolute;
      //   top: 0px;
      //   margin-left:80%;  
      //   // line-height: 22px;
      //   display: flex;
      //   color: #8A9299;
      // }
    }
    > .status-info-left { 
      > .info-desc {
        font-size: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  >.business-box {
    background: #ffffff;
    margin-top: 6px;
    height: 80px;
    width: 100%;
    .box_info {
      display: flex;
      div>img {
        margin: 18px 10px;
        width: 46px;
        height: 46px; 
      }
      div:nth-child(2) {
        width: 50%;
      }
      div:nth-child(3) {
        width: 32%;
      }
      div>.vip-status { 
        margin-top: 16px; 
        font-size: 18px;
        font-weight: 600;
        color: #1A2733;
        line-height: 1.5;
      }
      div>.welfare-desc { 
        margin-top: 2px; 
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        line-height: 22px;
      }
      div>.welfare { 
        margin-top: 2px; 
        font-size: 12px;
        font-weight: 400;
        color: #EA4D2E;
        line-height: 22px;
      }
      div>.info-btn{ 
        margin-top: 10px; 
        // line-height: 22px; 
        float: right;
        // margin-right: 16px;
        .btn {
          width:88px;
          height:40px;   
        }
      }
      div>.info-btn_text { 
        margin-top: 24px;  
        line-height: 34px; 
        text-align: right;
        color: #8A9299; 
        display: flex;
        align-items: center;
        float: right; 
      }
    }
  }
}
</style>
