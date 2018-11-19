export default tag => {
  switch (tag) {
    case '热销中': // 白字蓝底
      return {
        background: 'rgba(0, 122, 230, 1)',
        color: '#FFFFFF'
      }
    case '即将发售': // 红字红底
      return {
        background: 'rgba(234, 77, 46, 0.1)',
        color: '#EA4D2E'
      }
    default:
      // 灰字灰底
      return {
        background: 'rgba(143, 159, 177, 0.15)',
        color: '#5C5F66'
      }
  }
}
