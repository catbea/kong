<template>
    <div class="list-body">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            v-if="haveData"
        >

        <write-article :selectType="typeCode" :dataArray="myWriteList" @enterDetail='enterDetail'></write-article>    

        </van-list>

        <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="!haveData"></null>
    </div>
</template>
<script>
import writeArticle from 'COMP/User/writeArticle/index'
import Null from 'COMP/Null'
import userService from 'SERVICE/userService'

export default {
  components: {
    writeArticle,
    Null
  },

  data() {
    return {
      loading: false,
      finished: false,
      haveData: true,
      nullIcon: require('IMG/user/collection/Article@2x.png'),
      nullcontent: '暂还没有文章记录',
    }
  },

  methods: {
    async onLoad() {
        const res = await userService.queryWriteArticleList(selectType, this.current)
    }
  }
}
</script>

<style lang="less">
.list-body {
  width: 100%;
  height: 100%;
  background-color: #f7f9fa;
}
</style>
