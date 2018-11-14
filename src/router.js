import Vue from 'vue'
import Router from 'vue-router'
import Layout from './layout/Index'

Vue.use(Router)

export const menuRouters = [{
  path: '/',
  name: 'Home',
  component: () => import(/* webpackChunkName: "home" */ './views/Home'),
  meta: { title: '首页', icon: 'fas fa-home' }
}, {
  path: '/user',
  name: 'User',
  redirect: '/user/list',
  meta: { title: '用户', icon: 'fas fa-users' },
  children: [{
    path: '/user/list',
    name: 'UserList',
    component: () => import(/* webpackChunkName: "user" */ './views/user/UserList'),
    meta: { title: '用户列表', icon: 'fas fa-user-friends' }
  }, {
    path: '/user/edit',
    name: 'UserEdit',
    component: () => import(/* webpackChunkName: "user" */ './views/user/UserEdit'),
    meta: { title: '用户编辑', icon: 'fas fa-user-tag' }
  }]
}, {
  path: '/about',
  name: 'About',
  component: () => import(/* webpackChunkName: "about" */ './views/About'),
  meta: { title: '关于', icon: 'fas fa-book' }
}]

export const otherRouters = [{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ './views/Login'),
  meta: { title: '登录', noTab: true }
}]

function filterComponentRouter (routers) {
  let rs = []
  for (let route of routers) {
    if (Array.isArray(route.children) && route.children.length) {
      rs.push(...filterComponentRouter(route.children))
    } else if (route.component) {
      rs.push(route)
    }
  }
  return rs
}

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...otherRouters,
    {
      path: '',
      name: 'Layout',
      redirect: '/',
      component: Layout,
      children: filterComponentRouter(menuRouters)
    }
  ]
})
