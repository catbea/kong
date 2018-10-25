<template>
  <tabbar v-if="tabbar.show" class="tabbar" v-model="active">
    <tabbar-item class="tabbar-item" v-for="item in items" :key="item.name" :replace="true" :to="item.path" :info="infoCount(item.info)">
      <span>{{item.name}}</span>
      <img slot="icon" slot-scope="props" :src="props.active ? item.icon_atc : item.icon">
    </tabbar-item>
  </tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
import { mapGetters } from 'vuex'
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data: _ => ({
    active: 0,
    items: [
      { name: '动态', icon: require('IMG/tabbar/message.png'), icon_atc: require('IMG/tabbar/message_atc.png'), path: '/dynamics', info: 0 },
      { name: '楼盘', icon: require('IMG/tabbar/market.png'), icon_atc: require('IMG/tabbar/market_atc.png'), path: '/market', info: 0 },
      { name: '客户', icon: require('IMG/tabbar/client.png'), icon_atc: require('IMG/tabbar/client_atc.png'), path: '/myClient', info: 0 },
      { name: '名片', icon: require('IMG/tabbar/business_card.png'), icon_atc: require('IMG/tabbar/business_card_atc.png'), path: '/user', info: 0 }
    ]
  }),
  methods: {
    infoCount (val) {
      val = parseInt(val)
      if (val < 1) {
        return null
      } else if (val > 99) {
        return '99+'
      } else {
        return val
      }
    },
    tabClickHandler (path) {

    }
  },
  computed: {
    ...mapGetters(['tabbar']),
  }
}
</script>
<style lang="less" scoped>
.tabbar {
  width: 100%;
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
}
</style>


