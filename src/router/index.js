import Vue from 'vue'
import Router from 'vue-router'
import foodcenter from '@/components/foodcenter'
import login from '@/components/login'
import Register from '@/components/Register'
import Addshop from '@/components/Addshop'
import Addmeter from '@/components/Addmeter'
import Profile from '@/components/Profile'
import shop from '@/components/shop'
import Cart from '@/components/Cart'
import Admin from '@/components/Admin'
import order from '@/components/order'
import order2 from '@/components/order2'
import Reportsell from '@/components/Reportsell'
import stockshop from '@/components/stockshop'
import shopmeter from '@/components/shopmeter'
import meter from '@/components/meter'
import stockmeter from '@/components/stockmeter'
import Cartmeter from '@/components/Cartmeter'
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
      path: '/Addshop',
      name: 'Addshop',
      component: Addshop
    },
    {
      path: '/Addmeter',
      name: 'Addmeter',
      component: Addmeter
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
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/order2',
      name: 'order2',
      component: order2
    },
    {
      path: '/Reportsell',
      name: 'Reportsell',
      component: Reportsell
    },
    {
      path: '/stockshop',
      name: 'stockshop',
      component: stockshop
    },
    {
      path: '/shopmeter',
      name: 'shopmeter',
      component: shopmeter
    },
    {
      path: '/meter',
      name: 'meter',
      component: meter
    },
    {
      path: '/stockmeter',
      name: 'stockmeter',
      component: stockmeter
    },
    {
      path: '/Cartmeter',
      name: 'Cartmeter',
      component: Cartmeter
    }
  ]
})
