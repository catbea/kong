<template>
<div class="share-box">
  <div class="share-card">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="card-info card1">
            <div class="cover">
              <p class="avat"><img :src="shareBaseInfo.avatarUrl" alt="封面"></p>
                <div class="name">
                  <h3>{{shareBaseInfo.agentName}}</h3>
                  <span>{{shareBaseInfo.pinyin}}</span>
                </div>
            </div>
            <div class="qrcode">
              <img :src="shareBaseInfo.miniQrCode" alt="小程序">
              <span>长按识别更多</span>
            </div>
            <div class="data-info">
              <h3>{{shareBaseInfo.signature}}</h3>
              <p><span>Tel :</span>{{shareBaseInfo.mobile}}</p>
              <p><span>Col :</span>{{shareBaseInfo.institutionName}}</p>
              <p><span>Add:</span>{{shareBaseInfo.mojarRegion}}</p>
            </div>

          </div>
        </div>
        <div class="swiper-slide">
          <div class="card-info card2">
            <div class="avat">
              <img :src="shareBaseInfo.avatarUrl" alt="封面" />
               </div>
              <div class="data-info">
                <div class="data-info-box">
                  <div class="data">
                    <div class="name">
                      <b>{{shareBaseInfo.agentName}}</b>
                      <span>{{shareBaseInfo.pinyin}}</span>
                    </div>
                    <div class="info">
                      <p><span>Tel :</span>{{shareBaseInfo.mobile}}</p>
                      <p><span>Col :</span>{{shareBaseInfo.institutionName}}</p>
                      <p><span>Add:</span>{{shareBaseInfo.mojarRegion}}</p>
                    </div>
                  </div>
                  <div class="qrcode">
                    <img :src="shareBaseInfo.miniQrCode" alt="小程序">
                    <span>长按识别更多</span>
                  </div>
                </div>
                <div class="signature">
                  {{shareBaseInfo.signature}}
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-info card3">
              <div class="avat">
                <img :src="shareBaseInfo.avatarUrl" alt="封面" />
                <p>{{shareBaseInfo.signature}}</p>
              </div>
              <div class="name">
                <h3>{{shareBaseInfo.agentName}}</h3>
                <span>{{shareBaseInfo.mobile}}</span>
              </div>
              <div class="data-info">
                <p><span>Col : </span>{{shareBaseInfo.institutionName}}</p>
                <p><span>Add: </span>{{shareBaseInfo.mojarRegion}}</p>
              </div>
              <div class="qrcode">
                <img :src="shareBaseInfo.miniQrCode" alt="小程序">
                <span>长按识别更多</span>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-info card4">
              <div class="avat">
                <img :src="shareBaseInfo.avatarUrl" alt="封面" />
              </div>
                <div class="data-info">
                  <div class="data-info-box">
                    <div class="data">
                      <div class="name">
                        <b>{{shareBaseInfo.agentName}}</b>
                        <span>{{shareBaseInfo.pinyin}}</span>
                      </div>
                      <div class="info">
                        <p><span>Tel :</span>{{shareBaseInfo.mobile}}</p>
                        <p><span>Col :</span>{{shareBaseInfo.institutionName}}</p>
                        <p><span>Add:</span>{{shareBaseInfo.mojarRegion}}</p>
                      </div>
                    </div>
                    <div class="qrcode">
                      <img :src="shareBaseInfo.miniQrCode" alt="小程序">
                      <span>长按识别更多</span>
                    </div>
                  </div>
                  <div class="signature">
                    <p>{{shareBaseInfo.signature}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="card-info card5">
                <div class="vata">
                  <img :src="shareBaseInfo.avatarUrl" alt="封面" />
              </div>
                  <div class="qrcode">
                    <img :src="shareBaseInfo.miniQrCode" alt="小程序">
              </div>
                    <div class="data-info">
                      <div class="name">
                        <b>{{shareBaseInfo.agentName}}</b>
                        <span>{{shareBaseInfo.pinyin}}</span>
                      </div>
                      <div class="info">
                        <p><span>Tel :</span>{{shareBaseInfo.mobile}}</p>
                        <p><span>Col :</span>{{shareBaseInfo.institutionName}}</p>
                        <p><span>Add:</span>{{shareBaseInfo.mojarRegion}}</p>
                        <p>{{shareBaseInfo.signature}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="card-info card6">
                    <div class="vata">
                      <img :src="shareBaseInfo.avatarUrl" alt="封面" />
              </div>
                      <div class="name">
                        <b>{{shareBaseInfo.agentName}}</b>
                        <span>{{shareBaseInfo.pinyin}}</span>
                      </div>
                      <div class="data-info">
                        <div class="data-info-box">
                          <div class="data">
                            <div class="info">
                              <p><span>Tel :</span>{{shareBaseInfo.mobile}}</p>
                              <p><span>Col :</span>{{shareBaseInfo.institutionName}}</p>
                              <p><span>Add:</span>{{shareBaseInfo.mojarRegion}}</p>
                            </div>
                          </div>
                          <div class="qrcode">
                            <img :src="shareBaseInfo.miniQrCode" alt="小程序">
                            <span>长按识别更多</span>
                          </div>
                        </div>
                        <div class="signature">
                          <p>{{shareBaseInfo.signature}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="swiper-pagination"></div> -->
              </div>
              <div class="share-card-action">
                <button type="button" class="edit">编辑海报信息</button>
                <button type="button" class="save">生成海报</button>
              </div>
              <div class="share-img">
                <img src="" alt="">
      </div>
              </div>
              <!-- 编辑信息 -->
              <div class="share-detail">
              </div>
            </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import userService from '@/services/userService'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  data() {
    return {
      agentId: 1,
      shareBaseInfo: {}, // 默认数据
      shareInfo: {}, // 用户修改数据
      activeIndex: 5,

    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.agentId = this.$route.query.agentId
    this.getCardInfo()
    this.getAgentCard()
  },
  mounted() {
    let _that = this
    var mySwiper = new Swiper('.swiper-container', {
      loop: false,
      effect: 'coverflow',
      slidesPerView: 1,
      centeredSlides: true,
      initialSlide: this.activeIndex,
      coverflowEffect: {
        rotate: 20,
        stretch: 30,
        depth: 60,
        modifier: 1,
        slideShadows: true
      },
      on: {
        slideChange: function () {
          // 当前激活的海报index索引
          _that.activeIndex = this.activeIndex
          // console.log('side', this.activeIndex)
        }
      }
    })
  },
  methods: {
    // 获取分享卡片详情
    async getCardInfo() {
      const result = await userService.getQrCode(this.agentId)
      if (result) {
        this.shareBaseInfo = result
      }
    },
    // 获取代理商卡片
    async getAgentCard() {
      const result = await userService.getAgentCard({
        agentId: this.agentId
      })
      if (result) {
        this.shareInfo = result
      }
    }
  }
}
</script>

<style lang="less" scoped>
.share-box {
  height: 100%;

  .share-card {
    background: linear-gradient(46deg, rgba(37, 39, 55, 1) 0%, rgba(72, 76, 98, 1) 100%);
    height: 100%;
    font-size: 14px;

    .swiper-container {
      width: 100%;
      height: 420px;
      padding-top: 48px;
      box-sizing: content-box;

      .card-info {
        width: 260px;
        margin: auto;
        height: 100%;
        position: relative;

        &.card1 {
          background-color: #113460;

          .cover {
            position: absolute;
            height: 200px;
            width: 100%;
            top: 0;
            z-index: 1;

            .avat {
              img {
                height: 100%;
                width: 100%;
              }
            }
          }

          .name {
            position: absolute;
            left: 15px;
            bottom: 5px;
            color: #fff;
            border-bottom: 2px solid #0069CA;
            padding-bottom: 5px;
            z-index: 2;

            h3 {
              font-size: 28px;
            }

            span {
              font-size: 12px;
            }
          }

          .qrcode {
            position: absolute;
            top: 36%;
            right: 5px;
            z-index: 3;
            width: 80px;
            color: #fff;
            text-align: center;

            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }

            span {
              display: block;
              padding-top: 5px;
              text-align: center;
              opacity: 0.44;
              font-size: 8px;
            }
          }

          .data-info {
            position: absolute;
            background: url('../../../assets/img/share/card1.png') no-repeat left top;
            background-size: cover;
            z-index: 2;
            bottom: 0;
            left: 0;
            right: -1px;
            height: 240px;
            color: #fff;
            padding: 0 20px;
            overflow: hidden;

            h3 {
              padding-top: 40%;
              font-size: 14px;
              line-height: 1.4;
              margin-bottom: 15px;
            }

            p {
              font-size: 12px;
              opacity: 0.6;
              margin-bottom: 5px;
              line-height: 1.5;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;

              span {
                display: inline-block;
                padding-right: 8px;
                text-align: right;
                min-width: 25px;
              }
            }
          }
        }

        &.card2 {
          .avat {
            position: relative;
            height: 220px;
            z-index: 1;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .data-info {
            background: url('../../../assets/img/share/card2.png') no-repeat left top;
            background-size: cover;
            min-height: 200px;
            width: 100%;
            margin-top: -20px;
            padding-right: 2px;
            position: relative;
            z-index: 2;

            .data-info-box {
              display: flex;

              .data {
                padding-top: 30px;
                padding: 20px 20px 10px 20px;
                color: #fff;
                flex: 1;

                .name {
                  padding-top: 15px;
                  padding-bottom: 15px;

                  b {
                    font-size: 20px;
                  }

                  span {
                    font-size: 12px;
                    opacity: 0.8;
                    padding-left: 10px;
                  }
                }

                .info {
                  p {
                    font-size: 12px;
                    opacity: 0.6;
                    margin-bottom: 8px;

                    span {
                      display: inline-block;
                      padding-right: 8px;
                      text-align: right;
                      min-width: 25px;
                    }
                  }

                }
              }

              .qrcode {
                width: 80px;
                text-align: center;
                color: #fff;
                margin-top: 30px;

                img {
                  width: 58px;
                  height: 58px;
                  border-radius: 50%;
                }

                span {
                  display: block;
                  font-size: 8px;
                  opacity: 0.44;
                  padding-top: 5px;
                }
              }
            }

            .signature {
              padding: 0 20px 5px 20px;
              font-size: 10px;
              opacity: 0.5;
              color: #fff;
              line-height: 1.5;
              text-align: center;
            }
          }
        }

        &.card3 {
          background-color: #14355F;

          .avat {
            text-align: center;
            padding: 10px 20px;

            img {
              width: 120px;
              height: 120px;
              border-radius: 50%;
            }

            p {
              font-size: 12px;
              opacity: 0.5;
              padding-top: 5px;
              color: #fff;
              line-height: 1.5;
            }
          }

          .name {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 10px;
            text-align: center;
            color: #fff;

            h3 {
              font-size: 24px;
              padding-bottom: 5px;
            }

            span {
              font-size: 12px;
              opacity: 0.6;
            }
          }

          .data-info {
            color: #fff;
            opacity: 0.6;
            text-align: center;
            padding-top: 15px;

            p {
              font-size: 12px;
              padding-bottom: 8px;
            }
          }

          .qrcode {
            padding-top: 15px;
            text-align: center;
            color: #fff;

            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }

            span {
              display: block;
              opacity: 0.6;
              font-size: 8px;
              padding-top: 5px;
            }
          }
        }

        &.card4 {
          .avat {
            position: relative;
            height: 220px;
            z-index: 1;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .data-info {
            background: url('../../../assets/img/share/card4.png') no-repeat left top;
            background-size: cover;
            min-height: 230px;
            width: 100%;
            margin-top: -30px;
            padding-right: 2px;
            position: relative;
            z-index: 2;

            .data-info-box {
              display: flex;

              .data {
                padding-top: 30px;
                padding: 20px 20px 10px 20px;
                color: #14355F;
                flex: 1;

                .name {
                  padding-top: 15px;
                  padding-bottom: 15px;

                  b {
                    font-size: 20px;
                  }

                  span {
                    font-size: 12px;
                    opacity: 0.8;
                    padding-left: 10px;
                  }
                }

                .info {
                  p {
                    font-size: 12px;
                    opacity: 0.6;
                    margin-bottom: 8px;

                    span {
                      display: inline-block;
                      padding-right: 8px;
                      text-align: right;
                      min-width: 25px;
                    }
                  }
                }
              }

              .qrcode {
                width: 80px;
                text-align: center;
                color: #14355F;
                margin-top: 40px;

                img {
                  width: 58px;
                  height: 58px;
                  border-radius: 50%;
                }

                span {
                  display: block;
                  font-size: 8px;
                  opacity: 0.44;
                  padding-top: 5px;
                }
              }
            }

            .signature {
              margin: 5px 20px;
              padding: 10px 0 5px;
              font-size: 10px;
              opacity: 0.5;
              color: #14355F;
              line-height: 1.5;
              text-align: center;
              position: relative;
              border: none;

              &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                background: #14355F;
                width: 100%;
                height: 1px;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
              }
            }
          }
        }

        &.card5 {
          background-color: #fff;

          .vata {
            position: relative;
            height: 220px;
            z-index: 1;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .qrcode {
            width: 80px;
            margin: -40px auto 0;
            text-align: center;
            color: #14355F;
            z-index: 3;
            position: relative;

            img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
            }
          }

          .data-info {
            position: relative;
            z-index: 2;
            padding: 10px 20px 0 20px;
            color: #14355F;

            .name {
              margin-bottom: 10px;

              b {
                font-size: 24px;
              }

              span {
                padding-left: 10px;
                font-size: 12px;
              }
            }

            .info {
              font-size: 12px;
              opacity: 0.6;
              margin-bottom: 8px;

              p {
                margin: 5px;
              }

              span {
                display: inline-block;
                padding-right: 8px;
                text-align: right;
                min-width: 25px;
              }
            }
          }
        }

        &.card6 {
          .vata {
            position: relative;
            height: 290px;
            z-index: 1;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .name {
            position: relative;
            z-index: 2;
            height: 60px;
            color: #fff;
            background: none;
            margin-top: -60px;
            padding: 0 20px;

            b {
              font-size: 24px;
            }

            span {
              font-size: 12px;
              opacity: 0.8;
              padding-left: 10px;
            }
          }

          .data-info {
            background: url('../../../assets/img/share/card6.png') no-repeat left top;
            background-size: cover;
            width: 100%;
            margin-top: -10px;
            position: relative;
            height: 120px;
            z-index: 2;
            padding-top: 15px;
            .data-info-box {
              display: flex;

              .data {
                padding: 0 20px;
                color: #14355F;
                flex: 1;

                .info {
                  p {
                    font-size: 12px;
                    opacity: 0.6;
                    margin-bottom: 5px;
                    span {
                      display: inline-block;
                      padding-right: 8px;
                      text-align: right;
                      min-width: 25px;
                    }
                  }
                }
              }

              .qrcode {
                width: 80px;
                text-align: center;
                color: #14355F;
                margin-top: -50px;

                img {
                  width: 58px;
                  height: 58px;
                  border-radius: 50%;
                }

                span {
                  display: block;
                  font-size: 8px;
                  opacity: 0.44;
                  padding-top: 5px;
                }
              }
            }

            .signature {
              margin: 0 20px;
              font-size: 10px;
              opacity: 0.5;
              color: #14355F;
              line-height: 1.5;
            }
          }
        }
      }
    }

    .share-card-action {
      // position: absolute;
      width: 100%;
      margin-top: 70px;
      text-align: center;

      button {
        width: 144px;
        height: 44px;
        border-radius: 6px;
        color: #fff;
        border: none;
        margin: 0 10px;

        &.edit {
          background: rgba(64, 68, 87, 1);
        }

        &.save {
          background: rgba(0, 122, 230, 1);
        }
      }
    }
  }
}
</style>
