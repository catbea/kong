<template>
  <div class="collection-page">
    <div class="tab-container">
      <van-tabs
        color="#007AE6"
        :line-width="15"
        :swipe-threshold="6"
      >
        <van-tab title="收藏楼盘">
          <collection-null
            v-show="dynamicsList.lenght == 0"
            :collectionTips="collectionTips"
            :collectionRemar="collectionRemar"
            :collectionLike="collectionLike"
            :collectionIcon="collectionIcon"
          ></collection-null>

          <div
            class="dynamicsInfo-list"
            v-for="(item,key) in dynamicsList"
            :key="key"
          >

            <div class="dynamicsInfo-list-top">
              <!-- rectangIcon -->
              <span class="dynamicsInfo-list-left">
                <!-- <div class="dynamicsInfo-back-img"  :style="url(' rectangIcon')"></div> -->

                <img
                  :src="item.linkerUrl"
                  class="mark-icon"
                >
                <img
                  :src="ovalIcon"
                  class="oval-icon"
                >

              </span>
              <span class="dynamicsInfo-list-right">
                <p class="list-right-title">{{item.linkerName}}

                </p>
                <p class="list-right-time">{{item.city}} {{item.county}} &nbsp; {{item.price}}{{item.priceUnit}}</p>
                <p class="list-right-label">
                  <!-- 销售状态（楼盘）: 0热销中、1即将发售、3售罄 -->

                  <span class="right-label right-label-red">{{saleStatus[item.saleStatus]}}</span>
                  <span
                    class="right-label right-label-gray"
                    v-for="(its,key) in item.linkerTags"
                    :key="key"
                  >{{its}}</span>
                </p>
                <p class="list-right-price">
                  <span class="right-price right-price-open">{{item.openTimes}}次开通 &nbsp; <span v-show="item.subscribeInvalidTime !=''">{{ parseInt(item.subscribeInvalidTime) |dateTimeFormatter(0,'/') }}到期</span></span>
                  <span
                    class=" right-price-lab-ok"
                    id="rightok"
                    v-show='item.status == 0'
                    @click="godynamics(item)"
                  >收藏</span>
                  <span
                    class="right-price-lab"
                    v-show='item.status == 1'
                    id="rightno"
                    @click="godynamics(item)"
                  >取消收藏</span>
                </p>
              </span>
            </div>

            <div
              class="dynamicsInfo-list-commission"
              v-show="item.divisionRules != '' "
            >
              <span class="list-commission-word">佣</span>
              {{item.divisionRules}}
            </div>

          </div>

        </van-tab>
        <van-tab title="收藏文章">
          <div class="collection-top">
            <collection-null
              v-show="collectionList.lenght == 0"
              :collectionTips="ArticleTips"
              :collectionRemar="ArticleRemar"
              :collectionLike="collectionLike"
              :collectionIcon="ArticleIcon"
            ></collection-null>
            <collection-article
              :data="collectionList"
              info="gocollection"
              @myclick="gocollection"
            ></collection-article>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import collectionArticle from 'COMP/User/collection/collectionArticle'
import collectionNull from 'COMP/User/collection/collectionNull'
import userService from 'SERVICE/userService'
export default {
  components: {
    collectionArticle,
    collectionNull
  },
  data () {
    return {
      dynamicsList: [],
      collectionList: [],
      ovalIcon: require('IMG/marketDetail/Oval@2x.png'),
      rectangIcon: require('IMG/user/collection/Rectanglebeck@2x.png'),
      saleStatus: { '1': '热销中', '0': '即将发售', '2': '售罄' },
      backIcon: require('IMG/user/usercard@2x.png'),
      totalTitle: '楼盘数量',
      totalNum: '90',
      cardTitle: '楼盘分享',
      cardNum: '0',
      propertiesTitle: '楼盘访客',
      propertiesNum: '190',
      articleTitle: '平均停留(S)',
      articleNum: '124',
      collectionIcon: require('IMG/user/collection/Group@2x.png'),
      collectionTips: '您还没有收藏任何楼盘',
      collectionRemar: '快去看看我们为您准备的推荐楼盘吧',
      collectionLike: '猜你喜欢',

      ArticleTips: '您还没有收藏任何文章',
      ArticleRemar: '快去看看我们为您准备的推荐文章吧',
      ArticleIcon: require('IMG/user/collection/Article@2x.png'),
      statusTpye: 0,
      deleteFlag: 0,

    }
  },
  created () {
    this.getdynamicsInfo()
    this.getcollectionList()
  },
  methods: {

    async getdynamicsInfo () {
      const res = await userService.getqueryLinkerList()
      this.dynamicsList = res.records

    },
    async getcollectionList () {
      const res = await userService.getqueryInfoList()
      this.collectionList = res.records
    },
    //收藏樓盤
    async godynamics (item) {
      debugger
      if (this.statusTpye != '') {
        if (this.statusTpye == 1) {
          this.statusTpye = 0
        } else if (this.statusTpye == 0) {
          this.statusTpye = 1
        }
      } else {
        if (this.statusTpye != '') {
          if (item.status == 1) {
            this.statusTpye = 0
          } else if (item.status == 0) {
            this.statusTpye = 1
          }
        }
      }
      if (item.status == 1 || this.statusTpye == 1) {
        this.statusTpye = 0
      } else if (item.status == 0 || this.statusTpye == 0) {
        this.statusTpye = 1
      }
      await userService.getlinkerDynamics(item.linkerId, this.statusTpye)
      debugger
      let rightok = document.getElementById("rightok")
      let rightno = document.getElementById("rightno")
      if (this.statusTpye == 1) {
        rightok.style.display = "none"
        rightno.style.display = "block"
      } else if (this.statusTpye == 0) {
        rightno.style.display = "none"
        rightok.style.display = "block"


      }

    },
    //收藏文章
    async gocollection (cons) {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx", cons)

      console.log(this.deleteFlag)
      console.log(cons.deleteType)
      if (cons.deleteType == 1 || this.deleteFlag == 1) {
        this.deleteFlag = 0
      } else if (cons.deleteType == 0 || this.deleteFlag == 0) {
        this.deleteFlag = 1
      }
      // <!-- 收藏状态：1-取消收藏，0-收藏 -->

      debugger
      let collok = cons.divIdOk
      let collno = cons.divIdNo
      collok = document.getElementById(collok)
      collno = document.getElementById(collno)

      if (this.deleteFlag == 1) {
        collok.style.display = "block"
        collno.style.display = "none"
        this.deleteFlag = 0
      } else if (this.deleteFlag == 0) {
        collok.style.display = "none"
        collno.style.display = "block"

        this.deleteFlag = 1
      }
      await userService.getlinkerCollection(cons.infoId, this.deleteFlag)
    }
  }
}
</script>
<style lang="less">
.collection-page {
  background: #ffffff;
  .tab-container {
    .collection-top {
      margin-top: 16px;
    }
  }
}
.dynamicsInfo-list {
  margin: 5px 15px;

  border-bottom: 1px solid #e6e6e6;
  padding: 15px 0 16px 0;
  > .dynamicsInfo-list-top {
    display: flex;
    margin-bottom: 4px;
    position: relative;
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
      > .oval-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        position: absolute;
        left: 45px;
        top: 30px;
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
        line-height: 27px;
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
        margin-bottom: 16px;
        > .right-price-lab-ok {
          color: rgba(0, 122, 230, 1);
          font-size: 10px;
          font-weight: 400;
          line-height: 20px;
          width: 60px;
          height: 20px;
          border-radius: 16px;
          border: 1px solid;
          right: 0;
          position: absolute;
          text-align: center;
          margin-top: 5px;
        }
        > .right-price-lab {
          color: rgba(175, 178, 195, 1);
          font-size: 10px;
          font-weight: 400;
          line-height: 20px;
          width: 60px;
          height: 20px;
          border-radius: 16px;
          border: 1px solid;
          right: 0;
          position: absolute;
          text-align: center;
          margin-top: 5px;
        }
        > .right-price {
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
