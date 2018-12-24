<template>
  <div class="line-chart-container">
    <v-chart class="bar-chart" :lineData="lineData" :width="width" :animate="false" prevent-render @on-render="renderLineChart" />
  </div>
</template>
<script>
import { VChart } from 'COMP/Vchart'
export default {
  components: {
    VChart
  },
  props: {
    lineData: { type: Array }
  },
  data: () => ({
    width: 0
    // data: [
    //   { time: 1514764800000, count: 11, a: '1' },
    //   { time: 1514851200000, count: 13, a: '1' },
    //   { time: 1514937600000, count: 12, a: '1' },
    //   { time: 1515024000000, count: 14, a: '1' },
    //   { time: 1515110400000, count: 11, a: '1' },
    //   { time: 1515196800000, count: 15, a: '1' },
    //   { time: 1515283200000, count: 24, a: '1' }
    // ]
  }),
  created() {},
  mounted() {
    this.width = document.getElementsByClassName('line-chart-container')[0].offsetWidth
  },
  methods: {
    renderLineChart({ chart }) {
      chart.source(this.lineData, {
        time: {
          type: 'timeCat',
          mask: 'MM/DD',
          nice: true
        }
      })
      chart.tooltip(false)
      chart
        .area()
        .position('time*count')
        .color('l(90) 0:#1890FF 1:#f7f7f7')
        .shape('smooth')
      chart
        .line()
        .position('time*count')
        .shape('smooth')
      chart
        .point()
        .position('time*count')
        .shape('smooth')
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
      this.lineData.map(obj => {
        chart.guide().text({
          position: [obj.time, obj.count],
          content: obj.count,
          style: {
            color: '#2f7bdf',
            textBaseline: 'bottom',
            textAlign: 'center'
          },
          offsetY: -5
        })
      })
      chart.render()
    }
  }
}
</script>
