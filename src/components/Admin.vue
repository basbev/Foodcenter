<template>
    <div>
        <h1 class="title">All Foodcenter</h1>
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
        <h1>shop: {{shop.name}} tel: {{shop.tel}} Q: {{shop.q}}</h1>
      </div>
      </div>
      </div>
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
      numberOfshop: 0
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
