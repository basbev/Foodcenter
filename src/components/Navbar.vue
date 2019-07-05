<template>
<nav class="navbar is-black">
  <!--  -->
  <div v-click-outside="onOutSide">
  <nav class="navbar is-black">
  <div class="toggle-wrap" @click="onSidebar()">
    <span class="toggle-bar"></span>
  </div>
</nav>
<aside>
  <div class="toggle-wrap" @click="onOutSide()">
    <span class="toggle-bar"></span>
  </div>
  <ul class="" style="touch-action: pan-y;" id="">
          <li class="menu-active"><a href="#intro">รายการ</a></li>
          <li><a class="navbar-item" href="#/foodcenter">
              <span class="icon"><i class="fas fa-home"></i></span>
              <span>ร้านอาหารทั้งหมด</span></a></li>
          <li v-if="permission === '2'"><a class="navbar-item" href="#/order2">
              <span class="icon"><i class="fas fa-home"></i></span>
              <span @click="myshop()">จัดการ Order</span></a></li>
          <li v-if="permission === '2'"><a class="navbar-item" href="#/shop">
              <span class="icon"><i class="fas fa-home"></i></span>
              <span @click="myshop()">ร้านของฉัน</span></a></li>
          <li v-if="permission === '2'"><a class="navbar-item" href="#/Reportsell">
              <span class="icon"><i class="fas fa-home"></i></span>
              <span @click="myshop()">สรุปยอดขาย</span></a></li>
          <li v-if="permission === '2'"><a class="navbar-item" href="#/stockshop">
              <span class="icon"><i class="fas fa-home"></i></span>
              <span @click="myshop()">สต็อตร้านอาหาร</span></a></li>
          <li v-if="permission === '2' || permission === '5'"><a class="navbar-item" href="#/shopmeter">
              <span class="icon"><i class="fas fa-home"></i></span>
              <span>ร้านค้าวัตถุดิบทั้งหมด</span></a></li>
          <li v-if="permission === '5'"><a class="navbar-item" href="#/meter">
              <span class="icon"><i class="fas fa-home"></i></span>
              <span @click="myshop()">ร้านวัตถุดิบของฉัน</span></a></li>
          <li v-if="permission === '5'"><a class="navbar-item" href="#/stockmeter">
              <span class="icon"><i class="fas fa-home"></i></span>
              <span @click="myshop()">สต็อตร้านวัตถุดิบ</span></a></li>
          <li v-if="permission === '4'"><a class="navbar-item" href="#/admin">
              <span class="icon"><i class="fas fa-home"></i></span>
              <span>จัดการผู้ใช้</span></a></li>
        </ul>
</aside>
</div>
  <!--  -->
  <div class="navbar-brand">
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </div>
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu" style="background-color:000000;">
    <div class="navbar-start">
      <a class="navbar-item" href="#/foodcenter">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                ร้านอาหารทั้งหมด
              </span>
      </a>
      <a v-if="permission === '4'" class="navbar-item" href="#/admin">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                จัดการผู้ใช้
              </span>
      </a>
      <a v-if="permission === '3'" class="navbar-item" href="#/shopmeter">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                ร้านค้าวัตถุดิบทั้งหมด
              </span>
      </a>
      <a v-if="permission === '2'" class="navbar-item" href="#/order2" @click="myshop()">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                จัดการ Order
              </span>
      </a>
      <a v-if="permission === '2'" class="navbar-item" href="#/shop" @click="myshop()">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                ร้านของฉัน
              </span>
      </a>
      <a v-if="permission === '2'" class="navbar-item" href="#/Reportsell" @click="myshop()">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                สรุปยอดขาย
              </span>
      </a>
      <a v-if="permission === '2'" class="navbar-item" href="#/stockshop" @click="myshop()">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                สต็อตร้านอาหาร
              </span>
      </a>
      <a v-if="permission === '2' || permission === '5'" class="navbar-item" href="#/shopmeter">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                ร้านค้าวัตถุดิบ
              </span>
      </a>
      <a v-if="permission === '5'" class="navbar-item" href="#/meter" @click="myshop()">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                ร้านวัตถุดิบของฉัน
              </span>
      </a>
      <a v-if="permission === '5'" class="navbar-item" href="#/stockmeter" @click="myshop()">
        <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>
                สต็อตร้านวัตถุดิบ
              </span>
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control" v-if="isLoggedIn">
            <a class="bd-tw-button button is-link" href="#/Profile">
              <span class="text">
                {{this.user}}
              </span>
            </a>
          </p>
          <p class="control" v-if="isLoggedIn" v-on:click="logout">
            <a class="bd-tw-button button is-danger">
              <span>
                ออกจากระบบ
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
import JQuery from 'jquery'
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'
import 'firebase/auth'
import ClickOutside from 'vue-click-outside'
let $ = JQuery
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
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ]
  },
  data () {
    return {
      currentUser: false,
      isActive: false
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
      this.logoutfacebook(this.token, this.key)
      console.log(this.token, 'this.token')
      console.log(this.key, 'key')
      if (this.token && this.key) { firebase.database().ref('user/').child(this.key).child('token').child(this.token).remove() }
      // this.clearlogin()
      this.clearlogin().then(() => {
        this.$router.push('/')
        this.$router.go({ path: this.$router.path })
      })
      console.log('clearlogin')
      this.$router.push('/')
    },
    logoutfacebook (token, key) {
      console.log('Do facebook')
      console.log(this.token, this.key)
      if (firebase.auth().currentUser) {
        if (this.token && this.key) {
          firebase.database().ref('facebook/').child(this.key).child('token').child(this.token).remove()
        }
        firebase
          .auth()
          .signOut()
          .then(() => {
          // this.$router.go({ path: this.$router.path })
          // this.$router.push('/')
          })
      }
    },
    toggleNav: function () {
      this.isActive = !this.isActive
    },
    onToggle: function () {
      $(this).toggleClass('active')
      $('aside').animate({width: 'toggle'}, 200)
    },
    onSidebar: function () {
      this.onToggle()
      this.isActive = true
    },
    onOutSide: function () {
      // console.log(this.isActive)
      if (this.isActive) {
        this.isActive = false
        this.onToggle()
      }
    },
    myshop () {
      this.$store.dispatch('selectShop', this.hasShop)
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
      user: 'user',
      hasShop: 'hasShop',
      token: 'token',
      key: 'key'
    })
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped>
.email {
  padding-right: 10px;
}
/* * {
  margin: 0;
  padding: 0;
} */
html,body {
  background: #303030;
  color: #303030;
  height: 100%;
  width: 100%;
  position: absolute;
  font: normal 1em "Arial";
}
nav {
  /* padding: 5px; */
  position: relative;
  background: rgb(255, 255, 255);
  z-index: 1;
}
nav::after {
  content: "";
  display: block;
  clear: block;
}
hgroup {
  float:left;
  margin: 2px 2px 2px 10px;
}
aside {
  position: fixed;
  width: 300px;
  height: 100%;
  background: #0a0a0a;
  left: 0;
  top: 0;
  display: none;
  z-index: 1;
  opacity: 0.99; /* โปร่งใส */
  filter: Alpha(opacity=50); /* IE8 and earlier */
}
aside::before {
  content: "";
  display: block;
  height: 10px;
}
aside a {
  display: block;
  padding: 12px 18px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  border-bottom: 1px solid #414141;
}
.toggle-wrap {
  padding: 10px;
  position: relative;
  cursor: pointer;
  float: left;
  /*disable selection*/
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.toggle-bar,
.toggle-bar::before,
.toggle-bar::after,
.toggle-wrap.active .toggle-bar,
.toggle-wrap.active .toggle-bar::before,
.toggle-wrap.active .toggle-bar::after {
  -webkit-transition: all .2s ease-in-out;
  -moz-transition: all .2s ease-in-out;
  -o-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
}
.toggle-bar {
  width: 38px;
  margin: 10px 0;
  position: relative;
  border-top: 6px solid #111111;
  display: block;
}
.toggle-bar::before,
.toggle-bar::after {
  content: "";
  display: block;
  background: #111111;
  height: 6px;
  width: 38px;
  position: absolute;
  top: -16px;
  transform: rotate(0deg);
  transform-origin: 13%;
}
.toggle-bar::after {
  top: 4px;
}
.toggle-wrap.active .toggle-bar {
  border-top: 6px solid transparent;
}
.toggle-wrap.active .toggle-bar::before {
  transform: rotate(45deg);
}
.toggle-wrap.active .toggle-bar::after {
  transform: rotate(-45deg);
}
.navbar {
  min-height: fit-content;
}
.navbar.is-black {
    background-color: #363636;
    color: #fff;
}
</style>
