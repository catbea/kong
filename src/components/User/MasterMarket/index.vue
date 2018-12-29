<template>
  <div class="mymarket-page" v-if="changeBoxShow">
    <div class="master-market-box">
      <p class="master-recommend">大师推荐</p>
      <div class="vanSWipe-box">
       <!-- <div class="bg_img hint" v-if="!swipeShow" :style="{backgroundImage:'url('+hintImg+')'}">
        <span>您还没有任何推荐楼盘</span> 
        </div> -->
        <van-swipe
          :touchable="true"
          :loop="true"
          :autoplay="3000"
        >
          <van-swipe-item
            v-for="(item,index) in limitList"
            :key="item.linkerId"
          >
            <div class="master-box" v-show='!item.masterRecommand==0' @click='skipDetail(item.linkerId)'>
              <p
                class="bg_img icon-cancel"
                :style="{backgroundImage:'url('+img+')'}"
                @click.stop="closeHandle(item.linkerId,index)"
              ></p>
              <div
                :class="{dim:item.masterRecommand==1}"
                class="bg_img master-item"
                :style="{backgroundImage:'url('+item.linkerUrl+')'}"
              >
              </div>
              <ol>
                <li><span v-show="item.masterRecommand==1">它</span><span v-show="item.masterRecommand==2">{{item.linkerName}}</span></li>
                <li>{{item.linkerTags | linkerTags}}</li>
                <li>{{item.city}} <span v-show="item.masterRecommand==2">{{item.county}}{{item.openTimes}}人开通{{item.price}}{{item.priceUnit}}</span> <span v-show="item.masterRecommand==1">{{item.scanTimes}} 人关注了它</span></li>
              </ol>
            </div>
          </van-swipe-item>
        
        </van-swipe>
      </div>
    </div>
  </div>
</template>
<script>
import userService from 'SERVICE/userService'
export default {
  created() {
    this.filterHandle()
  },
  mounted() {},
  props: {
    swipeList: {
      type: Array
    },
    boxShow: { type: Boolean }
  },
  data() {
    return {
      // changeBoxShow:true,
      changeshow: false,
      masterSave: null,
      img: require('IMG/user/Combined Shape@2x.png'),
      hintImg: require('IMG/dev/timg.jpg'),
      masterList: [],
      commonList: []
    }
  },
  methods: {
    skipDetail(n) {
      //点击图片跳转到改楼盘详情
      this.$router.push({ name: 'market-detail', params: { id: n } })
    },
    async closeHandle(linkerId, index) {
      //图片列表删除某个，楼盘列表重置推荐
      await userService.changeMarketData(linkerId, 20, 0)
      this.limitList.splice(index, 1)
      this.swipeJudge()
      this.$emit('noRecommend', linkerId)
      this.$toast({
            duration:800,
            message:'已取消推荐',
          })
    },
    filterHandle() {
      this.masterList = this.limitList.filter(item => {
        return item.masterRecommand == 1
      })
      this.commonList = this.limitList.filter(item => {
        return item.masterRecommand == 2
      })
    },
    swipeJudge() {
      if (this.limitList.length == 0) {
        this.changeBoxShow = false
      } else {
        this.changeBoxShow = true
      }
    }
  },
  computed: {
    changeBoxShow: {
      get: function() {
        if (this.swipeList.length == 0) {
          return false
        } else {
          return true
        }
      },
      set: function() {}
    },
    limitList() {
      if (this.swipeList.length > 5) {
        this.$dialog.confirm({
          title: '当前推荐楼盘数量达到上限',
          message: '继续推荐将取消最初推荐楼盘是否确定推荐当前楼盘'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        });
        return this.swipeList.slice(0, 5)
      } else {
        return this.swipeList
      }
    }
  }
}
</script>
<style lang="less">
.distributor{
  width: 280px;
  > .van-dialog__content {
    > .van-dialog__message {
      text-align: center;
    }
  }
  > .van-dialog__footer {
    display: flex;
    justify-content: center;
    > .van-dialog__confirm {
      border-radius: 5px;
      height: 40px;
      width: 142px;
      line-height: 40px;
      color: #ffffff;
      background: #007ae6;
      margin-bottom: 12px;
    }
  }
}
.mymarket-page {
  .master-market-box {
    display: flex;
    flex-direction: column;
    width: 343px;
    margin-left: 16px;
    .vanSWipe-box {
      width: 343px;
      height: 194px;
      .hint {
        width: 100%;
        height: 100%;
        font-size: 15px;
        position: relative;
        opacity: 0.5;
        span {
          position: absolute;
          color: #ffffff;
          top: 50%;
          left: 50%;
          margin-left: -70px;
        }
      }
      .dim {
        filter: blur(6px);
      }
      .icon-cancel {
        position: absolute;
        right: 7px;
        top: 8px;
        width: 17px;
        height: 17px;
        margin: 0;
        z-index: 11;
      }
    }
    .van-swipe {
      border-radius: 10px;
    }
    .master-recommend {
      margin: 20px 0 20px 0;
      font-size: 20px;
      
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
    .master-box {
      position: relative;
      .master-item {
        width: 343px;
        height: 193px;
      }
      ol {
        position: absolute;
        left: 19px;
        bottom: 29px;
        li:nth-child(1) {
          font-size: 16px;
          
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
        }
        li:nth-child(2) {
          width: 300px;
          margin: 3px 0 4px 0;
          font-size: 24px;
          
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 33px;
        }
        li:nth-child(3) {
          font-size: 14px;
          
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
          span {
            font-size: 12px;
            
            font-weight: 400;
            color: #ffffff;
            line-height: 15px;
          }
        }
      }
    }
    .img-item {
      width: 343px;
      height: 193px;
      border-radius: 10px;
      ul {
        position: absolute;
        left: 19px;
        bottom: 29px;
        li:nth-child(1) {
          font-size: 16px;
          
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
        }
        li:nth-child(2) {
          width: 300px;
          font-size: 24px;
          
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 33px;
          margin-bottom: 4px;
        }
        li:nth-child(3) {
          font-size: 14px;
          
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
          span {
            font-size: 12px;
            
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 15px;
          }
        }
      }
    }
  }
}
</style>
