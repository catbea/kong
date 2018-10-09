// import xhr from './axios'
// import xhr from './superAgent'
import xhr from './fetch'
/**
 * XHR 请求接口定义
 * @param  {String} options.method 请求方法，默认为 get
 * @param  {String} options.url    请求路径，基于 rootPath 地址
 * @param  {Object} options.body   请求体，例如后端 Express 可使用 req.body 获取该对象
 * @param  {Object} options.headers 自定义请求头，一般不用填
 * @return {Promise}
 * 使用例子 xhr({ method: 'post', url: 'XXX', body: {Object}, headers:{Object} })
 * 可以用别的库封装,按照此接口定义就行
 */
export default xhr
