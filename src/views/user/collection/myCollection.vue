<template>
  <div class="collection-page">
    <div class="tab-container">
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6">
        <van-tab title="收藏楼盘">
          <div class="dynamicsInfo-list">

            <div class="dynamicsInfo-list-top">
              <span class="dynamicsInfo-list-left">
                <img :src="backIcon" class="mark-icon">
              </span>
              <span class="dynamicsInfo-list-right">
                <p class="list-right-title">万科臻湾汇

                </p>
                <p class="list-right-time">南山 深圳湾 &nbsp; 120000元/㎡</p>
                <p class="list-right-label">
                  <span class="right-label right-label-red">热销中</span>
                  <span class="right-label right-label-gray">地铁房</span>
                </p>
                <p class="list-right-price">
                  <span class="right-price right-price-open">143次开通 &nbsp; 11/22到期</span>
                  <!-- <span class="lab-right right-price-lab-ok">收藏</span> -->
                  <span class="lab-right right-price-lab">取消收藏</span>
                </p>
              </span>
            </div>

            <div class="dynamicsInfo-list-commission">
              <span class="list-commission-word">佣</span>
              1.056%+50000元/套
            </div>

          </div>

        </van-tab>
        <van-tab title="收藏文章">
          <div class="collection-top">
            <collection-null></collection-null>
            <collection-article></collection-article>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import collectionArticle from 'COMP/User/collection/collectionArticle'
import collectionNull from 'COMP/User/collection/collectionNull'
export default {
  components: {
    collectionArticle,
    collectionNull
  },
  data () {
    return {
      backIcon: require('IMG/user/usercard@2x.png'),
      totalTitle: '楼盘数量',
      totalNum: '90',
      cardTitle: '楼盘分享',
      cardNum: '0',
      propertiesTitle: '楼盘访客',
      propertiesNum: "190",
      articleTitle: '平均停留(S)',
      articleNum: '124',

    }
  },
}
</script>
<style lang="less">
.collection-page {
  .tab-container {
    .collection-top {
      margin-top: 16px;
    }
  }
}
.dynamicsInfo-list {
  margin: 0 15px;

  border-bottom: 1px solid #e6e6e6;
  padding: 15px 0 16px 0;
  > .dynamicsInfo-list-top {
    display: flex;
    margin-bottom: 4px;
    > .dynamicsInfo-list-left {
      height: 90px;
      position: relative;
      border-radius: 6px;
      > .mark-icon {
        width: 120px;
        height: 90px;
        background: rgba(255, 255, 255, 1);
        border-radius: 6px;
      }
    }
    > .dynamicsInfo-list-right {
      border-radius: 6px;
      margin-left: 12px;

      > .list-right-title {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        > .left-title-right {
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 122, 230, 1);
          line-height: 27px;
          border-radius: 12px;
          border: 1px solid;
          width: 46px;
          height: 24px;
          right: 15px;
          position: absolute;
          text-align: center;
        }
      }
      > .list-right-time {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      > .list-right-label {
        line-height: 17px;
        > .right-label {
          font-size: 10px;
          font-weight: 400;
          line-height: 10px;
          padding: 1px 5px;
          border-radius: 3px;
          margin-right: 4px;
        }
        > .right-label-red {
          background: #007ae6;
          color: rgba(255, 255, 255, 1);
        }
        > .right-label-gray {
          background: rgba(143, 159, 177, 0.15);
        }
      }
      > .list-right-price {
        font-size: 15px;
        font-weight: 600;
        color: rgba(234, 77, 46, 1);
        line-height: 39px;
        > .lab-right{
           font-size: 10px;
          font-weight: 400;
          line-height: 20px;
          width: 60px;
          height: 20px;
          border-radius: 16px;
          border: 1px solid;
          right: 15px;
          position: absolute;
          text-align: center;
              margin-top: 5px;
        }
        > .right-price-lab-ok {
          color: rgba(0, 122, 230, 1);
        }
        > .right-price-lab {
          color: rgba(175, 178, 195, 1);
        }
        > .right-price{
          
        }

        > .right-price-open {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 11px;
          // padding-left: 12px;
        }
      }
    }
  }

  > .dynamicsInfo-list-commission {
    height: 31px;
    background: rgba(247, 249, 250, 1);
    border-radius: 4px;
    font-size: 15px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    padding-left: 11px;
    > .list-commission-word {
      border-radius: 2px;
      border: 1px solid;
      font-size: 10px;
      font-weight: 400;
      color: rgba(255, 85, 51, 1);
      line-height: 14px;
      padding: 0 3px;
    }
  }
}
</style>
