<template>
  <div class="easy-look-body">
    <div class="easy-look-list">
      <div class="easy-look-time">
        <span class="time-text">1月9日</span>
      </div>
      <div class="easy-look-item">
        <div class="easy-look-left">
          <img class="easy-look-img" :src="myImage">
        </div>
        <div class="easy-look-right">
          <span class="easy-look-title">厦门今年第二批9000套保障性商品房上午摇号</span>
          <div class="easy-look-bottom">
            <span class="easy-look-text">12好看</span>
            <span class="easy-look-comment">12好看</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      myImage: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg'
    }
  }
}
</script>

<style lang="less">
.easy-look-body {
  width: 100%;
  height: 100%;
  background: rgba(247, 249, 250, 1);

  > .easy-look-list {
    width: 100%;
    display: flex;
    border-bottom: #e2e2e3 1px solid;
    background: #ffffff;
    flex-direction: column;
    > .easy-look-time {
      display: flex;
      width: 100%;
      height: 47px;
      background: rgba(247, 249, 250, 1);
      align-items: flex-end;
      > .time-text {
        color: #445166;
        font-size: 16px;
        margin-left: 15px;
        margin-bottom: 7px;
      }
    }

    > .easy-look-item {
      width: 100%;
      height: 122px;
      display: flex;
      justify-content: space-between;
      padding-left: 16px;
      padding-right: 16px;

      > .easy-look-left {
        width: 150px;
        height: 122px;
        display: flex;
        align-items: center;

        > .easy-look-img {
          width: 120px;
          height: 90px;
          border-radius: 6px;
        }
      }

      > .easy-look-right {
        display: flex;
        margin-top: 16px;
        flex-direction: column;
        padding-left: 11px;

        > .easy-look-title {
          color: #445166;
          font-size: 14px;
        }

        > .easy-look-bottom {
         margin-top: 30px;

          > .easy-look-text {
            color: #445166;
            font-size: 14px;
          }

          > .easy-look-comment {
            color: #445166;
            font-size: 14px;
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>

