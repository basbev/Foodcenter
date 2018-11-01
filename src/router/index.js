import Vue from 'vue'
import Router from 'vue-router'
import foodcenter from '@/components/foodcenter'
import login from '@/components/login'
import Register from '@/components/Register'
import Update from '@/components/Update'
import Profile from '@/components/Profile'

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
    },
    {
      path: '/Update',
      name: 'Update',
      component: Update
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
