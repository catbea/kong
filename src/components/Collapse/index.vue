<template>
  <div>
    <li>
      <div class="parent-view">
        <div class="parent-view-left" @click="toggle(model.id)" @dblclick="changeType">
          <img class="parent-img" :src="tempImgs">
          <span class="campany-name">{{model.name}}</span>
        </div>
        <checkbox class="parent-view-right"></checkbox>
      </div>
      <ul v-show="open" v-if="isFolder">
        <collapse-List
          class="CollapseList"
          v-for="(model, index) in model.children"
          :key="index"
          :model="model"
        ></collapse-List>
      </ul>
    </li>
  </div>
</template>
<script>
import { Checkbox } from 'vant'
export default {
  name: 'CollapseList',
  components: {
    Checkbox
  },

  data() {
    return {
      tempImgs: require('IMG/user/Group9@2x.png'),
      open: false
    }
  },
  props: ['model'],
  computed: {},

  computed: {
    isFolder: function() {
      return this.model.children && this.model.children.length
    }
  },

  methods: {
    toggle: function(date) {
      if (this.isFolder) {
        //点击可以展开或者子数据
        this.open = !this.open
        
        // this.$emit('click', this.info)
      }else{
        //没有子数据
        
        // this.$emit('click', this.info)
      }
    },
    changeType: function() {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.open = true
      }
    },
  
  }
}
</script>

<style lang="less">
.parent-view {
  display: flex;
  margin-top: 20px;
  background-color: #ffffff;
  width: 100%;
  height: 44px;
  justify-content: space-between;
  align-items: center;
  border-bottom: thick dotted #eeeeee;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  > .parent-view-left {
    display: flex;
    height: 44px;
    align-items: center;
    > .parent-img {
      width: 24px;
      height: 24px;
    }
    > .campany-name {
      color: #333333;
      font-size: 14px;
      margin-left: 4px;
    }
  }
  > .parent-view-right {
  }
}
</style>
