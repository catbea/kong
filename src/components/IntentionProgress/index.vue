<template>
  <div class="progress-container">
    <van-progress class="progress" :percentage="progress" :color="color" :text-color="textColor" :show-pivot="false" />
    <div class="progress-bottom">
      <div class="progress-text">意向度</div>
      <div class="progress-percent" :style="{color:textColor}">{{progress}}%</div>
    </div>
  </div>
</template>
<script>
import { fullArea } from '@/utils/fullArea'
export default {
  props: {
    progress: { type: Number },
    color: { type: String, default: '#cccccc' },
    textColor: { type: String, default: '#999999' },
  },
  data: () => ({}),
  methods: {
    
  },
}
</script>
<style lang="less">
.progress-container {
    width: 100%;
    .van-progress {
        height: 8px;
    }
  .progress {
    width: 100%;
  }
  .progress-bottom {
      margin-top: 4px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    .progress-text {
      color: #999999;
      font-size: 12px;
    }
    .progress-percent {
        color: #999999;
      font-size: 15px;
    }
  }
}
</style>
