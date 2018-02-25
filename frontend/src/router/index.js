import Vue from 'vue'

import Router from 'vue-router'
Vue.use(Router)

import Users from '@/components/Users'

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})
