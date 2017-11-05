// @ts-nocheck
import home from './views/home.vue'
import monitor from './views/monitor.vue'
import keys from './views/keys.vue'

let routes = [{
    path: '/',
    component: home,
    children: [
        { path: '', component: keys },
        { path: 'monitor', component: monitor },
        { path: 'keys', component: keys }
    ]
}]

export default routes;