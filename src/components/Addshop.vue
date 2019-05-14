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
                <input class="input is-large" type="text" placeholder="name" autofocus="" id="user" v-model="tel">
              <span class="icon is-small is-left">
      <i class="fas fa-utensils"></i>
    </span>
              </div>
            </div>
            <div class="buttons is-centered">
              <span class="button is-success" v-on:click="Addshop(name, tel)">เพิ่มร้านอาหาร</span>
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
      useradd: '',
      tel: ''
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
    async Addshop (name, tel) {
      let data = {
        SaveData: '',
        banner: '',
        count: '',
        countdoing: '',
        doing: '',
        name: name,
        q: '',
        status: '',
        tel: tel,
        Rating: 0
      }
      await ShopRef.child('detail').push(data)
      let key
      await ShopRef.child('detail').orderByChild('name').equalTo(name).once('child_added', snap => {
        key = snap.key
      })
      await UserRef.child(this.useradd).child('hasShop').set(key)
      await this.SelectShop(key)
      this.$router.push('/shop')
    },
    SelectShop (name) {
      this.$store.dispatch('selectShop', name)
        .then(
          user => {
            this.$router.push('/shop')
          },
          err => {
            alert(err.message)
          }
        )
    }
  },
  mounted () {
    const getuser = UserRef.orderByChild('username').equalTo(this.user)
    getuser.on('child_added', snap => {
      this.useradd = snap.key
      console.log(this.useradd)
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
