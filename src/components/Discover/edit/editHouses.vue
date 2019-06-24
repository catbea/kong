<template>
  <div class="edit-houses" @click="addClickHandler">
    <div class="house-box" :class="!preview&&'box_border_house'" v-for="index in count" :key="index">
      <div class="house-item" v-if="index<=currentData.length">
        <estate-item :key="index" :showRules="false" :showCard="showCard" :preview="preview" :isInArticle="isInArticle" :info="itemData(index-1)"/>
        <i class="icon del-icon" v-if="!preview" @click.stop="delClickHandler(index-1)"/>
      </div>
      <div class="empty-box" v-if="index>currentData.length && !preview">
        <div class="info-box">
          <div class="add-icon">
            <i class="icon iconfont icon-write_add"></i>
          </div>
          <p class="help-text">请选择推荐楼盘</p>
          <p v-if="reminder" class="remind-text">若无推荐楼盘将进行随机推荐</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EstateItem from 'COMP/EstateItem/indexInArtcile'
export default {
  components: {
    EstateItem
  },
  props: {
    showCard: {type: Boolean, default: false},
    count: { type: Number, default: 3 },
    value: { type: Array },
    status: { tyle: String, default: 'empty' },
    reminder: { type: Boolean, default: false },
    preview: { type: Boolean, default: false },
    isInArticle: { type: Number, default: 0 }
  },
  data: () => ({
    currentData: []
  }),
  methods: {
    delClickHandler(index) {
      this.$delete(this.currentData, index)
      this.$emit('delete', this.currentData[index])
    },
    addClickHandler() {
      this.$emit('click')
    },
    itemData(index) {
      let temp = this.currentData[index]

      if (!temp.city) temp.city = temp.site
      if (!temp.linkerTags) {
        if(this.isInArticle==1){
          temp.linkerTags = [...temp.condition]
        }else{
          let statusArr = ['热销中', '即将发售', '', '售罄']
          temp.linkerTags = [statusArr[temp.saleStatus], ...temp.condition]
        }
      }
      while (temp.linkerTags.length > 3) {
        temp.linkerTags.pop()
      }
      return temp
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentData = val
      },
      deep: true
    },
    currentData: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    }
  }
}
</script>
<style lang="less">
.edit-houses {
  // margin: 0 -5px;  
  > .house-box {
    margin-bottom: 10px;
    background: rgba(0,122,230,0.1);
    > div {
      // width: 350px;
    }
    > .house-item {
      position: relative;
      line-height: 1;
      > .del-icon {
        position: absolute;
        width: 28px;
        height: 28px;
        background: url(../../../assets/img/article/articlex.png) center no-repeat;
        background-size: 100% 100%;
        top: 0;
        right: 0;
        color: #ea4d2e;
      }
    }
    > .empty-box {
      position: relative;
      height: 122px;
      > .info-box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        line-height: 1.3;
        > .add-icon {
          > i {
            font-size: 24px;
          }
        }
        > .help-text {
          font-size: 14px;
          font-weight: 400;
          color: #445166;
        }
        > .remind-text {
          font-size: 12px;
          font-weight: 400;
          color: #969ea8;
        }
      }
    }
  }
}
</style>
