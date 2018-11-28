<template>
  <div class="title-bar">
    <h5 class="title-text">{{conf.title}}</h5>
    <router-link :to="linkComputed">
      <p class="link-text">{{`${conf.linkText} ${conf.link?'>':''}`}} </p>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    conf: {
      type: Object,
      default: function() {
        return {
          title: '',
          linkText: '',
          link: ''
        }
      }
    }
  },
  computed: {
    linkComputed() {
      return this.conf.link || '#'
    }
  }
}
</script>
<style lang="less">
.title-bar {
  display: flex;
  justify-content: space-between;
  margin: 15px 15px 5px;
  padding-top: 10px;
  .title-text {
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    color: #333333;
  }
  .link-text {
    font-size: 13px;
    font-weight: 400;
    color: #999999;
  }
}
</style>
