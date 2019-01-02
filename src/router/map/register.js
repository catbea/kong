export default [
  {
    path: '/register',
    name: 'register',
    component: resolve => require(['@/views/register/index.vue'], resolve),
    meta: {
      title: '注册',
      skipIM: true
    }
  },
  {
    path: '/register/step1',
    name: 'register-step1',
    component: resolve => require(['@/views/register/step1.vue'], resolve),
    meta: {
      title: '注册',
      skipIM: true
    }
  },
  {
    path: '/register/step2',
    name: 'register-step2',
    component: resolve => require(['@/views/register/step2.vue'], resolve),
    meta: {
      title: '注册',
      skipIM: true
    }
  },
  {
    path: '/register/step3',
    name: 'register-step3',
    component: resolve => require(['@/views/register/step3.vue'], resolve),
    meta: {
      title: '注册',
      skipIM: true
    }
  },
  {
    path: '/register/searchCompany',
    name: 'search-company',
    component: resolve => require(['@/views/register/searchCompany.vue'], resolve),
    meta: {
      title: '搜索公司',
      skipIM: true
    }
  },
  {
    path: '/register/agreement',
    name: 'register-agreement',
    component: resolve => require(['@/views/register/agreement.vue'], resolve),
    meta: {
      title: '注册协议',
      skipIM: true
    }
  }
]
