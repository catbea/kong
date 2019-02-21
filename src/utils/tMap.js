export default function TMap(key) {
  debugger
  return new Promise(function(resolve, reject) {
    debugger
    window.init = function() {
      resolve(qq) //注意这里
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    // script.src = "http://map.qq.com/api/js?v=2.exp&callback=init&key=" + key;
    script.src = 'https://map.qq.com/api/js?v=2.exp&callback=init&key=d84d6d83e0e51e481e50454ccbe8986b'
    script.onerror = reject
    document.head.appendChild(script)
  })
}
