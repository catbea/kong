<template>
  <div class="edit-paragraph">
    <div class="paragraph-container" v-html="info.text"></div>
    <i v-if="this.info.status === 'edit'" class="icon iconfont icon-search_empty del-icon"  @click="delClickHandler"/>
    <div v-if="this.info.status === 'del'" class="repeal-del-container">
      <div class="del-btn" @click="repealClickHandler">撤销删除</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: { type: Object }
  },
  methods: {
    // 点击删除
    delClickHandler(e) {
      this.$emit('delParagraph', { dom: this.info })
    },
    // 撤销删除
    repealClickHandler(e){
      this.$emit('repealParagraph', { dom: this.info })
    }
  }
}
</script>
<style lang="less" scoped>
.edit-paragraph {
  position: relative;
  border: 1px dashed #969ea8;
  margin: 0 -5px 5px;
  padding: 5px;
  text-indent: unset;
  >.paragraph-container{
    >img{
      object-fit: cover;
    }
  }
  > .del-icon {
    font-size: 16px;
    position: absolute;
    top: 4px;
    right: -15px;
    transform: translate(-50%, -50%);
    color: #ea4d2e;
  }
  > .repeal-del-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(234, 77, 46, 0.4);
    border: 1px solid rgba(150, 158, 168, 1);
    > .del-btn {
      position: absolute;
      transform: translate(-50%,-50%);
      left: 50%;
      top: 50%;
      width: 96px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: rgba(234, 77, 46, 1);
      border-radius: 6px;
      font-size: 14px;
      font-weight: 400;
      color: #fff;
    }
  }
}
</style>


