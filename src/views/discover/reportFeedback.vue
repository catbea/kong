<template>
  <div class="reportFeedback-page">
    <div class="reportFeedback-top-title">选择举报类型（可多选）</div>
    <div class="reportFeedback-Middle-container">
      <!-- <div class="reportFeedback-Middle-conten">
          欺诈（虚假活动等）
          <input>
      </div> -->
      <!-- :title="$t('checkbox') + item"   :title="$t('title5')"-->
      <checkbox-group v-model="feedbackType">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in feedbackList"
            clickable
            :key="index"
            :title="item.itemName"
            @click="toggle(item,index)"
          >
            <van-checkbox
              ref="checkboxes"
              :name="item"
            />
          </van-cell>
        </van-cell-group>
      </checkbox-group>
    </div>
    <div class="reportFeedback-Middle-conten">反馈内容</div>
    <div class="reportFeedback-conten-textarea">
      <textarea placeholder="请具体描述错误内容" class="conten-textarea" v-model="feedbackcontent"></textarea>
    </div>
    <div class="reportFeedback-bottom-btn">
      <button class="reportFeedback-btn" @click="goSub">确定提交</button>
      <popup v-model="show1" :close-on-click-overlay="false" >
        <div class="reportFeedback-popup">
          <div class="reportFeedback-popup-title">提交成功</div>
          <div class="reportFeedback-popup-ok" @click="subFeedback">知道了</div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { Checkbox, CheckboxGroup, Popup } from 'vant'
import discoverService from 'SERVICE/discoverService'
export default {
  components: {
    Checkbox,
    CheckboxGroup,
    Popup
  },
  data() {
    return {
      feedbackList: [],
      show1: false,
      feedbackType: [],
      feedbackcontent: '',
      articleId: this.$route.query.id
    }
  },
  mounted() {
    this.getFeedbackOptions()
  },
  methods: {
    toggle(item, index) {
      this.$refs.checkboxes[index].toggle()
    },

    async getFeedbackOptions() {
      const res = await discoverService.getFeedbackOptions()
      this.feedbackList = res
    },
    //点击确认
    async goSub() {
      if (this.feedbackType.length == 0) {
        this.$toast({ mask: true, message: '请选择举报类型' })
      } else {
        let str = ''
        for (let i = 0; i < this.feedbackType.length; i++) {
          str += ',' + this.feedbackType[i].itemCode
        }
        let SelectedIndex = str.substring(1, str.length)
        let param = {
          articleId: this.articleId, //文章id
          options: SelectedIndex, //反馈的选项(itemCode,以“,”分隔开)
          content: this.feedbackcontent //反馈的内容
        }
        await discoverService.getInsertFeedback(param)
        this.show1 = true
      }
    },
    async subFeedback() {
      this.show1 = false
      history.go(-1)
    }
  }
}
</script>
<style lang="less">
.reportFeedback-page {
  background-color: #f2f5f9;
  > .reportFeedback-top-title {
    font-size: 14px;
    font-weight: 400;
    color: rgba(150, 158, 168, 1);
    line-height: 20px;
    padding: 18px 16px 4px 16px;
  }
  > .reportFeedback-Middle-container {
    background-color: #ffffff;
    .van-checkbox {
      margin: 10px 0 0 20px;
    }
    .van-cell {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;
      padding: 16px;
      .van-checkbox {
        margin: 0;
      }
    }
    .van-checkbox__icon {
      height: 22px;
    }
    .van-checkbox__icon .van-icon {
      // font-size: 0.37333rem;
      // color: transparent;
      // text-align: center;
      // line-height: inherit;
      width: 22px;
      height: 22px;
      // box-sizing: border-box;
      // border: 0.02667rem solid #e5e5e5;
      // -webkit-transition: .2s;
      // transition: .2s;
    }
  }
  > .reportFeedback-Middle-conten {
    font-size: 14px;
    font-weight: 400;
    color: rgba(150, 158, 168, 1);
    line-height: 20px;
    padding: 19px 16px 7px 16px;
  }
  .reportFeedback-conten-textarea {
    background-color: #ffffff;
    height: 120px;
    .conten-textarea {
      font-size: 14px;
      font-weight: 400;
      color: #13294f;
      line-height: 20px;
      padding: 9px 16px;
      width: 100%;
      height: 120px;
      border: 0;
    }
    .conten-textarea::-webkit-input-placeholder {
      color: #969ea8;
    }
    .conten-textarea::-moz-placeholder {
      //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
      color: #969ea8;
    }
    .conten-textarea:-ms-input-placeholder {
      //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
      color: #969ea8;
    }
  }
  .reportFeedback-bottom-btn {
    margin: 16px;
    margin-top: 24px;
    // bottom: 25px;
    // position: absolute;
    width: 91%;
    .reportFeedback-btn {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      height: 44px;
      background: rgba(0, 122, 230, 1);
      border-radius: 6px;
      border: 0;
      width: 100%;
    }
    .reportFeedback-popup {
      height: 105px;
      background: rgba(255, 255, 255, 1);
      border-radius: 12px;
      width: 280px;
      text-align: center;
      .reportFeedback-popup-title {
        font-size: 18px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
        padding: 22px 0 13px 0;
        border-bottom: 1px solid #e5e5e5;
      }
      .reportFeedback-popup-ok {
        font-size: 18px;
        font-weight: 400;
        color: rgba(0, 122, 230, 1);
        line-height: 25px;
        padding: 9px;
      }
      .van-popup {
        border-radius: 12px;
      }
    }
  }
  .van-popup {
    border-radius: 12px;
  }
}
</style>
