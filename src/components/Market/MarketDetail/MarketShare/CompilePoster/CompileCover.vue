<template>
  <div class="compile-cover-page">
      <div class="compile-cover-top">选择楼盘封面</div> 
      <ol class="compile-cover-bottom">
        <li v-for="(item,index) in list" :key="index" @click="taget(index)">
          <div :class="{active:item.check}">
            <span></span>
          </div>
        </li>
      </ol>
    </div>
</template>
<script>
export default {
  data: () => ({
    list: [
      { check: false },
      { check: false },
      { check: false },
      { check: false }
    ],
    liIndex: 0,
    show: false
  }),
  computed: {
    // show(){
    //   if(this.)
    // }
  },
  methods: {
    taget(index) {
      // this.liIndex=index
      this.list[index].check = !this.list[index].check
    }
  }
}
</script>

<style lang="less">
.compile-cover-page {
  margin: 32px 0 0 15px;
  .active {
    position: absolute;
    right: 5px;
    top: 4px;
    width: 22px;
    height: 22px;
    background: rgba(0, 122, 230, 1);
    border-radius: 50%;
  }
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
      border: 1px solid;
      position: relative;
    }
  }
}
</style>
