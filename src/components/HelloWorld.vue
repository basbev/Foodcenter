<template>
  <div class='hello'>
    <img src = "/static/page_1.jpg" width="300">
    <div>
      <input type="text" v-model="name" placeholder="ชื่อร้านอาหาร">
      <input type="text" v-model="tel" placeholder="เบอร์">
      <button @click="insertTofoodcenter(tel, name)">Add</button>
    </div>

    <hr>

    <ul :key="key" v-for="(foodcenter, key) in foodcenters">
      <li v-if="updateKey === key">
        <input type="text" v-model="updateName" placeholder="NAME">
        <input type="text" v-model="updateTel" placeholder="TEL">
        <button @click="updatefoodcenter(updateTel, updateName)">Save</button>
      </li>
      <li v-else>
        {{foodcenter.name}} : {{foodcenter.tel}}
        <button @click="setUpdatefoodcenter(key, foodcenter)">Update</button>
        <button @click="deletefoodcenter(key)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import * as firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyDIfmWOTTfPFqBIN7h3J3-yt-Ey2hpYnOk',
  authDomain: 'foodcenter-23d67.firebaseapp.com',
  databaseURL: 'https://foodcenter-23d67.firebaseio.com',
  projectId: 'foodcenter-23d67',
  storageBucket: 'foodcenter-23d67.appspot.com',
  messagingSenderId: '4604297708'
}
firebase.initializeApp(config)
var database = firebase.database()
var foodcenterRef = database.ref('/foodcenter')
export default {
  name: 'HelloWorld',
  data () {
    return {
      foodcenters: {},
      tel: '',
      name: '',
      updateTel: '',
      updateName: '',
      updateKey: ''
    }
  },
  methods: {
    insertTofoodcenter (tel, name) {
      let data = {
        tel: tel,
        name: name
      }
      foodcenterRef.push(data)
      this.tel = ''
      this.name = ''
    },
    setUpdatefoodcenter (key, foodcenter) {
      this.updateKey = key
      this.updateTel = foodcenter.tel
      this.updateName = foodcenter.name
    },
    updatefoodcenter (tel, name) {
      foodcenterRef.child(this.updateKey).update({
        tel: tel,
        name: name
      })
      this.updateKey = ''
      this.updateTel = ''
      this.updateName = ''
    },
    deletefoodcenter (key) {
      foodcenterRef.child(key).remove()
    }
  },
  mounted () {
    foodcenterRef.on('value', (snapshot) => {
      this.foodcenters = snapshot.val()
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
