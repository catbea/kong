<template>
 <div class="more-page" v-if="show">
  <div class="van-hairline--top more-filter" :class="{act:flag}" ref="moreFilter">
    <div class="item-container" v-for="(group,mainKey) in conf" :key="mainKey">
      <h5 class="item-title">{{group.name}}</h5>
      <div class="item-list-container">
        <div class="item" :class="activeCheck(mainKey, index)" v-for="(item,index) in group.node" :key="index" @click="itemClickHandler(mainKey,index)">{{item}}</div>
      </div>
    </div>
    <div class="van-hairline--top op-box">
      <div class="reset-btn" @click="resetHandler">重置</div>
      <div class="confirm-btn" @click="confirmHandler">确定</div>
    </div>
  </div>
  </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  created() {
    // if(this.$route.name==='mymarket'){
    //   this.flag=true
    // }
  },
  mounted() {},
  props: {
    show: { type: Boolean, default: false },
    value: Object
  },
  data: () => ({
    flag: false,
    num: 0,
    conf: {
      areaSize: {
        name: '面积',
        node: {
          '0,50': '50㎡以下',
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
          '2': '二室',
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
      saleStatus: {
        name: '销售状态',
        node: {
          '0': '热销中',
          '1': '即将发售',
          '3': '售罄'
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
      focusStatus: {
        name: '关注状态',
        node: {
          '0': '已关注',
          '1': '未关注'
        }
      }
    },
    currentValue: {
      areaSize: '-1,-1',
      type: '-2',
      generalView: '',
      discountHouse: '',
      saleStatus: '-1',
      openStatus: '-1',
      focusStatus: '-1'
    }
  }),
  methods: {
    itemClickHandler(type, value) {
      switch (type) {
        case 'areaSize':
          // this.currentValue.areaSize = this.currentValue.areaSize === value ? '-1,-1' : value
          if (this.currentValue.areaSize === value) {
            this.currentValue.areaSize = '-1,-1'
          } else {
            this.currentValue.areaSize = value
          }
          break
        case 'type':
          this.currentValue.type = this.currentValue.type === value ? '-2' : value
          break
        case 'feature':
          if (value === '100') this.currentValue.generalView = typeof this.currentValue.generalView === 'boolean' ? !this.currentValue.generalView : true
          if (value === '200') this.currentValue.discountHouse = typeof this.currentValue.discountHouse === 'boolean' ? !this.currentValue.discountHouse : true
          break
        case 'saleStatus':
          this.currentValue.saleStatus = this.currentValue.saleStatus === value ? '-1' : value
          break
        case 'openStatus':
          this.currentValue.openStatus = this.currentValue.openStatus === value ? '-1' : value
          break
        case 'focusStatus':
          this.currentValue.focusStatus = this.currentValue.focusStatus === value ? '-1' : value
          break
      }
    },
    activeCheck(mainKey, index) {
      let status = false
      switch (mainKey) {
        case 'areaSize':
          if (index === this.currentValue.areaSize) status = true
          break
        case 'type':
          if (index === this.currentValue.type) status = true
          break
        case 'feature':
          if (index === '100' && this.currentValue.generalView) status = true
          if (index === '200' && this.currentValue.discountHouse) status = true
          break
        case 'saleStatus':
          if (index === this.currentValue.saleStatus) status = true
          break
        case 'openStatus':
          if (index === this.currentValue.openStatus) status = true
          break
        case 'focusStatus':
          if (index === this.currentValue.focusStatus) status = true
          break
      }
      return status && 'active'
    },
    resetHandler() {
      this.currentValue = {
        areaSize: '-1,-1',
        type: '-2',
        generalView: '',
        discountHouse: '',
        saleStatus: '-1',
        openStatus: '-1',
        focusStatus: '-1'
      }
      this.num = 0
      this.$emit('resetNum')
    },
    confirmHandler() {
      this.num = this.$refs.moreFilter.querySelectorAll('.active').length
      this.$emit('confirm', this.currentValue)
      this.$emit('input', this.currentValue)
      this.$emit('numHandle', this.num)
      console.log(this.num, '现在的长度')
    }
  },
  watch: {
    value(val) {
      this.currentValue = cloneDeep(val)
    }
  }
}
</script>
<style lang="less">
.more-page {
  .more-filter {
    position: relative;
    width: 100%;
    z-index: 10;
    height: 430px;
    background-color: #fff;
    padding: 15px;
    padding-bottom: 0px;
    overflow: scroll;
    > .item-container {
      margin-bottom: 30px;
      > .item-title {
        font-size: 15px;
        font-weight: 400;
        color: #333333;
      }
      > .item-list-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 16px;
        margin-bottom: 20px;
        // justify-content: space-between;
        > .item {
          // display: flex;
          // align-items: center;
          // justify-content: center;
          width: 75px;
          height: 30px;
          text-align: center;
          line-height: 33px;
          font-size: 13px;
          color: #445166;
          background-color: #f2f5f9;
          border-radius: 6px;
          // padding: 5px 10px;
          margin: 7px 0px;
          margin-left: 15px;
          &.active {
            background-color: #017fff;
            color: #ffffff;
          }
        }
        // div:first-child,
        // div:nth-child(5) {
        //   margin-left: 0px;
        // }
      }
    }
    > .op-box {
      background: #ffffff;
      // position: fixed;
      display: flex;
      justify-content: space-around;
      width: 100%;
      // top: 477px;
      padding: 7px 0;
      // left: 0;
      margin: 0;
      z-index: 30;
      > div {
        display: inline-block;
        width: 115px;
        height: 40px;
        line-height: 44px;
        font-size: 16px;
        border-radius: 6px;
        text-align: center;
        &.reset-btn {
          color: #8a8f99;
          background: #f2f5f9;
        }
        &.confirm-btn {
          color: #fff;
          background: #007ae6;
        }
      }
    }
  }
  .act {
    height: 265px;
  }
}
</style>
