<template>
  <div>
    <!-- 横向展示一块 -->
    <div class="learn-list-1" v-if="type == 1">
      <div class="learn-type" v-if="fileType == 'pdf'">PDF</div>
      <img :src="item.coverImgUrl" alt>
      <div class="learn-info">
        <p class="title ellipsis ellipsis-2">{{item.title}}</p>
        <div class="abstract">
          {{item.updateTime}}更新 · {{item.browseNum}}查看
          <template v-if="fileType == 'img'">
            <span>·</span>
            <img class="abstract-img" :src="require('IMG/user/learn/img-icon.png')">
          </template>
        </div>
      </div>
      <template v-if="fileType == 'video'">
        <div class="abstract-video"></div>
      </template>
    </div>

    <!-- 横向显示二块 -->
      <!-- <div class="learn-list-2" >
     
    </div> -->
    <div class="learn-block" v-if="type == 2">
      <div class="learn-img">
        <img :src="item.coverImgUrl" alt>
        <span class="times">67:32</span>
      </div>
      <h3 class="title ellipsis">{{item.title}}</h3>
      <h3 class="abstract">{{item.updateTime}}更新 · {{item.browseNum}}观看</h3>
    </div>

    <!-- 左右结构 -->
    <div class="learn-list-bet" v-if="type == 3">
      <div class="learn-info">
        <h3 class="title ellipsis ellipsis-2">{{item.title}}</h3>
        <div>
          <span class="abstract">{{item.updateTime}}上传</span>
          <span class="abstract">{{item.browseNum}}万浏览</span>
        </div>
      </div>
      <div class="learn-img">
        <img
          src="https://720ljq2-10037467.file.myqcloud.com/linker/18907437200/ed85ae82ecf74be1898adf54ad0c439e.jpg?watermark/1/image/aHR0cDovL3Bhbm8tc2NyYXB5LWltZy0xMjUxNDc0NzQxLnBpY2d6Lm15cWNsb3VkLmNvbS9sb2dvMS5wbmc=/blogo/2/gravity/southeast"
          alt
        >
      </div>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>