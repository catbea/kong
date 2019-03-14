<template>
  <div class="body-content">
    <div class="body-title">
      <img class="success-icon" :src="joinSuccess">
      <p class="success-text">参加成功</p>
    </div>
    <span class="success-notice">恭喜你参与了惠湾联盟试运营活动获得奖励如下</span>
    <div class="build-box">
      <div class="build-list">
        <div class="build-card">
          <div class="build-img" :style="{backgroundImage:'url(' + joinSuccess + ')'}"></div>
        </div>
        <div class="build-card"></div>
        <div class="build-card"></div>
        <div class="build-card"></div>
      </div>
      <div class="check-more">展开更多</div>
    </div>
    <div class="notice-bottom">
      <p>您获得的楼盘如已开通</p>
      <p>会在现有的剩余时间上叠加楼盘的活动赠送时间</p>
    </div>
    <div class="join-btn" :style="{backgroundImage:'url(' + joinBtn + ')'}">管理楼盘</div>
  </div>
</template>


<script>
export default {
  data: () => ({
    joinSuccess: require('IMG/activity/join_success.png'),
    joinBtn: require('IMG/activity/join_btn.png'),
    feelLabel: require('IMG/activity/feel_label.png')
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
    margin-bottom: 21px;
    width: 80%;
    min-height: 398px;
    max-height: 80%;
    background: linear-gradient(137deg, rgba(255, 170, 45, 1) 0%, rgba(255, 113, 20, 1) 100%);
    border-radius: 8px;
    margin-left: 10%;

    .build-list {
      width: 100%;
      flex-wrap: wrap;
      display: flex;
      padding-top: 19px;

      .build-card {
        height: 157px;
        width: 42%;
        margin-left: 5%;
        background-color: white;
        border-radius: 8px;
        margin-bottom: 12px;

        .build-img {
          width: 100%;
          height: 104px;
        }

        .feel-label {
        }
      }
    }

    .check-more {
      font-size: 12px;
      color: white;
      display: flex;
      justify-content: center;
      margin-bottom: 21px;
      margin-top: 15px;
    }
  }

  .notice-bottom {
    margin-top: 13px;
    width: 80%;
    margin-left: 10%;

    p {
      color: white;
      font-size: 12px;
      line-height: 20px;
    }
  }

  .join-btn {
    width: 84%;
    margin-left: 8%;
    height: 44px;
    background-size: 320px 50px;
    margin-top: 16px;
    font-size: 15px;
    color: white;
    line-height: 44px;
    text-align: center;
  }
}
</style>
