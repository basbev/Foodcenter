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
            <div class="column is-one-third" :key="key" v-for="(details, key) in shops">
      <div class="" :key="key" v-for="(detail, key) in details">
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
        <h1>name :{{detail.name}}</h1>
    <h1>Tel :{{detail.tel}}</h1>
    <h1>คิวต้องที่ต้องงรอ :{{detail.q}}</h1>
        <button @click="setUpdatefoodcenter(key, shop)">Update</button>
        <button @click="deletefoodcenter(key)">Delete</button>
        <button @click="SelectShop(detail.name)" class="button is-danger">Select</button>
        </div>
        </div>
      </div>
                  </div>
                </div>
              </article>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="column is-one-third" :key="key" v-for="(details, key) in shops">
      <div class="" :key="key" v-for="(detail, key) in details">
    <h1>name :{{detail.name}}</h1>
    <h1>Tel :{{detail.tel}}</h1>
    <h1>Q :{{detail.q}}</h1>
      </div>
    </div>
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
      q: '',
      shops: {}
    }
  },
  methods: {
    insertTofoodcenter (tel, name) {
      let data = {
        tel: tel,
        name: name,
        q: 0
      }
      foodcenterRef.child('detail').child(this.name).push(data)
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
    },
    SelectShop (name) {
      this.$store.dispatch('selectShop', {name})
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
    const dbRefObject = foodcenterRef.child('detail')
    dbRefObject.on('value', snap => {
      this.shops = snap.val()
      console.log(this.shops)
      console.log(this.selectShop)
    })
  },
  computed: {
    selectShop () {
      return this.$store.getters.selectShop
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
