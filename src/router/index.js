import Vue from 'vue'
import Router from 'vue-router'
import foodcenter from '@/components/foodcenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'foodcenter',
      component: foodcenter
    }
  ]
})
