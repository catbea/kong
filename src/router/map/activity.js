export default [
    {
        path: '/activity',
        name: 'activity',
        component: resolve => require(['@/views/activity/index.vue'], resolve),
        meta: {
            title: '活动券',
            tabbar: {
                show: true
            }
        }
    },
    {
        path: '/activity/partakeSuccess',
        name: 'partake',
        component: resolve => require(['@/views/activity/partakeSuccess.vue'], resolve),
        meta: {
            title: '恭喜获得',
            tabbar: {
                show: false
            }
        }
    }
]
