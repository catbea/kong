<template>
  <div class="perfect-page">
    <ul class="perfect-page-top">
      <router-link tag="li" to="/user/edit/username">名字
        <div>
          Bela
          <span></span>
        </div>
      </router-link>
      <router-link tag="li" to>主营区域
        <div>
          深圳市 南山区
          <span></span>
        </div>
      </router-link>
      <router-link tag="li" to>所属公司
        <div>尊豪科技</div>
      </router-link>
      <router-link tag="li" to="/user/edit/userMechanism">我的机构
        <div>
          AW大师一号店
          <span></span>
        </div>
      </router-link>
    </ul>
    <div class="perfect-page-button">保存</div>
  </div>
</template>
<script>
export default {
  data: () => ({}),

  created() {}
}
</script>
<style lang="less">
.perfect-page {
  width: 100%;
  height: 100%;
  background: rgba(247, 249, 250, 1);
  .perfect-page-top {
    background: rgba(255, 255, 255, 1);
    li {
      margin-left: 16px;
      width: 345px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid #e6e6e6;
      div {
        font-size: 15px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        display: flex;
        span {
          width: 16px;
          height: 16px;
          margin-top: 3px;
          background: url('../../../../assets/img/perfect/arrow.png') no-repeat;
          background-size: contain;
        }
      }
    }
    li:nth-of-type(3) {
      div {
        margin-right: 17px;
      }
    }
    li:last-child {
      border: none;
    }
  }
  .perfect-page-button {
    width: 343px;
    height: 44px;
    background: rgba(0, 122, 230, 1);
    border-radius: 6px;
    margin: 24px 0 0 16px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    text-align: center;
  }
}
</style>
