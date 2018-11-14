import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import './plugins/axios'
import App from './App.vue'
import router, { menuRouters } from './router'
import store from './store'
import './plugins/element.js'
import { eventBus } from './bus'

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

eventBus(app)

Object.defineProperty(Vue, '$app', { get () { return app } })

// 测试菜单
store.state.menus = menuRouters
