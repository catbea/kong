<template>
  <div class="analysis-body">
    <div class="progress-body">
      <van-loading type="spinner" :style="{display:showLoading}"/>
      <span>{{analysisText}}</span>
    </div>
    <div class="article-body">
      <div class="article-title">
        <span class="title-first">标题</span>
        <span class="title-second">{{title}}</span>
      </div>
      <div class="article-source">
        <span class="source-first">来源</span>
        <span class="source-second">{{source}}</span>
      </div>
      <div class="article-content">
        <span class="content-first">正文</span>
        <span class="content-second">{{content}}</span>
      </div>
      <div class="article-cover">
        <span class="cover-first">封面</span>
        <span class="cover-second">{{icon}}</span>
      </div>
      <div class="article-Illustration">
        <span class="Illustration-first">插画</span>
        <span class="Illustration-second">{{imgNum}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import articleService from 'SERVICE/articleService'
export default {
  data() {
    return {
      cancelCollection: require('IMG/user/myWrite/cancelCollection.png'),
      articleUrl: '',
      showLoading: 'block',
      analysisText: '解析中',
      title: '',
      source: '',
      content: '',
      icon: '',
      imgNum: ''
    }
  },

  created() {
    this.articleUrl = this.$route.params.url
    let obj = {
      articleUrl: 'https://mp.weixin.qq.com'
    }
    this.commitInfo(obj)
  },

  methods: {
    //commitInfo
    async commitInfo(data) {
      const result = await articleService.articleAnalysis(data)

      if (result.returnCode == '31100') {
        this.showLoading = 'none'
        this.analysisText = '解析失败'
        this.title = '获取失败'
        this.source = '获取失败'
        this.content = '获取失败'
        this.icon = '获取失败'
        this.imgNum = '获取失败'
      } else {
        this.analysisText = '解析成功'
        this.showLoading = 'none'
        this.title = result.title
        this.source = result.source
        this.content = result.content
        this.icon = result.icon
        this.imgNum = result.imgNum
      }
    }
  }
}
</script>
<style lang="less">
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
</style>
