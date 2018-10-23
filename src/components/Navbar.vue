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
      <a class="navbar-item" href="/">
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
            <a class="bd-tw-button button" href="/">
              <span class="email">
                {{currentUser}}
              </span>
            </a>
          </p>
          <p class="control">
            <a class="bd-tw-button button" href="/">
              <span>
                Login
              </span>
            </a>
          </p>
          <p class="control">
            <a class="button is-primary" href="/">
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
export default {
  name: 'navbar',
  data () {
    return {
      isLoggedIn: false,
      currentUser: false
    }
  },
  created () {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true
      this.currentUser = firebase.auth().currentUser.email
    }
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path })
        })
    }
  }
}
</script>

<style scoped>
.email {
  padding-right: 10px;
}
</style>
