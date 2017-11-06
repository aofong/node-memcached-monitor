// @ts-nocheck
import home from './views/home.vue'
import monitor from './views/monitor.vue'
import keys from './views/keys.vue'
import setting from './views/setting.vue'

let routes = [
    {
        path: '/',
        component: home,
        children: [
            { path: '', component: keys }
        ]
    },
    {
        path: '/monitor',
        component: monitor

    }, {
        path: '/keys',
        component: keys

    }, {
        path: '/setting',
        component: setting

    }
]

export default routes;