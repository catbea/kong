<template>
 <div class="van-Area-page">
  <van-popup v-model="isShow" position="bottom" @click-overlay="closeHandler">
    <div class="select-city">
      <span class="bg_img search-icon" :style="{backgroundImage:'url(' + searchIcon + ')'}"></span>
     <span>请慎重选择主营区域</span> 
    </div>
    <van-area :area-list="areaList" :value="code" :title="title" @cancel="cancelHandler" @confirm="confirmHandler" />
  </van-popup>
  </div>
</template>
<script>
import { fullArea } from '@/utils/fullArea'
export default {
  props: {
    show: { type: Boolean, default: false },
    areaList: {
      type: Object,
      default: function() {
        return fullArea
      }
    },
    code: { type: String },
    title: { type: String }
  },
  data: () => ({
    isShow: false,
    searchIcon: require('IMG/register/searchIcon@2x.png')
  }),
  methods: {
    confirmHandler(val) {
      this.$emit('confirm', val)
    },
    cancelHandler(val) {
      this.$emit('cancel', val)
    },
    closeHandler(val) {
      this.$emit('cancel', val)
    }
  },
  watch: {
    show(val) {
      this.isShow = val
    },
    isShow(val) {
      this.$emit('update:show', val)
    },
    code(val) {
      this.value = val
    },
    value(val) {
      this.$emit('update:code', val)
    }
  }
}
</script>
<style lang="less">
.van-Area-page{
.select-city{
  padding:0 0 0 15px;
  width:100%;
  height:40px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(153,153,153,1);
  display: flex;
  align-items: center;
  .search-icon{
    width:16px;
    height:16px;
    margin-right:7px;
  }
}
.van-area{
  // .van-ellipsis{
  //   color:#999999;
  // }
  .van-picker__toolbar{
    border-top:2px solid #999999;
    border-bottom:2px solid #999999;
  }
}
}
</style>
