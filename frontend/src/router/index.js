import Vue from 'vue'

import Router from 'vue-router'
Vue.use(Router)

import Users from '@/components/Users'
import UserEdit from '@/components/UserEdit'

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/user/:cpf',
      name: 'UserEdit',
      component: UserEdit,
      props: true
    },
    {
      path: '/user',
      name: 'UserEdit',
      component: UserEdit,
      props: true
    }
  ]
})
