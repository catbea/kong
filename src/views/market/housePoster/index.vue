<template>
  <div class="house-poster">
    <div class="house-poster-box" v-show="!showPreview">
      <div class="house-poster-item"  v-for="(item,index) in posterList" :key="index" >
        <p class="time">{{item.timeStamp | formatData}}</p>
        <div class="pic-box">
          <img  v-for="(option,i) in item.posterList" :key="i"  :src="option.posterImage" alt="" @click="showPreviewFn(index, i)">
        </div>
      </div>
    </div>
    <div class="image-preview" v-if="showPreview" @click="hidePreview">
      <div class="img-box">
        <van-swipe @change="onChange" :initial-swipe="current" :loop="false">
          <van-swipe-item v-for="(item,index) in imagePreviewList" :key="index">
            <img :src="item.posterImage" alt="" srcset="">
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">
            {{ current + 1 }}/{{imagePreviewList.length}}
          </div>
        </van-swipe>
      </div>
      <div class="info">
        <h3 class="title">{{imgData.title}}</h3>
        <p class="time">{{imgData.createTimeStamp | formatData}}</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import marketService from 'SERVICE/marketService'
export default {
  data () {
    return {
      marketId: '',
      posterList: [],
      imagePreviewObj: '',
      current: 0,
      showPreview: false
    }
  },
  created () {
    this.marketId = this.$route.params.id
    this.getPosterList()
  },
  computed:{
    imagePreviewList () {
      let imgs = []
      this.posterList.length && this.posterList.forEach(item => {
        imgs.push(...item.posterList)
      })
      return imgs
    },
    imgData () {
      let data = {}
      if (this.posterList.length) {
        data = this.imagePreviewList[this.current]
      }
      return data
    }
  },
  methods: {
    // 获取海报
    getPosterList () {
      marketService.getPosterList({linkerId: this.marketId}).then((result) => {
        if (result.records&&result.records.length) {
          this.posterList = result.records
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    // 预览图片切换
    onChange (index) {
      this.current  = index 
    },
    // 显示图片预览
    showPreviewFn (index, i) {
      this.showPreview = true
      this.imagePreview(index, i)
    },
    // 隐藏预览
    hidePreview () {
      this.showPreview = false
    },
    // 获取初始化索引
    imagePreview (index,i) {
      let num = i
      for (let x = 0; x < index - 1; x++) {
        let item = this.posterList[x]
        num += item.posterList.length
      }
      this.current = num
    }
  },
  filters: {
    // 格式化时间
    formatData (time) {
      let date =  new Date(+time)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      return `${y}/${m}/${d}`
    }
  },
  beforeDestroy () {
    this.imagePreviewObj&&this.imagePreviewObj.close()
  }
}
</script>

<style lang="less" scoped>
.house-poster{
  font-size: 16px;
  height: 100%;
  position: relative;
  .house-poster-box{
    position: relative;
    .house-poster-item{
      padding: 16px 16px 0;
      border-bottom: 10px solid #F7F9FA;
      .time{
        font-size: 16px;
        color: #333;
        margin-bottom: 5px;
      }
      .pic-box{
        margin-top: 5px;
        display: flex;
        flex-flow: row wrap; 
        img{
          width: 102px;
          height: 76px;
          border-radius: 6px;
          margin: 0 16px 16px 0;
          &:nth-child(3n+3){
            margin-right: 0;
          }
        }
      }
    }
  }
  .image-preview{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background:linear-gradient(46deg,rgba(37,39,55,1) 0%,rgba(72,76,98,1) 100%);
    .img-box{
      margin: 20px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      .van-swipe{
        flex: 1;
      }
    }
    .info{
      height: 70px;
      margin: 30px 20px 40px;
      .title{
        font-size: 16px;
        color: #fff;
        line-height: 1.5;
      }
      .time{
        font-size:14px;
        color: rgba(255,255,255,0.5);
        padding-top: 5px;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 12px;
      font-size: 12px;
      color: #fff;
      border-radius:10px;
      background: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>