<template>
  <div>
    <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
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
      <button v-if="order.status === 'กำลังรอ'" @click="updatemenunow(order.customer, order.order, key)" class="button button7">กำลังทำ</button>
      <button v-if="order.status === 'กำลังทำ'" @click="complete(key)" class="button button7">ทำเสร็จเเล้ว</button>
    </div>
    </div>
  </div>
  </div>
  <footer class="card-footer">
    <button class="button button8" @click='OrderComp(key, shops.q, shops.countdoing, order.order)'>Delete</button>
    </footer>
  </div>
   </div><br>
   <div>
     <button class="button button8" @click="group()">กรุ๊ปรวมเมนูอาหาร</button>
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
      updatecount: ''
    }
  },
  methods: {
    OrderComp (key, q, c, order) {
      // foodcenterRef.child('order').child(this.selectShop).child(key).remove()
      this.updateQ = q
      this.updatecount = c
      foodcenterRef.child('detail').child(this.selectShop).update({
        q: this.updateQ - 1,
        countdoing: this.updatecount + 1,
        count: order
      })
    },
    updatemenunow (name, order, key) {
      foodcenterRef.child('detail').child(this.selectShop).update({
        doing: name
      })
      foodcenterRef.child('order').child(this.selectShop).child(key).update({
        status: 'กำลังทำ'
      })
    },
    complete (key) {
      foodcenterRef.child('order').child(this.selectShop).child(key).update({
        status: 'ทำเสร็จเเล้ว'
      })
    },
    group () {
      alert(`Pls Wait`)
    }
  },
  mounted () {
    const dbRefObject = foodcenterRef.child('order').child(this.selectShop)
    dbRefObject.on('value', snap => {
      this.orders = snap.val()
      console.log(this.orders)
    })
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
<style>
.button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    text-align: center;
    /*text-decoration: none;*/
    /*font-size: 14px;*/
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
   /* cursor: pointer;*/
   font-family: 'Prompt', sans-serif;
}
.button1 {
    margin-top: 7px;
    width: 10%;
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
}
.button1:hover {
    background-color: #4CAF50;
    color: white;
}
.button2 {
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #008CBA;
}
.button2:hover {
    background-color: #008CBA;
    color: white;
}
.button3 {
    margin-bottom: 7px;
    background-color: white;
    color: black;
    border: 2px solid #f44336;
}
.button3:hover {
    background-color: #f44336;
    color: white;
}
.button4 {
    margin-bottom: 7px;
    background-color: white;
    color: black;
    border: 2px solid #B8860B;
}
.button4:hover {background-color: #B8860B;
}
.button5 {
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #7FFF00;
}
.button5:hover {
    background-color: #7FFF00;
    color: white;
}
.button6 {
    margin-bottom: 7px;
    background-color: white;
    color: black;
    border: 2px solid #FF00FF;
}
.button7 {
    margin-top: 7px;
    width: 10%;
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
}
.button7:hover {
    background-color: #4CAF50;
    color: white;
}
.button6:hover {background-color: #FFB6C1;
}
.button8 {
    margin-top: 7px;
    width: 12%;
    background-color: white;
    color: black;
    border: 2px solid #f44336;
}
.button8:hover {
    background-color: #f42136;
    color: white;
}
p {
    border-left: 20px solid #DC143C;
    border-radius: 12px;
    border: 2px solid #F0E68C;
    background-color: #F5DEB3;
}
input[type=text], select {
    width: 19%;
    padding: 1% 1%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
input[type=number], select {
    width: 10%;
    padding: 1% 1%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
div {
  font-family: 'Prompt', sans-serif;
}
hk {
   font-size: 30px;
    background-color: #F0E68C;
}
</style>
