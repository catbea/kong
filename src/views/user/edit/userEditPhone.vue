<template>
  <div class="user-edit-phone-page">
   <div class="user-edit-phone">
      <p class="edit-phone-title">注册手机<span class="edit-phone-remark">(不可更改)</span></p>
      <p class="edit-phone-conter"><input type="text" class="edit-phone-input" placeholder="Bela" value="13590200739"></p>
      <p class="edit-phone-card">名片展示手机号</p>
      <p class="edit-phone-card-conter"><input type="text" class="edit-phone-card-input" placeholder="Bela" value="13590200739"></p>
      <button class=edit-phone-query>确认修改</button>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.user-edit-phone-page {
  > .user-edit-phone {
    margin: 27px 16px;
    > .edit-phone-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      > .edit-phone-remark {
        font-size: 15px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
      }
    }
    > .edit-phone-card {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
    > .edit-phone-card-conter {
      > .edit-phone-card-input {
        font-size: 15px;
        font-weight: 500;
        color: #666666;
        line-height: 21px;
        width: 99%;
        border: 0;
        border-bottom: 1px solid #eeeeee;
      }
    }
    > .edit-phone-conter {
      margin-bottom: 24px;
      > .edit-phone-input {
        font-size: 15px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
        width: 99%;
        border: 0;
        border-bottom: 1px solid #eeeeee;
      }
    }

    > .edit-phone-query {
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
