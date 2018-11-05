import Vue from 'vue'
import Router from 'vue-router'
import foodcenter from '@/components/foodcenter'
import login from '@/components/login'
import Register from '@/components/Register'
import Update from '@/components/Update'
import Profile from '@/components/Profile'
import shop from '@/components/shop'
import Cart from '@/components/Cart'

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
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
