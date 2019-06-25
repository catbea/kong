<template>
  <keep-alive>

    <div class="learn-page">
      <div class="header-filter">
        <div class="linker-box">
          <span class="linker-name" @click="showFilter = !showFilter">{{defaultLinker.linkerName}}</span>
          <van-icon class="filter-van-icon-arrow" :name="`arrow-${showFilter ? 'up': 'down'}`" />

          <transition name="fade">
            <div class="tips-box" v-if="showTips && defaultLinker.linkerId">
              当前显示“{{defaultLinker.linkerName}}”项目的培训内 容，点击可切换楼盘查看！
              <div class="square"></div>
              <img @click="closeTips()" class="close-icon" :src="require('IMG/user/learn/close-icon.png')" alt>
            </div>
          </transition>

          <transition name="fade">
            <div class="linker-filter-list" v-if="showFilter">
              <ul>
                <li @click="changeLinker(item)" v-for="(item, index) in linkerList" :key="item.linkerId">{{item.linkerName}}</li>
              </ul>
            </div>
          </transition>

        </div>
        <div class="search-box" @click="$router.push(`/user/learn/search?linkerId=${defaultLinker.linkerId}`)">
          <img class="search-icon" :src="require('IMG/user/learn/search-icon.png')" alt>
          <span class="search-text">搜索</span>
        </div>
      </div>

      <ContentLoader v-if="!loaded" />

      <div class="empty-learn" v-else-if="learnList.length == 0 && loaded">
        <img :src="require('IMG/user/learn/empty-learn.png')" alt>
        <p v-if="!defaultLinker.linkerId">请开通楼盘或上传培训素材</p>
        <p v-else>您开通的楼盘尚未上传培训素材</p>
      </div>

      <div v-else class="learn-wrap">
        <div class="card-box" v-for="(learn, type) in learnCollection">
          <div class="card-header">
            <h3 class="card-title">{{type.split('_')[0]}}</h3>
            <div class="card-do" v-if="showMore(type)" @click="toLearnList(type)">
              全部
              <img :src="require('IMG/user/learn/arrow-right.png')" alt>
            </div>
          </div>
          <div class="card-body">
            <!-- img -->
            <LearnList v-for="(item, index) in learn.img" fileType="img" @click.native="toLearnDeails(item, 'img')" :key="item.id" :item="item" :type="1" />

            <!-- pdf -->
            <LearnList v-for="(item, index) in learn.pdf" fileType="pdf" @click.native="toLearnDeails(item, 'pdf')" :key="item.id" :item="item" :type="1" />

            <!-- video -->
            <template v-if="learn.video && learn.video.length == 1">
              <LearnList v-for="(item, index) in learn.video" @click.native="playVideo(item, index, 'video')" fileType="video" :key="item.id" :item="item" :type="1">
                <video v-for="(item, index) in learn.video" ref="video" style="height:0; width: 0; opacity: 0; position:absolute;" :src="JSON.parse(item.content).url" controls="controls"></video>
              </LearnList>
            </template>

            <div class="learn-list-2" v-if="learn.video && learn.video.length > 1">
              <template v-for="(item, index) in learn.video">
                <LearnList fileType="video" @click.native="playVideo(item, index, 'videos')" :duration="getVideoDuration(item.content)" :key="item.id" :item="item" :type="2">
                  <video :src="JSON.parse(item.content).url" ref="videos" style="height:0; width: 0; opacity: 0; position:absolute;" controls="controls"></video>
                </LearnList>
              </template>
            </div>

            <!-- H5 -->
            <LearnList v-for="(item, index) in learn.h5" fileType="h5" @click.native="toLearnDeails(item, 'h5')" :item="item" :key="item.id" :type="3" />
          </div>
        </div>
      </div>

      <Tabbar name="底部tabbar" />
    </div>

  </keep-alive>
</template>

<script>
import Tabbar from './components/tabbar'
import LearnList from './components/learn-list'
import ContentLoader from './components/index-content-loader'
import userService from 'SERVICE/userService'
import { mapGetters } from 'vuex'
import { Toast } from 'vant'
import './style.less'
export default {
  name: 'learn',
  components: {
    Tabbar,
    LearnList,
    ContentLoader
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
          max: 2
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
      loaded: false,  //加载完成
      linkerList: [], //楼盘列表
      showFilter: false, //是否显示楼盘列表
      showTips: false, //是否显示提示.默认不显示
      defaultLinker: {}, //默认选择楼盘
      title: ''
    }
  },
  async created() {
    await this.getStudyLinkerList()
    await this.getStudyList()
    const alreadyLearn = localStorage.getItem('already-learn-study')
    if (!alreadyLearn) {
      this.showTips = true;
    }
  },

  computed: {
    ...mapGetters(['userInfo']),
  },
  watch: {
    defaultLinker(linker) {
      let path = this.$router.history.current.path
      this.$router.push({ path, query: { linkerId: linker.linkerId } })
    }
  },
  methods: {
    // 获取楼盘列表
    async getStudyLinkerList() {
      try {
        const linkerId = this.$route.query.linkerId
        const response = await userService.getStudyLinkerList()
        this.linkerList = response || []
        if (this.linkerList.length > 0) {
          this.defaultLinker = this.linkerList[0]
        }
        if (linkerId) {
          this.setDefaultLinker(linkerId)
        }
      } catch (error) {
        console.log('获取楼盘列表error', error)
      }
    },
    // 根据楼盘获取数据
    async getStudyList() {
      try {
        const { linkerId } = this.defaultLinker

        if (linkerId) {
          this.loaded = false;
          Toast.loading({
            message: '加载中...'
          })

          const response = await userService.getStudyListByLinkerId({
            linkerId
          })

          this.loaded = true;
          Toast.clear()
          const learnList = response || []
          const learnType = this.learnType
          const fileType = this.fileType
          let learnCollection = {}
          let typeIndex = 0
          // 遍历素材类型，数据按素材类型分类
          for (let type in learnType) {
            const arr = learnList.filter(item => item.type == type)
            let typeArray = []
            let learnObj = {}
            if (arr.length > 0) {
              // 遍历对应的文件类型，蒋数据按文件类型分类
              for (let format in fileType) {
                typeArray = []
                arr.forEach((element, index) => {
                  // 记录该素材类型的真实数据长度
                  typeIndex = index + 1
                  let max = 0
                  if (element.type == type) {
                    //对应素材所显示的最大数量
                    max = learnType[type].max
                  }
                  // 在限制的数量之内，截断数据
                  if (element.format == format && index < max) {
                    typeArray.push({
                      ...element
                    })
                    learnObj[fileType[format]] = typeArray
                  }
                })
              }
              let { name, max } = learnType[type]
              // 字段名按照  素材类型名称_最大限制数量_实际数量_ 素材类型 命名
              learnCollection[`${name}_${max}_${typeIndex}_${type}`] = learnObj
            }
          }
          this.learnList = learnList //原始数据
          this.learnCollection = learnCollection
        } else {
          this.loaded = true;
        }
      } catch (error) { }
    },
    // 新增记录学习
    async addLearnRecord({ id, developersId, linkerId }) {
      try {
        await userService.getDevelopersMaterialadd({
          agentId: this.userInfo.agentId,
          materialId: id,
          developersId,
          linkerId
        });
        console.log('调用增加接口完毕');
      } catch (error) {

      }
    },
    // 关闭提示
    closeTips() {
      this.showTips = false;
      localStorage.setItem('already-learn-study', true)
    },
    // 切换楼盘获取对应的数据
    changeLinker(linker) {
      this.defaultLinker = linker
      this.showFilter = false

      this.getStudyList()
    },
    // 判断该组素材是否超出限制数量则显示更多
    showMore(learnName) {
      let [, max, num] = learnName.split('_')
      return num > max
    },
    //根据传入的LinkerId设置默认的楼盘
    setDefaultLinker(linkerId) {
      const linker = this.linkerList.filter(item => item.linkerId == linkerId)
      if (linker.length > 0) {
        this.defaultLinker = linker[0]
      }
    },
    // 跳转对应的二级页面列表
    toLearnList(type) {
      const url = [, 'contorlTime', 'commissionRule', 'salesVideo', 'floor', 'salesAsk', 'customerPortrait', 'arecProduct', 'marker']
      const linkerId = this.defaultLinker.linkerId
      type = type.split('_').splice(-1)
      this.$router.push(`/user/learn/secondPage/${url[type]}?linkerId=${linkerId}`)
    },
    //跳转到详情
    toLearnDeails(learn, type) {
      this.title = learn.title
      this.$router.push(`/user/learn/thirdPage/${type}?id=${learn.id}&linkerId=${learn.linkerId}`)
    },
    // 播放时自动全屏
    playVideo(learn, index, ref) {
     
      let element = this.$refs[ref]
      if (element instanceof Array) {
        element = element[index]
      }
      this.requestFullscreen(element)
      element.play()

      if (learn.firstPlay) return;
      console.log('开始调用增加接口');
      learn.firstPlay = true;
      this.addLearnRecord(learn);
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
    },

    getVideoDuration(content) {
      let { duration } = JSON.parse(content)

      function zero(times) {
        return times < 10 ? '0' + times : times;
      }

      let hour = Math.floor(duration / 3600) < 10 ? '0' + Math.floor(duration / 3600) : Math.floor(duration / 3600);
      let minutes = Math.floor((duration / 60 % 60)) < 10 ? '0' + Math.floor((duration / 60 % 60)) : Math.floor((duration / 60 % 60));
      let seconds = Math.floor((duration % 60)) < 10 ? '0' + Math.floor((duration % 60)) : Math.floor((duration % 60));

      let times = ''

      if (hour > 0) {
        times += hour + ' : '
      }

      times += minutes + ' : '
      times += seconds

      return times
    }
  },
  beforeRouteLeave(to, from, next) {
    // debugger
    if (this.title != '') {
      to.meta.title = this.title
    }
    next()
  }
}
</script>
