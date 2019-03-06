<template>
  <div class="analysis">
    <div class="analysis-body">
      <div class="progress-body">
        <van-loading type="spinner" :style="{display:showLoading}"/>
        <span>{{analysisText}}</span>
      </div>
      <div class="article-body">
        <div class="article-title">
          <span class="title-first">标题</span>
          <span class="title-second" :style="{color:errColor}">{{title|textOver(15)}}</span>
        </div>
        <div class="article-source">
          <span class="source-first">来源</span>
          <span class="source-second" :style="{color:errColor}">{{source}}</span>
        </div>
        <div class="article-content">
          <span class="content-first">正文</span>
          <span class="content-second">{{content}}</span>
        </div>
        <div class="article-cover">
          <span class="cover-first">封面</span>
          <span class="cover-second" :style="{color:errColor}">{{icon}}</span>
        </div>
        <div class="article-Illustration">
          <span class="Illustration-first">插画</span>
          <span class="Illustration-second" :style="{color:errColor}">共{{imgNum}}副插画</span>
        </div>
      </div>
    </div>
    <van-popup
      v-model="show"
      position="center"
      :overlay="true"
      class="popup-view"
      :close-on-click-overlay="false"
    >
      <div class="popup-top">
        <span class="popup-title">免责声明</span>
        <!-- :style="{backgroundImage:'url(' + closeImg + ')'}" -->
        <img
          class="closePopup"
          @click="closeDefaultMsg"
          :src="closeImg"          
        />
      </div>
      <div class="notice-body">
        <span class="notice-first">版权声明</span>
        <span class="notice-first-content">{{noticeFirst}}</span>
        <span class="notice-first">免责声明</span>
        <span class="notice-first-content">{{noticeSecond}}</span>
      </div>
      <div class="read-button" @click="goToAnalysis">
        <span class="text">已阅读并同意</span>
      </div>
    </van-popup>
  </div>
</template>
<script>
import articleService from 'SERVICE/articleService'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import { Toast } from 'vant'

export default {
  data() {
    return {
      articleId:'',
      noticeFirst: ' 我们尊重原创，也注重分享。有部分内容来自互联网，版权归原作者所有，仅供学习参考之用，禁止用于商业用途，如无意侵犯了权利人的知识产权，请联系删除。 ',
      noticeSecond: ' 本平台对转载、分享的内容、陈述、观点判断保持中立，不对所包含内容的准确性、可靠性或完善性提供任何明示或暗示的保证，仅供读者参考，本公众平台将不承担任何责任。',
      cancelCollection: require('IMG/user/myWrite/cancelCollection.png'),
      articleUrl: '',
      showLoading: 'block',
      analysisText: '解析中',
      title: '获取准备中',
      source: '获取准备中',
      content: '获取准备中',
      icon: '获取准备中',
      imgNum: '0',
      errColor: '',
      show: true,
      closeImg: require('IMG/user/close_popup.png'),
      canAnalysis: true
    }
  },

  created() {
    this.articleUrl = this.$route.params.url
    this.parseType = this.$route.params.parseType
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  methods: {
    async commitInfo(data) {
      const result = await articleService.articleAnalysis(data)

      let errorMsg = ''

      if (result.returnCode == '31100' || result.returnCode == '10500' || result.returnCode == '31106' || result.returnCode == '31102') {
        this.showLoading = 'none'
        this.analysisText = '解析失败'
        this.title = '获取失败'
        this.source = '获取失败'
        this.content = '获取失败'
        this.icon = '获取失败'
        this.imgNum = '0'
        this.errColor = '#EA4D2E'

        if (result.returnCode == '31106') {
          errorMsg = '该文章已经存在,请勿重复爬取'
        } else if (result.returnCode == '10500' || result.returnCode == '31102'||result.returnCode == '31100') {
          errorMsg = result.msg
        } else {
          errorMsg = '请确认内容是否为微信公众号内容，并检查网络环境后再次尝试'
        }

        this.$dialog
          .alert({
            title: '爬取失败',
            message: errorMsg,
            confirmButtonText: '我知道了'
          })
          .then(() => {
            // on close
            this.$router.go(-2)
          })
      } else {
        this.$store.commit(types.MYWRITE_TAB, '3')

        this.articleId = result.articleId
        this.title = result.title
        this.source = result.source
        if (result.content) {
          this.content = '已完成'
        }
        if (result.icon) {
          this.icon = '已完成'
        }
        this.imgNum = result.imgNum
        this.errColor = '#445166'

        if (this.parseType == '1') {
          setTimeout(async () => {
            this.goToEditDetail()
          }, 1500)
        } else if (this.parseType == '2') {
          setTimeout(() => {
            this.goToMyWrite()
          }, 3000)
        }
      }
    },

    goToMyWrite() {
      this.$toast('文章添加成功')
      this.$router.push({ name: 'historicalArticles', query: { typeCode: '3' } })
    },

    goToEditDetail() {
      this.analysisText = '解析成功'
      this.showLoading = 'none'
      let city = '全国'

      Toast('文章解析成功')
      // this.$toast('文章解析成功')
      this.$router.replace({ path: `/discover/edit/${this.articleId}/${city}`, query: { agentId: this.userInfo.agentId, enterpriseId: this.userInfo.enterpriseId, classify: '0' } })
    },

    //关闭弹窗
    closeDefaultMsg() {
      this.show = false
      this.$router.go(-1)
    },

    //阅读并同意 进行解析文章操作
    goToAnalysis() {
      this.show = false

      let obj = {
        articleUrl: this.articleUrl
      }

      if (this.canAnalysis == true) {
        this.canAnalysis = false
        this.commitInfo(obj)
      }
    }
  }
}
</script>
<style lang="less">
.analysis {
  .popup-view {
    width: 311px;
    height: 443px;
    background: #ffffff;
    border-radius: 12px;
    position: absolute;

    > .popup-top {
      width: 100%;
      height: 51px;
      line-height: 51px;
      position: relative;

      > .popup-title {
        color: #000000;
        font-size: 20px;
        margin-left: 120px;
      }

      > .closePopup {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 20px;
        top: 16px;
      }
    }

    > .notice-body {
      width: 100%;
      padding-left: 16px;
      padding-right: 16px;
      display: flex;
      flex-direction: column;

      > .notice-first {
        font-family: PingFangSC-Semibold;
        font-size: 15px;
        color: #333333;
        margin-top: 16px;
      }

      > .notice-first-content {
        font-family: PingFangSC-Semibold;
        font-size: 15px;
        color: #333333;
        margin-top: 5px;
        line-height: 25px;
      }
    }

    > .read-button {
      position: absolute;
      width: 279px;
      height: 40px;
      background: rgba(0, 122, 230, 1);
      border-radius: 6px;
      bottom: 16px;
      left: 16px;
      display: flex;
      justify-content: center;
      align-items: center;

      > .text {
        color: #ffffff;
        font-size: 14px;
      }
    }
  }

  .analysis-body {
    width: 100%;
    height: 100%;
    background: #ffffff;

    > .progress-body {
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(270deg, rgba(0, 122, 230, 1) 0%, rgba(0, 158, 230, 1) 100%);
      width: 100%;
      height: 234px;
      flex-direction: column;

      > .loading-view {
      }

      span {
        font-size: 14px;
        color: #ffffff;
      }
    }

    > .article-body {
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;

      > .article-title {
        display: flex;
        justify-content: space-between;
        height: 50px;
        border-bottom: #e6e6e6 1px solid;
        align-items: center;

        > .title-first {
          font-size: 16px;
          color: #333333;
        }

        > .title-second {
          color: #445166;
          font-size: 14px;
        }
      }

      > .article-source {
        display: flex;
        justify-content: space-between;
        height: 50px;
        border-bottom: #e6e6e6 1px solid;
        align-items: center;
        > .source-first {
          font-size: 16px;
          color: #333333;
        }

        > .source-second {
          color: #445166;
          font-size: 14px;
        }
      }

      > .article-content {
        display: flex;
        justify-content: space-between;
        height: 50px;
        border-bottom: #e6e6e6 1px solid;
        align-items: center;
        > .content-first {
          font-size: 16px;
          color: #333333;
        }

        > .content-second {
          color: #445166;
          font-size: 14px;
        }
      }

      > .article-cover {
        display: flex;
        justify-content: space-between;
        height: 50px;
        border-bottom: #e6e6e6 1px solid;
        align-items: center;
        > .cover-first {
          font-size: 16px;
          color: #333333;
        }

        > .cover-second {
          color: #445166;
          font-size: 14px;
        }
      }

      > .article-Illustration {
        display: flex;
        justify-content: space-between;
        height: 50px;
        border-bottom: #e6e6e6 1px solid;
        align-items: center;
        > .Illustration-first {
          font-size: 16px;
          color: #333333;
        }

        > .Illustration-second {
          color: #445166;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
