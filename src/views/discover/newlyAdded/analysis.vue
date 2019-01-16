<template>
  <div class="analysis-body">
    <div class="progress-body">
      <van-loading type="spinner"/>
      <span>解析中</span>
    </div>
    <div class="article-body">
      <div class="article-title">
        <span class="title-first">标题</span>
        <span class="title-second">厦门今年第二批9000套保障性···</span>
      </div>
      <div class="article-source">
        <span class="source-first">来源</span>
        <span class="source-second">楚天都市报</span>
      </div>
      <div class="article-content">
        <span class="content-first">正文</span>
        <span class="content-second">获取失败</span>
      </div>
      <div class="article-cover">
        <span class="cover-first">封面</span>
        <span class="cover-second">40/44（获取中…)</span>
      </div>
      <div class="article-Illustration">
        <span class="Illustration-first">插画</span>
        <span class="Illustration-second">获取准备中…</span>
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
      articleUrl: ''
    }
  },

  created() {
    this.articleUrl = this.$route.params.url
    let obj = {
      articleUrl: this.articleUrl
    }
    this.commitInfo(obj)
  },

  methods: {
    //commitInfo
    async commitInfo(data) {
      const result = await articleService.articleAnalysis(data)
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
