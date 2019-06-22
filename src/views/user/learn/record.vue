<template>
  <div class="learn-record-page">
    
    <div class="empty-record" v-if="!loading && recordList.length == 0">
      <img :src="require('IMG/user/learn/empty-record.png')" alt>
      <p>还没有学习过任何资料！</p>
    </div>

    <div class="learn-list" v-else>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getStudyRecord">
        <div class="learn-item" v-for="(item, index) in recordList" @click="toLearnDeails(item, fileType[item.format], index)">
          <div class="learn-img">
            <div :class="fileType[item.format].toLowerCase()" class="learn-type" v-if="item.format != 2">{{fileType[item.format].replace('IMG', '图集')}}</div>

            <template v-else>
              <div class="video-duration">{{getVideoDuration(item.content)}}</div>

              <div class="abstract-video" :style="{'background-image': `url(${require('IMG/user/learn/video-icon.png')})`}"></div>

              <video :ref="'video'+ index" style="height:0; width: 0; opacity: 0" :src="JSON.parse(item.content).url" controls="controls"></video>
            </template>

            <img :src="item.coverImgUrl" alt>
          </div>
          <div class="learn-info">
            <h3 class="title ellipsis">{{item.title}}</h3>
            <p class="linker-name">
              所属楼盘：
              <span>{{item.linkerName}}</span>
            </p>
            <div class="times">查看时间：{{formatDate(item.updateTime)}}</div>
          </div>
        </div>
      </van-list>
    </div>

    <ContentLoader v-if="loading" />

    <Tabbar name="底部tabbar" />
  </div>
</template>

<script>
import Tabbar from './components/tabbar'
import userService from 'SERVICE/userService'
import ContentLoader from './components/record-content-loader'
import { List, Toast } from 'vant'
import { formatDate } from './../../../utils/tool'

export default {
  name: 'learnRecord',
  components: {
    Tabbar,
    ContentLoader
  },
  data() {
    return {
      loading: false,
      finished: false,
      recordList: [],
      current: 1,
      size: 10,
      fileType: {
        1: 'IMG',
        2: 'VIDEO',
        3: 'PDF',
        4: 'H5'
      },
      title: ''
    }
  },
  created() {
    this.getStudyRecord()
  },
  methods: {
    async getStudyRecord() {

      this.loading = true
      const response = await userService.getStudyRecord({
        current: this.current,
        size: this.size
      })
      const records = response.records || []
      this.recordList.push(...records)
      this.loading = false
      this.current++
      if (records.length == 0) {
        this.finished = true
      }
    },
    formatDate(time) {
      return formatDate(time, 'YYYY-MM-DD')
    },
    getVideoDuration(content) {
      let { duration } = JSON.parse(content)
      return Math.floor(duration / 60) + ':' + (duration % 60)
    },
    //跳转到详情
    toLearnDeails(learn, type, index) {
      if (type == 'video') {
        return this.playVideo(learn, index)
      }
      this.title = learn.title
      this.$router.push(`/user/learn/thirdPage/${type}?id=${learn.id}&linkerId=${learn.linkerId}`)
    },
    // 播放时自动全屏
    playVideo(learn, index) {
      let element = this.$refs['video' + index][0]
      this.requestFullscreen(element)
      element.play()
    },
    // 全屏兼容代码
    requestFullscreen(ele) {
      if (ele.requestFullscreen) {
        ele.requestFullscreen()
      } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen()
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen()
      } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen()
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    to.meta.title = this.title
    next()
  }
}
</script>

<style lang="less">
.learn-record-page {
  padding-bottom: 49px;
  font-family: 'Microsoft YaHei', 'PingFangSC-Regular';
  .ellipsis {
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ellipsis-2 {
    -webkit-line-clamp: 2;
  }
  .learn-list {
    padding: 0 16px;
    margin-bottom: 24px;
    box-sizing: border-box;
  }
  .learn-item {
    display: flex;
    position: relative;
    margin-top: 24px;
    height: 90px;
  }
  .learn-img,
  .learn-img img {
    width: 120px;
    height: 90px;
    border-radius: 6px;
    position: relative;
  }
  .learn-img {
    .learn-type {
      width: 33px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      z-index: 9;
      border-radius: 0px 4px 0px 4px;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 10px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .video-duration {
      position: absolute;
      right: 4px;
      bottom: 4px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 15px;
      z-index: 99;
    }
    .abstract-video {
      z-index: 99;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -20px;
      margin-top: -20px;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background-size: cover;
    }
    .pdf {
      background: rgba(250, 100, 0, 1);
    }
    .img {
      background: #2882ff;
    }
    .h5 {
      background: #01b805;
    }
  }
  .learn-info {
    flex: 1;
    margin-left: 12px;
    .title {
      height: 42px;
      font-size: 14px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
      margin-bottom: 10px;
    }
    .linker-name {
      font-size: 10px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
      margin-bottom: 10px;
      span {
        color: #666666;
      }
    }
    .times {
      font-size: 10px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
    }
  }

  .empty-record {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: -50px;
    text-align: center;
    img {
      height: 88px;
      width: 88px;
    }
    p {
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>