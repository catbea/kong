<template>
  <div class="user-edit-wechat-page">
    <div class="user-edit-wechat">
      <p class="edit-wechat-title">个人介绍</p>
      <p class="edit-wechat-conter"><input type="text" class="edit-wechat-input" placeholder="十年房产置业生涯专业为您服务"></p>
      <button class=edit-wechat-query>确认修改</button>
    </div>
  </div>
</template>
<script>
export default {}
</script>

<style lang="less">
.user-edit-wechat-page {
  > .user-edit-wechat{
    margin: 27px 16px;
 > .edit-wechat-title {
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
  }
  > .edit-wechat-conter{
> .edit-wechat-input {
    font-size: 15px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 21px;
    width: 99%;
        border: 0;
    border-bottom: 1px solid #EEEEEE;
  }
  }
  > .edit-wechat-berak{
    font-size:12px;
font-weight:500;
color:rgba(153,153,153,1);
line-height:17px;
  }
  > .edit-wechat-query {
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    height: 44px;
    background: rgba(0, 122, 230, 1);
    border-radius: 4px;
    width: 100%;
    border: 0;
    margin-top: 25px; 
  }
  }
 
}
</style>
