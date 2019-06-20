<template>
  <!-- 横向展示一块 -->
  <div class="learn-list-1" v-if="type == 1">
    <div class="learn-type" v-if="fileType == 'pdf'">PDF</div>
    <img :src="item.coverImgUrl" alt>
    <div class="learn-info">
      <p class="title ellipsis ellipsis-2">{{item.title}}</p>
      <div class="abstract">
        {{formatDate(item.updateTime)}}更新 · {{item.browseNum}}查看
        <template v-if="fileType == 'img'">
          <span>·</span>
          <img class="abstract-img" :src="require('IMG/user/learn/img-icon.png')">
        </template>
      </div>
    </div>

    <template v-if="fileType == 'video'">
      <div
        class="abstract-video"
        :style="{'background-image': `url(${require('IMG/user/learn/video-icon.png')})`}"
      ></div>
    </template>
  </div>

  <!-- 横向显示二块 -->
  <div class="learn-block" v-else-if="type == 2">
    <div class="learn-img">
      <img :src="item.coverImgUrl" alt>
      <span v-if="fileType == 'video'" class="times">67:32</span>
    </div>
    <h3 class="title ellipsis">{{item.title}}</h3>
    <h3 class="abstract">{{formatDate(item.updateTime)}}更新 · {{item.browseNum}}观看</h3>
  </div>

  <!-- 左右结构 -->
  <div class="learn-list-bet" v-else-if="type == 3">
    <div class="learn-info">
      <h3 class="title ellipsis ellipsis-2">{{item.title}}</h3>
      <div>
        <span class="abstract">{{formatDate(item.updateTime)}}上传</span>
        <span class="abstract">{{item.browseNum}}万浏览</span>
      </div>
    </div>
    <div class="learn-img">
      <img :src="item.coverImgUrl" alt>
    </div>
  </div>
</template>

<script>
import { parseTime } from './../../../../utils/tool';
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
    }
  },
  methods: {
    formatDate(time){
      return parseTime(time, '{y}-{m}-{d}');
    }
  }
}
</script>