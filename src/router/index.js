import Vue from 'vue'
import Router from 'vue-router'
import foodcenter from '@/components/foodcenter'
import login from '@/components/login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/foodcenter',
      name: 'foodcenter',
      component: foodcenter
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
