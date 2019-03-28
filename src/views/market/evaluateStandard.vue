<template>
  <div class="standard-page">
    <h1>基本原则和适用范围</h1>
    <p style="margin-bottom:20px;">为了保证点评和质量，维护点评内容的真实性，客观性，合法性；鼓励用户发表真实，客观，原创的评价，AW大师结合实际经验，制定了本规范。 适用范围，AW大师线上新房频道的所有用户点评，如有违规情形，AW大师有权根据规范采取措施进行处理。链家网有权根据产品及页面等的更新自行修订，更改本规范，新规范自更新发布之日起生效。 </p>
    <p>审核信息的判定标准及处理办法</p>
    <p style="margin-bottom:20px;">点评审核包含两方面：点评内容的审核以及点评行为的审核。点评内容违规主要包括：点评正文，图片，头像，用户名等位置展示内容违反本规范要求；点评行为违规主要指发布点评行为的违规。链家网会根据点评违规情节的轻重对该条用户点评及用户账号进行处理。</p>
    <p>行为违规</p>
    <p>虚假注册</p>
    <p>灌水行为</p>
    <p>重复发布信息</p>
    <p style="margin-bottom:20px;">内容违规</p>
    <p>审核流程 </p>
    <p>24小时内对评价的内容进行审核，且AW大师有权删除或屏蔽评价内容中所包含的违规信息，审核通过后的评价才能展示给其他用户，对于审核不通过的评论将不予展示。除对产生的评价内容做相应处理外，AW大师将视情节严重性对评价人采取身份证严重，屏蔽评论内容，删除评价，限制评价，限制该用户行为等处理措施。</p>
    <h6>免责声明：本规则自发布之日起执行，最终解释权归AW大师所有。</h6>
    <button @click="back">知道了</button>
  </div>
</template>
<script>
export default {
    methods: {
      back(){
        this.$router.go(-1)
      }
    }
}
</script>
<style lang="less" scoped>
.standard-page{
  padding:0 16px;
  width:100%;
  p{
    font-size:15px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:21px;
  }
  h1{
    font-size:18px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:25px;
    padding:13px 0;
  }
  h6{
    margin:21px 0 33px 0;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(150,158,168,1);
    line-height:17px;
  }
  button{
    width:343px;
    height:44px;
    background:rgba(0,122,230,1);
    border-radius:6px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:22px;
    text-align:center;
    margin-bottom:25px;
  }
}
</style>
