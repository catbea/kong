<template>
  <div class="learn-page">
    <div class="header-filter">
      <div class="linker-box">
        <span class="linker-name" @click="showFilter = !showFilter">{{defaultLinker.linkerName}}</span>
        <van-icon class="filter-van-icon-arrow" :name="`arrow-${showFilter ? 'up': 'down'}`"/>

        <transition name="fade">
          <div class="tips-box" v-if="showTips">
            当前显示“{{defaultLinker.linkerName}}”项目的培训内 容，点击可切换楼盘查看！
            <div class="square"></div>
            <img
              @click="showTips = false"
              class="close-icon"
              :src="require('IMG/user/learn/close-icon.png')"
              alt
            >
          </div>
        </transition>

        <transition name="fade">
          <div class="linker-filter-list" v-if="showFilter">
            <ul>
              <li v-for="(item, index) in linkerList" :key="item.linkerId">{{item.linkerName}}</li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="search-box" @click="$router.push('/user/learn/search')">
        <img class="search-icon" :src="require('IMG/user/learn/search-icon.png')" alt>
        <span class="search-text">搜索</span>
      </div>
    </div>

    <div class="empty-learn" v-if="learnList.length == 0">
      <img :src="require('IMG/user/learn/empty-learn.png')" alt>
      <p>该楼盘还未上传任何学习资料</p>
    </div>

    <!-- <div v-else> -->
    <div>
      <div class="card-box" v-for="(learn, type) in learnCollection">
        <div class="card-header">
          <h3 class="card-title">{{type}}</h3>
          <!-- v-if="blockStyle(learn[0], learn).showMore" -->
          <div class="card-do" v-if="showMaxNum(learn, type)">
            全部
            <img :src="require('IMG/user/learn/arrow-right.png')" alt>
          </div>
        </div>
        <div class="card-body">
          <template v-for="(item, index) in learn.img">
            <!-- img -->
            <LearnList v-if="learn.img.length == 1" :item="item" :type="1"  fileType="img"/>
            <LearnList v-if="learn.img.length > 1" :item="item" :type="2"  fileType="img"/>
          </template>

          <template v-for="(item, index) in learn.pdf">
            <!-- pdf -->
            <LearnList :item="item" :type="1" fileType="pdf" />
          </template>

          <template v-for="item in learn.video">
            <LearnList v-if="learn.video.length == 1" :item="item" :type="1"  fileType="video"/>
          </template>

          <!-- H5 -->
          <template v-for="(item, index) in learn.h5">
            <div class="learn-list-bet" v-if="item.max > index">
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
          </template>
        </div>
      </div>
    </div>

    <Tabbar name="底部tabbar"/>
  </div>
</template>

<script>
import Tabbar from './components/tabbar'
import LearnList from './components/learn-list'
import userService from 'SERVICE/userService'
import './style.less'
export default {
  name: 'learn',
  components: {
    Tabbar,
    LearnList
  },
  data() {
    return {
      learnType: {
        1: {
          name: '实时销控表',
          max: 2
        },
        2: {
          name: '佣金结算规则',
          max: 2
        },
        3: {
          name: '销售培训视频',
          max: 3
        },
        4: {
          name: '楼盘标准化价值点',
          max: 1
        },
        5: {
          name: '销售百问',
          max: 1
        },
        6: {
          name: '目标客户画像',
          max: 1
        },
        7: {
          name: '区域竞品分析',
          max: 2
        },
        8: {
          name: '市场政策与对策',
          max: 2
        }
      },
      fileType: {
        1: 'img',
        2: 'video',
        3: 'pdf',
        4: 'h5'
      },
      learnList: [],
      learnCollection: {},
      linkerList: [], //楼盘列表
      showFilter: false, //是否显示楼盘列表
      showTips: false, //是否显示提示
      defaultLinker: {} //默认选择楼盘
    }
  },
  async created() {
    await this.getStudyLinkerList()
    await this.getStudyList()
  },
  methods: {
    async getStudyLinkerList() {
      // 获取楼盘列表
      try {
        const response = await userService.getStudyLinkerList()
        this.linkerList = response || []
        if (this.linkerList.length > 0) {
          this.defaultLinker = this.linkerList[0]
        }
      } catch (error) {
        console.log('获取楼盘列表error', error)
      }
    },
    async getStudyList() {
      try {
        const { linkerId } = this.defaultLinker
        if (linkerId) {
          const response = await userService.getStudyListByLinkerId({
            linkerId
          })

          const learnList = response || []
          const learnType = this.learnType
          const fileType = this.fileType
          let typeCollection = {}
          let learnCollection = {}

          for (let type in learnType) {
            const arr = learnList.filter(item => item.type == type)
            let typeArray = []
            let learnObj = {}
            if (arr.length > 0) {
              for (let format in fileType) {
                typeArray = []
                arr.forEach(element => {
                  if (element.format == format) {
                    let max = 0
                    if (element.type == type) {
                      max = learnType[type].max
                    }
                    typeArray.push({
                      ...element,
                      max
                    })
                    learnObj[fileType[format]] = typeArray
                  }
                })
              }
              learnCollection[learnType[type].name] = learnObj
            }
          }

          this.learnList = learnList
          this.learnCollection = learnCollection
          console.log(learnCollection)
        }
      } catch (error) {}
    },
    blockStyle(item, list) {
      console.log(item, list)
      // 根据文件类型和数量返回对应的展示方式
      const result = {}
      const max = this.learnType[item.type].max //对应类型显示数量限制
      let block = 1 //采用一行N列的展示方式

      if ([1, 3].includes(item.format)) {
        //图片或者pdf
        if (list.length >= 2) {
          // 数量大于2
          block = 2
        }
      }

      if ([4].includes(item.format)) {
        // h5
        block = 'bet'
      }

      return {
        max,
        showMore: list.length >= max,
        block
      }
    },
    showMaxNum(learn, type) {
      const learnType = this.learnType
      let max = 0
      let showMore = false
      for (let key in learnType) {
        if (learnType[key].name == type) {
          max = learnType[key].max
          console.log(learn, type)
        }
      }
      return {
        max
      }
    },

    getFileType(item) {
      const fileType = this.fileType[item.format]
      return {
        // className: fileType,
        // name: fileType.toUpperCase()
        className: 'pdf',
        name: 'PDF'
      }
    }
  }
}
</script>
