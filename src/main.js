// @ts-nocheck
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import App from './app.vue'
import routes from './routes'
 
if (process.env.NODE_ENV === 'development') {
    require('element-ui/lib/theme-chalk/index.css')
    Vue.use(ElementUI)
    Vue.use(VueRouter)
}

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})