<template>
  <div class="condition-item">
    <tag-item  v-for="(item,index) in info" :key="index" :info="item"></tag-item>
  </div>
</template>
<script>
import TagItem from './TagItem'
export default {
  components:{
    TagItem
  },
  data:_=>({

  }),
  props:{
    info:{
      type: Array,
      default:function(){return []}
    }
  },
}
</script>

<style lang="less">
.condition-item{
  display: flex;
  height: 15px;
}
</style>

