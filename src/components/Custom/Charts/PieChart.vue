<template>
  <div class="pie-chart-container">
    <v-chart class="pie-chart" :data="data" :width="width" :animate="false" prevent-render @on-render="renderPieChart"></v-chart>
  </div>
</template>
<script>
import { VChart } from 'COMP/Vchart'
export default {
  components: {
    VChart
  },
  data: () => ({
    width: 0,
    data: [
      { name: '活动', percent: 0.14, a: '1', color: '#a7c3e3' },
      { name: '我', percent: 0.42, a: '1', color: '#2f7bdf' },
      { name: '楼盘', percent: 0.26, a: '1', color: '#5a9be0' },
      { name: '文章', percent: 0.18, a: '1', color: '#7eace1' }
    ]
  }),
  mounted() {
    this.width = document.getElementsByClassName(
      'pie-chart-container'
    )[0].offsetWidth
  },
  methods: {
    renderPieChart({ chart }) {
      chart.source(this.data)
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
        label1: function label2(data) {
          return {
            text: Math.floor(data.percent * 100) + '%',
            fill: '#333333',
            fontWeight: 'bold'
          }
        },
        label2: function label1(data, color) {
          return {
            text: data.name,
            fill: color
          }
        }
      })
      chart
        .interval()
        .position('a*percent')
        .color('name', ['#a7c3e3', '#2f7bdf', '#5a9be0', '#7eace1'])
        .adjust('stack')
      chart.render()
    }
  }
}
</script>
<style lang="less">
</style>
