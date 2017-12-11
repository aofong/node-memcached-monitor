// @ts-nocheck
var home = resolve => require(['./views/home.vue'], resolve);
var monitor = resolve => require(['./views/monitor.vue'], resolve);
var keys = resolve => require(['./views/keys.vue'], resolve);
var setting = resolve => require(['./views/setting.vue'], resolve);
var log = resolve => require(['./views/log.vue'], resolve);
var NotFound = resolve => require(['./views/404.vue'], resolve);

let routes = [{
    path: '/',
    redirect: '/monitor'
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
    path: '/git',
    name: 'git',
    component: home
}, {
    path: '*',
    component: NotFound
}];

export default routes;