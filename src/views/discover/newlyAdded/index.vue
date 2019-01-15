<template>
    <div class="page-body">
        <div class="copyTitle">请复制原文链接</div>
        <div class="notice-view">目前仅支持爬取微信公众号内容，如有侵权行为，发布人将承担相关责任</div>
        <textarea class="linker-input" :placeholder="defaultText"></textarea>
        <div class="clear-address">清空地址</div>
        <div class="add-article">添加文章</div>
        <div class="start-edit" @click="startEdit">开始编辑</div>
    </div>
</template>

<script>
export default {
  data: () => ({
    defaultText: '请点击喜欢的微信公众号文章右上角更多进行复制。并粘贴到这里'
  }),

  methods: {
    //开始编辑
    startEdit() {
      this.$router.push({ name: 'analysis' })
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
