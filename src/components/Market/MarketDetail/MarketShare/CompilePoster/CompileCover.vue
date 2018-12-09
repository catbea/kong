<template>
  <div class="compile-cover-page">
    <div class="compile-cover-top">选择楼盘封面</div>
    <ol class="compile-cover-bottom">
      <li
        class="bg_img"
        v-for="(item,index) in list"
        :key="index"
        @click="active(index)"
        :style="{backgroundImage:'url(https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1629847645,2171518544&fm=27&gp=0.jpg)'}"
      >
        <span
          class="bg_img"
          :style="{backgroundImage:'url('+(num==index?icon:icon)+')'}"
          v-show="listSeletct.indexOf(index)!=-1"
        ></span>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  data: () => ({
    icon: require('IMG/correction/color.png'),
    list: [1, 2, 3, 4, 5],
    listSeletct: [],
    liIndex: 0,
    num: null
  }),
  computed: {},
  methods: {
    active(index) {
      if (this.listSeletct.indexOf(index) == -1) {
        this.listSeletct.push(index)
      } else {
        this.listSeletct = this.listSeletct.filter(item => {
          return item != index
        })
      }
    }
  }
}
</script>

<style lang="less">
.compile-cover-page {
  margin: 32px 0 0 15px;
  > .compile-cover-top {
    font-size: 16px;
    font-family: PingFang-SC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    margin-bottom: 12px;
  }
  > .compile-cover-bottom {
    display: flex;
    display: -webkit-box;
    overflow-x: auto;
    width: 360px;
    li {
      width: 100px;
      height: 75px;
      border-radius: 4px;
      margin-right: 15px;
      position: relative;
      display: flex;
      span {
        width: 22px;
        height: 22px;
        position: absolute;
        right: 4px;
        top: 4px;
      }
    }
  }
}
</style>
