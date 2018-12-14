<template>
<nav class="navbar is-black">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="/static/logo2.png" width="112" height="28">
    </a>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </div>
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="#/foodcenter">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                Home
              </span>
      </a>
      <a v-if="permission === '4'" class="navbar-item" href="#/admin">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                Manage
              </span>
      </a>
      <a v-if="permission === '2'" class="navbar-item" href="#/order">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                Manage
              </span>
      </a>
      <a v-if="permission === '2'" class="navbar-item" href="#/shop">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                MyShop
              </span>
      </a>
      <a v-if="permission === '2'" class="navbar-item" href="#/Reportsell">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                Report
              </span>
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control" v-if="isLoggedIn">
            <a class="bd-tw-button button" href="#/Profile">
              <span class="text">
                {{this.user}}
              </span>
            </a>
          </p>
          <p class="control" v-if="isLoggedIn" v-on:click="logout">
            <a class="bd-tw-button button" href="/">
              <span>
                Logout
              </span>
            </a>
          </p>
          <p class="control" v-if="!isLoggedIn">
            <a class="bd-tw-button button" href="#/">
              <span>
                Login
              </span>
            </a>
          </p>
          <p class="control" v-if="!isLoggedIn">
            <a class="button is-primary" href="#/Register">
              <span>Sign Up</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'
import 'firebase/auth'
var config = {
  apiKey: 'AIzaSyDIfmWOTTfPFqBIN7h3J3-yt-Ey2hpYnOk',
  authDomain: 'foodcenter-23d67.firebaseapp.com',
  databaseURL: 'https://foodcenter-23d67.firebaseio.com',
  projectId: 'foodcenter-23d67',
  storageBucket: 'foodcenter-23d67.appspot.com',
  messagingSenderId: '4604297708'
}
firebase.initializeApp(config)
export default {
  name: 'navbar',
  data () {
    return {
      currentUser: false
    }
  },
  created () {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true
      if (firebase.auth().currentUser.displayName === null) {
        this.currentUser = firebase.auth().currentUser.email
      } else {
        this.currentUser = firebase.auth().currentUser.displayName
      }
    }
    this.load()
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path })
          this.$router.push('/')
        })
      this.clearlogin()
      this.$router.push('/')
    },
    ...mapActions({
      load: 'load',
      clearlogin: 'clearlogin'
    })
  },
  computed: {
    ...mapGetters({
      permission: 'permission',
      isLoggedIn: 'isLoggedIn',
      user: 'user'
    })
  }
}
</script>

<style scoped>
.email {
  padding-right: 10px;
}
</style>
