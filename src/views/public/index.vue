<template>
  <div class="container">
    
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
export default {
  data: () => ({
    
  }),
  created() {
    let defaultPath = localStorage.getItem('defaultPath')
    if(defaultPath) {
      localStorage.removeItem('defaultPath')
      this.$router.replace({ path: defaultPath })
    //   console.log('path:'+defaultPath)
    } else {
      this.$router.replace('/dynamics')
    }
  },
  methods: {
    
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="less">
.container {
  display: flex;
  flex-direction: column;
  margin: 16px;
}
</style>
