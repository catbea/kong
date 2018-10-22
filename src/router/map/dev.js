export default [
  {
    path: '/dev/mockLogin/:userId',
    name: 'dev-mock-login',
    component: resolve => require(['@/views/dev/mockLogin.vue'], resolve)
  }]
