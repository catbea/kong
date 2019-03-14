<template>
  <div class="body-content">
    <div class="body-title">
      <img class="success-icon" :src="joinSuccess">
      <p class="success-text">参加成功</p>
    </div>
    <span class="success-notice">恭喜你参与了惠湾联盟试运营活动获得奖励如下</span>
    <div class="build-box"></div>
  </div>
</template>


<script>
export default {
  data: () => ({
    joinSuccess: require('IMG/activity/join_success.png')
  })
}
</script>


<style lang="less">
.body-content {
  background: linear-gradient(90deg, rgba(255, 156, 56, 1) 0%, rgba(235, 93, 42, 1) 100%);
  width: 100%;
  height: 100%;

  .body-title {
    width: 100%;
    margin-top: 37px;
    display: flex;
    justify-content: center;

    .success-icon {
      width: 20px;
      height: 20px;
    }

    .success-text {
      color: white;
      font-size: 20px;
      margin-left: 5px;
    }
  }
  .success-notice {
    margin-top: 10px;
    font-size: 12px;
    color: white;
    display: flex;
    justify-content: center;
  }

  .build-box {
    margin-top: 27px;
    width: 80%;
    min-height: 398px;
    background: linear-gradient(137deg, rgba(255, 170, 45, 1) 0%, rgba(255, 113, 20, 1) 100%);
    border-radius: 8px;
    margin-left: 10%;
  }
}
</style>
