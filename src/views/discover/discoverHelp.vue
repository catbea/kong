<template>
  <div class="discoverHelp-page">
    <h2>帮助文档</h2>
    <div class="discoverHelp-page-top">任何模块均可点击进行编辑</div>
    <p><span>1:</span> 成功选中后，会有高亮显示，无用信息可进行删除</p>
    <p><span>2:</span> 不同的活动会带来不同的效果，简介漂亮的封面、适当的文字可以提升用户的点击率。当然，活动的周期和用户期待价值也会直接影响传播效果</p>
    <p><span>3:</span> 合理优化标题，有助于提高文章点开率</p>
    <p><span>4:</span> 提炼导读摘要、文中适当发表精彩观点，有助于形成温度和亲切感、塑造专业度</p>
    <p><span>5:</span> 插入的文字勿用敏感性词语；</p>
    <p><span>6:</span> 勿上传标志性图片／视频，避免侵权；建议使用自己／公司拍摄的资源</p>
    <span class="discoverHelp-page-notes">注：侵权导致一切后果均有发布人自行承担。请发布无版权文章或获取授权后进行发布。</span>
    <button class="discoverHelp-page-btn">我知道了</button>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" >
.discoverHelp-page {
  padding: 27px 16px 16px;
  background-color: #ffffff;
  p {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    margin-bottom: 20px;
    span {
      font-size: 16px;
    }
  }
  .discoverHelp-page-top {
    font-size: 12px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 30px;
    margin-bottom: 35px;
  }
  .discoverHelp-page-btn {
    height: 44px;
    background: rgba(0, 122, 230, 1);
    border-radius: 6px;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    border: 0;
    margin-top: 62px;
  }
  .discoverHelp-page-notes {
    font-size: 14px;
    font-weight: 400;
    color: rgba(234, 77, 46, 1);
    line-height: 20px;
  }
}
</style>
