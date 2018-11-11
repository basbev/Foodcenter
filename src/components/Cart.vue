<template>
  <div class="cart">
    <h1 class="title">Order ของคุณ</h1>
      <p v-show="!products.length">
        <i>คุณยังไม่ได้เลือกเมนู!</i>
        <router-link to="/shop">กลับไปหน้าเมนู</router-link>
      </p>
       <table class="table is-striped" v-show="products.length">
        <thead>
          <tr>
            <td>ชื่อเมนู</td>
            <td>ราคา</td>
            <td>จำนวน</td>
          </tr>
        </thead>
            <tbody>
              <tr :key="key" v-for="(p, key) in products">
                <td>{{ p.name }}</td>
                <td>{{ p.price }} บ.</td>
                <td>{{ p.quantity }} จาน</td>
                </tr>
                <tr>
                  <td><b>ราคารวม:</b></td>
                  <td></td>
                  <td><b>{{ total }} บ.</b></td>
              </tr>
            </tbody>
    </table>
    <p>ผู้สั่ง : {{this.users}}</p>
    <p>ร้านค้า : {{this.SelectShops.name}}</p>
    <hr>
    <p><button v-show="products.length" class='button is-primary' @click='checkout'>เช็คราคา</button></p><br>
    <p><button v-show="products.length" class='button is-primary' @click="order(products)">ยืนยัน</button></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
var database = firebase.database()
var foodcenterRef = database.ref('/foodcenter')
export default {
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      users: 'user',
      SelectShops: 'selectShop'
    }),
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
    checkout () {
      alert('ราคาทั้งหมด ' + this.total + ' บาท')
    },
    order (products) {
      for (var i = 0; i < products.length; i++) {
        let data = {
          name: products[i].name,
          price: products[i].price,
          quantity: products[i].quantity,
          customer: this.users
        }
        foodcenterRef.child('order').child(this.SelectShops.name).child(this.users).push(data)
      }
    }
  }
}
</script>
