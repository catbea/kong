<template>
  <div class="todo-list-page">
    <div class="tips">
      <h3>{{incompleteNum}}件待办未完成</h3>
      <!-- <h3 v-else>已完成所有的待办任务</h3> -->
      <p>
        任务说明：每天都需要完成至少3条以上植入该楼盘的写一写分享，或者楼盘相关其他分享。
      </p>
    </div>
    <div class="list-box" v-show="todoList.length">
      <div class="list-head">
        <div class="name">相关楼盘</div>
        <div class="progress">完成进度</div>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="todo-item scale-1px-bottom" v-for="(item,index) in todoList" :key="index">
          <div class="name">{{item.objectName}}</div>
          <div class="progress" :class="{'resovle': item.taskStatus}">已完成({{item.taskQuotaStr}})</div>
        </div>
      </van-list>
    </div>
    <div class="nodata">
      <img src="../../assets/img/market/comment/nodata.png" alt="">
      <p>没有查询到待办任务！</p> 
    </div>
  </div>
</template>

<script>
import dynamicsService from 'SERVICE/dynamicsService'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      todoList: [],
      current: 1,
      pages: 1,
      pageSize: 10,
      incompleteNum: '',
      nodata : false
    }
  },
  created () {
    this.queryIncompleteNum()
  },
  methods: {
    // 经纪人未完成任务数量
    queryIncompleteNum () {
      dynamicsService.queryIncompleteNum({}).then(res => {
        this.incompleteNum = res.incompleteNum
      }).catch()
    },
    // 加载数据
    onLoad () {
      if (this.current > this.pages) {
        // 加载状态结束
        this.finished = true
        this.loading = false
      } else {
        this.queryTaskList()
      }
    },
    // 获取待办事件列表
    queryTaskList () {
      dynamicsService.queryTaskList({current: this.current, size: this.pageSize}).then(result => {
        if (result) {
          this.pages = result.pages
          let todoList = result.records
          if (this.current === 1) {
            this.todoList = todoList
          } else {
            this.todoList.push(...todoList)
          }
          this.current += 1
          this.loading = false
        }
      }).catch()
    }
  },

}
</script>

<style lang="less" scoped>
.todo-list-page{
  font-size: 12px;
  .tips{
    background:linear-gradient(270deg,rgba(0,122,230,1) 0%,rgba(0,158,230,1) 100%);
    padding: 20px 20px 40px;
    color: #fff;
    h3{
      font-size: 24px;
      padding-bottom: 10px;
    }
    p{
      color: rgba(255,255,255,0.8);
      line-height: 1.5;
    }
  }
  .list-box{
    margin-top: -20px;
    border-radius:8px 8px 0px 0px;
    background-color: #fff;
    padding: 20px 16px;
    .list-head{
      display: flex;
      font-size: 18px;
      font-weight: 600;
      padding-bottom: 10px;
      .name{
        flex: 1;
      }
      .progress{
        width: 100px;
        text-align: right;
      }
    }
    .todo-item{
      padding: 16px 0;
      display: flex;
      .name{
        flex: 1;
        font-size: 16px;
      }
      .progress{
        width: 100px;
        text-align: right;
        color: #007AE6;
        font-size: 12px;
        &.resovle{
          color: #919599;
        }
      }
    }
  }
  .nodata{
    height: 400px;
    color: #999;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;
    img{
      width: 88px;
    }
  }
}
</style>
