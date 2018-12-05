<template>
  <div class="modify-main">
    <div class="modify-main-title">修改头像</div>
    <div class="modify-child">
      <div v-for="(img,index) in agentImgList" :key="index" class="head-img" @click="selectedHead(index,img.status,img.itemCode)">
        <!--  v-if="img.status===1"   -->
        <img :src="img.itemCode"/>
        <!--   -->
        <img v-show='img.isActivted' :src="userEditIcon" class="isActivted" v-if="img.status===1" />
        <!--  -->
        <div flex="dir:top main:center cross:center" class="portrait-select" v-if="img.status===2">
          <input type="file" id="file" name="avatar" @change="changeImage($event)" ref="avatarInput" accept="image/*" class="portrait-select-input">
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
export default {
  data () {
    return {
      userEditIcon: require('IMG/user/updata/select.png'),
      userIcon: require('IMG/user/editInfo@2x.png'),
      headIcons: [
        { 'id': '1', 'itemCode': require('IMG/user/usercard@2x.png'), 'isActivted': false, 'type': 1 },
        { 'id': '2', 'itemCode': require('IMG/user/usercard@2x.png'), 'isActivted': false, 'type': 1 },
        { 'id': '3', 'itemCode': require('IMG/user/usercard@2x.png'), 'isActivted': false, 'type': 1 },
        { 'id': '4', 'itemCode': require('IMG/user/usercard@2x.png'), 'isActivted': false, 'type': 1 },
        { 'id': '5', 'itemCode': require('IMG/user/usercard@2x.png'), 'isActivted': false, 'type': 1 },
        { 'id': '6', 'itemCode': require('IMG/user/usercard@2x.png'), 'isActivted': false, 'type': 2 }

      ],
      agentImgList: []
    }
  },
  created() {
    this.getAgentLabelList()
  },
  methods: {
  async getAgentLabelList () {
      const res = await userService.getAgentImgList()
      this.agentImgList = res
    },
    selectedHead (index, type, avatar) {
      if (type === 1) {
        this.headIcons.forEach((item, i) => {
          let items = item
          items.isActivted = i === index ? true : false
          this.$set(this.headIcons, i, items)
        });
      }
    },
    changeImage (event) {
      this.fileObj = event.srcElement;
      let files = event.target.files || event.dataTransfer.files;
      let Url = this.getObjectURL(files[0])
      this.$router.replace({ path: 'me/cut', query: { originUrl: Url } })
    },
    //图片转码方法
    getObjectURL: function (file) {
      let url = null;
      if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else if (window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1) {   //chrome Safari
        url = window.webkitURL.createObjectURL(file);
      } else {
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    
    /**
     * 确认操作
     */
    commitImg(){
          console.log('11111111111111111111')
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
      border: 1px solid #B1C2DE;
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
