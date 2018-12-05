<template>
  <div class="dynamic-page">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <p>
          <span></span>
          2018年6月15日
        </p>
        <div class="dynamic-page-box">
          <h1>山水江南现有3-4房在售</h1>
          <h2>山水江南项目56-82平的小户型房源已售完，目前仅 剩余2013-122平米3-4房在售3-122平米3-4房</h2>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    list: [1, 2, 3, 4]
  })
}
</script>
<style lang="less">
.dynamic-page {
  ul {
    li {
      margin-left: 18px;
      display: flex;
      flex-direction: column;
      p {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        span {
          width: 7px;
          height: 7px;
          background: rgba(229, 229, 229, 1);
          margin-right: 12px;
          border-radius: 50%;
        }
      }
      .dynamic-page-box {
        width: 323px;
        padding-left: 15px;
        margin-left: 3px;
        border-left: 1px solid rgba(229, 229, 229, 1);
        h1 {
          font-size: 18px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
          margin: 9px 0 4px 0;
        }
        h2 {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
          margin-bottom: 30px;
        }
      }
    }
    li:first-child {
      p {
        span {
          width: 7px;
          height: 7px;
          background: rgba(0, 122, 230, 1);
        }
      }
    }
  }
}
</style>
