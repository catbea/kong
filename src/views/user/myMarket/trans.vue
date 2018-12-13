<template>
  <div class="ap">
  <div class="wrap">
    <transition name="show">
      <div class="d" v-for="item in list" :key="item.id" v-if="count === item.id">
        {{ item.text }}
      </div>
    </transition>
  </div>
</div>
</template>
<script>
export default {
  created() {
    this.add()
  },
  data:()=>({
        count: 0,
        list: [
          {id: 0, text: 1},
          {id: 1, text: 2},
          {id: 2, text: 3}
        ]
  }),
  methods:{
    add() {
      setInterval(() => {
        if (this.count < this.list.length - 1) {
          this.count += 1;
        } else {
          this.count = 0;
        }
      },3000);
      }
  }
}
</script>

<style lang="less">
.ap{
  width:80px;
  margin-left:100px;
}
.d {
      position: absolute;
      border-radius:50%;
      width:40px;
      height:40px;
      border:1px solid;
    }
    @keyframes show {
      0% {
        opacity: 0;
        left: 32px;
      }
      100% {
        opacity: 1;
        left: 0;
      }
    }
    @keyframes hide {
      0% {
        opacity: 1;
        left: 0;
      }
      100% {
        opacity: 0;
        left: -32px;
      }
    }
    .show-enter-active {
      animation: show 1.2s;
    }
    .show-leave-active {
      animation: hide 1.2s;
    }
    .show-enter, .show-leave-to {
      opacity: 0;
    }
    .wrap {
      position: relative;
      width: 32px;
      height: 32px;
    }
</style>
