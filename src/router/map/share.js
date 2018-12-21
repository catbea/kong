export default [
    {
      path: '/article/:id/:city',
      name: 'article-detail',
      component: resolve => require(['@/views/share/articleDetail.vue'], resolve),
      meta: {
        title: '文章',
        tabbar: {
          show: false
        }
      }
    }
  ]
  