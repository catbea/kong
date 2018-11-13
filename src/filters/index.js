import Vue from 'vue'
const files = require.context('.', false, /\.js$/)
files.keys().forEach(key => {
  if (key === './index.js') return
  let name = key.slice(2, key.length - 3)
  Vue.filter(name, files(key).default)
})
