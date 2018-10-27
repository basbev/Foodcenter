<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">Update Profile</h3>
        <p class="subtitle has-text-grey">Rest Email and Password.</p>
        <div class="box">
          <figure class="avatar">
            <img src="/static/page_2.jpg">
          </figure>
          <form>
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input class="input is-large" type="email" placeholder="Your Email" autofocus="" id="email" v-model="email">
                <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-large" type="password" placeholder="Your Password" id="password" v-model="password">
                <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
              </div>
            </div>
            <hr>
            <div class="buttons is-centered">
              <a class="bd-tw-button button" v-on:click="update">
                <span class="icon">
                  <i class="fas fa-check-square"></i>
                </span>
                <span>
                  Update
                </span>
              </a>
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
      password: '',
      uid: ''
    }
  },
  methods: {
    update: function (e) {
      firebase
        .auth()
        .currentUser.updateEmail(this.email)
        .then(
          user => {
          },
          err => {
            console.log(err.message)
          }
        )
      firebase
        .auth()
        .currentUser.updatePassword(this.password)
        .then(
          user => {
            alert('Account Update')
            // this.$router.go({ path: '#/' })
            this.router.next({ path: 'login' })
          },
          err => {
            console.log(err.message)
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
