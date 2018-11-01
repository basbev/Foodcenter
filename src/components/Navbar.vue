<template>
<nav class="navbar is-black">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="/static/page_1.jpg" width="112" height="28">
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
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<style scoped>
.email {
  padding-right: 10px;
}
</style>
