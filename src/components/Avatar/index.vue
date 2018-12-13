
<template>
  <div class="avatar">
    <img :src="avatar||defaultAvatar" alt="">
    <slot name="extra"></slot>
  </div>
</template>
<script>
// TODO 预留组件,方便以后处理加载用户头像失败的通用处理
export default {
  props: {
    avatar: { type: String }
  },
  data: () => ({
    defaultAvatar: require('IMG/system/defaultAvatar.png')
  }),
  methods: {
    
  }
}
</script>
<style lang="less">
.avatar {
  width: 24px;
  height: 24px;
  display: inline-block;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
  }
}
</style>
