<template>
  <div class="tab-body">
    <div class="share-type" :style="{'fontSize':shareFontSize,'fontWeight':shareStyle}" @click="onClickShare">分享</div>
    <div class="edit-type" :style="{'fontSize':editFontSize,'fontWeight':editStyle}" @click="onClickEdit">编辑</div>
    <div
      class="collection-type"
      :style="{'fontSize':collectionFontSize,'fontWeight':collectionStyle}"
      @click="onClickCollection"
    >收藏</div>
  </div>
</template>
<script>
export default {
  props: {
    toSelectTap: String
  },

  created() {
    if (this.toSelectTap == '3') {
      this.onClickEdit()
    } else if (this.toSelectTap == '1') {
      this.onClickCollection()
    } else if (this.toSelectTap == '2') {
      this.onClickShare()
    }
  },

  methods: {
    onClickShare() {
      this.shareFontSize = '24px'
      this.editFontSize = '14px'
      this.collectionFontSize = '14px'
      this.shareStyle='bold'
      this.editStyle='normal'
      this.collectionStyle='normal'

      this.$emit('clickShare', '2')
    },
    onClickEdit() {
      this.shareFontSize = '14px'
      this.editFontSize = '24px'
      this.collectionFontSize = '14px'

      this.shareStyle='normal'
      this.editStyle='bold'
      this.collectionStyle='normal'

      this.$emit('clickEdit', '3')
    },
    onClickCollection() {
      this.shareFontSize = '14px'
      this.editFontSize = '14px'
      this.collectionFontSize = '24px'

      this.shareStyle='normal'
      this.editStyle='normal'
      this.collectionStyle='bold'

      this.$emit('clickCollection', '1')
    }
  },

  data() {
    return {
      shareFontSize: '24px',
      editFontSize: '14px',
      editStyle:'bold',
      collectionFontSize: '14px'
    }
  }
}
</script>

<style lang="less">
.tab-body {
  width: 100%;
  height: 54px;
  background: #ffffff;
  display: flex;
  align-items: flex-end;

  > .share-type {
    margin-left: 0px;
    margin-bottom: 12px;
    color: #333333;
  }

  > .edit-type {
    margin-left: 22px;
    margin-bottom: 12px;
    color: #333333;
  }

  > .collection-type {
    margin-left: 22px;
    margin-bottom: 12px;
    color: #333333;
  }
}
</style>
