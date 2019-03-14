export default [
    {
        path: '/activity',
        name: 'activity',
        component: resolve => require(['@/views/activity/index.vue'], resolve),
        meta: {
            title: '活动券',
            tabbar: {
                show: false
            }
        }
    },
    {
        path: '/activity/partake',
        name: 'activity-partake',
        component: resolve => require(['@/views/activity/partakeSuccess.vue'], resolve),
        meta: {
            title: '恭喜获得',
            tabbar: {
                show: false
            }
        }
    },
    {
        path: '/activity/qrcode',
        name: 'activity-qrcode',
        component: resolve => require(['@/views/activity/scanQRCode.vue'], resolve),
        meta: {
            title: '识别二维码',
            tabbar: {
                show: false
            }
        }
    }
]
