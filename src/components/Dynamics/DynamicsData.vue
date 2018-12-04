<template>
 
      <div class="dynaData-container" v-if="allDynamicCount">
        <span class="container-total">
          <p class="container-title">{{totalTitle}}</p>
          <p class="card-num">{{allDynamicCount.scanCardCount}}</p>
        </span>
        <span class="container-card">
          <p class="container-title">{{cardTitle}}</p>
          <p class="card-num">{{allDynamicCount.scanCardCount}}</p>
        </span>
        <span class="container-properties " >
          <p class="container-title">{{propertiesTitle}}</p>
          <p class="card-num">{{allDynamicCount.scanLinkerCount}}</p>
        </span>
        <span calss="container-article">
          <p class="container-title">{{articleTitle}}</p>
          <p class="card-num">{{allDynamicCount.scanArticleCount}}</p>
        </span>
      </div>
    
</template>
<script>
export default {
  components: {},
  props: {
    totalTitle: { type: String, default: '' },
    totalNum: { type: String, default: '' },
    cardTitle: { type: String, default: '' },
    cardNum: { type: String, default: '' },
    propertiesTitle: { type: String, default: '' },
    propertiesNum: { type: String, default: '' },
    articleTitle: { type: String, default: '' },
    articleNum: { type: String, default: '' },
    allDynamicCount: { type: Array },
  },
  data() {
    return {
      total: ''
    }
  },
  created() {
  },
  methods: {}
}
</script>
<style lang="less">
.dynaData-container {
  background: #ffffff;
  display: flex;
  padding: 20px 0 20px 20px;

  span {
    width: 80.7px;
  }
  .container-title {
    font-size: 12px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 18px;
  }
  .card-num {
    font-size: 24px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 36px;
  }
  > .container-total {
  }
}
</style>
