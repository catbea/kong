<template>
  <div class="search">
        <div class="location">
          深圳
          <span></span>
        </div>
        <span class="line"></span>
        <div class="magnify">
          
        </div>
        <div class="input">
        <input type="text" placeholder="请输入平台名称">
        </div>
      </div>
</template>
<style lang="less">
.search {
  display: flex;
  // width: 306px;
  height: 30px;
  // line-height: 30px;
  background: #f5f5f5;
  margin-left: 15px;
  margin-top: 7px;
  border-radius: 4px;
  .location {
    display: flex;
    // width:48px;
    // height:18px;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-left: 16px;
    margin-top: 6px;
    span:nth-child(1) {
      background: url('../../assets/img/market/list__arrow_.png') no-repeat;
      background-size: 20px 18px;
      display: block;
      width: 16px;
      height: 16px;
    }
  }
  .line {
    width: 1px;
    height: 14px;
    background: rgb(230, 230, 230);
    margin-left: 10px;
    margin-top: 9px;
  }
  .magnify {
    width: 24px;
    height: 24px;

    margin-top: 3px;
    margin-left: 12px;
    background: url('../../assets/img/market/Group 3.png') no-repeat;
    background-size: 26px 26px;
  }
  .input {
    margin-left: 5px;
    width: 200px;
    input {
      display: block;
      border: none;
      font-size: 13px;
      height: 30px;
      width: 100%;
      background: #f5f5f5;
    }
  }
}
</style>
