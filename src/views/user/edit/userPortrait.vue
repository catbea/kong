<template>
  <div class="modify-main">
    <div class="modify-main-title">修改头像</div>
    <div class="modify-child">
      <div
        v-for="(img,index) in agentImgList"
        :key="index"
        class="head-img"
        @click="selectedHead(index,img.type,img.itemCode)"
      >
        <!--   -->
        <img :src="img.itemCode" v-if="img.type===1">
        <!--   -->
        <img v-show="img.isActivted" :src="userEditIcon" class="isActivted" v-if="img.type===1">
        <!--  -->
        <div flex="dir:top main:center cross:center" class="portrait-select" v-if="img.type===2">
          <input
            type="file"
            id="file"
            name="avatar"
            @change="changeImage($event)"
            ref="avatarInput"
            accept="image/*"
            class="portrait-select-input"
          >
          <span class="portrait-select-add">+</span>
          <!-- <img :src="userIcon" class="portrait-select-Icon" /> -->
          <!-- <div class="portrait-select-add">本地相册</div> -->
        </div>
      </div>
    </div>
    <!-- @click="saveHead" -->
    <div class="modify-sure" @click="commitImg">确定</div>
  </div>
</template>
<script>
import userService from 'SERVICE/userService'
import { Dialog } from 'vant'
import { mapGetters } from 'vuex'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      userEditIcon: require('IMG/user/updata/select.png'),
      userIcon: require('IMG/user/editInfo@2x.png'),
      headIcons: [
        { id: '1', itemCode: require('IMG/user/usercard@2x.png'), isActivted: false, type: 1 },
        { id: '2', itemCode: require('IMG/user/usercard@2x.png'), isActivted: false, type: 1 },
        { id: '3', itemCode: require('IMG/user/usercard@2x.png'), isActivted: false, type: 1 },
        { id: '4', itemCode: require('IMG/user/usercard@2x.png'), isActivted: false, type: 1 },
        { id: '5', itemCode: require('IMG/user/usercard@2x.png'), isActivted: false, type: 1 },
        { id: '6', itemCode: require('IMG/user/usercard@2x.png'), isActivted: false, type: 2 }
      ],
      agentImgList: [],
      headIconLast: { itemCode: '', isActivted: false, type: 2 }
    }
  },


  computed: {
    ...mapGetters(['userInfo'])
  },

  created() {
    this.getAgentLabelList()
  },
  methods: {
    async getAgentLabelList() {
      const res = await userService.getAgentImgList()

      let imgSize = res.length
      for (let i = 0; i < imgSize; i++) {
        res[i].type = 1
      }
      res.push(this.headIconLast)
      this.agentImgList = res
    },
    selectedHead(index, type, avatar) {
      this.avatar = avatar

      if (type === 1) {
        this.agentImgList.forEach((item, i) => {
          let items = item
          items.isActivted = i === index ? true : false
          this.$set(this.agentImgList, i, items)
        })
      }
    },
    changeImage(event) {
      this.fileObj = event.srcElement
      let files = event.target.files || event.dataTransfer.files
      let Url = this.getObjectURL(files[0])

      //http://localhost/a9b9c3bf-e4ce-4247-a318-d230aaff63bf

      this.$router.replace({ path: '/user/edit/cutImg', query: { originUrl: Url } })
    },
    //图片转码方法
    getObjectURL: function(file) {
      let url = null
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      } else if (window.navigator.userAgent.indexOf('Chrome') >= 1 || window.navigator.userAgent.indexOf('Safari') >= 1) {
        //chrome Safari
        url = window.webkitURL.createObjectURL(file)
      } else {
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },

    async upHeaderImg(obj) {
      const result = await userService.upHeaderImg(obj)
       if(result){
        
       }else{
         this.$store.dispatch('userInfo', Object.assign(this.userInfo, { avatarUrl: this.avatar }))
          this.$router.go(-1)
       }
    },

    /**
     * 确认操作
     */
    commitImg() {
      if (this.avatar) {
        let obj = {
          avatarUrl: this.avatar
        }
        this.upHeaderImg(obj)
      } else {
        Dialog.alert({
          message: '请先选择头像'
        }).then(() => {
          // on close
        })
      }
    }
  }
}
</script>
<style lang="less">
.modify-main {
  background: #ffffff;

  .modify-main-title {
    font-size: 20px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    margin: 28px 16px;
  }
  .modify-child {
    .head-img {
      float: left;
      margin-left: 25px;
      margin-bottom: 24px;
      height: 60px;
      width: 60px;
      position: relative;
      margin-right: 4px;
      img {
        height: 60px;
        width: 60px;
        border-radius: 36px;
      }
      .isActivted {
        position: absolute;
        width: 20px;
        bottom: 0;
        right: 0;
        height: 20px;
      }
    }
    .portrait-select {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      border: 1px solid #b1c2de;
      border-radius: 36px;
      .portrait-select-input {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
      .portrait-select-Icon {
        width: 64px;
        height: 48px;
      }
      .portrait-select-add {
        font-size: 44px;
        color: rgba(177, 194, 222, 1);
        line-height: 50px;
        margin-left: 16px;
      }
    }
  }
  .modify-sure {
    height: 44px;
    background: rgba(0, 122, 230, 1);
    border-radius: 4px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 42px;
    width: 91%;
    text-align: center;
    margin-left: 16px;
    position: absolute;
    bottom: 10px;
  }
}
</style>
