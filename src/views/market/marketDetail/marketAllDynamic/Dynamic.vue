<template>
  <div class="dynamic-page">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <p>
          <span></span>
          {{item.houseDynamicList[0].dynamicTime}}
        </p>
        <div class="dynamic-page-box">
          <h1>{{item.houseDynamicList[0].title}}</h1>
          <h2>{{item.houseDynamicList[0].content}}</h2>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import MarketService from 'SERVICE/marketService'
export default {
  created() {
    this.linkerId = this.$route.params.id
    this.getAllDynamicListInfo(this.linkerId)
  },
  data: () => ({
    list: [],
    linkerId: null
  }),
  methods: {
    async getAllDynamicListInfo(id) {
      let res = await MarketService.getAllDynamicList(id)
      this.list = res
    }
  }
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

          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
          margin: 9px 0 4px 0;
        }
        h2 {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
          margin-bottom: 30px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;


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
