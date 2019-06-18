<template>
  <div class="learn-page">
    <div class="header-filter">
      <div class="linker-box">
        <span class="linker-name" @click="showFilter = !showFilter">万科瑧湾汇</span>
        <van-icon class="filter-van-icon-arrow" :name="`arrow-${showFilter ? 'up': 'down'}`"/>

        <transition name="fade">
          <div class="linker-filter-list" v-if="showFilter">
            <ul>
              <li>12121</li>
              <li>12121</li>
              <li>12121</li>
              <li>12121</li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="search-box">
        <img class="search-icon" :src="require('IMG/user/learn/search-icon.png')" alt>
        <span class="search-text">搜索</span>
      </div>
    </div>

    <div>
      <div class="card-box" v-for="list in [,,,]">
        <div class="card-header">
          <h3 class="card-title">佣金结算规则</h3>
          <div class="card-do">
            全部
            <img :src="require('IMG/user/learn/arrow-right.png')" alt>
          </div>
        </div>
        <div class="card-body">
          <!-- 横向显示一块 -->
          <div class="learn-list-1" v-for="(item, index) in learnList">
            <div class="learn-type">PDF</div>
            <img
              src="https://720ljq2-10037467.file.myqcloud.com/linker/18907437200/ed85ae82ecf74be1898adf54ad0c439e.jpg?watermark/1/image/aHR0cDovL3Bhbm8tc2NyYXB5LWltZy0xMjUxNDc0NzQxLnBpY2d6Lm15cWNsb3VkLmNvbS9sb2dvMS5wbmc=/blogo/2/gravity/southeast"
              alt
            >
            <div class="learn-info">
              <p
                class="title ellipsis ellipsis-2"
              >楼盘推介项目介绍资料学习，学习查看楼盘推介项楼盘推介项目介绍资料学习，学习查看楼盘推介项楼盘推介项目介绍资料学习，学习查看楼盘推介项楼盘推介项目介绍资料学习，学习查看楼盘推介项 目介绍资料学习，学习查看</p>
              <div class="abstract">2018/08/07更新 · 324查看 · <img class="abstract-img" :src="require('IMG/user/learn/img-icon.png')"/></div>
            </div>
          </div>

          <!-- 横向显示二块 -->
          <div class="learn-list-2">
            <div class="learn-block" v-for="item in [,,,]">
              <div class="learn-img">
                <img
                  src="https://720ljq2-10037467.file.myqcloud.com/linker/18907437200/ed85ae82ecf74be1898adf54ad0c439e.jpg?watermark/1/image/aHR0cDovL3Bhbm8tc2NyYXB5LWltZy0xMjUxNDc0NzQxLnBpY2d6Lm15cWNsb3VkLmNvbS9sb2dvMS5wbmc=/blogo/2/gravity/southeast"
                  alt
                >
                <span class="times">67:32</span>
              </div>
              <h3 class="title ellipsis">楼盘推介项目介绍楼盘推介项目介绍楼盘推介项目介绍</h3>
              <h3 class="abstract">2018/08/09更新 · 78观看</h3>
            </div>
          </div>

          <!-- 左右结构 -->
          <div class="learn-list-bet">
            <div class="learn-info">
              <h3 class="title ellipsis ellipsis-2">楼盘推介项目介绍楼盘推介项目介绍楼盘推介项目介绍</h3>
              <div>
                <span class="abstract">2018/12/08上传</span>
                <span class="abstract">1.2万浏览</span>
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
      </div>
    </div>

    <Tabbar name="底部tabbar"/>
  </div>
</template>

<script>
import Tabbar from './components/tabbar'
import './style.less'
export default {
  name: 'learn',
  components: {
    Tabbar
  },
  data() {
    return {
      learnList: [, , ,],
      showFilter: false
    }
  },
  methods: {}
}
</script>
