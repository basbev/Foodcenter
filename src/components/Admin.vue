<template>
    <div>
        <h1 class="title">All Foodcenter</h1>
        <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <div class="control has-icons-left has-icons-right search-field">
                  <input class="input is-large" type="text" placeholder="" v-model="search" /><span class="icon is-medium is-left"><i class="fa fa-search"></i></span>
                  <span class="icon is-medium is-right">
                    <i class="delete is-medium clear-search" @click="clearSearchField()" v-if="search.length"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div>
      <p>Users: {{this.numberOfuser}}</p>
      <div :key="key" v-for="(user, key) in users">
      <div :key="key" v-for="(user, key) in user">
        <h1>Username: {{user.username}} Password: {{user.password}} Permiision: {{user.permission}}</h1>
      </div>
      </div>
    </div>
    <div>
      <p>shops: {{this.numberOfshop}}</p>
      <div :key="key" v-for="(shop, key) in shops">
        <div :key="key" v-for="(shop, key) in shop">
        <h1>shop: {{shop.name}} tel: {{shop.tel}} q: {{shop.q}}</h1>
      </div>
      </div>
      </div>
      <section class="container cards-container">
        <div :key="key" v-for="(shop, key) in shops">
      <div :key="key" class="column is-narrow" v-for="(shop, key ) in filteredshop">
                <!-- Loop through the `items` array from the current season to show each item -->
                <span>{{ shops }}</span>
              </div>
        </div>
    </section>
    </div>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: 'Admin',
  data: function () {
    return {
      users: {},
      shops: {},
      numberOfuser: 0,
      numberOfshop: 0,
      search: ''
    }
  },
  methods: {
  },
  mounted () {
    const Refuser = firebase.database().ref().child('user')
    const RefFoodcenter = firebase.database().ref().child('foodcenter').child('detail')
    Refuser.on('value', snap => {
      this.users = snap.val()
      this.numberOfuser = snap.numChildren()
      console.log(this.users)
    })
    RefFoodcenter.on('value', snap => {
      this.shops = snap.val()
      this.numberOfshop = snap.numChildren()
      console.log(this.shops)
    })
    firebase.database().ref().child('foodcenter').child('detail').on('value', function (snapshot) {
      console.log('There are ' + snapshot.numChildren() + 'messages')
    })
  },
  computed: {
    filteredshop (shop) {
      var _this = this
      if (this.search.length === 0) return this.shop
      return this.shop.map(function (shop) {
        return {
          name: shop.name.filter(function (name) {
            return name.includes(_this.search)
          })
        }
      })
    }
  }
}
</script>
<style>
.nav {
    height: auto;
    margin-bottom: 2rem;
}

.nav-item img {
    max-height: 3.5rem;
}

.active-bottom-border {
    border-bottom: 3px solid #00d1b2;
    color: #00d1b2;
    padding-bottom: calc(.75rem - 8px);
}
</style>
