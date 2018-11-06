<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">Login</h3>
        <p class="subtitle has-text-grey">Please login to FoodCenter.</p>
        <div class="box">
          <figure class="avatar">
            <img src="/static/page_2.jpg">
          </figure>
          <form>
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input class="input is-large" type="text" placeholder="Username" autofocus="" id="user" v-model="username">
              <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-large" type="password" placeholder="Password" id="password" v-model="password">
              <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
              </div>
            </div>
            <div class="field">
              <label class="checkbox">
                <input type="checkbox">
                Remember me
              </label>
            </div>
            <div class="buttons is-centered">
              <span class="button is-success" v-on:click="loginWeb">Login</span>
                <a class="bd-tw-button button" v-on:click="loginFacebook">
                <span class="icon">
                  <i class="fab fa-facebook"></i>
                </span>
                <span>
                  facebook
                </span>
              </a>
              <a class="button is-primary" href="#/Register">
              <span>Sign Up</span>
            </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="column is-one-third" :key="key" v-for="(user, key) in users">
      <div class="" :key="key" v-for="(user, key) in user">
    <h1>Username :{{user.username}}</h1>
    <h1>password :{{user.password}}</h1>
    <h1>permission :{{user.permission}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      permission: '',
      getuser: {},
      users: {},
      username: '',
      password: ''
    }
  },
  methods: {
    loginWeb: function (e) {
      if (this.user === null) {
        if (this.username !== '' && this.password !== '') {
          this.$store.dispatch('signIn', {username: this.username, password: this.password})
            .then(() => {
            }).catch(err => {
              alert(err)
            })
        } else alert(`No space information`)
        if (this.isLoggedIn === true) {
          this.$router.push('/foodcenter')
        } else {
          this.$router.push('/')
        }
      }
    },
    loginFacebook: function (e) {
      var provider = new firebase.auth.FacebookAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          user => {
            const userSet = firebase.auth().currentUser.displayName
            this.$store.dispatch('loginfacebook', userSet)
            this.$router.push('/foodcenter')
            alert(`You are logged in as ${userSet}`)
          },
          err => {
            alert(err.message)
          }
        )
    }
  },
  mounted () {
    const dbRefObject = firebase.database().ref().child('user')
    dbRefObject.on('value', snap => {
      this.users = snap.val()
      console.log(this.users)
    })
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
<style>
  html,
  body {
    font-family: 'Open Sans', serif;
    font-size: 14px;
    font-weight: 300;
    background: #F2F6FA;
  }

  .hero.is-success {
    background: #F2F6FA;
  }

  .hero .nav,
  .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .box {
    margin-top: 5rem;
  }

  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }

  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
  }

  input {
    font-weight: 300;
  }

  p {
    font-weight: 700;
  }

  p.subtitle {
    padding-top: 1rem;
  }
</style>
