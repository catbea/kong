<template>
  <div class="title-bar" v-if="isShow">
    <h5 class="title-text">{{conf.title}}</h5>
    <router-link to="">
      <!-- :to="linkComputed"  -->
      <p class="link-text" @click="byClick">{{`${conf.linkText} ${conf.link?'':''}`}} 
         <img :src="arrowIcon" class="left-img">
      </p>
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
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      arrowIcon: require('IMG/marketDetail/arrow2@2x.png')
    }
  },
  methods: {
    // img(){
    //   this.$emit("the",1)
    // },
    byClick() {
      this.$emit('return', 1)
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
  margin: 16px 0 16px 0;
  line-height: 30px;
  .title-text {
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    color: #333333;
  }
  .link-text {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    color: #999999;
    .left-img {
      width: 12px;
      height: 12px;
      margin-top: 7px;
    }
  }
}
</style>
