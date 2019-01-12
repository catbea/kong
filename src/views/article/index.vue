<template>
  <div class="article-list">
    <Guide v-if="showGuide" @hideGuide="hideStep"/>
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
      showGuide: false
    }
  },
  created () {
    this.showGuide = JSON.parse(window.localStorage.getItem('guideStatus')) 
  },
  mounted () {
  },
  methods: {
    // 隐藏引导页
    hideStep () {
      this.showGuide = false
      window.localStorage.setItem('guideStatus', false)
    }
  }
}
</script>