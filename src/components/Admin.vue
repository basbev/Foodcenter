<template>
    <div>
        <h1 class="title">All Products</h1>
        <p>{{length}} products</p>
        <table class="table is-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr :key="key" v-for="(user, key) in users">
                <td>{{user}}</td>
                <td>{{user}}</td>
                <td>${{user}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: 'Admin',
  data: function () {
    return {
      users: {}
    }
  },
  methods: {
  },
  mounted () {
    const dbRefObject = firebase.database().ref().child('user')
    dbRefObject.on('value', snap => {
      this.users = snap.val()
      console.log(this.users)
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
