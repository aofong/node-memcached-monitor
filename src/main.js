// @ts-nocheck
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import App from './app.vue'
import routes from './routes'


Vue.use(ElementUI)
Vue.use(VueRouter)


const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})