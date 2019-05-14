<template>
  <div class="hero-body">
    <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
    <div class="container">
      <div class="columns is-mobile is-centered">
      <div class="column is-10-mobile is-6-tablet is-4-desktop has-text-centered">
        <h3 class="title has-text-grey">Login</h3>
        <p class="subtitle has-text-grey">Please login to FoodCenter.</p>
        <div class="box">
          <figure class="avatar">
            <img src="/static/logo1.png">
          </figure>
          <form>
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-large" type="text" placeholder="Username" autofocus="" id="user" v-model="username">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
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
            <!-- <div class="field">
              <label class="checkbox">
                <input type="checkbox">
                Remember me
              </label>
            </div> -->
            <div class="buttons is-centered">
              <span class="button is-warning is-fullwidth" v-on:click="loginWeb">Login</span>
              <a class="button is-dark is-fullwidth" href="#/Register">
                <span>Sign Up</span>
              </a>
              <hr>
              <a class="bd-tw-button button is-link is-fullwidth" v-on:click="loginFacebook">
                <span class="icon">
                  <i class="fab fa-facebook"></i>
                </span>
                &nbsp;facebook
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    <!-- <div class="column is-one-third" :key="key" v-for="(user, key) in users">
    <h1>Username :{{user.username}}</h1>
    <h1>password :{{user.password}}</h1>
    <h1>permission :{{user.permission}}</h1>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
export default {
  name: 'login',
  data: function () {
    return {
      email: '',
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
        if (this.isLoggedIn === true && this.permission === '4') {
          alert('Successfully sign in\nWelcome User Administrator: ' + ' ' + this.user)
          this.$router.push('/Admin')
        } if (this.isLoggedIn === true && this.permission === '3') {
          alert('Successfully sign in\nWelcome User Admin Foodcenter: ' + ' ' + this.user)
          this.$router.push('/foodcenter')
        } if (this.isLoggedIn === true && this.permission === '2' && this.selectShop !== '') {
          alert('Successfully sign in\nWelcome User Shop: ' + ' ' + this.user)
          this.$router.push('/shop')
        } if (this.isLoggedIn === true && this.permission === '1') {
          alert('Successfully sign in\nWelcome User Customer: ' + ' ' + this.user)
          this.$router.push('/foodcenter')
        } if (this.isLoggedIn === true && this.permission === '2' && this.selectShop === '') {
          alert('Successfully sign in\nWelcome User Shop: ' + ' ' + this.user)
          this.$router.push('/Addshop')
        } if (this.isLoggedIn === true && this.permission === '5' && this.selectShop !== '') {
          alert('Successfully sign in\nWelcome User Shopmeter: ' + ' ' + this.user)
          this.$router.push('/meter')
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
    const dbRefObject3 = firebase.database().ref().child('facebook')
    dbRefObject3.on('value', snap => {
      this.facebook = snap.val()
      console.log(this.facebook)
    })
  },
  computed: {
    ...mapGetters({
      permission: 'permission',
      selectShop: 'selectShop',
      user: 'user',
      isLoggedIn: 'isLoggedIn',
      hasShop: 'hasShop'
    })
  }
}
</script>
<style>
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
  div {
  font-family: 'Prompt', sans-serif;
}
.input2 {
    font-size: 20px;
    width: 100%;
    padding: 1% 1%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

  .large1 {
    font-size: 1.5rem;
}
  .input[type=text], select {
    width: 100%;
}
  .input.is-large, .textarea.is-large {
    font-size: 1.5rem;
  }
</style>
