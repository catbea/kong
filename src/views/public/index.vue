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
    console.log(this.userInfo.userStatus, 'userInfo.status/////')
    let defaultPath = localStorage.getItem('defaultPath')
    if(defaultPath) {
      localStorage.removeItem('defaultPath')
      this.$router.replace({ path: defaultPath })
    } else {
        if(!this.userInfo.name || !this.userInfo.majorRegion || !this.userInfo.distributorName || !this.userInfo.institutionName) {
            this.$router.replace('/public/complete-info')
        } else {
            this.$router.replace('/dynamics')
        }
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
  .userStatus {
    margin-top: 50%;
    text-align: center;
    color: #ddd;
    font-size: 14px;
  }
}
</style>
