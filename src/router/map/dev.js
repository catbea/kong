export default [
  {
    path: '/dev/mockLogin/:userId',
    name: 'dev-mock-login',
    component: resolve => require(['@/views/dev/mockLogin.vue'], resolve)
  },
  {
    path: '/dev/comp',
    name: 'dev-comp',
    component: resolve => require(['@/views/dev/comp.vue'], resolve),
    meta: {
      tabbar: {
        show: false
      }
    }
  },
  {
    path: '/dev/page1',
    name: 'dev-comp',
    component: resolve => require(['@/views/dev/rehearse/page1.vue'], resolve),
    meta: {
      tabbar: {
        show: false
      }
    }
  }
]
