<template>
  <!-- 横向展示一块 -->
  <div class="learn-list-1" v-if="type == 1">
    <div class="learn-type" v-if="fileType == 'pdf'">PDF</div>
    <img :src="item.coverImgUrl" alt>
    <div class="learn-info">
      <p class="title ellipsis ellipsis-2">{{item.title}}</p>
      <div class="abstract">
        更新时间：{{formatDate(item.updateTime)}} · {{item.browseNum}}{{fileType == 'video'? '观看':'查看'}}
        <template v-if="fileType == 'img'">
          <span>·</span>
          <img class="abstract-img" :src="require('IMG/user/learn/img-icon.png')">
        </template>
      </div>

    </div>
    <slot></slot>
    <template v-if="fileType == 'video'">
      <div class="abstract-video" :style="{'background-image': `url(${require('IMG/user/learn/video-icon.png')})`}"></div>
    </template>
  </div>

  <!-- 横向显示二块 -->
  <div class="learn-block" v-else-if="type == 2">
    <div class="learn-img">
      <img :src="item.coverImgUrl" alt>
      <div class="times" v-if="fileType == 'video'">
        <span>{{duration}}</span>
      </div>
    </div>
    <slot></slot>
    <h3 class="title ellipsis">{{item.title}}</h3>
    <h3 class="abstract">更新时间：{{formatDate(item.updateTime)}} · {{item.browseNum}}{{fileType == 'video'? '观看':'查看'}}</h3>
  </div>

  <!-- 左右结构 -->
  <div class="learn-list-bet" v-else-if="type == 3">
    <div class="learn-info">
      <h3 class="title ellipsis ellipsis-2">{{item.title}}</h3>
      <div>
        <span class="abstract">更新时间：{{formatDate(item.updateTime)}}</span>
        <span class="abstract">{{item.browseNum}}浏览</span>
      </div>
    </div>
    <div class="learn-img">
      <img :src="item.coverImgUrl" alt>
    </div>
  </div>
</template>

<script>
import { formatDate } from './../../../../utils/tool'
export default {
  props: {
    type: {
      type: Number,
      default: 1
    },
    item: {
      type: Object,
      default: {}
    },
    fileType: {
      type: String,
      default: ''
    },
    duration: {
      type: String,
      default: '0'
    }
  },
  methods: {
    formatDate(time) {
      return formatDate(time, 'YYYY/MM/DD')
    }
  }
}
</script>