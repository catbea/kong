<template>
  <div class="all-near-page">
    <div class="all-near-page-map"></div>
    <ul class="all-near-page-tar">
      <li v-for="(item,index) in list" :key="index" @click="active(index)">
        <p class="bg_img" :style="{backgroundImage:'url('+(num==index?item.i:item.A)+')'}"></p>
        <p :class="{textColor:num==index}">{{item.text}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    list: [
      {
        text: '银行',
        A: require('IMG/near/yinh@2x.png'),
        i: require('IMG/nearColor/yinh@2x.png')
      },
      {
        text: '公交',
        A: require('IMG/near/Rectangle 10@2x.png'),
        i: require('IMG/nearColor/Rectangle 10@2x.png')
      },
      {
        text: '地铁',
        A: require('IMG/near/Rectangle 101@2x.png'),
        i: require('IMG/nearColor/Rectangle 101@2x.png')
      },
      {
        text: '教育',
        A: require('IMG/near/Rectangle 102@2x.png'),
        i: require('IMG/nearColor/Rectangle 102@2x.png')
      },
      {
        text: '医院',
        A: require('IMG/near/Combined Shape@2x.png'),
        i: require('IMG/nearColor/Combined Shape@2x.png')
      },
      {
        text: '休闲',
        A: require('IMG/near/Group@2x.png'),
        i: require('IMG/nearColor/Group@2x.png')
      },
      {
        text: '购物',
        A: require('IMG/near/Rectangle 103@2x.png'),
        i: require('IMG/nearColor/Rectangle 103@2x.png')
      },
      {
        text: '健身港',
        A: require('IMG/near/Rectangle 104@2x.png'),
        i: require('IMG/nearColor/Rectangle 104@2x.png')
      },
      {
        text: '美食',
        A: require('IMG/near/Rectangle 105@2x.png'),
        i: require('IMG/nearColor/Rectangle 105@2x.png')
      }
    ],
    num: null
  }),
  methods: {
    active(index) {
      this.num = index
    }
  }
}
</script>
<style lang="less">
.all-near-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .all-near-page-map {
    width: 100%;
    flex: 1;
  }
  .all-near-page-tar {
    width: 375px;
    height: 60px;
    display: flex;
    display: -webkit-box;
    overflow-x: auto;
    border-top: 1px solid #000000;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 22px;
      .textColor {
        color: rgba(0, 122, 230, 1) !important;
      }
      p:nth-child(1) {
        width: 22px;
        height: 22px;
      }
      p:nth-child(2) {
        font-size: 12px;

        font-weight: 400;
        color: rgba(150, 158, 168, 1);
        line-height: 17px;
      }
    }
  }
}
</style>
