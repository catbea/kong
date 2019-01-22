import xhr from './xhr'
class CpInformationService {

  /**
   * 文章保存
   * @param {*} sourceInfoId 源文章id
   * @param {*} editData 经纪人文章编辑json数据，包括评论，插入楼盘，名片等内容 ,
   * @param {*} content 文章内容
   */
  editArticleForAgent(sourceInfoId, editData, content) {
    return xhr({
      method: 'post',
      url: '/cpInformation/editArticleForAgent',
      body: {
        sourceInfoId,
        editData,
        content
      }
    })
  }

  /**
   * 文章修改
   * @param {*} id 源文章id
   * @param {*} editData 经纪人文章编辑json数据，包括评论，插入楼盘，名片等内容 ,
   * @param {*} content 文章内容
   */
  updateArticleForAgent(id, editData, content) {
    return xhr({
      method: 'post',
      url: '/cpInformation/updateArticleForAgent',
      body: {
        id,
        editData,
        content
      }
    })
  }

  /**
   * 文章状态修改 - 主要用于文章删除
   * @param {*} agentId 
   * @param {*} infoId 
   * @param {*} enable  
   */
  updateEnableByInfoId(agentId, infoId, enable=1){
    return xhr({
      method:'post',
      url:'/cpInformation/updateEnableByInfoId',
      body:{
        agentId,
        infoId,
        enable
      }
    })
  }
  
}

export default new CpInformationService()