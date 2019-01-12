<template>
  <div class="article-list">
    <Guide v-if="showGuide" @hideStep="hideStep"/>
  </div>
</template>

<script>
import Guide from './guide'
export default {
  components: {
    Guide
  },
  data () {
    return{
      showGuide: true
    }
  },
  created () {
    // this.showGuide = !!window.localStorage.getItem('guideStatus')
  },
  methods: {
    // 隐藏引导页
    hideStep () {
      showGuide = false
      window.localStorage.setItem('guideStatus', false)
    }
  }
}
</script>