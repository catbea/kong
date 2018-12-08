<template>
  <div class="bar-chart-container">
    <v-chart class="bar-chart" :barData="barData" :width="width" :animate="false" prevent-render @on-render="renderBarChart" />
  </div>
</template>
<script>
import { VChart } from 'COMP/Vchart'
export default {
  components: {
    VChart
  },
  props: {
    barData: { type: Array }
  },
  created() {},
  data: () => ({
    width: 0
    // data: [
    //   { type: '名片', count: 3, shadow: 100 },
    //   { type: '楼盘', count: 6, shadow: 100 },
    //   { type: '文章', count: 8, shadow: 100 },
    //   { type: '活动', count: 3000, shadow: 100 },
    //   { type: '聊天', count: 11, shadow: 100 }
    // ]
  }),
  mounted() {
    this.width = document.getElementsByClassName('pie-chart-container')[0].offsetWidth
  },
  methods: {
    renderBarChart({ chart }) {
      this.barData.map(obj => {
        obj.virtualCount = obj.count > 99 ? 99 : obj.count
      })
      chart.source(this.barData, {
        count: {
          range: [0, 100]
        }
      })
      chart.axis('shadow', false)
      chart.axis('virtualCount', false)
      chart.legend(false)
      chart
        .interval()
        .position('type*shadow')
        .color('#F5F5F5')
        .size(10)
        .style({
          radius: 3
        })
      chart
        .interval()
        .position('type*virtualCount')
        .color('type', val => {
          return val === '聊天' ? '#f6bc51' : '#2f7bdf'
        })
        .size(10)
        .style({
          radius: 3
        })
      this.barData.map(obj => {
        chart.guide().text({
          position: [obj.type, obj.virtualCount],
          content: obj.count,
          style: {
            color: obj.type === '聊天' ? '#f6bc51' : '#2f7bdf',
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
