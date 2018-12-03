<template>
  <div class="van-search-page">
    <div class="search-box-content">
          <p>
            {{obj.siteText}}
            <span class="bg_img" :style="{'background':'url(' + defaultAvatar + ')','background-size':'contain'}"></span>
            </p>
            <span class="icon-line"></span>
            <router-link to="/market/inputSearch">
              <form action="/">
                <van-search
                  :placeholder="obj.placeholderText"
                />
              </form>
            </router-link>
        </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    defaultAvatar: require('IMG/market/list__arrow_@2x.png')
  }),
  props:{
    obj:{
      type:Object,
    }
  }
}
</script>

<style lang="less">
.van-search-page{
        width:343px;
        .search-box-content {
        display: flex;
        background: rgba(245, 245, 245, 1);
        font-size: 13px;
        // width: 306px;
        border-radius: 6px;
        p {
          margin: 6px 0 0 16px;
          width:45px;
          display: flex;
          overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;
          span {
            width: 16px;
            height: 16px;
            margin-top: 2px;
          }
        }
        .icon-line{

          width:1px;
          height:12px;
          background:rgba(230,230,230,1);
          margin-top:9px;
        }
        .van-search {
          padding: 0;
        }
        .van-cell {
          background: rgba(245, 245, 245, 1);

input::-webkit-input-placeholder { /* WebKit browsers */
  color:rgba(187,187,187,1);
  font-size:13px;
}
input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color:rgba(187,187,187,1);
  font-size:13px;
}
input::-moz-placeholder { /* Mozilla Firefox 19+ */
  color:rgba(187,187,187,1);
  font-size:13px;
}
input:-ms-input-placeholder { /* Internet Explorer 10+ */
  color:rgba(187,187,187,1);
  font-size:13px;
}
          input {
            line-height: 24px;
          }
        }
      }
}
</style>
