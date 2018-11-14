import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  // TODO: 目标页面权限检查
  let user = store.state.user
  if (to.name === 'Login' && user) {
    next({ name: 'Home' })
    return
  }
  if (to.name !== 'Login' && !user) {
    if (localStorage.user) {
      try {
        user = JSON.parse(localStorage.user)
        store.commit('setUser', user)
      } catch (e) {
        localStorage.removeItem('user')
      }
    }
    if (!user) {
      next({ name: 'Login' })
      return
    }
  }
  let meta = to.meta
  if (meta && meta.title) {
    document.title = '管理平台 - ' + to.meta.title
  } else {
    document.title = '管理平台'
  }
  if (!meta || !meta.noTab) {
    store.commit('openRoute', to)
  }
  next()
})

export const eventBus = function (app) {
  app.$on('userNeedLogin', () => {
    router.push({ name: 'Login' })
  })
}
