<template>
  <ContentLoader primaryColor="rgba(249,250,249,1)" secondaryColor="#ecebeb" :animate="false" :height="700" :width="400" :speed="2" style="margin-top: 40px;">
    <rect v-for="item in 3" x="25" :y="(32 * item)" rx="5" ry="5" :width="343 / item + 10" height="23" />
    <rect x="290" :y="96" rx="5" ry="5" width="82" height="23" />
    <rect x="25" y="135" rx="5" ry="5" width="343" height="194" />
    <rect v-for="item in 4" x="25" :y="367 + (32 * item)" rx="5" ry="5" width="343" height="23" />
    <rect x="25" y="530" rx="5" ry="5" width="198" height="23" />
    <rect x="25" y="580" rx="5" ry="5" width="85%" height="23" />
  </ContentLoader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  }
}
</script>