<template>
  <div class="allDynamics-page">
    <!-- <Tips></Tips> -->
    <div class="tab-container">
      <van-tabs  color="#007AE6" :line-width="15" :swipe-threshold="6">
        <van-tab title="全部">
          <!-- 动态全部-->
          <div class="allDynamics-container">
            <shadow-box>
              <div slot="container">
                <dynamics-data :totalTitle="totalTitle" :totalNum="totalNum" :cardTitle="cardTitle" :cardNum="cardNum" :propertiesTitle="propertiesTitle" :propertiesNum="propertiesNum" :articleTitle="articleTitle" :articleNum="articleNum"></dynamics-data>
              </div>
            </shadow-box>
            <dynamics-list></dynamics-list>
          </div>
        </van-tab>
        <van-tab title="名片">
          <!-- 名片 -->
          <div class="allDynamics-container">
            <dynamics-card></dynamics-card>
          </div>
        </van-tab>
        <van-tab title="楼盘">
          <!-- 动态楼盘 -->
          <div class="allDynamics-container">
            <properties  :info="item"  @click="itemProperties"></properties>
          </div>
        </van-tab>
        <van-tab title="文章">
          <!-- 动态文章 -->
          <div class="allDynamics-container">
            <dynamics-article></dynamics-article>
          </div>
        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>
<script>
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import ShadowBox from 'COMP/ShadowBox'
import DynamicsList from 'COMP/Dynamics/DynamicsList'
import Properties from 'COMP/Dynamics/Properties'
import DynamicsArticle from 'COMP/Dynamics/DynamicsArticle'
import DynamicsCard from 'COMP/Dynamics/DynamicsCard'
import Tips from 'COMP/Dynamics/Tips'
export default {
  components: {
    DynamicsData,
    DynamicsList,
    Properties,
    DynamicsArticle,
    ShadowBox,
    DynamicsCard,
    Tips
  },

  data() {
    return {
      totalTitle: '总浏览数',
      totalNum: '90',
      cardTitle: '名片浏览',
      cardNum: '0',
      propertiesTitle: '楼盘浏览',
      propertiesNum: '190',
      articleTitle: '文章浏览',
      articleNum: '124',
      item:[],
    }
  },
  methods: {
    itemProperties(item) {

      //跳转到动态详情
    //   this.$router.push('/dynamics/dynamicsInfo')
      this.$dialog
        .confirm({
          title: '暂未开通楼盘',
          message: '请开通后查看楼盘详细动态',
          confirmButtonText: '去开通'
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>
<style lang="less">
.allDynamics-page {
  background: #ffffff;
  margin: 0 0 20px 0;
  > .tab-container {
    // position: fixed;
    width: 100%;
    .allDynamics-container {
      margin-top: 20px;
    }
  }
}
</style>
