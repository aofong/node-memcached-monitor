// @ts-nocheck
import home from './views/home.vue'
import monitor from './views/monitor.vue'
import keys from './views/keys.vue'
import setting from './views/setting.vue'
import log from './views/log.vue'
import NotFound from './views/404.vue'

let routes = [{
    path: '/',
    component: monitor
}, {
    path: '/monitor',
    name: '服务监控',
    component: monitor

}, {
    path: '/keys',
    name: 'keys管理',
    component: keys

}, {
    path: '/log',
    name: '日志',
    component: log

}, {
    path: '/setting',
    name: '配置',
    component: setting

}, {
    path: '*',
    component: NotFound
}
]

export default routes;