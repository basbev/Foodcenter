<template>
  <div>
      <div :key="key" v-for="(order, key) in orders">
   <div class="card">
    <header class="card-header">
    <p class="card-header-title">
      Order Id: {{key}}<br>
    </p>
    </header>
    <div :key="key" v-for="(order, key) in order">
      <div class="card-content">
      ผู้สั่ง: {{key}} <br>
    </div>
      <div :key="key" v-for="(detail, key, index) in order">
  <div class="card-content">
    <div class="content">
      เมนูอาหาร: {{detail.name}} <br>
      ราคา: {{detail.price}} บาท <br>
      จำนวน: {{detail.quantity}} จาน
    </div>
  </div>
  <div v-if="index === detail.quantity">{{index}} :: {{key}}</div>
  </div>
  </div>
  <div :key="keys" v-for="(shop, keys) in shops">
  <footer class="card-footer">
    <a href="#" class="card-footer-item">Save</a>
    <a href="#" class="card-footer-item">Edit</a>
    <button @click='OrderComp(key, keys, shop.q)' class="card-footer-item">Delete</button>
    </footer>
  </div>
   </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as firebase from 'firebase'
var database = firebase.database()
var foodcenterRef = database.ref('/foodcenter')
export default {
  name: 'order',
  data () {
    return {
      orders: [],
      datenow: new Date(),
      shops: [],
      updateQ: ''
    }
  },
  methods: {
    OrderComp (key, keys, q) {
      foodcenterRef.child('order').child(this.selectShop).child(key).remove()
      this.updateQ = q
      foodcenterRef.child('detail').child(this.selectShop).child(keys).update({
        q: this.updateQ - 1
      })
    }
  },
  mounted () {
    const dbRefObject = foodcenterRef.child('order').child(this.selectShop)
    dbRefObject.on('value', snap => {
      this.orders = snap.val()
      console.log(this.orders)
    })
    console.log(this.date)
    const dbRefObject1 = foodcenterRef.child('detail').child(this.selectShop)
    dbRefObject1.on('value', snap => {
      this.shops = snap.val()
      console.log(this.shops)
    })
  },
  computed: {
    ...mapGetters({
      selectShop: 'selectShop'
    })
  }
  // Date/Time: {{Date(key)}}
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
