import Vue from 'vue'

import Router from 'vue-router'
Vue.use(Router)

import Users from '@/components/Users'
import User from '@/components/User'

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/user/:cpf',
      name: 'EditUser',
      component: User,
      props: true
    },
    {
      path: '/user',
      name: 'CreateUser',
      component: User,
      props: false
    }
  ]
})
