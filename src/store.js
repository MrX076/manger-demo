import Vue from 'vue'
import Vuex from 'vuex'
import { menuRouters } from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalLoading: false,
    user: null,
    menus: [],
    menuCollapse: false,
    openTabs: []
  },
  getters: {
    aliveTabs (state) {
      return state.openTabs.filter(i => i.meta && i.meta.keepalive).map(i => i.name)
    }
  },
  mutations: {
    setGlobalLoading (state, loading) {
      state.globalLoading = loading
    },
    togglerMenuCollapse (state) {
      state.menuCollapse = !state.menuCollapse
    },
    setMenus (state, menus) {
      state.menus = menus
    },
    setUser (state, user) {
      state.user = user
      if (user) {
        localStorage.user = JSON.stringify(user)
      } else {
        localStorage.removeItem('user')
      }
    },
    openRoute (state, route) {
      if (!state.openTabs.length) {
        state.openTabs.push(menuRouters[0])
      }
      if (route && !state.openTabs.map(i => i.name).includes(route.name) && (!route.meta || (route.meta.layout !== false && route.meta.tag !== false))) {
        state.openTabs.push(route)
      }
    },
    closeRoute (state, route) {
      if (!route) {
        state.openTabs = []
      } else {
        let index = state.openTabs.indexOf(route)
        if (index > -1) {
          state.openTabs.splice(index, 1)
        }
      }
    }
  },
  actions: {
    doUserLogin ({ commit }) {
      // TODO: 用户登录请求
      let user = {
        name: '系统管理员',
        nickname: '机智的绿豆蛙',
        avatar: 'http://cnscoo.cc/static/img/logo.3dd67de.jpg',
        token: '4JDRIJGGDO8TFBDIKFGMG0W3R',
        roles: ['ADMIN', 'MEMBER'],
        authorizes: ['ADMIN', 'USER', 'ACTIVIES'],
        lastlogin: 1542185049718
      }
      commit('setUser', user)
      return Promise.resolve(user)
    },
    doUserLogout ({ commit }) {
      // TODO: 用户登出请求
      commit('setUser', null)
      return Promise.resolve()
    }
  }
})
