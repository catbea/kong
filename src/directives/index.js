import Vue from 'vue'
import fuzzDom from './fuzz-dom'

[fuzzDom].forEach((item) => {
  item(Vue)
})
