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
      <div :key="key" v-for="(detail, key) in order">
  <div class="card-content">
    <div class="content">
      เมนูอาหาร: {{detail.name}} <br>
      ราคา: {{detail.price}} บาท <br>
      จำนวน: {{detail.quantity}} จาน
    </div>
  </div>
  </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">Save</a>
    <a href="#" class="card-footer-item">Edit</a>
    <a href="#" class="card-footer-item">Delete</a>
    </footer>
   </div>
      </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'
var database = firebase.database()
var foodcenterRef = database.ref('/foodcenter')
export default {
  name: 'order',
  data () {
    return {
      orders: [],
      datenow: new Date()
    }
  },
  methods: {
  },
  mounted () {
    const dbRefObject = foodcenterRef.child('order').child('ป้าสมบูรณ์')
    dbRefObject.on('value', snap => {
      this.orders = snap.val()
      console.log(this.orders)
    })
    console.log(this.date)
  },
  computed: {
  }
  // Date/Time: {{Date(key)}}
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
