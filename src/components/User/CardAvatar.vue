<template>
  <div class="bg_img card-avatar" :class="member&&'member-icon'" :style="{backgroundImage:'url(' + userAvatar + ')'}">
    <img class="member-mark" :src="markIcon">
  </div>
</template>
<script>
export default {
  props: {
    url: { type: String, default: '' },
    member: { type: Boolean, default: false }
  },
  data: _ => ({
    markIcon: require('IMG/user/crown.png'),
    defaultAvatar: require('IMG/user/person_icon.png')
  }),
  computed: {
    userAvatar() {
      return this.url !== '' ? this.url : this.defaultAvatar
    }
  }
}
</script>
<style lang="less">
.card-avatar {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  &.member-icon {
    border: 2px solid rgba(238, 197, 151, 1);
  }
  .member-mark {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 18px;
    height: 16px;
    right: 0;
    top: 3px;
    right: 0;
  }
}
</style>



