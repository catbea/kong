export default [{
  path: '/me',
  name: 'me',
  component: resolve => require(['@/views/me/index.vue'], resolve),
  meta: {
    title: '名片'
  }
}, {
  path: '/me/share-business-card',
  name: 'share-business-card',
  component: resolve => require(['@/views/me/shareBusinessCard.vue'], resolve),
  meta: {
    title: '分享名片',
    tabbar: {
      show: false
    }
  }
}, {
  path: '/me/edit',
  name: 'user-edit',
  component: resolve => require(['@/views/me/userEdit.vue'], resolve),
  meta: {
    title: '分享名片',
    tabbar: {
      show: false
    }
  }
}]
