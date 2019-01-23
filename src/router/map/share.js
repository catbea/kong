export default [
  {
    path: '/article/:id/:city',
    name: 'article-detail',
    component: resolve => require(['@/views/share/articleDetail.vue'], resolve),
    meta: {
      skipAuth: true,
      skipIM: true,
      title: 'AW大师写一写'
    }
  }
]
