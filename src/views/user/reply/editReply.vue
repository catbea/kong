<template>
    <div class="edit-body">
        <div class="input-body">
            <textarea class="input-content-body" placeholder="请输入自动回复内容"></textarea>
        </div>
        <div class="bottom-body">
            <div class="cancel-view">取消</div>
            <div class="sure-view">保存</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>


<style lang="less" scoped>
.edit-body {
  width: 100%;
  height: 100%;
  background: rgba(247, 249, 250, 1);

  > .input-body {
    width: 100%;
    background: white;
    padding-top: 24px;
    padding-bottom: 24px;
    padding-left: 16px;
    padding-right: 16px;

     > .input-content-body {
      font-size: 15px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 21px;
      border: 0;
      height: 42px;
    }
  }

  > .bottom-body {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;

   

    > .cancel-view {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 163px;
      height: 44px;
      border-radius: 6px;
      border: 1px solid rgba(0, 122, 230, 1);
      color: #007ae6;
      margin-right: 8.5px;
    }

    > .sure-view {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 163px;
      height: 44px;
      background: rgba(0, 122, 230, 1);
      border-radius: 6px;
      color: white;
      margin-left: 8.5px;
    }
  }
}
</style>
