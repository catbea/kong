export default [{
  path: '/',
  name: 'home',
  component: resolve => require(['@/views/Home.vue'], resolve)
}, {
  path: '/about',
  name: 'about',
  component: resolve => require(['@/views/About.vue'], resolve)
}]
