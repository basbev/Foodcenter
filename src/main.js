// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import { store } from './store/store'
import VueSweetalert2 from 'vue-sweetalert2'
import VueCarousel from '@chenfengyuan/vue-carousel'
import StarRating from 'vue-star-rating'
Vue.use(VueCarousel)
Vue.use(VueSweetalert2)
let storageRef = firebase.storage().ref()
Vue.directive('url', {
  async bind (el, binding) {
    let url = await storageRef.child(binding.value.filename).getDownloadURL()
    el.src = url
  }
})
Vue.config.productionTip = false
Vue.component('star-rating', StarRating)
Vue.component('vue-carousel', VueCarousel)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('App login')
        this.$store.dispatch('autoSign', user)
      } else {
        // console.log('App logout')
      }
    })
  }
})
