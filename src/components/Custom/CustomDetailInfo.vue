<template>
  <div class="custom-detail-info">
    <van-cell v-for="(item,index) in customerInfoList" :key="index" class="cell-item" :title="item.title" is-link :value="item.content" @click="onClick(item, index)"/>
    <area-select :show.sync="areaShow" :code.sync="areaCode" :title="areaTitle" @cancel="cancelHandler" @confirm="confirmHandler"/>
    <picker-select :show.sync="pickerShow" :title="areaTitle" :columns="columns" @cancel="cancelHandler" @confirm="confirmHandler"/>
  </div>
</template>
<script>
import AreaSelect from 'COMP/AreaSelect'
import PickerSelect from 'COMP/PickerSelect'
import CustomOperation from './CustomOperation.vue'
export default {
  props: {
    customerInfoList: {
      type: Array,
      default: () => {
        return [
          { title: '备注名称', content: '暂无' },
          { title: '性别', content: '暂无' },
          { title: '年龄', content: '暂无' },
          { title: '位置', content: '暂无' },
          { title: '手机号', content: '暂无' },
          { title: '来源', content: '暂无' },
          { title: '收入', content: '暂无' },
          { title: '行业', content: '暂无' },
          { title: '购房目的', content: '暂无' }
        ]
      }
    },
    areaShow: { type: Boolean, default: false },
    areaCode: { type: String, default: '440305' },
    areaTitle: { type: String, default: '位置' },
    pickerShow: { type: Boolean, default: false },
    columns: { type: Array }
  },
  components: {
    CustomOperation,
    AreaSelect,
    PickerSelect
  },
  watch: {
    areaShow(val) {
      this.$emit('update:show', val)
    },
    show(val) {
      this.areaShow = val
    },
    pickerShow(val) {
      this.$emit('update:isPickerShow', val)
    },
    isPickerShow(val) {
      this.pickerShow = val
    }
  },
  methods: {
    onClick(item, index) {
      let pram = {
        item: item,
        index: index
      }
      this.$emit('onClick', pram)
    },
    cancelHandler(val) {
      this.$emit('cancel', val)
    },
    confirmHandler(val) {
      this.$emit('confirm', val)
    },
    closeHandler(val) {
      this.$emit('cancel', val)
    }
  }
}
</script>
<style lang="less">
.custom-detail-info {
  margin-bottom: 80px;
  .cell-item {
    height: 56px;
    align-items: center;
    &:active {
      background-color: #fff;
    }
    .van-cell__title {
      font-size: 15px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
    }
    .van-cell__value {
      font-size: 13px;
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
