<template>
  <div class="custom-detail-track">
    <div class="shadow_box info-container">
      <div class="info-item" v-for="(item) in trackInfo" :key="item.key">
        <p class="info-title">{{item.key}}</p>
        <p class="info-value">{{item.value}}</p>
      </div>
    </div>
    <ul v-for="(times,index) in trackList" :key="index">
      <!-- <li v-for="(times,key) in trackList" :key="key">
        <p class="content-title">{{times.timeStr | dateTimeFormatter(3,'/')}}</p>
        <div class="content-box" v-for="(item,key) in times.msgList" :key="key">
          <span class="icon-radius" :class="{day:backColor,dayIn:!backColor}"></span>
          <p>{{item.markedWords}}</p>
        </div>
      </li> -->
       <li v-for="(item,key) in times.msgList" :key="key">
        <p class="content-title">{{item.timeStr | dateTimeFormatter(3,'/')}}</p>
        <div class="content-box" >
          <!-- :class="{day:backColor,dayIn:!backColor}" -->
          <span class="icon-radius" id="icon-radius" :class="{day:index==0,dayIn:!times.show_item}"></span>
          <p><span>{{item.clientName}}</span>{{item.clientName ? item.markedWords.replace(item.clientName, '') : item.markedWords}}</p>
        </div>
      </li>
      <!-- <li>
        <p class="content-title">2018年6月15日 16:12</p>
        <div class="content-box">
          <span class="icon-radius" :class="{day:!backColor,dayIn:backColor}"></span>
        <p>当日第<span>3</span> 次浏览了楼盘 碧桂园凤凰国际</p>
        <p>浏览市场<span>大于60s</span> 篇幅<span>小于50%</span></p>
        <p>累计<span>浏览1次</span>该楼盘, 平均<span>停留5.5s</span></p>
        </div>
      </li> -->
    </ul>
  </div>
</template>
<script>
import CustomOperation from './CustomOperation.vue'
export default {
  components: {
    CustomOperation
  },
  props: {
    trackInfo: { type: Array },
    trackList: { type: Array }
  },
  data: () => ({
    backColor: true
  }),

  mounted() {}
}
</script>
<style lang="less">
.custom-detail-track {
  margin-bottom: 60px;
  .info-container {
    margin: 20px 20px 25px;
    padding: 25px 0 19px;
    display: flex;
    justify-content: space-around;
    .info-item {
      text-align: center;
      .info-title {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .info-value {
        font-size: 24px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 36px;
      }
    }
  }
  ul {
    margin-top: 5px;
    .dayIn {
      width: 7px;
      height: 7px;
      background: #e5e5e5;
      top: -13.5px;
      left: -4.5px;
      margin-bottom: 80px;
    }
    .day {
      width: 10px;
      height: 10px;
      background: #007ae6;
      top: -15.5px;
      left: -5.5px;
    }
    li {
      width: 322px;
      margin-left: 24px;
      .content-box {
        border-left: 1px solid #e5e5e5;
        padding-top: 10px;
        position: relative;
        padding-left: 16px;
        padding-bottom: 32px;
        .icon-radius {
          border-radius: 50%;
          position: absolute;
        }
      }
      p {
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 22px;
        flex-wrap: wrap;
        span {
          color: #007ae6;
        }
      }
      .content-title {
        font-weight: 600;
        color: #333333;
        margin-left: 16px;
      }
    }
  }
}
</style>
