<template>
  <div class="discover-edit-page">
    <div class="discover-detail-container">
      <h5 class="discover-title">{{info&&info.title}}</h5>
      <div class="discover-view-info">
        <p class="view-count">
          浏览量:
          <span>{{info&&info.scanNum}}</span>
        </p>
        <p class="view-source">
          分享源自
          <span>AW大师写一写</span>
        </p>
      </div>
      <div class="discover-detail-content">
        <edit-viewpoint v-model="viewpointText" :status="previewFlag?'view':'edit'" :class="{viewRedactStyle:previewFlag,viewPreStyle:!previewFlag}"/>
        <div class="edit-box" v-for="(paragraph,index) in renderDom" :key="index">
          <edit-paragraph :info="paragraph" @delParagraph="delParagraphHandler" @repealParagraph="repealParagraphHandler" :preview="previewFlag"/>
          <edit-houses v-if="index===parseInt(renderDom.length/2-1)" v-model="inlayHouse" :preview="previewFlag" :count="1" @click="singleAddClickHandler" @delete="inlayHouseDelHandler"/>
        </div>
        <div class="disclaimer-box" v-if="previewFlag">
          免责声明：文章信息均来源网络，本平台对转载、分享的内容、陈述、观点判断保持中立，不对所包含内容的准确性、可靠性或完善性提供任何明示或暗示的保证，仅供读者参考，本公众平台将不承担任何责任。 。 如有问题请点击
          <span>举报反馈</span>
        </div>
      </div>
    </div>
    <div class="recommend-house-container" v-if="!(previewFlag&&recommendList.length===0)">
      <title-bar :conf="{title:'推荐房源'}"/>
      <div class="recommend-house-box">
        <edit-houses v-model="recommendList" :count="3" :reminder="true" @click="multiAddClickHandler" :preview="previewFlag" @delete="multiHouseDelHandler"/>
        <p class="open-pormpt" v-if="info&&!previewFlag&&parseInt(info.linkerCount)<3">{{info.linkerCount==0?'您暂未开通任何楼盘，建议开通更多楼盘':'当前开通楼盘数量不足3个，建议开通更多楼盘后进行使用'}}</p>
      </div>
    </div>
    <!-- 删除段落操作弹窗 -->
    <van-actionsheet v-model="delActionsheetShow" :actions="delActions" cancel-text="取消" @select="onDelSelect"/>
    <!-- 浮动栏 -->
    <div class="fixed-bar" v-show="!loaddingStatus">
      <div class="left-operation">
        <div class="left-first" @click="helpClickHandler">
          <i class="icon iconfont icon-write_help" style="fontSize:26px;margin-bottom:3px"></i>
          帮助
        </div>
        <div class="left-second" @click="resetClickHandler">
          <i class="icon iconfont icon-write_reset" style="fontSize:24px;margin-bottom:3px"></i>
          重置
        </div>
      </div>
      <div class="right-operation">
        <div class="preview-btn" @click="previewClickHandler">{{previewFlag? '编辑':'预览'}}</div>
        <div class="save-btn" v-show="!pushFlag" @click="saveClickHandler">保存并分享</div>
        <div class="save-btn" v-show="pushFlag">{{loaddingTxt}}...</div>
      </div>
    </div>
    <!-- 楼盘选择 -->
    <single-select-box v-model="singleShow" :maxSelect="countCompute" :selected="selectedCompute" @submit="selectSubmitHandler"/>
    <!-- 帮助 -->
    <van-popup class="help-box" v-model="helpShow">
      <h5 class="help-title">用户帮助</h5>
      <p class="close icon iconfont icon-chat_Shutdown" style="font-size:20px;" @click="closeHelp"></p>
      <p class="help-sub-title">任何模块均可点击进行编辑</p>
      <div class="help-content">
        <p class="help-content-line">1、成功选中后，会有高亮显示，无用信息可进行删除</p>
        <p class="help-content-line">2、不同的活动会带来不同的效果，简介漂亮的封面、适当的文字可以提升用户的点击率。当然，活动的周期和用户期待价值也会直接影响传播效果</p>
        <p class="help-content-line">3、提炼导读摘要、文中适当发表精彩观点，有助于形成温度和亲切感、塑造专业度。</p>
        <p class="help-content-line">4、切记粗暴插入广告，容易影响自然分享的扩散</p>
        <p class="help-content-line">5、插入的文字勿用敏感性词语；</p>
      </div>
      <div class="help-btn-box">
        <div class="help-btn" @click="closeHelp">已阅读并同意</div>
      </div>
    </van-popup>
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
    loaddingTxt: '加载中',
    loaddingStatus: true,
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
    target: null,
    helpShow: false,
    pushFlag: false,
    previewFlag: false
  }),
  created() {
    this.id = this.$route.params.id
    this.city = this.$route.params.city
    this.agentId = this.$route.query.agentId
    this.enterpriseId = this.$route.query.enterpriseId
    this.getDetail()
  },
  methods: {
    // 获取文章信息
    async getDetail() {
      const res = await discoverService.getDiscoverDetail(this.id)
      this.info = res

      console.log(Number(this.info.source), 'this.info.source')

      if(!this.info || isNaN(Number(this.info.source))) {
        // this.pushFlag = true
        this.loaddingStatus = true
        return
      } else {
        this.loaddingStatus = false
        this.loaddingTxt = '保存中'
      }

      // 创建虚拟dom解析html结构
      let virtualDom = document.createElement('div')
      virtualDom.innerHTML = this.info.content.replace('div', 'p')
      for (let dom of virtualDom.children) {
        this.renderDom.push({
          text: dom.innerHTML,
          status: 'edit'
        })
      }
      if (this.info.editData !== '') {
        try {
          let editData = JSON.parse(this.info.editData)
          this.restoreData(editData)
        } catch (error) {
          this.getMyHouseRecommend()
        }
      } else {
        this.getMyHouseRecommend()
      }
      document.scrollingElement.scrollTop = 0
    },
    // 若出来editData,还原数据
    async restoreData(editData) {
      if (editData.hasOwnProperty('viewpoint')) this.viewpointText = editData.viewpoint
      if (editData.hasOwnProperty('inlayHouse') && editData.inlayHouse !== '') this.inlayHouse = await this.getLinkerInfo(editData.inlayHouse)
      if (editData.hasOwnProperty('recommendHouse') && editData.recommendHouse.length > 0) this.recommendList = await this.getLinkerInfo(editData.recommendHouse.join(','))
    },
    // 查询楼盘信息
    async getLinkerInfo(linkerIds) {
      const res = await discoverService.queryLinkerListByIds(linkerIds)
      return res
    },
    // 获取我的楼盘推荐
    async getMyHouseRecommend() {
      const payload = {
        orderBy: 3, // 人气最旺
        current: 1,
        size: 3
      }
      const res = await userService.getMyHouses(payload)
      let statusArr = ['热销中', '即将发售', '售罄']
      for (let temp of res.records) {
        temp.linkerTags = [statusArr[temp.saleStatus], ...temp.linkerTags]
        this.recommendList.push(temp)
      }
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
          if (lock) dom.status = 'del'
          if (this.currentDelDom === dom) lock = true
        }
      } else {
        // 删除当前
        // 检查是否为最后一段
        let count = 0
        for (let temp of this.renderDom) {
          if (temp.status !== 'del') count++
        }
        if (count > 1) {
          this.currentDelDom.status = 'del'
        } else {
          this.$toast('请至少保留一个段落!')
        }
      }
      this.delActionsheetShow = false
    },
    // 恢复段落处理
    repealParagraphHandler(e) {
      e.dom.status = 'edit'
    },
    singleAddClickHandler() {
      if (this.info.linkerCount < 1) {
        this.$toast('暂无开通楼盘')
        return
      }
      this.target = 'inlayHouse'
      this.singleShow = true
    },
    multiAddClickHandler() {
      console.log(this.recommendList,'有多少',this.info)
      
      if (this.recommendList.length >= this.info.linkerCount) {
        this.$toast('暂无更多开通楼盘')
        return
      }
      this.target = 'multiHouse'
      this.singleShow = true
    },
    // 底部栏帮助按钮点击
    helpClickHandler() {
      this.helpShow = true
    },
    // 底部栏重置按钮点击
    resetClickHandler() {
      window.location.reload()
    },
    // 底部栏预览按钮点击
    async previewClickHandler() {
      if (this.previewFlag) {
        this.previewFlag = false
        for (let temp of this.renderDom) {
          temp.status = 'edit'
        }
      } else {
        this.previewFlag = true
      }
    },
    // 底部栏保存按钮点击
    async saveClickHandler() {
      if (this.pushFlag) return
      this.pushFlag = true
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
        if (temp.status === 'edit') content += `<p>${temp.text}</p>`
      }
      let res, targetid
      // 存在这个字段,说明是再次编辑 source:0 1系统原文章 2:经纪人文章 3:小程序
      if (this.info && this.info.source && (this.info.source == 2 || this.info.source == 3) && this.info.belongeder !== '') {
        res = await cpInformationService.updateArticleForAgent(this.id, JSON.stringify(payload), content)
        targetid = this.info.id
      } else {
        res = await cpInformationService.editArticleForAgent(this.id, JSON.stringify(payload), content)
        targetid = res.id
        // 还要附加一个评论
        if (this.viewpointText !== '') {
          const commentData = {
            content: this.viewpointText,
            enterpriseId: this.enterpriseId,
            infoId: this.info.id,
            senderId: this.agentId,
            senderSource: 0,
            type: 0,
            viewFlag: 0
          }
          discoverService.insertComment(commentData)
        }
      }
      this.$router.replace(`/discover/${targetid}/${this.city}?agentId=${this.agentId}&enterpriseId=${this.enterpriseId}&sharePrompt=true`)
    },
    selectSubmitHandler(e) {
      if (this.target === 'inlayHouse') {
        this.inlayHouse.push(e)
      } else {
        this.recommendList.push(e)
      }
    },
    //  内嵌楼盘删除
    inlayHouseDelHandler() {
      this.inlayHouse = []
    },
    multiHouseDelHandler(item) {
      // console.log('delete', item)
    },
    closeHelp() {
      this.helpShow = false
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
  },
  mounted() {
    document.querySelector('.fixed-bar').addEventListener(
      'touchmove',
      e => {
        e.preventDefault()
      },
      { passive: false }
    )
  },
  beforeDestroy() {
    try {
      document.querySelector('.fixed-bar').removeEventListener('touchmove')
    } catch (error) {}
  }
}
</script>
<style lang="less">
.viewRedactStyle {
  margin-bottom: 15px;
}
.discover-edit-page {
  background: #f7f9fa;
  > .discover-detail-container {
    background: #fff;
    padding-bottom: 10px;
    margin-bottom: 15px;
    > .discover-title {
      padding: 10px 15px;
      padding-top: 20px;
      padding-bottom: 17px;
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
      .view-count {
        font-size: 14px;
      }
    }
    > .discover-detail-content {
      padding: 15px;
      padding-bottom: 0;
      padding-top: 34px;
      font-size: 16px;
      color: #333333;
      font-weight: 400;
      line-height: 28px;
      .edit-box {
        margin-top: 24px;
        .edit-houses {
          margin-top: 24px;
        }
      }
      > .disclaimer-box {
        font-size: 14px;
        color: #969ea8;
        > span {
          color: #445166;
        }
      }
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
    margin-bottom: 60px;
    padding-bottom: 30px;
    padding-top: 10px;
    > .recommend-house-box {
      margin: 0 15px;
      > .open-pormpt {
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: #ea4d2e;
      }
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
    height: 72px;
    > .left-operation {
      flex: 1;
      font-size: 12px;
      display: flex;
      color: #666666;
      > .left-first {
        display: flex;
        flex-direction: column;
        transform: scale(0.8);
        width: 80px;
        justify-content: center;
        align-items: center;
        padding-left:22px;
        > .help-text {
          font-size: 10px;
          font-size: 10px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 14px;
        }
      }

      > .left-second {
        display: flex;
        flex-direction: column;
        transform: scale(0.8);
        width: 80px;
        justify-content: center;
        align-items: center;

        > .reset-text {
          font-size: 10px;
          font-size: 10px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 14px;
        }
      }
      // > div {
      //   flex: 1;
      //   transform: scale(0.8);
      //   > i {
      //     font-size: 30px;
      //     display: block;
      //   }
      // }
    }
    > .right-operation {
      flex: 1;
      display: flex;
      font-size: 14px;
      align-items: center;
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
          margin-right: 17px;
        }
      }
    }
  }
  > .help-box {
    width: 80%;
    padding: 20px 10px;
    border-radius: 12px;
    > .close {
      width: 14px;
      height: 14px;
      position: absolute;
      top: 10px;
      right: 16px;
      color: #dcdcdc;
    }
    > .help-title {
      font-size: 20px;
      color: #000;
      font-weight: 600;
      text-align: center;
      margin: 20px;
    }
    > .help-sub-title {
      color: #333333;
      font-size: 14px;
      font-weight: 600;
      margin: 10px 15px 0;
    }
    > .help-content {
      margin: 0 15px;
      > .help-content-line {
        font-size: 14px;
        font-weight: 400;
        margin: 10px 0;
        line-height: 1.5;
        text-indent: -22px;
        margin-left: 22px;
      }
    }
    > .help-btn-box {
      > .help-btn {
        background: #007ae6;
        margin: 0 15px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        padding: 12px;
        border-radius: 6px;
        font-weight: 400;
      }
    }
  }
}
</style>
