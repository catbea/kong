export default [{
  path: '/user',
  name: 'user',
  component: resolve => require(['@/views/user/index.vue'], resolve),
  meta: {
    title: '名片'
  }
}, {
  path: '/user/share-business-card',
  name: 'share-business-card',
  component: resolve => require(['@/views/user/shareBusinessCard.vue'], resolve),
  meta: {
    title: '分享名片',
    tabbar: {
      show: false
    }
  }
}, {
  path: '/user/edit',
  name: 'user-edit',
  component: resolve => require(['@/views/user/edit/userEdit.vue'], resolve),
  meta: {
    title: '编辑资料',
    tabbar: {
      show: false
    }
  }
}, {
  path: '/user/edit/avatar',
  name: 'user-edit-avatar',
  component: resolve => require(['@/views/user/edit/userEditAvatar.vue'], resolve),
  meta: {
    title: '修改头像',
    tabbar: {
      show: false
    }
  }
}, {
  path: '/user/edit/username',
  name: 'user-edit-username',
  component: resolve => require(['@/views/user/edit/userEditUsername.vue'], resolve),
  meta: {
    title: '修改姓名',
    tabbar: {
      show: false
    }
  }
}, {
  path: '/user/edit/phone',
  name: 'user-edit-phone',
  component: resolve => require(['@/views/user/edit/userEditPhone.vue'], resolve),
  meta: {
    title: '修改手机号',
    tabbar: {
      show: false
    }
  }
}]
