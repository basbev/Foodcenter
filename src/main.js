// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import { store } from './store/store'

Vue.config.productionTip = false

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
        console.log('App login')
        this.$store.dispatch('autoSign', user)
      } else {
        console.log('App logout')
      }
    })
  }
})
