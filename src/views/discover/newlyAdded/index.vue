<template>
  <div class="page-body" id="page-body" :style="{marginTop:offesTop}">
    <div class="copyTitle">请复制原文链接</div>
    <div class="notice-view">目前仅支持：微信公众号、今日头条、腾讯新闻、AW大师分享内容，如有侵权行为，发布人将承担相关责任</div>
    <!-- <textarea class="linker-input" :placeholder="defaultText" v-model="linkerText"></textarea> -->
    <div class="linker-input">
      <textarea
        class="linker-input-body"
        :placeholder="defaultText"
        v-model="linkerText"
        @focus="getFocus"
        @blur="getBlur"
      ></textarea>
    </div>
    <div class="start-edit" @click="startEdit">开始编辑</div>
    <div class="clear-address" @click="clearAddress">清空地址</div>
    <div class="add-article" @click="addArticle">添加文章</div>
    <div class="tips" @click='goAgreement'>点击开始编辑即为同意<b>责任声明及解析文章协议</b></div>
  </div>
</template>

<script>
import articleService from 'SERVICE/articleService'
export default {
  data: () => ({
    defaultText: '请点击喜欢的微信公众号文章右上角更多进行复制，并粘贴到这里',
    linkerText: '',
    addButtonClick: true,
    editButtonClick: true,
    offesTop: ''
  }),

  // mounted() {
  //   document.body.addEventListener(
  //     'touchmove',
  //     function(e) {
  //       e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
  //     },
  //     { passive: false }
  //   ) // passive 参数不能省略，用来兼容ios和android
  // },

  // beforeDestroy() {
  //   document.getElementById('page-body').removeEventListener('touchmove', function(e) {
  //     e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
  //   })
  // },

  methods: {
    // 跳转规则页面
    goAgreement () {
      this.$router.push('/discover/agreement')
    },
    //开始编辑
    startEdit() {
      // 去掉中文和空格
      this.linkerText = this.linkerText.replace(/[\u4e00-\u9fa5\s]+/g, '')
      if (!this.editButtonClick) {
        return false
      }
      this.editButtonClick == false
      if (!this.linkerText.length) {
        return this.$toast('您尚未填写原文链接')
      }
      let reg = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/g
      if (!reg.test(this.linkerText)) {
        return this.$toast('原文链接填写不正确，请检查!')
      }
      // this.linkerText = this.linkerText.replace(/\s+/g, '')
      this.$router.push({ name: 'analysis', query: { url: this.linkerText, parseType: '1' } })
      // if (this.linkerText.length > 0) {
      //   this.linkerText = this.linkerText.replace(/\s+/g, '')
      //   if (this.editButtonClick == true) {
      //     this.$router.push({ name: 'analysis', query: { url: this.linkerText, parseType: '1' } })
      //   }
      // } else {
      //   this.editButtonClick = true
      //   this.$toast('您尚未填写原文链接')
      // }
    },

    //清除输入框地址信息
    clearAddress() {
      this.linkerText = ''
    },

    //获取焦点
    getFocus() {
      // this.offesTop = '20px'
    },

    //失去焦点问题
    getBlur() {
      document.activeElement.scrollIntoViewIfNeeded(true)
    },

    //添加文章
    addArticle() {
      if (this.linkerText.length > 0) {
        if (this.addButtonClick == true) {
          this.$router.push({ name: 'analysis', params: { url: this.linkerText, parseType: '2' } })
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
          .then(async () => {})
      } else {
        this.addButtonClick = true
        this.$router.push({ name: 'historicalArticles', query: { typeCode: '3' } })
      }
    }
  },
  beforeDestroy() {
    try {
      document.body.removeEventListener('touchmove')
    } catch (error) {}
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
    font-weight: bolder;
  }

  > .notice-view {
    color: #666666;
    font-size: 12px;
    margin-left: 16px;
    margin-top: 5px;
    margin-right: 16px;
    line-height: 1.2;
  }

  > .linker-input {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    border: #e4e6f0 1px solid;
    margin-top: 46px;
    height: 126px;

    > .linker-input-body {
      color: #13284D;
      font-size: 16px;
      line-height: 20px;
      padding: 10px;
      width: 100%;
      height: 100%;
      border: none;
      &::placeholder{
        font-size: 12px;
        line-height: 20px;
        color: #9CA5B5;
      }
    }
  }

  > .clear-address {
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

  > .add-article {
    display: none;
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
    margin-top: 40px;
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
  .tips{
    margin: 20px auto;
    width: 90%;
    color: #969EA8;
    font-size: 12px;
    b{
      margin-left: 5px;
      color: #445166;
      font-weight: 500;
    }
  }
}
</style>
