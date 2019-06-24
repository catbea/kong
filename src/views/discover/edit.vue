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
          <edit-houses v-if="index===houseIndex" v-model="inlayHouse" :preview="previewFlag" :isInArticle="1" :count="1" :showCard="true" @click="singleAddClickHandler" @delete="inlayHouseDelHandler"/>
        </div>
        <div class="disclaimer-box" v-if="previewFlag">
          免责声明：文章信息均来源网络，本平台对转载、分享的内容、陈述、观点判断保持中立，不对所包含内容的准确性、可靠性或完善性提供任何明示或暗示的保证，仅供读者参考，本公众平台将不承担任何责任。版权归原作者所有，如有侵权请告知删除。转载请注明以上信息。如有问题请点击
          <span>举报反馈</span>
        </div>
      </div>
    </div>
    <div class="recommend-house-container" v-if="!(previewFlag&&recommendList.length===0)">
      <title-bar :conf="{title:'推荐房源'}"/>
      <div class="recommend-house-box">
        <edit-houses v-model="recommendList" :count="3" :reminder="true" @click="multiAddClickHandler" :isInArticle="0" :preview="previewFlag" @delete="multiHouseDelHandler"/>
        <p class="open-pormpt" v-if="info&&!previewFlag&&parseInt(info.linkerCount)<3">{{info.linkerCount==0?'您暂未开通任何楼盘，建议开通更多楼盘':'当前开通楼盘数量不足3个，建议开通更多楼盘后进行使用'}}</p>
      </div>
    </div>
    <!-- 删除段落操作弹窗 -->
    <van-actionsheet v-model="delActionsheetShow" :actions="delActions" cancel-text="取消" @select="onDelSelect"/>
    <!-- 浮动栏 -->
    <div class="fixed-bar" v-show="!loaddingStatus">
      <!-- <div class="left-operation">
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
      </div> -->
      <div class="bar-save-btn" @click="saveClickHandler(0)">保存</div>
      <div class="bar-share-btn" @click="saveClickHandler(1)">分享</div>
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
    <FirstDialog :isShowFirstDialog="isShowFirstDialog" @firstDialogBtn="firstDialogBtn"></FirstDialog>
  </div>
</template>
<script>
import EditParagraph from 'COMP/Discover/edit/editParagraph'
import FirstDialog from 'COMP/Discover/FirstDialog'
import EditViewpoint from 'COMP/Discover/edit/editViewpoint'
import EditHouses from 'COMP/Discover/edit/editHouses'
import TitleBar from 'COMP/TitleBar'
import SingleSelectBox from 'COMP/Discover/edit/singleSelectBox'
import discoverService from 'SERVICE/discoverService'
import userService from 'SERVICE/userService'
import cpInformationService from 'SERVICE/cpInformationService'
import { Toast } from 'vant'
export default {
  components: {
    FirstDialog,
    EditParagraph,
    EditViewpoint,
    EditHouses,
    TitleBar,
    SingleSelectBox
  },
  data: () => ({
    isInArticle:1,//是否是文章中的楼盘  1 是 ，非 1 否
    isShowFirstDialog:false,//第一次显示写一写蒙层
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
    styleString: '',
    previewFlag: false
  }),
  created() {
    this.id = this.$route.params.id
    this.city = this.$route.params.city
    this.agentId = this.$route.query.agentId
    this.enterpriseId = this.$route.query.enterpriseId
    this.getDetail() 
    let firstDialog =  localStorage.getItem("firstDialog");
    if(firstDialog!=null){
      this.isShowFirstDialog = false;
    }else{
       this.isShowFirstDialog = true;
    }   
  },
  methods: {
    //第一次写一写显示蒙层
    firstDialogBtn(){
      this.isShowFirstDialog = false;
      localStorage.setItem("firstDialog","true");
    },
    // 获取文章信息
    async getDetail() {
      const res = await discoverService.getDiscoverDetail(this.id)
      this.info = res
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
      virtualDom.innerHTML = this.info.content.replace('div', 'p').replace(/&lt;/g,'<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/<br style\s*?=\s*?(['"])[\s\S]*?\1>/g,'').replace(/<input.*>/g,'')
      // 去掉嵌套空标签
      while (/<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/ig.test(virtualDom.innerHTML)) {
        virtualDom.innerHTML = virtualDom.innerHTML.replace(/<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/ig,'')
      }
      // console.log(virtualDom.children, 'virtualDom')
      
      for (let dom of virtualDom.children) {
        // console.log(dom.tagName, 'dom')
        if(dom.tagName == 'META') {
          continue
        }
        if(dom.tagName == 'STYLE' || dom.tagName == 'LINK') {
          // console.log(dom, dom.tagName)
          let head = document.getElementsByTagName("head")[0]
          if(dom.tagName == 'STYLE') {
            let style = document.createElement("style");
            style.type = "text/css";
            let styleStr = dom.innerHTML.replace(/body\{[^\}]*\}/g,"").replace(/\*\{[^\}]*\}/g,"")
            this.styleString += '<style>'+styleStr+'</style>'
            style.appendChild(document.createTextNode(styleStr))
            head.appendChild(style)
          } else {
            head.appendChild(dom)
          }
          continue
        }
        if(dom.tagName == 'IMG') {
          this.renderDom.push({
            text: '<p><img src="'+dom.src+'"></p>',
            status: 'edit'
          })
        } else {
          if(dom.innerHTML.indexOf('<!--VIDEO_') == 0) {
            let videoKey = dom.innerHTML.replace('<!--', '').replace('-->', '')
            // console.log(this.info.fileUrlMap[videoKey], '========')
            this.renderDom.push({
              text: '<!--'+videoKey+'--><video src="'+this.info.fileUrlMap[videoKey]+'" controls="controls" />',
              status: 'edit'
            })
          } else {
            if (dom.innerHTML && dom.style.cssText.indexOf('display: none') < 0) {
              this.renderDom.push({
                text: '<section style="'+dom.style.cssText+'">'+dom.innerHTML+'</section>',
                status: 'edit'
              })
            }
          }
        }
        // console.log(this.renderDom, '========')
      }
      if (this.info.editData !== '') {
        try {
          let editData = JSON.parse(this.info.editData)
          this.restoreData(editData)
        } catch (error) {
          this.getMyHouseRecommend()
        }
      } else {
        // this.getMyHouseRecommend()
      }
      document.scrollingElement.scrollTop = 0
      this.$nextTick(() => {
        let viewpointText = window.sessionStorage.getItem('viewpointText')
        if (viewpointText) {
          this.viewpointText = viewpointText
          window.sessionStorage.removeItem('viewpointText')
        }
        let inlayHouse = window.sessionStorage.getItem('inlayHouse')
        if (inlayHouse) {
          this.inlayHouse.push(JSON.parse(inlayHouse))
        }
        let recommendList = window.sessionStorage.getItem('multiHouse')

        if (recommendList) {
          this.recommendList = JSON.parse(recommendList)
        } else {
          this.getMyHouseRecommend()
        }
        let renderDom = window.sessionStorage.getItem('renderDom')
        if (renderDom) {
          this.renderDom = JSON.parse(renderDom)
          window.sessionStorage.removeItem('renderDom')
        }
        let scrollTop = window.sessionStorage.getItem('scrollTopEdit')
        if (scrollTop) {
          document.querySelector('.router-view').scrollTop = scrollTop
          window.sessionStorage.removeItem('scrollTopEdit')
        }
      })
    },
    // 若出来editData,还原数据
    async restoreData(editData) {
      if (editData.hasOwnProperty('viewpoint')) this.viewpointText = editData.viewpoint
      let inlayHouse = window.sessionStorage.getItem('inlayHouse')
      let recommendHouse = window.sessionStorage.getItem('multiHouse')
      if (editData.hasOwnProperty('inlayHouse') && editData.inlayHouse !== '' && !inlayHouse) this.inlayHouse = await this.getLinkerInfo(editData.inlayHouse)
      if (editData.hasOwnProperty('recommendHouse') && editData.recommendHouse.length > 0 && !recommendHouse) this.recommendList = await this.getLinkerInfo(editData.recommendHouse.join(','))
    },
    // 查询楼盘信息
    async getLinkerInfo(linkerIds) {
      const res = await discoverService.queryLinkerListByIds(linkerIds)
      let statusArr = ['热销中', '即将发售', '', '售罄']
      for (let temp of res.records) {
        temp.linkerTags = [statusArr[temp.saleStatus], ...temp.linkerTags]
      }
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
      let statusArr = ['热销中', '即将发售', '', '售罄']
      for (let temp of res.records) {
        temp.linkerTags = [statusArr[temp.saleStatus], ...temp.linkerTags]
        this.recommendList.push(temp)
      }
      this.recommendList = res.records
      console.log("推荐房源",this.recommendList);
    },

    // 段落删除弹窗-选择删除当前或删除以下所有
    delParagraphHandler(e) {
      this.currentDelDom = e.dom
      this.onDelSelect();
      // this.delActionsheetShow = true
    },
    // 删除段落处理
    onDelSelect() {
      // if (e.type === 1) {
      //   // 删除以下所有
      //   let lock = false
      //   let toDelArr = []
      //   for (let dom of this.renderDom) {
      //     if (lock) dom.status = 'del'
      //     if (this.currentDelDom === dom) lock = true
      //   }
      // } else {
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
      // }
      // this.delActionsheetShow = false
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
      let top = document.querySelector('.router-view').scrollTop
      window.sessionStorage.setItem('scrollTopEdit', top)
      window.sessionStorage.setItem('renderDom', JSON.stringify(this.renderDom))

      // this.target = 'inlayHouse'
      // this.singleShow = true
      this.$router.push({path:'/discover/choosemarket', name:'chooseMarket',  params:{selected: this.inlayHouse, viewpointText: this.viewpointText}, query:{type:'inlayHouse',fullPath: this.$route.fullPath}})
    },
    multiAddClickHandler() {
      if (this.recommendList.length >= this.info.linkerCount) {
        this.$toast('暂无更多开通楼盘')
        return
      }
      let top = document.querySelector('.router-view').scrollTop
      window.sessionStorage.setItem('scrollTopEdit', top)
      window.sessionStorage.setItem('renderDom', JSON.stringify(this.renderDom))
      // this.target = 'multiHouse'
      // this.singleShow = true
      this.$router.push({path:'/discover/choosemarket', name:'chooseMarket',  params:{'selected': this.recommendList, viewpointText: this.viewpointText}, query:{type:'multiHouse',fullPath: this.$route.fullPath}})
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
    async saveClickHandler(type) {
      if (this.pushFlag) return
      window.sessionStorage.removeItem('inlayHouse')
      window.sessionStorage.removeItem('multiHouse')
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
      let subStr = new RegExp('\<video.*?\>','ig');
      content = content.replace(subStr, '')
      // content = this.styleString + content
      // console.log(content, 'content-------')
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
      // if(type == 1){
        this.$router.replace(`/discover/${targetid}/${this.city}?agentId=${this.agentId}&enterpriseId=${this.enterpriseId}&sharePrompt=true&type=${type}`)
      // }
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
    },
    touchHandler(e) {
      return e.preventDefault()
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
    },
    houseIndex () {
      let index = parseInt(this.renderDom.length / 3) - 1
      return index < 0 ? 0 : index
    }
  },
  mounted() {
    document.querySelector('.fixed-bar').addEventListener(
      'touchmove',
      this.touchHandler,
      { passive: false }
    )
  },
  beforeDestroy() {
    try {
      document.querySelector('.fixed-bar').removeEventListener('touchmove',this.touchHandler,false)
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
      div,section{
        width: auto !important;
      }
      img{
        height: auto !important;
      }
      .edit-box {
        margin-top: 24px;
        .edit-houses {
          margin-top: 24px;
        }
        div,section{
          width: auto !important;
        }
        .img-mask{
          position: absolute;
          width: 100% !important;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(68, 81, 102, 0.7);
        }
        img{
          height: auto !important;
          max-width: 100% !important;
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
    justify-content: space-between;
    background: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    height: 72px;
    padding: 14px 16px;
    > .bar-save-btn{
      width: 108px;
      height: 44px;
      background: #F2F8FE;
      color: #445166;
      font-size: 16px;
      border-radius: 6px;  
      text-align: center;
      line-height: 44px;    
    }
    > .bar-share-btn{
      width: 220px;
      height: 44px;
      background: #007AE6;
      color: #fff;
      font-size: 16px;
      border-radius: 6px;  
      text-align: center;
      line-height: 44px;    
    }
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
