<template>
  <div class="dynamic-page">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <div v-for="(option ,i) in item.houseDynamicList">
          <p>
            <span></span>
            {{option.dynamicTime}}
          </p>
          <div class="dynamic-page-box">
            <h1>{{option.title}}</h1>
            <h2>{{option.content}}</h2>
          </div>
        </div>
      </li>
      <li class="nomore">-- 没有更多动态了 --</li>
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
        padding-bottom: 30px;
        h1 {
          font-size: 18px;

          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
          padding: 9px 0 4px 0;
        }
        h2 {
          width: 100%;
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
         
         word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;


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
  .nomore{
    font-size: 12px; 
    line-height: 20px;
    text-align: center;
    color: #999; 
    padding-bottom: 20px;
  }
}
</style>
