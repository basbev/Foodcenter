<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">เพิ่มร้านอาหาร</h3>
        <div class="box">
          <figure class="avatar">
            <img src="/static/logo1.png">
          </figure>
          <form>
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input class="input is-large" type="text" placeholder="name" autofocus="" id="user" v-model="name">
              <span class="icon is-small is-left">
      <i class="fas fa-utensils"></i>
    </span>
              </div>
            </div>
            <div class="buttons is-centered">
              <span class="button is-success" v-on:click="Addshop(name)">เพิ่มร้านอาหาร</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
var database = firebase.database()
var UserRef = database.ref('/user')
var ShopRef = database.ref('/foodcenter')
export default {
  name: 'Addshop',
  data () {
    return {
      name: '',
      useradd: ''
    }
  },
  computed: {
    ...mapGetters({
      permission: 'permission',
      isLoggedIn: 'isLoggedIn',
      user: 'user'
    })
  },
  methods: {
    async Addshop (name) {
      UserRef.child(this.user).child(this.useradd).child('hasShop').set(name)
      ShopRef.child('detail').child(name).set(name)
    }
  },
  mounted () {
    const getuser = UserRef.child(this.user).orderByChild('username').equalTo(this.user)
    getuser.on('child_added', snap => {
      this.useradd = snap.key
      console.log(this.useradd)
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
