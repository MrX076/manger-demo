import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import { eventBus, authDirectives } from './bus'

Vue.config.productionTip = false
Vue.use(authDirectives)

const app = store._vm
eventBus(app)
Object.defineProperty(Vue, '$app', { get () { return app } })
Object.defineProperty(Vue.prototype, '$app', { get () { return app } })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
