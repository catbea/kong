<template>
  <div class="collection-container">
    <div class="collection-list" v-if="data" v-for="(item,key) in data" :key="key" >
      <span class="collection-list-left">
        <p class="list-left-title" @click ="gocollectionInfo(item)">{{item.title}}</p>
        <p class="list-left-conter"  @click ="gocollectionInfo(item)" v-html="item.subTitle"></p>
        <!-- 收藏状态：1-取消收藏，0-收藏 -->
        <span
          id="collectiontabok"
          class="list-left-tab-ok"
          @click="gocollection(item.deleteType,item.id,key)"
          v-show="item.deleteType == 1"
           style="color:#007AE6"
        >收藏</span>
        <span
          class="list-left-tab-no"
          v-show="item.deleteType == 0"
          id="collectiontabno"
          @click="gocollection(item.deleteType,item.id,key)"
          style="color:#AFB2C3"
        >取消收藏</span>
      </span>
      <span class="collection-list-right"  @click ="gocollectionInfo(item)">
        <img :src="item.image" class="mark-icon">
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backIcon: require('IMG/user/usercard@2x.png')
    }
  },
  props: {
    data: { type: Array },
    info: { type: String }

  },
  methods: {
    gocollection(deleteType, infoId, key) {
      let parm = {
        info: this.info,
        divIdOk: 'collectiontabok',
        divIdNo: 'collectiontabno',
        deleteType: deleteType,
        infoId: infoId,
        index: key,
        type:'goCollection'
      }
      this.$emit('myclick', parm)
    },
    gocollectionInfo(item){
      let parm = {
        type:'goCollectionInfo',
        id:item.id,
        city:item.city
      }
      this.$emit("myclick",parm)
    }
  }
}
</script>
<style lang="less">
.collection-container {
  > .collection-list {
    margin: 0 15px;
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    padding: 10px 0 16px 0;
    > .collection-list-left {
      height: 90px;
      position: relative;
      width: 61%;
      > .list-left-title {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      > .list-left-conter {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
        margin-top: 5px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        overflow: hidden; /** 隐藏超出的内容 **/
      }
      > .list-left-tab-ok {
        font-size: 10px;
        font-weight: 400;
        color: rgba(0, 122, 230, 1);
        line-height: 20px;
        border-radius: 10px;
        border: 1px solid;
        width: 60px;
        height: 20px;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
      > .list-left-tab-no {
        font-size: 10px;
        font-weight: 400;
        color: rgba(178, 181, 197, 1);
        line-height: 20px;
        width: 60px;
        height: 20px;
        border-radius: 10px;
        border: 1px solid;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
    }
    > .collection-list-right {
      // width: 120px;
      width: 32%;
      height: 90px;
      border-radius: 6px;
      position: absolute;
      margin-right: 0;
      padding-right: 0;
      right: 16px;
      > .mark-icon {
        width: 120px;
        height: 90px;
        background: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
