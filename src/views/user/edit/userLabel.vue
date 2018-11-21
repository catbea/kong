<template>
  <div class="user-edit-label-page">
    <div class="user-edit-label">
      <p class="edit-label-title">选择标签</p>
      <p class="edit-label-conter">
        <span class="edit-label-span">资深中介</span>
      </p>
      <button class=edit-label-query>确认修改</button>
    </div>
  </div>
</template>
<script>
export default {}
</script>

<style lang="less">
.user-edit-label-page {
  > .user-edit-label{
    margin: 27px 16px;
 > .edit-label-title {
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
  }
  > .edit-label-conter{
    > .edit-label-span{

    }
  }
  
  > .edit-label-query {
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
