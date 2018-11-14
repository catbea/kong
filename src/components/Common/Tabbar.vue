<template>
  <tabbar v-if="tabbar.show" class="tabbar" v-model="active">
    <tabbar-item class="tabbar-item" v-for="item in tabbar.items" :key="item.name" :replace="true" :to="item.path" :info="infoCount(item.info)">
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
    active: 0
  }),
  methods: {
    infoCount(val) {
      val = parseInt(val)
      if (val < 1) {
        return null
      } else if (val > 99) {
        return '99+'
      } else {
        return val
      }
    },
    tabClickHandler(path) {}
  },
  computed: {
    ...mapGetters(['tabbar'])
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
