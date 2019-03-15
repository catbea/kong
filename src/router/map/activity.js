export default [
    {
        path: '/huiwan-activity',
        name: 'huiwan-activity',
        component: resolve => require(['@/views/activity/index.vue'], resolve),
        meta: {
            title: '活动券',
            tabbar: {
                show: false
            },
            skipIM: true,
            skipAuth: true
        }
    },
    {
        path: '/huiwan-activity/partake',
        name: 'huiwan-activity-partake',
        component: resolve => require(['@/views/activity/partakeSuccess.vue'], resolve),
        meta: {
            title: '恭喜获得',
            tabbar: {
                show: false
            },
            skipIM: true,
            skipAuth: true
        }
    },
    {
        path: '/huiwan-activity/qrcode',
        name: 'huiwan-activity-qrcode',
        component: resolve => require(['@/views/activity/scanQRCode.vue'], resolve),
        meta: {
            title: '识别二维码',
            tabbar: {
                show: false
            },
            skipIM: true,
            skipAuth: true
        }
    }
]
