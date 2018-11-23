/**
 * 房价均价转换
 * 1234509 -> 12345元/㎡起`
 * 后期根据需求扩展
 */
export default value => {
  return `${Math.floor(Number(value) / 100)}元/㎡起`
}
