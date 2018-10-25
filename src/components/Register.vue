<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">Register</h3>
        <p class="subtitle has-text-grey">Please Register to FoodCenter.</p>
        <div class="box">
          <figure class="avatar">
            <img src="/static/page_2.jpg">
          </figure>
          <form>
            <div class="field">
              <div class="control">
                <input class="input is-large" type="email" placeholder="Your Email" autofocus="" id="email" v-model="email">
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input class="input is-large" type="password" placeholder="Your Password" id="password" v-model="password">
              </div>
            </div>
            <div class="field">
              <label class="checkbox">
                <input type="checkbox">
                Remember me
              </label>
            </div>
            <div class="buttons is-centered">
              <span class="button is-success" v-on:click="login">Login</span>
              <a class="bd-tw-button button">
                <span class="icon">
                  <i class="fab fa-facebook"></i>
                </span>
                <span>
                  facebook
                </span>
              </a>
              <span class="button is-danger">Sign Up</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Register',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register: function (e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            // console.log(user);
            alert(`Account Created for ${user.email}`)
            this.$router.go({ path: this.$router.path })
          },
          err => {
            alert(err.message)
          }
        )
      e.preventDefault()
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
