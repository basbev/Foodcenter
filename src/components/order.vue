<template>
  <div>
      <div :key="key" v-for="(order, key) in orders">
   <div class="card">
    <header class="card-header">
    <p class="card-header-title">
      คิวที่: {{order.order}} <br>
        ผู้ใช้: {{order.customer}} <br>
        สถานะ: {{order.status}} <br>
    </p>
    </header>
    <div :key="keyy" v-for="(detail, keyy, index) in order.menu">
  <div class="card-content">
    <div class="content">
      เมนูอาหาร: {{detail.name}} <br>
      ราคา: {{detail.price}} บาท <br>
      จำนวน: {{detail.quantity}} จาน<br>
      เวลาคำนวณ : {{detail.minute}} นาที <br>
      วันที่ : {{detail.date}}
      </div>
  </div>
  <div v-if="index === detail.index">
    <div class="card-content">
    <div class="content">
      รวมทั้งหมด: {{detail.CountQuantity}} จาน :: ราคาทั้งหมด: {{detail.total}} <br>
      <button v-if="detail.doing === 'กำลังทำ'" @click="updatemenunow(keyy, keyShop2)" class="button button3">กำลังทำ</button>
      <button v-if="detail.doing === 'เสร็จเเล้ว'" class="button button3">ทำเสร็จเเล้ว</button>
    </div>
    </div>
  </div>
  </div>
  <div :key="keys" v-for="(shop, keys) in shops">
  <footer class="card-footer">
    <button @click='OrderComp(key, keys, shop.q, shop.countdoing, order.order)' class="card-footer-item">Delete</button>
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
      updateQ: '',
      keyShop2: '',
      updatecount: ''
    }
  },
  methods: {
    OrderComp (key, keys, q, c, order) {
      // foodcenterRef.child('order').child(this.selectShop).child(key).remove()
      this.updateQ = q
      this.updatecount = c
      foodcenterRef.child('detail').child(this.selectShop).child(keys).update({
        q: this.updateQ - 1,
        countdoing: this.updatecount + 1,
        count: order
      })
    },
    updatemenunow (name, keys) {
      foodcenterRef.child('detail').child(this.selectShop).child(keys).update({
        doing: name
      })
      foodcenterRef.child('order').child(this.selectShop)
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
      this.keyShop = snap.key
      console.log(this.shops)
    })
    const dbRefObject2 = foodcenterRef.child('detail').child(this.selectShop)
    dbRefObject2.on('child_added', snap => {
      this.keyShop2 = snap.key
      console.log(this.keyShop2)
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
