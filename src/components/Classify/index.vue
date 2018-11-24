<template>
  <ul class="detail-screen-box">
        <li v-for="(item,index) in list" :key="index" @click="active(index)">
          <span :class="{active1:num==index}">{{item.text}}</span>
          <span :class="{active2:num==index}"></span>
        </li>
    </ul>
</template>
<script>
export default {
  data: _ => ({
    showData: 1,
    num:null,
    list:[
      {
        text:"楼盘",
        textColor:'rgba(0, 122, 230, 1)',
        backColor:'rgba(0, 122, 230, 1)'
        },
        {
        text:"户型",
        textColor:'rgba(0, 122, 230, 1)',
        backColor:'rgba(0, 122, 230, 1)'
        },
        {
        text:"位置",
        textColor:'rgba(0, 122, 230, 1)',
        backColor:'rgba(0, 122, 230, 1)'
        },
        {
        text:"周边",
        textColor:'rgba(0, 122, 230, 1)',
        backColor:'rgba(0, 122, 230, 1)'
        },
        {
        text:"推荐",
        textColor:'rgba(0, 122, 230, 1)',
        backColor:'rgba(0, 122, 230, 1)'
        },
    ]
  }),
  created() {
    this.num=0
  },
  methods: {
    active(index){
      this.num=index
    }
  }
}
</script>

<style lang="less">
.active1 {
  color: rgba(0, 122, 230, 1);
}
.active2 {
  background: rgba(0, 122, 230, 1);
}
.detail-screen-box {
  display: flex;
  justify-content: space-between;
  width: 375px;
  height: 44px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid #dddddd;
  position: fixed;
  z-index: 10;
  li{
    width: 75px;
    height: 44px;
    text-align: center;
    span:nth-child(1) {
      display: block;
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      // color:#333333;
      margin-top: 11px;
      height: 20px;
    }
    span:nth-child(2) {
      display: block;
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      // background:#FFFFFF;
      margin: 3px 0 0 28px;
      height: 3px;
      width: 20px;
      border-radius: 2px;
    }
  }
}
</style>
