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
              <div class="control has-icons-left has-icons-right">
                <input class="input is-large" type="text" placeholder="Your Username" autofocus="" id="text" v-model="username">
                <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
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
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-large" type="text" placeholder="Your Email" id="text" v-model="email">
                <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
              </div>
            </div>
            <hr>
            <div class="buttons is-centered">
              <span class="bd-tw-button button" v-on:click="registerW">Register</span>
              <a class="bd-tw-button button">
                <span class="icon">
                  <i class="fab fa-facebook"></i>
                </span>
                <span>
                  facebook
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
var database = firebase.database()
var foodcenterRef = database.ref('/user')
export default {
  name: 'Register',
  data: function () {
    return {
      email: '',
      password: '',
      username: '',
      permission: '',
      hasUser: {}
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
            alert(`Account Created for ${this.email}`)
            this.$router.go({ path: this.$router.path })
          },
          err => {
            alert(err.message)
          }
        )
      e.preventDefault()
    },
    registerW: function () {
      const dbReflist = foodcenterRef.orderByChild('username').equalTo(this.username)
      dbReflist.on('child_added', snap => {
        this.hasUser = snap.val()
        console.log(this.hasUser)
      })
      if (this.hasUser.username == null) {
        let data = {
          username: this.username,
          password: this.password,
          permission: '1',
          firstname: '',
          lastname: '',
          phonenumber: '',
          address: '',
          hasShop: '',
          email: this.email
        }
        foodcenterRef.push(data)
        this.$router.push('/')
      } else {
        alert('UnSuccessfully sign Up')
        this.hasUser = {}
      }
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
