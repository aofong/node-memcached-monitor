// @ts-nocheck
import home from './views/home.vue'
import monitor from './views/monitor.vue'
import keys from './views/keys.vue'
import setting from './views/setting.vue'
import NotFound from './views/404.vue'

let routes = [{
        path: '/',
        component: monitor
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

    },
    {
        path: '*',
        component: NotFound
    }
]

export default routes;