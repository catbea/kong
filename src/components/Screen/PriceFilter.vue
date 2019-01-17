<template>
  <div class="price-filter" v-if="show" :class="{act:flag}">
    <van-tree-select :items="items" :main-active-index="mainActiveIndex" :active-id="checked" @navclick="onNavClick" @itemclick="onItemClick"/>
  </div>
</template>
<script>
export default {
  created() {
    if (this.$route.name === 'mymarket') {
      this.flag = true
    }
  },
  props: {
    show: { type: Boolean, default: false },
    value: String
  },
  data: () => ({
    flag: false,
    items: [
      {
        text: '总价',
        children: [
          { id: '1,-1,-1', text: '不限' },
          { id: '1,-1,100', text: '100万以下' },
          { id: '1,100,150', text: '100万-150万' },
          { id: '1,150,200', text: '150万-200万' },
          { id: '1,200,300', text: '200万-300万' },
          { id: '1,300,500', text: '300万-500万' },
          { id: '1,500,1000', text: '500万-1000万' },
          { id: '1,1000,-1', text: '1000万以上' }
        ]
      },
      {
        text: '单价',
        children: [
          { id: '2,-1,-1', text: '不限' },
          { id: '2,-1,1', text: '1万以下/㎡' },
          { id: '2,1,3', text: '1万-3万/㎡' },
          { id: '2,3,5', text: '3万-5万/㎡' },
          { id: '2,5,10', text: '5万-10万/㎡' },
          { id: '2,10,-1', text: '10万以上/㎡' }
        ]
      }
    ],
    // 左侧高亮元素的index
    mainActiveIndex: 0,
    checked: null
  }),
  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index
    },
    onItemClick(data) {
      this.checked = data.id
      let tempArr = data.id.split(',')
      let str
      switch (tempArr[0]) {
        case '1':
          str = '总价'
          break
        case '2':
          str = '单价'
          break
      }
      this.$emit('checkedText', `${str}${data.text}`)
      this.$emit('activeHandle')
    }
  },
  watch: {
    checked(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.checked = val
    }
  }
}
</script>
<style lang="less">
.price-filter {
  width: 100%;
  height: 82%;
  display: flex;
  flex-direction: column;
  // position: fixed;
  > ul {
    background: rgba(255, 255, 255, 1);
    padding: 0 20px;
    > .active {
      color: rgba(0, 122, 230, 1);
    }
    li {
      height: 49px;
      font-size: 15px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 49px;
    }
  }
  > .van-tree-select {
    > .van-tree-select__nav {
      background: #fff;
      width: 25%;
      min-width: 95px;
      > .van-tree-select__nitem {
        padding: 0;
        text-align: center;
        &.van-tree-select__nitem--active {
          color: #007ae6;
          &::after {
            background: none;
          }
        }
      }
    }
    > .van-tree-select__content {
      background: #f2f5f9;
      width: 75%;
      margin-left: 25%;
      > .van-tree-select__item {
        font-size: 15px;
        color: #333333;
        font-weight: 400;
        &::after {
          content: ' ';
          position: absolute;
          pointer-events: none;
          box-sizing: border-box;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
          border: 0 solid #ebedf0;
          border-bottom-width: 1px;
        }
        &.van-tree-select__item--active {
          color: #007ae6;
          > .van-tree-select__selected {
            display: none;
          }
        }
      }
    }
  }
  &.act {
    height: 265px;
  }
}
</style>
