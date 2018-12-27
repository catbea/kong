export default [
  {
    path: '/dev/mockLogin/:tokon',
    name: 'dev-mock-login',
    component: resolve => require(['@/views/dev/mockLogin.vue'], resolve)
  },
  {
    path: '/dev/comp',
    name: 'dev-comp',
    component: resolve => require(['@/views/dev/comp.vue'], resolve)
  },
  {
    path: '/dev/page1',
    name: '前端名片生成',
    component: resolve => require(['@/views/dev/rehearse/page1.vue'], resolve)
  }
]
