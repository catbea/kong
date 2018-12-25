<template>
  <div class="compile-cover-page">
    <div class="compile-cover-top">选择楼盘封面</div>
    <ol class="compile-cover-bottom">
      <li
        class="bg_img"
        v-for="(item,index) in model"
        :key="index"
        :style="{backgroundImage:'url('+item.imgUrl+')'}"
        @click="selectIcon(index)"
      >
        <!-- <span class="bg_img" :style="{backgroundImage:'url('+item.checked=='1'?icon:''+')'}"></span> -->
        <img class="bg_img" :src="item.checked=='1'?icon:noIcon">
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  props: ['model'],

  data: () => ({
    icon: require('IMG/correction/color.png'),
    noIcon: require('IMG/user/mealMarket/check@2x.png'),
    list: [1, 2, 3, 4, 5],
    listSeletct: [],
    liIndex: 0,
    num: null,
    bannerList: []
  }),
  computed: {},

  created() {},

  methods: {
    selectIcon(index) {
      for (let i in this.model) {
        this.model[i].checked = '0'
      }
      this.model[index].checked = '1'
      this.$emit('changeBackground', this.model[index].imgUrl)
    }
  }
}
</script>

<style lang="less">
.compile-cover-page {
  margin: 32px 0 0 15px;
  > .compile-cover-top {
    font-size: 16px;
    
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
      .bg_img {
        width: 22px;
        height: 22px;
        position: absolute;
        right: 4px;
        top: 4px;
        border-radius: 50%;
      }
    }
  }
}
</style>
