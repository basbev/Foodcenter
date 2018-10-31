<template>
  <div class='hello'>
    <img src = "/static/page_1.jpg" width="300">
    <div>
      <input type="text" v-model="name" placeholder="ชื่อร้านอาหาร">
      <input type="text" v-model="tel" placeholder="เบอร์">
      <button @click="insertTofoodcenter(tel, name)">เพิ่มร้านอาหาร</button>
    </div>
    <hr>
  <section class="section">
        <div class="container">
          <div class="columns is-multiline">
            <div class="column is-one-third" :key="key" v-for="(foodcenter, key) in foodcenters">
              <article class="notification media has-background-white">
                <figure class="media-left">
                  <span class="icon">
                    <i class="has-text-warning fa fa-columns fa-lg"></i>
                  </span>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <h1 class="title is-size-4">ร้านอาหาร</h1>
                    <div v-if="updateKey === key">
        <input type="text" v-model="updateName" placeholder="NAME">
        <input type="text" v-model="updateTel" placeholder="TEL">
        <button @click="updatefoodcenter(updateTel, updateName)">Save</button>
      </div>
      <div v-else>
        <div class="row">
          <div class="column">
        <h1>{{foodcenter.name}}</h1>
         <h1>{{foodcenter.tel}}</h1>
         <h1>จำนวนคิวที่ต้องรอ {{foodcenter.q}} </h1>
        <button @click="setUpdatefoodcenter(key, foodcenter)">Update</button>
        <button @click="deletefoodcenter(key)">Delete</button>
        </div>
        </div>
      </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
import * as firebase from 'firebase'
var database = firebase.database()
var foodcenterRef = database.ref('/foodcenter')
export default {
  name: 'foodcenter',
  data () {
    return {
      foodcenters: {},
      tel: '',
      name: '',
      updateTel: '',
      updateName: '',
      updateKey: '',
      q: ''
    }
  },
  methods: {
    insertTofoodcenter (tel, name) {
      let data = {
        tel: tel,
        name: name,
        q: 0
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
    foodcenterRef.on('value', snapshot => {
      this.foodcenters = snapshot.val()
      console.log(this.foodcenters)
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
