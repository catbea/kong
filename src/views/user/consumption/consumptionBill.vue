<template>
  <div class="Bill-page">
    <!-- <Tips></Tips> -->
    <div class="Bill-container">
      <shadow-box>
        <div slot="container">
          潇洒大学生
        </div>
      </shadow-box>
    </div>

  </div>
</template>
<script>
import ShadowBox from 'COMP/ShadowBox'
export default {
  components: {
   
    ShadowBox,
   
  },

  data () {
    return {
      
      item: []
    }
  },
  methods: {
    itemProperties () {

      //跳转到动态详情item
      // this.$router.push('/dynamics/dynamicsInfo')
      this.$dialog
        .confirm({
          title: '暂未开通楼盘',
          message: '请开通后查看楼盘详细动态',
          confirmButtonText: '去开通'
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>
<style lang="less">
.Bill-page {
  background: #ffffff;
  margin: 0 0 20px 0;
  > .Bill-container {
    width: 100%;
  
  }

}
</style>
