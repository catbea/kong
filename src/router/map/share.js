export default [
  {
    path: '/article/:id/:city/:agentId',
    name: 'article-detail',
    component: resolve => require(['@/views/share/articleDetail.vue'], resolve),
    meta: {
      skipAuth: true,
      skipIM: true,
      title: '文章'
    }
  }
]
