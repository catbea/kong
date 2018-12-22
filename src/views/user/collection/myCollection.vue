<template>
  <div class="collection-page">
    <div class="tab-container">
      <van-tabs color="#007AE6" :line-width="15" :swipe-threshold="6">
        <van-tab title="收藏楼盘">
          <collection-null
            v-show="listEmpty == true"
            :collectionTips="collectionTips"
            :collectionRemar="collectionRemar"
            :collectionLike="collectionLike"
            :collectionIcon="collectionIcon"
          ></collection-null>
          <div class="dynamicsInfo-list" v-for="(item,key) in dynamicsList" :key="key">
            <div class="dynamicsInfo-list-top">
              <!-- rectangIcon -->
              <span class="dynamicsInfo-list-left" @click="gomarketDetail(item)">
                <!-- <div class="dynamicsInfo-back-img"  :style="url(' rectangIcon')"></div> -->
                <div
                  @click="gomarketDetail(item)"
                  class="dynamicsInfo-list-left-bg_img"
                  v-show="item.sale != '' "
                  :style="{backgroundImage:'url('+labelImg+')'}"
                >{{item.sale}}</div>
                <img :src="item.linkerUrl" class="mark-icon">
                <img :src="ovalIcon" class="oval-icon">
              </span>
              <span class="dynamicsInfo-list-right">
                <p @click="gomarketDetail(item)" class="list-right-title">{{item.linkerName}}</p>
                <p
                  @click="gomarketDetail(item)"
                  class="list-right-time"
                >{{item.city}} {{item.county}} &nbsp; {{item.price}}{{item.priceUnit}}</p>
                <p class="list-right-label" @click="gomarketDetail(item)">
                  <!-- 销售状态（楼盘）: 0热销中、1即将发售、3售罄 -->
                  <!-- <span class="right-label right-label-red" v-show="item.saleStatus !='' ">{{saleStatus[item.saleStatus]}}</span>
                  <button
                    class="right-label right-label-gray"
                    v-for="(its,key) in item.linkerTags"
                    :key="key"
                  >{{its}}</button>-->
                  <tag-group :arr="item.linkerTags ? item.linkerTags.slice(0,3) : []"></tag-group>
                </p>
                <p class="list-right-price">
                  <span class="right-price right-price-open" @click="gomarketDetail(item)">
                    {{item.openTimes}}次开通 &nbsp;
                    <span
                      v-show="item.subscribeInvalidTime !=''"
                    >{{ parseInt(item.subscribeInvalidTime) |dateTimeFormatter(0,'/') }}到期</span>
                  </span>
                  <button
                    type="checkbox"
                    class="right-price-lab"
                    @click="godynamics(item,key)"
                    id="rightno"
                    v-bind:style="{'color':item.status==1?'#AFB2C3':'#007AE6'}"
                  >{{item.status == 1 ? '取消收藏':'收藏'}}</button>
                  <!-- <button
                    class="right-price-lab"
                    
                    @click="godynamics(item)"
                  >取消收藏</button>-->
                </p>
              </span>
            </div>
            <div class="dynamicsInfo-list-commission" v-show="item.divisionRules != '' ">
              <span class="list-commission-word">佣</span>
              {{item.divisionRules | textOver}}
            </div>
          </div>
        </van-tab>
        <van-tab title="收藏文章">
          <div class="collection-top">
            <collection-null
              v-show="articleEmpty == true"
              :collectionTips="ArticleTips"
              :collectionRemar="ArticleRemar"
              :collectionLike="collectionLike"
              :collectionIcon="ArticleIcon"
            ></collection-null>
            <collection-article :data="collectionList" info="gocollection" @myclick="gocollection"></collection-article>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup/'
import collectionArticle from 'COMP/User/collection/collectionArticle'
import collectionNull from 'COMP/User/collection/collectionNull'
import userService from 'SERVICE/userService'
export default {
  components: {
    collectionArticle,
    collectionNull,
    TagGroup
  },
  data() {
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
      statusTpye: 1,
      deleteFlag: 0,
      labelImg: require('IMG/marketDetail/discount@2x.png'),
      listEmpty: false,
      articleEmpty: false,
      tags: []
    }
  },
  created() {
    this.getdynamicsInfo()
    this.getcollectionList()
  },
  methods: {
    async getdynamicsInfo() {
      let saleStatusStr = ''
      const res = await userService.getqueryLinkerList()
      this.dynamicsList = res.list.records
      this.listEmpty = res.listEmpty

      for (let i = 0; i < this.dynamicsList.length; i++) {
        if (this.dynamicsList[i].saleStatus === 0) {
          this.dynamicsList[i].linkerTags.unshift('热销中')
        }
        if (this.dynamicsList[i].saleStatus === 1) {
          this.dynamicsList[i].linkerTags.unshift('即将发售')
        }
        if (this.dynamicsList[i].saleStatus === 3) {
          this.dynamicsList[i].linkerTags.unshift('售罄')
        }
      }

    },
    async getcollectionList() {
      const res = await userService.getqueryInfoList()
      this.collectionList = res.list.records
      this.articleEmpty = res.listEmpty
    },
    //楼盘详情
    gomarketDetail(item) {
      this.$router.push({ name: 'market-detail', params: { id: item.linkerId } })
    },
    //收藏樓盤
    async godynamics(item, index) {
      //  收藏状态：0-未收藏；1-已收藏
      let tempDynamicsList = this.dynamicsList
      if (tempDynamicsList[index].status == 1) {
        const result = await userService.getlinkerDynamics(item.linkerId, 0)
        this.dynamicsList[index].status = 0
      } else if (tempDynamicsList[index].status == 0) {
        this.dynamicsList[index].status = 1
        const result = await userService.getlinkerDynamics(item.linkerId, 1)
      }
    },
    //收藏文章
    async gocollection(cons) {
      if (cons.type === 'goCollection') {
        let index = cons.index
        if (this.collectionList[index].deleteType == 1) {
          this.collectionList[index].deleteType = 0
          await userService.getlinkerCollection(cons.infoId, 0)
        } else {
          this.collectionList[index].deleteType = 1
          await userService.getlinkerCollection(cons.infoId, 1)
        }
      } else if (cons.type === 'goCollectionInfo') {
        this.$router.push({ name: 'discover-detail', params: { id: cons.id, city: cons.city } })
      }
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
      .dynamicsInfo-list-left-bg_img {
        text-align: center;
        width: 36px;
        height: 22px;
        font-size: 11px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        background-size: cover;
        position: absolute;
        top: 4px;
        left: -4px;
      }
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
        margin-top: 5px;
        // line-height: 27px;
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
          border: 0;
          height: 20px;
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
          background: #ffffff;
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
          > .bor {
            color: rgba(0, 122, 230, 1);
            border-radius: 16px;
            border: 1px solid;
          }
          > .bors {
            color: rgba(175, 178, 195, 1);
            border-radius: 16px;
            border: 1px solid;
          }
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
