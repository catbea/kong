<template>
  <div class="html-body">
    <div class="title-bar">
      <div class="title-text">{{this.EvaluatingInfo.title}}</div>
      <div class="evaluating-bottom">
        <span>作者：{{this.EvaluatingInfo.author}}</span>
        <span>发布时间：{{this.EvaluatingInfo.createTime|dateTimeFormatter(5)}}</span>
      </div>
    </div>
    <div class="html-style" v-html="htmlContent"></div>
    <div class="thumbs-body">
      <!-- <p class="dialog-name" :style="{'fontSize':info.linkerName.length>7?'15px':'20px'}">{{info&&info.linkerName}}</p> -->
      <div
        class="thumbs-up"
        :style="{'background':backgroundColor}"
        @click="setThumbsLike('1',likeFlag)"
      >
        <img class="thumb-img" :src="thumbImg">
        <span class="thumb-num">赞({{this.EvaluatingInfo.likeNum}})</span>
      </div>
    </div>
  </div>
</template>



<script>
import marketService from 'SERVICE/marketService'
import { mapGetters } from 'vuex'

export default {
  components: {
    ...mapGetters(['userInfo'])
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data: () => ({
    likeFlag: '', //点赞或者取消点赞
    backgroundColor: '#FABE9E',
    EvaluatingInfo: '',
    thumbImg: require('IMG/market/thumb.png'),
    htmlContent:
      '<p class="pictext"><img src="http://i2.chinanews.com/simg/2019/190322//96791570.jpg"  order="1"></p>\n<p class="pictext">3月21日，村民们正在学习沙棘幼苗培育。　勉征　摄</p> \n<p>　　中新网新疆塔县3月22日电(勉征) 这些天，伊马拉提·安居奴尔有时间便会到村后的温室大棚里，看看正在培育的沙棘苗长势如何。在新疆塔什库尔干塔吉克自治县(简称塔县)，这些沙棘幼苗明年将成为当地农牧民经济增收的希望。</p> \n<p>　　塔县位于新疆西南部帕米尔高原之上，这里山脉平原纵横，平均海拔在4500米以上。除了皑皑雪山和部分湿地平原，长着红柳和沙棘的戈壁是这里最常见的景色。</p> \n<div style="text-align:center">\n <img src="http://i2.chinanews.com/simg/2019/190322//96791580.jpg"  order="2">\n</div> \n<div class="pictext" style="margin-top: 5px; margin-bottom: 5px; text-indent: 2em; text-align: left;">\n 3月21日，村民们正在学习沙棘幼苗培育。　勉征 摄\n</div> \n<p>　　塔县地区，昼夜温差大，冬季多暴雪、冰雪，夏季多干热风、暴雨、洪水等。沙棘喜光，耐寒耐酷热，耐风沙及干旱气候。对土壤适应性强。对于帕米尔高原来说，种植沙棘是一个很好的选择。</p> \n<p>　　“我们引进大果沙棘，是希望它既能防风固沙，又能为农牧民增加收入。”塔县提孜那甫乡副书记刘虹告诉记者。为帮助农牧民提高收入，大家把适合的法子都想了，沙棘种植就是其中一项。去年当地用深圳市福田区的帮扶资金，引进沙棘种植产业。如今，18万株沙棘幼苗正在曲什曼村的温室大棚中培育。</p> \n<div style="text-align:center">\n <img src="http://i2.chinanews.com/simg/2019/190322//96791590.jpg"  order="3">\n</div> \n<div class="pictext" style="margin-top: 5px; margin-bottom: 5px; text-indent: 2em; text-align: left;">\n 明年，18万株培育成功的沙棘苗将进入当地农牧民家中种植。　勉征 摄\n</div> \n<p>　　这些大果沙棘幼苗全部是两年生，明年四五月间，苗木预计能达到15公分高、筷子粗细。到那时，幼苗们成活率高，就会被无偿地分给有种植需求的农牧民们。</p> \n<p>　　去年冬天，在技术人员指导下，当地农牧民学习沙棘种植技术。曲什曼村村民伊马拉提·安居奴尔家就是准备种植沙棘的其中一户。“我们学习了扦插、泡药、消毒、地面铺肥、育苗。明年，我希望能把沙棘种在院子里。”</p> \n<p>　　在此之前，伊马拉提已经从种植项目中尝到了甜头。他家院中的大棚里，种的有西红柿、辣子、黄瓜。去年，他学着种雪菊，乡里牵头集中晾晒、保质保量，也可以带来不少收入。庭前种植，屋后畜牧，伊马拉提家现在养着13只羊，4头牛。这样的“庭院经济”模式带动下，他家的日子过的还不错。</p> \n<div style="text-align:center">\n <img src="http://i2.chinanews.com/simg/2019/190322//96791600.jpg"  order="4">\n</div> \n<div class="pictext" style="margin-top: 5px; margin-bottom: 5px; text-indent: 2em; text-align: left;">\n 3月21日，村民们正在学习沙棘幼苗培育。　勉征 摄\n</div> \n<p>　　据了解，塔县目前没有大规模集中连片种植项目，而是在“庭院经济”上做文章。除了常规种植，提孜那甫乡去年种植成功30亩雪菊，基本上，一户能增收500—800元钱。今年，该乡将继续种植28亩雪菊。</p> \n<p>　　明年，培育成功的沙棘苗就会进入农牧民院中，沙棘结果生长期最少4年，在另一个村瓦尔希迭村，已经引进来一个沙棘汁饮料厂。将来，种植成功的沙棘果将大批量送到那里进行深加工。</p> \n<p>　　据刘虹介绍，届时，18万株沙棘苗中至少16万株雌株按照1kg/株的产量可产生经济效益486万元。</p> \n<p>　　除了“庭院经济”，当地也正在部分农牧民家中试点民宿项目。未来，人们来到这里，不仅能看到绿化的庭院、品尝原生态农产品，还可以买到放心的产品，农牧民也将得到更多实惠。(完)</p>\n'
  }),

  created() {
    this.getEvaluatingDetail('1', this.userInfo.agentId, '1')
  },

  methods: {
    async getEvaluatingDetail(reviewId, userInfo, userType) {
      //获取评测详情
      const result = await marketService.getEvaluatingDetail(reviewId,userInfo,userType)

      var data = {}
      var arr = Object.keys(result)
      if (arr.length != 0) {
        this.EvaluatingInfo = result

        if (result.isLike === false) {
          this.backgroundColor = '#FABE9E'
          this.likeFlag = '0' //可以进行点赞
        } else {
          this.backgroundColor = '#FA8548'
          this.likeFlag = '1' //取消点赞
        }
      }
    },

    async setThumbsLike(reviewId, likeFlag) {
      //点赞和取消点赞
      const result = await marketService.thumbsLike(reviewId, likeFlag)

      if (result == '') {
        //表示已经请求成功
        if (likeFlag == '0') {
          console.log('9999999999999')

          this.backgroundColor = '#FA8548'
          this.likeFlag = '1'
          // this.EvaluatingInfo.likeNum = this.EvaluatingInfo.likeNum + 1
        } else if (likeFlag == '1') {
          console.log('1111111111111')

          this.backgroundColor = '#FABE9E'
          this.likeFlag = '0'
          // this.EvaluatingInfo.likeNum = this.EvaluatingInfo.likeNum - 1
        }
      }
    }
  }
}
</script>


<style lang="less" scoped>
.html-body {
  width: 100%;
  display: flex;
  margin-top: 32px;
  flex-direction: column;

  > .title-bar {
    display: flex;
    flex-direction: column;

    > .title-text {
      color: #333333;
      font-size: 24px;
      padding-left: 16px;
      padding-right: 16px;
    }

    > .evaluating-bottom {
      display: flex;
      justify-content: space-between;
      padding-left: 16px;
      padding-right: 16px;

      span {
        margin-top: 15px;
        color: #999999;
        font-size: 12px;
      }
    }
  }

  .html-style {
    padding: 16px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 25px;
  }

  .thumbs-body {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;

    .thumbs-up {
      display: flex;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      align-items: center;
      flex-direction: column;

      .thumb-img {
        margin-top: 16px;
        width: 33px;
        height: 33px;
      }

      .thumb-num {
        font-size: 12px;
        color: #ffffff;
        margin-top: 5px;
      }
    }
  }
}
</style>

