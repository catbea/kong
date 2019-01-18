<template>
  <div class="page-body">
    <div class="copyTitle">请复制原文链接</div>
    <div class="notice-view">目前仅支持爬取微信公众号内容，如有侵权行为，发布人将承担相关责任</div>
    <textarea class="linker-input" :placeholder="defaultText" v-model="linkerText"></textarea>
    <div class="clear-address" @click="clearAddress">清空地址</div>
    <div class="add-article" @click="addArticle">添加文章</div>
    <div class="start-edit" @click="startEdit">开始编辑</div>
  </div>
</template>

<script>
import articleService from 'SERVICE/articleService'
export default {
  data: () => ({
    defaultText: '请点击喜欢的微信公众号文章右上角更多进行复制。并粘贴到这里',
    linkerText: '',
    addButtonClick: true,
    editButtonClick: true
  }),

  methods: {
    //开始编辑
    startEdit() {
      if (this.linkerText.length > 0) {
        if (this.editButtonClick == true) {
          this.$router.push({ name: 'analysis', params: { url: this.linkerText } })
        }
      } else {
        this.editButtonClick = true
        this.$toast('您尚未填写原文链接')
      }
    },

    //清除输入框地址信息
    clearAddress() {
      this.linkerText = ''
    },

    //添加文章
    addArticle() {
      if (this.linkerText.length > 0) {
        let obj = {
          articleUrl: this.linkerText
        }
        if (this.addButtonClick == true) {
          this.commitInfo(obj)
        }
      } else {
        this.addButtonClick = true
        this.$toast('您尚未填写原文链接')
      }
    },

    //commitInfo
    async commitInfo(data) {
      this.addButtonClick = false
      const result = await articleService.articleAnalysis(data)
      if (result.returnCode == '31102') {
        this.addButtonClick = true
        this.$dialog
          .alert({
            title: '爬取失败',
            message: '请确认内容是否为微信公众号内容，并检查网络环境后再次尝试',
            confirmButtonText: '我知道了'
          })
          .then(() => {
            // on close
          })
      } else {
        this.addButtonClick = true
        this.$router.push({ name: 'historicalArticles', query: { typeCode: '3' } })
      }
    }
  }
}
</script>
<style lang="less">
.page-body {
  width: 100%;
  height: 100%;
  background: #ffffff;

  > .copyTitle {
    font-size: 24px;
    color: #333333;
    margin-top: 27px;
    margin-left: 16px;
  }

  > .notice-view {
    color: #666666;
    font-size: 12px;
    margin-left: 16px;
    margin-top: 5px;
    margin-right: 16px;
  }

  > .linker-input {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    border: #e4e6f0 1px solid;
    margin-top: 46px;
    height: 126px;
    padding: 10px;
    color: #c8cacc;
    font-size: 16px;
  }

  > .clear-address {
    margin-top: 40px;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    background: rgba(242, 248, 254, 1);
    border-radius: 6px;
    font-size: 16px;
    text-align: center;
    line-height: 44px;
    color: #445166;
  }

  > .add-article {
    margin-top: 20px;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    background: rgba(242, 248, 254, 1);
    border-radius: 6px;
    font-size: 16px;
    text-align: center;
    line-height: 44px;
    color: #445166;
  }

  > .start-edit {
    margin-top: 20px;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    background: rgba(0, 122, 230, 1);
    border-radius: 6px;
    height: 44px;
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    line-height: 44px;
  }
}
</style>
