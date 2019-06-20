export default tag => {
  switch (tag) {
    case '开通': // 白字蓝底
      return {
        background: 'linear-gradient(90deg,rgba(0,158,230,1) 0%,rgba(0,122,230,1) 100%)',
        color: '#FFFFFF'
      }
    case '续费': // 蓝字白底
      return {
        background: 'rgba(255,255,255,1)',
        color: '#007AE6',
        border: '1px solid #007AE6',
        display: 'none'
      }
    default:
      // 灰字灰底
      return {
        background: 'rgba(143, 159, 177, 0.15)',
        color: '#5C5F66'
      }
  }
}
