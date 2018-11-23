<template>
  <div class="all-near-page">
    <div class="all-near-page-map"></div>
    <ul class="all-near-page-tar">
      <li>
        <p></p>
        <p>银行</p>
      </li>
      <li>
        <p></p>
        <p>公交</p>
      </li>
      <li>
        <p></p>
        <p>地铁</p>
      </li>

      <li>
        <p></p>
        <p>教育</p>
      </li>
      <li>
        <p></p>
        <p>医院</p>
      </li>
      <li>
        <p></p>
        <p>休闲</p>
      </li>
      <li>
        <p></p>
        <p>购物</p>
      </li>
      <li>
        <p></p>
        <p>健身</p>
      </li>
      <li>
        <p></p>
        <p>美食</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
.all-near-page{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .all-near-page-map{
    width: 100%;
    flex: 1;
  }
  .all-near-page-tar{
    width:375px;
    height:60px;
    display: flex;
    overflow-x: auto;
    border-top:1px solid #000000;
    li{
      display: flex;
     flex-direction: column;
      margin:0 22px;
      p:nth-child(1){
        width: 22px;
        height: 22px;
      }
      p:nth-child(2){
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,122,230,1);
        line-height:17px;
      }
    }
  }
}
</style>
