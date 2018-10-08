/*
 * 路由日志,仅开发时使用
 */
export default (to, from, next) => {
  const decode = decodeURIComponent
  console.info(`[路由日志] ${decode(from.path || '')} => ${decode(to.path)}`)
}

