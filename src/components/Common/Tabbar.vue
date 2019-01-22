<template>
  <div id="tabbar">
    <van-tabbar v-if="tabbar.show" class="tabbar" v-model="active" ref="tabbar">
      <van-tabbar-item class="tabbar-item" v-for="item in tabbar.items" :key="item.name" :replace="true" :to="item.path" :info="infoCount(item.info)">
        <span>{{item.name}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.icon_atc : item.icon">
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
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
    }
  },
  computed: {
    ...mapGetters(['tabbar'])
  },
  watch: {
    $route(to, from) {
      for (let i = 0; i < this.tabbar.items.length; i++) {
        if (to.fullPath.indexOf(this.tabbar.items[i].path) !== -1) return (this.active = i)
      }
    }
  },
  mounted () {
    document.getElementById('tabbar').addEventListener('touchmove', (e) => {
      e.preventDefault()
    }, { passive: false })
  }
}
</script>
<style lang="less" scoped>
#tabbar{
.tabbar {
  z-index: 999;
  width: 100%;
  // position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  img {
    width: 23px;
    height: 23px;
  }
  span {
    font-size: 12px;
  }
}
}
</style>
