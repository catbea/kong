<template>
  <li style="list-style-type:none">
    <div class="parent-view">
      <div class="parent-view-left" @dblclick="changeType" @click="toggle">
        <img class="parent-img" :src="model.logo?model.logo:this.tempImgs">
        <span class="campany-name">{{model.name}}</span>
      </div>
      <checkbox
        class="parent-view-right"
        v-if="model"
        v-model="model.checked"
        @change="selectOrganiz(model)"
        :id="`checkbox-${model.id}`"
      ></checkbox>
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
import { Checkbox } from 'vant'
export default {
  name: 'CollapseList',
  components: {
    Checkbox
  },

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
    // selectOrganiz(model) {
    //   let tempId = window.localStorage.getItem('tempLast')
    //   if (tempId != -1) {
    //     let dom = document.getElementById(`checkbox-${tempId}`) //this.$refs[`checkbox-${tempId}`]
    //     console.log(dom.children[0].classList.remove('van-checkbox__icon--checked'))
    //     // this.$refs[`checkbox-${tempId}`].checked = false
    //     dom.children[0].classList.remove('van-checkbox__icon--checked')
    //   }
    //   window.localStorage.setItem('tempLast', model.id)

    //   // console.log(model.id)
    //   // this.$ref[`checkbox-${this.last}`]

    //   // console.log(this.$refs.checkbox)
    //   // console.log('dom');
    //   // let comp = this.$refs[`checkbox-${model.id}`]
    //   // comp.checked = false
    //   // console.log(this.$refs[`checkbox-${model.id}`])

    //   // console.log(model)

    //   // this.$emit('clickListener', model)
    // },

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
  > .parent-view-right {
  }
}

.ul-view {
  padding-left: 1em;
}
</style>
