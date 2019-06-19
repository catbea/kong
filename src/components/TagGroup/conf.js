export default tag => {
  switch (tag) {
    case '热销中': // 白字蓝底
      return {
        background: 'rgba(0,120,255,0.15)',
        color: '#5C5F66'
      }
    case '即将发售': // 红字红底
      return {
        background: 'rgba(250,41,41,0.15)',
        color: '#5C5F66'
      }
    case '住宅': // 白字绿底
      return {
        background: 'rgba(110,184,163,1)',
        color: '#FFFFFF'
      }
    case '已收藏': //白字蓝底
      return {
        background: 'rgba(0, 122, 230, 1)',
        color: '#FFFFFF'
      }
    case '已分享': // 白字蓝底
      return {
        background: 'rgba(0, 122, 230, 1)',
        color: '#FFFFFF'
      }
    case '已编辑': //白字蓝底
      return {
        background: 'rgba(0, 122, 230, 1)',
        color: '#FFFFFF'
      }
    default:
      // 灰字灰底
      return {
        background: 'rgba(143, 159, 177, 0.15)',
        color: '#5C5F66'
      }
  }
}
