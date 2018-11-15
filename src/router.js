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
  meta: { title: '用户', icon: 'fas fa-users', permissions: 'ADMIN' },
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
  meta: { title: '登录', noTab: true, auth: false }
}, {
  path: '/e403',
  name: 'E403',
  component: () => import(/* webpackChunkName: "error" */ './views/errors/E403'),
  meta: { title: '没有权限', noTab: true, auth: false }
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

let layoutChildren = []
// 单独提出，方便动态添加路由
export const layoutRoute = {
  path: '',
  name: 'Layout',
  component: Layout,
  redirect: '/',
  set children (menus) {
    layoutChildren = filterComponentRouter(menus)
  },
  get children () {
    return layoutChildren
  }
}
// 动态添加时，此处不赋值
layoutRoute.children = menuRouters

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...otherRouters,
    layoutRoute,
    {
      path: '*',
      name: 'E404',
      component: () => import(/* webpackChunkName: "error" */ './views/errors/E404'),
      meta: { title: '页面不存在', noTab: true, auth: false }
    }
  ]
})
