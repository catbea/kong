<template>
  <div class="discover-edit-page">
    <div class="discover-detail-container">
      <h5 class="discover-title">{{info&&info.title}}</h5>
      <div class="discover-view-info">
        <p class="view-count">
          浏览量:
          <span>912</span>
        </p>
        <p class="view-source">
          分享源自
          <span>AW大师写一写</span>
        </p>
      </div>
      <div class="discover-detail-content">
        <edit-viewpoint v-model="viewpointText"/>
        <div class="edit-box" v-for="(paragraph,index) in renderDom" :key="index">
          <edit-paragraph :info="paragraph" @delParagraph="delParagraphHandler" @repealParagraph="repealParagraphHandler"/>
          <edit-houses v-if="index===parseInt(renderDom.length/2)" v-model="inlayHouse" :count="1" @click="singleAddClickHandler" @delete="inlayHouseDelHandler"/>
        </div>
      </div>
    </div>
    <div class="recommend-house-container">
      <title-bar :conf="{title:'推荐房源'}"/>
      <div class="recommend-house-box">
        <edit-houses v-model="recommendList" :count="3" :reminder="true" @click="multiAddClickHandler" @delete="multiHouseDelHandler"/>
      </div>
    </div>
    <!-- 删除段落操作弹窗 -->
    <van-actionsheet v-model="delActionsheetShow" :actions="delActions" cancel-text="取消" @select="onDelSelect"/>
    <!-- 浮动栏 -->
    <div class="fixed-bar">
      <div class="left-operation">
        <div class @click="helpClickHandler">
          <i class="icon iconfont icon-write_help"></i>
          帮助
        </div>
        <div class @click="resetClickHandler">
          <i class="icon iconfont icon-write_reset"></i>
          重置
        </div>
      </div>
      <div class="right-operation">
        <div class="preview-btn" @click="previewClickHandler">预览</div>
        <div class="save-btn" @click="saveClickHandler">保存</div>
      </div>
    </div>
    <single-select-box v-model="singleShow" :maxSelect="countCompute" :selected="selectedCompute" @submit="selectSubmitHandler"/>
  </div>
</template>
<script>
import EditParagraph from 'COMP/Discover/edit/editParagraph'
import EditViewpoint from 'COMP/Discover/edit/editViewpoint'
import EditHouses from 'COMP/Discover/edit/editHouses'
import TitleBar from 'COMP/TitleBar'
import SingleSelectBox from 'COMP/Discover/edit/singleSelectBox'

import discoverService from 'SERVICE/discoverService'
import userService from 'SERVICE/userService'
import cpInformationService from 'SERVICE/cpInformationService'
export default {
  components: {
    EditParagraph,
    EditViewpoint,
    EditHouses,
    TitleBar,
    SingleSelectBox
  },
  data: () => ({
    id: '',
    city: '', // 所属地
    agentId: '', // 经纪人id
    info: null,
    agentInfo: null, // 经纪人信息
    currentDelDom: null, // 当前要处理的dom(点击x的dom)
    delActionsheetShow: false,
    delActions: [{ type: 1, name: '删除此后内容' }, { type: 2, name: '删除选中' }],
    renderDom: [],
    viewpointEditShow: false,
    viewpointText: '',
    inlayHouse: [], // 混入文章中的楼盘信息
    recommendList: [], // 文末的推荐文章
    singleShow: false,
    multiShow: false,
    target: null
  }),
  created() {
    this.id = this.$route.params.id
    this.city = this.$route.params.city
    this.agentId = this.$route.query.agentId
    this.enterpriseId = this.$route.query.enterpriseId
    this.getDetail()
    this.getMyHouseRecommend()
  },
  methods: {
    // 获取文章信息
    async getDetail() {
      const res = await discoverService.getDiscoverDetail(this.id)
      this.info = res
      // 创建虚拟dom解析html结构
      let virtualDom = document.createElement('div')
      virtualDom.innerHTML = this.info.content
      for (let dom of virtualDom.children) {
        this.renderDom.push({
          text: dom.innerHTML,
          status: 'edit'
        })
      }
    },
    // 获取我的楼盘推荐
    async getMyHouseRecommend() {
      const payload = {
        orderBy: 3, // 人气最旺
        current: 1,
        size: 1
      }
      const res = await userService.getMyHouses(payload)
      this.recommendList = res.records
    },
    // 段落删除弹窗-选择删除当前或删除以下所有
    delParagraphHandler(e) {
      this.currentDelDom = e.dom
      this.delActionsheetShow = true
    },
    // 删除段落处理
    onDelSelect(e) {
      if (e.type === 1) {
        // 删除以下所有
        let lock = false
        let toDelArr = []
        for (let dom of this.renderDom) {
          if (this.currentDelDom === dom) lock = true
          if (lock) dom.status = 'del'
        }
      } else {
        // 删除当前
        this.currentDelDom.status = 'del'
      }
      this.delActionsheetShow = false
    },
    // 恢复段落处理
    repealParagraphHandler(e) {
      e.dom.status = 'edit'
    },
    singleAddClickHandler() {
      this.target = 'inlayHouse'
      this.singleShow = true
    },
    multiAddClickHandler() {
      this.target = 'multiHouse'
      this.singleShow = true
    },
    // 底部栏帮助按钮点击
    helpClickHandler() {
      this.$router.push('/discover/edit-help')
    },
    // 底部栏重置按钮点击
    resetClickHandler() {
      this.$router.go(0)
    },
    // 底部栏预览按钮点击
    async previewClickHandler() {},
    // 底部栏保存按钮点击
    async saveClickHandler() {
      let payload = {
        viewpoint: this.viewpointText,
        inlayHouse: this.inlayHouse.length > 0 ? this.inlayHouse[0].linkerId : '',
        recommendHouse: []
      }

      for (let temp of this.recommendList) {
        payload.recommendHouse.push(temp.linkerId)
      }
      let content = ''
      for (let temp of this.renderDom) {
        if(temp.status === 'edit') content += `<p>${temp.text}</p>` 
      }
      console.log(JSON.stringify(payload))
      console.log(content);
      const res = await cpInformationService.editArticleForAgent(this.id, JSON.stringify(payload), content)
      console.log(res);
      
    },
    selectSubmitHandler(e) {
      if (this.target === 'inlayHouse') {
        this.inlayHouse = e
      } else {
        this.recommendList = e
      }
    },
    //  内嵌楼盘删除
    inlayHouseDelHandler() {
      this.inlayHouse = []
    },
    multiHouseDelHandler(item) {
      console.log('delete', item)
    }
  },
  computed: {
    countCompute() {
      if (this.target === 'inlayHouse') {
        return 1
      } else {
        return 3
      }
    },
    selectedCompute() {
      if (this.target === 'inlayHouse') {
        return this.inlayHouse
      } else if (this.target === 'multiHouse') {
        return this.recommendList
      } else {
        return null
      }
    }
  }
}
</script>
<style lang="less">
.discover-edit-page {
  background: #f7f9fa;
  > .discover-detail-container {
    background: #fff;
    padding-bottom: 10px;
    margin-bottom: 5px;
    > .discover-title {
      padding: 10px 15px;
      font-size: 22px;
      color: #333333;
      font-weight: 600;
      line-height: 1.3;
    }
    > .discover-view-info {
      margin: 0 15px;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      font-weight: 400;
      color: #969ea8;
      > .view-source {
        > span {
          color: #445166;
        }
      }
    }
    > .discover-detail-content {
      padding: 15px;
      font-size: 16px !important;
      color: #333333 !important;
      font-weight: 400 !important;
      line-height: 28px !important;
      > .edit-houses-container {
        height: 140px;
        background: rgba(150, 158, 168, 0.08);
        border: 1px dashed #969ea8;
        margin-bottom: 5px;
      }
    }
  }
  > .recommend-house-container {
    background: #fff;
    margin-bottom: 80px;
    > .recommend-house-box {
      margin: 0 15px;
    }
  }
  > .fixed-bar {
    position: fixed;
    display: flex;
    text-align: center;
    background: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    > .left-operation {
      flex: 1;
      font-size: 12px;
      display: flex;
      > div {
        flex: 1;
        transform: scale(0.8);
        > i {
          font-size: 30px;
          display: block;
        }
      }
    }
    > .right-operation {
      flex: 1;
      display: flex;
      font-size: 14px;
      > div {
        flex: 1;
        width: 88px;
        height: 44px;
        border-radius: 6px;
        line-height: 44px;
        margin: 3px 5px;
        color: #fff;
        &.preview-btn {
          background: #404457;
        }
        &.save-btn {
          background: #007ae6;
        }
      }
    }
  }
}
</style>
