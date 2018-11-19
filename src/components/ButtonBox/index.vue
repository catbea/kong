<template>
  <div class="button-page" :style="styleComputed">
    <button-item :text="buttonInfo.text"></button-item>
  </div>
</template>
<script>
import ButtonItem from './ButtonItem'
export default {
  components: {
    ButtonItem
  },
  data: _ => ({}),
  props: {
    buttonInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    styleComputed() {
      return {
        borderRadius: this.buttonInfo.borderRadius,
        background: this.buttonInfo.backColor,
        width: this.buttonInfo.width,
        height: this.buttonInfo.height,
        lineHeight: this.buttonInfo.lineHeight
      }
    }
  }
}
</script>

<style lang="less">
.button-page {
  text-align: center;
}
</style>
