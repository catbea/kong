<template>
  <div class="pie-chart-container">
    <v-chart class="pie-chart" v-if="pieData.length" :pieData="pieData" :width="width" :animate="false" prevent-render @on-render="renderPieChart"></v-chart>
  </div>
</template>
<script>
import { VChart } from 'COMP/Vchart'
export default {
  components: {
    VChart
  },
  props: {
    pieData: { type: Array },
  },
  created () {
    console.log('+++++++++'+this.pieData)
  },
  data: () => ({
    width: 0,
    // pieData: [
    //   { name: '我', percent: 0.42, a: '1', color: '#2f7bdf' },
    //   { name: '楼盘', percent: 0.26, a: '1', color: '#5a9be0' },
    //   { name: '文章', percent: 0.18, a: '1', color: '#7eace1' }
    // ]
  }),
  mounted() {
    this.width = document.getElementsByClassName(
      'pie-chart-container'
    )[0].offsetWidth
  },
  methods: {
    renderPieChart({ chart }) {
      chart.source(this.pieData)
      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.4,
        radius: 0.85
      })
      chart.axis(false)
      chart.legend(false)
      chart.tooltip(false)
      // 添加饼图文本
      chart.pieLabel({
        sidePadding: 40,
        label1: function label2(pieData) {
          return {
            text: Math.floor(pieData.percent * 100) + '%',
            fill: '#333333',
            fontWeight: 'bold'
          }
        },
        label2: function label1(pieData, color) {
          return {
            text: pieData.name,
            fill: color
          }
        }
      })
      chart
        .interval()
        .position('a*percent')
        .color('name', ['#2f7bdf', '#5a9be0', '#7eace1'])
        .adjust('stack')
      chart.render()
    }
  }
}
</script>
<style lang="less">
</style>
