<template>
  <div class="button-item">
    {{text}}
  </div>
</template>
<script>
export default {
  props:{
    text:{
      type: String,
      default:""
    }
  },
}
</script>

<style lang="less">
.button-item{

}
</style>
