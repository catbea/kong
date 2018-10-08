/**
 * 自动读取目录下的路由,以后不用配置了
 */
const files = require.context('.', false, /\.js$/)
const modules = []

files.keys().forEach(key => {
  if (key === './index.js') return
  for (let temp of files(key).default) {
    modules.push(temp)
  }
})
modules.push({ path: '*', redirect: '/' })
export default modules
