/**
 * 自动读取目录下的路由,以后不用配置了
 */
const files = require.context('.', false, /\.js$/)
const modules = []

files.keys().forEach(key => {
  // 排除空文件 || 排除自己 || 生产环境排除开发工具
  if (!files(key).default || key === './index.js' || (key === './dev' && process.env.NODE_ENV === 'production'))return
  for (let temp of files(key).default) {
    modules.push(temp)
  }
})
modules.push({ path: '*', redirect: '/dynamics' })
export default modules
