<template>
  <div class="edit-paragraph" :class="{'box_border':!preview,'edit-paragraph_del':isDelClickHandler}" @click.stop="delClickHandler(info.isExistImg)">
    <div class="paragraph-container" v-if="!(preview && this.info.status === 'del')" v-html="info.text">
    </div>
    <div class="img-mask" v-show="isShowExistImg">
      
    </div>
    <!-- <i v-if="this.info.status === 'edit' && !preview" class="icon iconfont icon-write_empty del-icon" @click.stop="delClickHandler"/>
     -->
     <!-- <img  v-if="this.info.status === 'edit' && !preview" class="del-icon" :src="closeIcon" @click.stop="delClickHandler"> -->
    <!-- <div v-if="this.info.status === 'del'&& !preview" class="repeal-del-container">
      <div class="del-btn" @click="repealClickHandler">撤销删除</div>
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    info: { type: Object },
    preview: { type: Boolean, default: false }
  },
  data: () => ({ 
    isShowExistImg:false,//删除图品   
    isDelClickHandler:false,//是否点击删除
    closeIcon: require('IMG/discover/closeIcon.png')
  }),
  created() {     
    let isExistImg = this.info.text.indexOf("img");
    //1 存在照片 0，不存在
    if(isExistImg>0){
      this.info.isExistImg = true;
    }else{
      this.info.isExistImg = false;
    }
    
  },
  methods: {
    // 点击删除
    delClickHandler(isExistImg) {
      if(this.info.status === 'edit' && !this.preview){
        if(isExistImg){
          this.isShowExistImg = true;
        }
        this.isDelClickHandler = true;
        this.$emit('delParagraph', { dom: this.info })       
      }
      else if(this.info.status === 'del' && !this.preview){
        this.isDelClickHandler = false;
        if(isExistImg){
          this.isShowExistImg = false;
        }
        this.$emit('repealParagraph', { dom: this.info })
      }
    },
    // 撤销删除
    repealClickHandler(e) {
    }
  }
}
</script>
<style lang="less" scoped>
.edit-paragraph_del{
  background:	rgba(68,81,102,0.25);
  text-decoration: line-through;
}
.edit-paragraph {
  position: relative;
  // border: 1px dashed #969ea8;
  // margin: 0 -5px 5px;
  // padding: 5px;
  text-indent: unset;
  > .paragraph-container {
    padding: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    > img {
      object-fit: cover;
    }
  }
  .img-mask{
    position: absolute;
    width: 100% !important;
    height: 100%;
    top:0;
    left:0;
    background: rgba(68,81,102,0.7);
  }
  > .del-icon {
    width: 16px;
    height: 16px;
    position: absolute;
    object-fit: cover;
    top: 0;
    right: -15px;
    transform: translate(-50%, -50%);
  }
  > .repeal-del-container {
    position: absolute;
    min-width: 100%;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(234, 77, 46, 0.4);
    border: 1px solid rgba(150, 158, 168, 1);
    > .del-btn {
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
      min-width: 96px !important;
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
