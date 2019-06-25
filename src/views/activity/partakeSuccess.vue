<template>
  <div class="" id="partake-body">
    <div class="body-title">
      <img class="success-icon" :src="joinSuccess">
      <p class="success-text">参加成功</p>
    </div>
    <span class="success-notice">恭喜你参与了{{activityName}}获得奖励如下</span>
    <div class="build-box">
      <div class="build-list">
        <build-card v-for="(item ,index) in firstBuild" :key="index" :data="item"></build-card>
      </div>
      <div class="check-more" @click="showMoreData()">
        <a>{{this.showMore==false?'展开更多':'收起'}}</a>
        <img :src="this.showMore==false?arrowDown:arrowUp">
      </div>
    </div>
    <div class="notice-bottom">
      <p>您获得的楼盘如已开通</p>
      <p>会在现有的剩余时间上叠加楼盘的活动赠送时间</p>
    </div>
    <div
      class="join-btn"
      @click="enterBuilding"
      :style="{backgroundImage:'url(' + joinBtn + ')'}"
    >管理楼盘</div>
  </div>
</template>


<script>
import BuildCard from 'COMP/Activity/BuildCard'
import ActivityService from 'SERVICE/activityService'

export default {
  components: {
    BuildCard
  },

  data: () => ({
    joinSuccess: require('IMG/activity/join_success.png'),
    joinBtn: require('IMG/activity/activity_bg_btn.png'),
    feelLabel: require('IMG/activity/feel_label.png'),
    buildImg: require('IMG/easyPhoto/middleImg.png'),
    arrowDown: require('IMG/activity/arrow_down.png'),
    arrowUp: require('IMG/activity/arrow_up.png'),
    showMore: false,

    firstBuild: [],
    activityName: ''

    // buildList: [
    //   {
    //     buidlingNanme: '碧桂园·百禧庄园99',
    //     price: '3800元/㎡起',
    //     buildImg: require('IMG/easyPhoto/middleImg.png')
    //   },
    //   {
    //     buidlingNanme: '碧桂园·千禧庄园',
    //     price: '3900元/㎡起',
    //     buildImg: require('IMG/easyPhoto/middleImg.png')
    //   },
    //   {
    //     buidlingNanme: '碧桂园·万禧庄园',
    //     price: '4000元/㎡起',
    //     buildImg: require('IMG/easyPhoto/middleImg.png')
    //   },
    //   {
    //     buidlingNanme: '碧桂园·亿禧庄园',
    //     price: '4100元/㎡起',
    //     buildImg: require('IMG/easyPhoto/middleImg.png')
    //   },
    //   {
    //     buidlingNanme: '碧桂园·兆禧庄园',
    //     price: '4200元/㎡起',
    //     buildImg: require('IMG/easyPhoto/middleImg.png')
    //   }
    // ]
  }),

  methods: {
    showMoreData() {
      let _that = this
      let firstList = []

      this.showMore = !this.showMore
      let infoNum = _that.buildList.length

      if (this.showMore == false) {
        for (let i = 0; i < _that.buildList.length; i++) {
          if (i <= 3) {
            firstList.push(_that.buildList[i])
          }
        }
      } else {
        for (let i = 0; i < _that.buildList.length; i++) {
          firstList.push(_that.buildList[i])
        }
      }
      this.firstBuild = firstList
    },

    enterBuilding() {
      this.$router.push('/market/classify/mymarket')
    },

    async getActivityInfo(activityId) {

      const result = await ActivityService.getActivityList(activityId)
      this.buildList = result
       
      let _that = this
      let firstList = []
      let infoNum = _that.buildList.length
      for (let i = 0; i < _that.buildList.length; i++) {
        if (_that.buildList[i].linkerPrice == '0' || _that.buildList[i].linkerPrice == '') {
          _that.buildList[i].linkerPrice = '价格待定'
          _that.buildList[i].priceUnit = ''
        } else {
          if (_that.buildList[i].priceUnit == '万元/每套') {
            _that.buildList[i].linkerPrice = '约' + _that.buildList[i].linkerPrice
          } else if (_that.buildList[i].priceUnit == '元/㎡') {
            _that.buildList[i].priceUnit = '元/㎡起'
          }
        }

        if (i <= 3) {
          firstList.push(_that.buildList[i])
        }
      }
      this.firstBuild = firstList
    },

    //获取活动名字
    async getActivityName(id) {
      const result = await ActivityService.getActivityName(id)
      this.activityName = result.activityName
    }
  },
  created() {
    let activityId = this.$route.query.activityId

    this.getActivityInfo(activityId)
    this.getActivityName(activityId)
  }
}
</script>


<style lang="less">
#partake-body {
  background: linear-gradient(90deg, rgba(255, 156, 56, 1) 0%, rgba(235, 93, 42, 1));
  width: 100%;

  .body-title {
    width: 100%;
    margin-top: 37px;
    display: flex;
    justify-content: center;

    .success-icon {
      width: 20px;
      height: 20px;
    }

    .success-text {
      color: white;
      font-size: 20px;
      margin-left: 5px;
    }
  }
  .success-notice {
    margin-top: 10px;
    font-size: 12px;
    color: white;
    display: flex;
    justify-content: center;
  }

  .build-box {
    margin-top: 27px;
    width: 80%;
    min-height: 398px;
    max-height: 100%;
    background: linear-gradient(137deg, rgba(255, 170, 45, 1) 0%, rgba(255, 113, 20, 1) 100%);
    border-radius: 8px;
    margin-left: 10%;

    .build-list {
      width: 100%;
      flex-wrap: wrap;
      display: flex;
      padding-top: 19px;
      padding-bottom: 21px;

      .build-card {
        height: 157px;
        width: 42%;
        margin-left: 5%;
        background-color: white;
        border-radius: 8px;
        margin-bottom: 12px;
        position: relative;

        .build-img {
          width: 100%;
          height: 104px;
          background-size: cover;
          border-top-right-radius: 8px;
          border-top-left-radius: 8px;
        }

        .feel-label {
          position: absolute;
          top: 0;
          right: 0;
          border-top-right-radius: 8px;
          font-size: 10px;
          color: white;
          width: 45px;
          height: 17px;
          line-height: 17px;
          text-align: center;
          background-size: 45px 17px;
        }

        .build-name {
          color: #333333;
          font-size: 14px;
          margin-left: 8px;
          margin-top: 8px;
        }

        .build-price {
          color: #ea4d2e;
          font-size: 10px;
          margin-left: 8px;
          margin-top: 4px;
        }
      }
    }

    .check-more {
      display: flex;
      justify-content: center;
      height: 30px;

      a {
        font-size: 12px;
        color: white;
      }

      img {
        width: 12px;
        height: 12px;
        margin-left: 6px;
        margin-top: 2px;
      }
    }
  }

  .notice-bottom {
    margin-top: 13px;
    width: 80%;
    margin-left: 10%;

    p {
      color: white;
      font-size: 12px;
      line-height: 20px;
    }
  }

  .join-btn {
    width: 84%;
    margin-left: 8%;
    height: 50px;
    background-size: 320px 55px;
    margin-top: 16px;
    font-size: 15px;
    color: white;
    line-height: 50px;
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>
