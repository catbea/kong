<template>
  <div class="todo-list-page">
    <div class="tips">
      <h3>7件待办未完成</h3>
      <p>
        任务说明：每天都需要完成至少3条以上植入该楼盘的写一写分享，或者楼盘相关其他分享。
      </p>
    </div>
    <div class="list-box">
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
          <div class="name">{{item.linkerName}}</div>
          <div class="progress" :class="{'resovle': item.resolve===item.total}">已完成({{item.resolve}}/{{item.total}})</div>
        </div>
      </van-list>
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
      todoList: [{linkerName: '三亚恒大', resolve: 6, total: 6}, {linkerName: '三亚恒大', resolve: 1, total: 6}, {linkerName: '三亚恒大', resolve: 1, total: 6}],
      current: 1,
      pages: 0,
      pageSize: 10
    }
  },
  created () {

  },
  methods: {
    // 加载数据
    onLoad () {
      if (this.current > this.pages) {
        // 加载状态结束
        this.finished = true
        this.loading = false
      } else {
        this.getTodoList()
      }
    },
    // 获取todoList列表
    getTodoList () {
      dynamicsService.getTodoList({}).then(result => {
        if (result) {
          this.pages = result.pages
          let todoList = result.todoList
          if (this.current === 1) {
            this.todoList = todoList
          } else {
            this.todoList.push(...todoList)
          }
          this.current += 1
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
}
</style>
