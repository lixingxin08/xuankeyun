import Vue from 'vue'
import Router from 'vue-router'
const home = resolve => require(['@/components/pc_home'], resolve)
const homeitem = resolve => require(['@/components/homeitem'], resolve)
const login = resolve => require(['@/components/login'], resolve);

Vue.use(Router);

export default new Router({
  mode:'hash',
  routes: [
        { path: '/', redirect: '/login' },
    {
      path: '/home',
      name: 'home',
      component: home
    },
        {
      path: '/homeitem',
      name: 'homeitem',
      component: homeitem
    },

    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
