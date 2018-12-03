<template>
  <div class="more-filter" v-if="show">
    <div class="item-container" v-for="(group,mainKey) in conf" :key="mainKey">
      <h5 class="item-title">{{group.name}}</h5>
      <div class="item-list-container">
        <div class="item" v-for="(item,index) in group.node" :key="index">{{item}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: { type: Boolean, default: false },
  },
  data: () => ({
    conf: {
      size: {
        name: '面积',
        node: {
          '-1,50': '50㎡以下',
          '50,70': '50-70㎡',
          '70,90': '70-90㎡',
          '90,110': '90-110㎡',
          '110,130': '110-130㎡',
          '130,150': '130-150㎡',
          '150,200': '150-200㎡',
          '200,-1': '200㎡以上'
        }
      },
      type: {
        name: '户型',
        node: {
          '1': '一室',
          '2': '二室',
          '3': '三室',
          '4': '四室',
          '5': '五室',
          '-1': '五室以上'
        }
      },
      feature: {
        name: '特色(多选)',
        node: {
          '100': '全景看房',
          '200': '优惠楼盘'
        }
      },
      sellStatus: {
        name: '销售状态',
        node: {
          '0': '热销中',
          '1': '即将发售',
          '2': '售罄'
        }
      },
      openStatus: {
        name: '开通状态',
        node: {
          '1': '已开通',
          '2': '已过期',
          '3': '未开通'
        }
      },
      attentionStatus: {
        name: '关注状态',
        node: {
          '0': '已关注',
          '1': '未关注'
        }
      }
    }
  })

}
</script>
<style lang="less">
.more-filter {
  width: 100%;
  height: 82%;
  background-color: #fff;
  padding: 15px;
  overflow: scroll;
  > .item-container {
    > .item-title {
      font-size: 15px;
      font-weight: 400;
      color: #333333;
    }
    > .item-list-container {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
      > .item {
        font-size: 13px;
        color:#445166;
        background-color: #F2F5F9;
        border-radius: 6px;
        padding: 5px 10px;
        margin: 5px 10px;
      }
    }
  }
}
</style>

