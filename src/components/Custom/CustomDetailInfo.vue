<template>
  <div class="custom-detail-info">
    <!-- <cell-group> -->
    <cell
        v-for="(item,index) in list"
        :key="index"
        class="cell-item"
        :title="item.title"
        is-link
        :to="'/user/edit/username'"  
        :value="item.content"
      />
      <!-- </cell-group> -->
    <custom-operation></custom-operation>
  </div>
</template>
<script>
import { Cell } from 'vant'
import CustomOperation from './CustomOperation.vue'
export default {
  props: {},
  data: () => ({
    list: [
      { title: '备注名称', content: '备注名称' },
      { title: '性别', content: '备注名称' },
      { title: '年龄', content: '备注名称' },
      { title: '位置', content: '备注名称' },
      { title: '手机号', content: '备注名称' },
      { title: '来源', content: '备注名称' },
      { title: '收入', content: '备注名称' },
      { title: '行业', content: '备注名称' },
      { title: '购房目的', content: '备注名称' }
    ]
  }),
  components: {
    CustomOperation,
    Cell
  }
}
</script>
<style lang="less">
.custom-detail-info {
  .cell-item {
    height: 56px;
    align-items: center;
    .van-cell__title {
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
    }
    .van-cell__value {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #666666;
      line-height: 22px;
    }
    .van-cell__right-icon {
      margin-bottom: 1.5px;
    }
  }
  .cell-item:nth-child(6) {
    .van-cell__value {
      color: #dddddd;
    }
  }
}
</style>
