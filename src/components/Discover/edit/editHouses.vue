<template>
  <div class="edit-houses">
    <div class="house-box" v-for="index in count" :key="index">
      <div class="house-item" v-if="index<=currentData.length">
        <estate-item :key="index" :info="currentData[index-1]"/>
        <i class="icon iconfont icon-search_empty del-icon" @click="delClickHandler(index-1)"/>
      </div>
      <div class="empty-box" v-else @click="">
        <div class="info-box">
          <div class="add-icon">
            <i class="icon iconfont icon-chat_register_rb_n"></i>
          </div>
          <p class="help-text">请选择推荐楼盘</p>
          <p v-if="reminder" class="remind-text">若无推荐楼盘将进行随机推荐</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EstateItem from 'COMP/EstateItem'
export default {
  components: {
    EstateItem
  },
  props: {
    count: { type: Number, default: 3 },
    value: { type: Array },
    status: { tyle: String, default: 'empty' },
    reminder: { type: Boolean, default: false }
  },
  data: () => ({
    currentData: []
  }),
  created() {},
  methods: {
    delClickHandler(index) {
      console.log(index)

      this.$delete(this.currentData, index)
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
  margin: 0 -5px;
  > .house-box {
    border: 1px dashed #969ea8;
    margin-bottom: 10px;
    > div {
      width: 350px;
      height: 122px;
    }
    > .house-item {
      position: relative;
      > .del-icon {
        position: absolute;
        font-size: 16px;
        top: 4px;
        right: -15px;
        transform: translate(-50%, -50%);
        color: #ea4d2e;
      }
    }
    > .empty-box {
      position: relative;
      > .info-box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        line-height: 1.3;
        > .add-icon {
          > i {
            width: 24px;
            height: 24px;
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
