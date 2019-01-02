<template>
  <div class="no-disturb-page">
    <div class="no-disturb-page-top">
      <div class="disturb-box">勿扰模式
        <van-switch v-model="checked" @change="onSwitch"/>
      </div>
    </div>

    <div class="disturb-describe">启用勿扰模式后，在设定时间内将收不到任何推送提醒，请谨慎开启避免影响正常工作</div>

    <ul class="no-disturb-page-bottom" v-if="checked">
      <li @click="setHandle" class="cycle-set">
        <p>周期设置</p>
        <div class="right" ref="rr">
          <p class="show-date" v-show="showDate">每天</p>
          <div class="show-box" v-show="showBox">
            <i v-for="(item,index) in periodList" :key="index" v-show="item.check">{{item.date}}</i>
          </div>
          <span class="bg_img icon" :style="{backgroundImage:'url('+detaliImg+')'}"></span>
        </div>
        <van-popup v-model="popupShow" position="bottom" :overlay="true">
          <ol class="period-box">
            <li
              v-for="(item,index) in periodList"
              :key="index"
              @click.stop="periodTaget(index,item)"
            >
              {{item.date}}
              <span
                class="bg_img"
                :style="{backgroundImage:'url('+checkImg+')'}"
                v-show="item.check"
              ></span>
            </li>
          </ol>
          <div class="confirm-button" @click.stop="periodHandle">确定</div>
        </van-popup>
      </li>
      <li class="start-time" @click="startHandle">
        <p>开始时间</p>
        <div class="right">
          <i>{{startTime}}</i>
          <span class="bg_img icon" :style="{backgroundImage:'url('+detaliImg+')'}"></span>
        </div>
      </li>
      <van-popup v-model="startShow" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="startDate"
          type="time"
          @confirm="onStartConfirm"
          @cancel="onStartCancel"
        />
      </van-popup>
      <li class="end-time" @click="endHandle">
        <p>结束时间</p>
        <div class="right">
          <i>
            <span v-show="greater">次日</span>
            {{endTime}}
          </i>
          <span class="bg_img icon" :style="{backgroundImage:'url('+detaliImg+')'}"></span>
        </div>
      </li>
      <van-popup v-model="endShow" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="endDate"
          type="time"
          @confirm="onEndConfirm"
          @cancel="onEndCancel"
        />
      </van-popup>
    </ul>
  </div>
</template>
<script>
import userService from 'SERVICE/userService'
export default {
  data: () => ({
    checked: false,
    detaliImg: require('IMG/user/arr.png'),
    popupShow: false,
    checkImg: require('IMG/user/goxuan@2x.png'),
    periodList: [
      { date: '周一', check: false },
      { date: '周二', check: false },
      { date: '周三', check: false },
      { date: '周四', check: false },
      { date: '周五', check: false },
      { date: '周六', check: false },
      { date: '周日', check: false }
    ],
    showBox: true,
    date: '每天',
    showDate: false,
    itemDate: '',
    endShow: false,
    endDate: '12:00',
    endTime: null,
    startShow: false,
    startDate: '07:00',
    startTime: null,
    greater: false,
    tempDateSelect: [] //临时存放选择的时间数据
  }),

  created() {
    this.checkHaveDisturb()
  },

  methods: {
    onSwitch(checked) {
      this.checked = checked

      if (checked) {
        this.upDateSetting('1')
      } else {
        this.upDateSetting('0')
      }
    },

    //打开设置
    async upDateSetting(selectStatus) {
      let obj = {}
      obj.id = this.id
      obj.cycleType = '2'
      obj.beginTime = this.startDate
      obj.endTime = this.endDate
      obj.monday = this.monday
      obj.tuesday = this.tuesday
      obj.wednesday = this.wednesday
      obj.thursday = this.thursday
      obj.friday = this.friday
      obj.saturday = this.saturday
      obj.sunday = this.sunday
      obj.status = selectStatus //status 0:关闭  1:开启

      console.log(JSON.stringify(obj))

      const result = await userService.upDataDisturb(obj)
    },

    periodHandle() {
      this.popupShow = !this.popupShow
      if (
        this.periodList[0].check === true &&
        this.periodList[1].check === true &&
        this.periodList[2].check === true &&
        this.periodList[3].check === true &&
        this.periodList[4].check === true &&
        this.periodList[5].check === true &&
        this.periodList[6].check === true
      ) {
        this.showBox = false
        this.showDate = true
      } else {
        this.showBox = true
        this.showDate = false
      }
    },
    setHandle() {
      this.popupShow = !this.popupShow
    },
    periodTaget(index, item) {
      let selectArr = this.tempDateSelect
      let selectPosition = this.periodList[index].date
      if (this.isExistElement(selectArr, selectPosition)) {
        let position = selectArr.indexOf(selectPosition)
        let arrSize = selectArr.length
        if (arrSize <= 1) {
          this.$toast('必须选择一天')
        } else {
          if (position > -1) {
            selectArr.splice(position, 1)
            this.tempDateSelect = selectArr
            this.periodList[index].check = !this.periodList[index].check
            this.commitDayDate(index, 'dele')
            this.upDateSetting('1')
          }
        }
      } else {
        selectArr.push(selectPosition)
        this.tempDateSelect = selectArr
        this.periodList[index].check = !this.periodList[index].check
        this.commitDayDate(index, 'add')
        this.upDateSetting('1')
      }
    },

    isExistElement(arr, value) {
      if (arr.indexOf && typeof arr.indexOf == 'function') {
        var index = arr.indexOf(value)
        if (index >= 0) {
          return true
        }
      }
      return false
    },

    commitDayDate(position, operation) {
      if (operation == 'add') {
        if (position == 0) {
          this.monday = '1'
        } else if (position == 1) {
          this.tuesday = '1'
        } else if (position == 2) {
          this.wednesday = '1'
        } else if (position == 3) {
          this.thursday = '1'
        } else if (position == 4) {
          this.friday = '1'
        } else if (position == 5) {
          this.saturday = '1'
        } else if (position == 6) {
          this.sunday = '1'
        }
      } else if (operation == 'dele') {
        if (position == 0) {
          this.monday = '0'
        } else if (position == 1) {
          this.tuesday = '0'
        } else if (position == 2) {
          this.wednesday = '0'
        } else if (position == 3) {
          this.thursday = '0'
        } else if (position == 4) {
          this.friday = '0'
        } else if (position == 5) {
          this.saturday = '0'
        } else if (position == 6) {
          this.sunday = '0'
        }
      }
    },

    startHandle() {
      this.startShow = !this.startShow
    },
    onStartConfirm(N) {
      this.startTime = N
      this.startShow = !this.startShow
      this.upDateSetting('1')
    },
    onStartCancel() {
      this.startShow = !this.startShow
    },
    endHandle() {
      this.endShow = !this.endShow
    },
    onEndConfirm(N) {
      this.endTime = N
      this.endShow = !this.endShow
      if (this.endDate < this.startDate) {
        this.greater = true
        this.upDateSetting('1')
      } else {
        this.greater = false
        this.upDateSetting('1')
      }
    },
    onEndCancel() {
      this.endShow = !this.endShow
    },

    //查询是否设置了勿扰模式
    async checkHaveDisturb() {
      const result = await userService.checkDisturbSetting()
      // let tempList = this.periodList

      if (result) {
        let selectArr = this.tempDateSelect
        this.id = result.id

        let monday = result.monday
        let tuesday = result.tuesday
        let wednesday = result.wednesday
        let thursday = result.thursday
        let friday = result.friday
        let saturday = result.saturday
        let sunday = result.sunday
        let beginTime = result.beginTime
        let endTime = result.endTime

        this.monday = result.monday
        this.friday = friday
        this.tuesday = tuesday
        this.wednesday = wednesday
        this.thursday = thursday
        this.friday = friday
        this.saturday = saturday
        this.sunday = sunday

        if (beginTime == '') {
          this.startTime = ''
          this.startDate = ''
        } else {
          this.startTime = beginTime
          this.startDate = beginTime
        }

        if (endTime == '') {
          this.endDate = ''
          this.endTime = ''
        } else {
          this.endTime = endTime
          this.endDate = endTime
          if (this.endDate < this.startDate) {
            this.greater = true
          }
        }

        if (monday == '' || monday == '0') {
          this.periodList[0].check = false
        } else if (monday == '1') {
          this.periodList[0].check = true
          selectArr.push('周一')
        }
        if (tuesday == '' || tuesday == '0') {
          this.periodList[1].check = false
        } else if (tuesday == '1') {
          this.periodList[1].check = true
          selectArr.push('周二')
        }
        if (wednesday == '' || wednesday == '0') {
          this.periodList[2].check = false
        } else if (wednesday == '1') {
          this.periodList[2].check = true
          selectArr.push('周三')
        }
        if (thursday == '' || thursday == '0') {
          this.periodList[3].check = false
        } else if (thursday == '1') {
          this.periodList[3].check = true
          selectArr.push('周四')
        }
        if (friday == '' || friday == '0') {
          this.periodList[4].check = false
        } else if (friday == '1') {
          this.periodList[4].check = true
          selectArr.push('周五')
        }
        if (saturday == '' || saturday == '0') {
          this.periodList[5].check = false
        } else if (saturday == '1') {
          this.periodList[5].check = true
          selectArr.push('周六')
        }
        if (sunday == '' || sunday == '0') {
          this.periodList[6].check = false
        } else if (sunday == '1') {
          this.periodList[6].check = true
          selectArr.push('周日')
        }

        if (monday == '1' && tuesday == '1' && wednesday == '1' && thursday == '1' && friday == '1' && saturday == '1' && sunday == '1') {
          this.showDate = true
          this.showBox = false
        } else {
          this.showDate = false
          this.showBox = true
        }

        //设置过勿扰模式
        if (result.status == '0') {
          this.checked = false
        } else if (result.status == '1') {
          this.checked = true
        }
      } else {
        //没有设置过勿扰模式 开关进行关闭
        this.checked = false
        this.tempDateSelect = ['周一']
        this.periodList[0].check = true
        this.monday = '1'
        this.tuesday = '0'
        this.wednesday = '0'
        this.thursday = '0'
        this.friday = '0'
        this.saturday = '0'
        this.sunday = '0'

        this.startTime = this.startDate
        this.endTime = this.endDate
      }
    }
  }
}
</script>
<style lang="less">
.no-disturb-page {
  background: rgba(247, 249, 250, 1);
  .van-switch--on {
    background: #007ae6;
  }
  .no-disturb-page-top {
    margin-top: 10px;
    padding: 18px 15px 7px 14px;

    background: rgba(255, 255, 255, 1);
    .disturb-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 13px;
      font-size: 15px;

      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
    }
  }

  .disturb-describe {
    font-size: 13px;
    padding: 11px 16px 22px 15px;
    background: rgba(247, 249, 250, 1);
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }

  .no-disturb-page-bottom {
    background: rgba(255, 255, 255, 1);
    .cycle-set,
    .start-time,
    .end-time {
      width: 345px;
      display: flex;
      justify-content: space-between;
      height: 56px;
      margin-left: 15px;
      border-bottom: 1px solid #e6e6e6;
      align-items: center;
      p {
        font-size: 16px;

        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .show-date,
      .right {
        display: flex;
        font-size: 16px;

        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        .show-box {
          display: flex;
        }
        i {
          margin-right: 2px;
          font-style: normal;
          margin-top: 5px;
        }
        .icon {
          margin-top: 6px;
          width: 16px;
          height: 16px;
        }
      }
    }
    .cycle-set {
      .period-box {
        li {
          width: 360px;
          height: 50px;
          align-items: center;
          margin-left: 15px;
          display: flex;
          justify-content: space-between;
          font-size: 15px;

          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          span {
            width: 22px;
            height: 22px;
          }
        }
      }
      .confirm-button {
        border-top: 6px solid #e8e8e8;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 16px;

        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
</style>
