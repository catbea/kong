<template>
  <li style="list-style-type:none">
    <div class="parent-view">
      <div class="parent-view-left" @dblclick="changeType" @click="toggle">
        <img class="parent-img" :src="model.logo?model.logo:this.tempImgs">
        <span class="campany-name">{{model.name}}</span>
      </div>
      <van-checkbox
        class="parent-view-right"
        v-if="model.id!=-1"
        v-model="model.checked"
        @change="selectOrganiz(model)"
        :id="`checkbox-${model.id}`"
      ></van-checkbox>
    </div>
    <ul class="ul-view" v-show="open" v-if="isFolder">
      <collapse-List
        class="CollapseList"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model"
        @clickListener="selectOrganiz"
      ></collapse-List>
    </ul>
  </li>
</template>
<script>
export default {
  name: 'CollapseList',
  data() {
    return {
      tempImgs: require('IMG/user/Group9@2x.png'),
      open: false,
      last: -1
    }
  },
  props: ['model'],

  computed: {
    isFolder: function() {
      return this.model.children && this.model.children.length
    }
  },
  created() {
    window.localStorage.setItem('tempLast', -1)
  },

  methods: {
    selectOrganiz(model) {
      this.$emit('clickListener', model)
    },

    toggle: function() {
      if (this.isFolder) {
        //点击可以展开或者子数据
        this.open = !this.open
      } else {
        //没有子数据
      }
    },
    changeType: function() {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.open = true
      }
    }
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
      border-radius: 50%;
    }
    > .campany-name {
      color: #333333;
      font-size: 14px;
      margin-left: 4px;
    }
  }
}
.ul-view {
  padding-left: 1em;
}
</style>
