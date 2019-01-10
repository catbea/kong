<template>
  <div class="discover-edit-page">
    <div class="discover-detail-container">
      <h5 class="discover-title">{{info&&info.title}}</h5>
      <div class="discover-detail-content" v-html="info&&info.content"></div>
      <p class="discover-extra-info">
        转载于
        <span class="reprint-from">{{info&&info.publisher}}</span>
        <span class="reprint-time">{{info&&info.createDate | dateTimeFormatter}}</span>
        <span class="reprint-views">浏览：{{ info&&info.scanNum | currency('')}}</span>
      </p>
    </div>
    <van-actionsheet v-model="delActionsheetShow" :actions="delActions" cancel-text="取消" @select="onDelSelect" @cancel="onDelCancel"/>
    <!-- 浮动栏 -->
    <div class="fixed-bar">
      <div class="left-operation">
        <div class @click="helpClickHandler">
          <i class="icon iconfont icon-chat_register_rb_n"></i>
          帮助
        </div>
        <div class @click="resetClickHandler">
          <i class="icon iconfont icon-chat_register_rb_n"></i>
          重置
        </div>
      </div>
      <div class="right-operation">
        <div class="preview-btn" @click="previewClickHandler">预览</div>
        <div class="save-btn" @click="saveClickHandler">保存</div>
      </div>
    </div>
    <van-popup class="write-board" v-model="viewpointEditShow" position="bottom" :close-on-click-overlay="false">
      <p class="write-title">发表观点</p>
      <div class="pull-btn" @click="viewpointPullHandler">发布</div>
      <textarea class="write-content" v-model="viewpointText"/>
    </van-popup>
    <edit-paragraph :text="'呐喊'"/>
  </div>
</template>
<script>
import EditParagraph from 'COMP/Discover/edit/editParagraph'
import discoverService from 'SERVICE/discoverService'
export default {
  components: {
    EditParagraph
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
    originalSection: [], //
    editStatus: 1, // 1-编辑态 2-预览态
    viewpointEditShow: false,
    viewpointText: ''
  }),
  created() {
    this.id = this.$route.params.id
    this.city = this.$route.params.city
    this.agentId = this.$route.query.agentId
    this.getDetail()
  },
  methods: {
    // 获取文章信息
    async getDetail() {
      const res = await discoverService.getDiscoverDetail(this.id, this.city, this.enterpriseId, this.agentId, '2')
      this.info = res

      this.infoId = res.id
      this.collectionStatus = res.collectType

      this.agentInfo = {
        agentId: this.info.agentId,
        agentName: this.info.agentName,
        avatarUrl: this.info.avatarUrl,
        distributorName: this.info.distributorName,
        enterpriseName: this.info.enterpriseName,
        institutionName: this.info.institutionName
      }
      this.$nextTick(() => {
        const htmlCollection = document.querySelector('.discover-detail-content').children
        for (let dom of htmlCollection) {
          this.originalSection.push(dom)
        }
        this.editControl(1)
      })
    },
    // 标记文章内容,编辑状态切换 1-编辑态 2-浏览态
    editControl(status) {
      if (status === 1) {
        for (let dom of this.originalSection) {
          let closeBtn = document.createElement('i')
          closeBtn.classList.add('icon', 'iconfont', 'icon-search_empty', 'close-btn')
          dom.classList.add('section-edit')
          dom.append(closeBtn)
          closeBtn.addEventListener('click', this.delClickHandler)
        }
        this.crateViewpoint()
        this.createHouses()
      } else {
      }
    },
    // 段落删除处理-弹出选择删除当前或删除以下所有
    delClickHandler(e) {
      this.currentDelDom = e.target.parentNode
      this.delActionsheetShow = true
    },
    // 删除段落处理
    onDelSelect(e) {
      if (e.type === 1) {
        let lock = false
        let toDelArr = []
        for (let dom of this.originalSection) {
          if (this.currentDelDom === dom) lock = true
          if (lock) dom.classList.add('status-delete') //dom.remove()
        }
      } else {
        this.currentDelDom.classList.add('status-delete') // this.currentDelDom.remove()
      }
      this.delActionsheetShow = false
    },
    onDelCancel(e) {
      console.log(e)
    },
    // 创建观点dom
    crateViewpoint() {
      let el = document.createElement('div')
      el.classList.add('viewpoint-container')
      el.innerText = '在这里可以写出您的观点（不可换行)'
      el.addEventListener('click', this.viewpointClickHandler)
      let indexList = document.querySelector('.discover-detail-content').children
      document.querySelector('.discover-detail-content').insertBefore(el, indexList[0])
    },
    // 创建空楼盘dom
    createHouses() {
      let el = document.createElement('div')
      el.classList.add('edit-houses-container')
      // 添加“+”图标
      let addBtn = document.createElement('i')
      addBtn.classList.add('icon', 'iconfont', 'icon-Focuson_', 'add-icon')
      el.appendChild(addBtn)
      // 添加文本
      let helpText = document.createElement('p')
      helpText.innerText = '这里可以插入您推荐的楼盘'
      el.appendChild(helpText)
      // dom.classList.add('section-edit')
      // let closeIcon = dom.querySelector('.close-btn')

      // el.addEventListener('click', this.viewpointClickHandler)
      let indexList = document.querySelector('.discover-detail-content').children
      let target = indexList[Math.floor(indexList.length / 2)]
      document.querySelector('.discover-detail-content').insertBefore(el, target)
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
    async previewClickHandler() {
      // this.editStatus
      for (let dom of this.originalSection) {
        dom.classList.remove('section-edit')
        let closeIcon = dom.querySelector('.close-btn')
        closeIcon.removeEventListener('click')
        closeIcon.remove()
      }
    },
    // 底部栏保存按钮点击
    saveClickHandler() {},
    // 发布观点框体点击处理
    viewpointClickHandler() {
      this.viewpointEditShow = true
    },
    // 发布观点-保存按钮点击处理
    viewpointPullHandler() {
      let viewpointDom = document.querySelector('.viewpoint-container')
      viewpointDom.innerText = this.viewpointText
      this.viewpointEditShow = false
    }
  }
}
</script>
<style lang="less">
.discover-edit-page {
  background-color: #f7f9fa;
  > .discover-detail-container {
    background-color: #fff;
    padding-bottom: 10px;
    > .discover-title {
      padding: 10px 15px;
      font-size: 22px;
      color: #333333;
      font-weight: 600;
      line-height: 1.3;
    }
    > .discover-img {
      margin: 15px;
      height: 195px;
      border-radius: 10px;
      background-color: #999999;
    }
    > .discover-detail-content {
      padding: 15px;
      font-size: 16px !important;
      color: #333333 !important;
      font-weight: 400 !important;
      line-height: 28px !important;
      > .viewpoint-container {
        border: 1px dashed #969ea8;
        height: 90px;
        margin-bottom: 5px;
        background: rgba(150, 158, 168, 0.08);
        font-size: 14px;
        color: #969ea8;
        padding: 7px 9px;
      }
      > .edit-houses-container {
        height: 140px;
        background: rgba(150, 158, 168, 0.08);
        border: 1px dashed #969ea8;
        margin-bottom: 5px;
        > .add-icon {
        }
        > p {
        }
      }
    }
    > .discover-extra-info {
      position: relative;
      color: #8a8f99;
      font-size: 12px;
      padding: 0 15px;
      > .reprint-from {
        padding-left: 5px;
      }
      > .reprint-time {
        padding-left: 15px;
      }
      > .reprint-views {
        position: absolute;
        right: 15px;
      }
    }
    > .agent-card {
      margin-top: 8px;
      margin-bottom: 10px;
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
  > .write-board {
    // position: relative;
    height: 187px;
    > .pull-btn {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 30px;
      right: -15px;
      font-size: 14px;
      font-weight: 400;
      background: #007ae6;
      border-radius: 100px;
      color: #fff;
      padding: 8px 21px;
    }
    > .write-title {
      font-size: 20px;
      color: #333333;
      padding: 18px 16px;
      font-weight: 600;
    }
    > .write-content {
      font-size: 16px;
      color: #13294f;
      border: none;
      margin: 0 15px;
      padding: 5px;
      width: 345px;
      height: 112px;
      background: rgba(150, 158, 168, 0.08);
    }
  }
}
</style>
<style lang="less">
.section-edit {
  position: relative !important;
  border: 1px dashed #969ea8 !important;
  padding: 5px !important;
  margin-bottom: 5px !important;
  text-indent: unset !important;
  &.status-delete {
    ::after {
      content: '撤销删除';
    }
  }
  > .close-btn {
    position: absolute;
    top: 4px;
    right: -14px;
    transform: translate(-50%, -50%);
    color: #ea4d2e;
  }
}
</style>