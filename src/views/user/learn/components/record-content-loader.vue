<template>
  <div>
    <ContentLoader v-for="item in 3" primaryColor="rgba(249,250,249,1)" secondaryColor="#ecebeb" :style="{marginTop: 30 + 'px'}" :key="item" :height="90" :width="400" :speed="2">
      <rect x="25" :y="0 " rx="4" ry="4" width="120" height="90" />
      <rect x="155" :y="0" rx="3" ry="3" width="230" height="15" />
      <rect x="155" :y="20" rx="3" ry="3" width="120" height="15" />
      <rect x="155" :y="75" rx="3" ry="3" width="104" height="15" />
      <rect x="325" :y="75" rx="3" ry="3" width="60" height="15" />
    </ContentLoader>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  }
}
</script>