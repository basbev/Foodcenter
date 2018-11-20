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
            <td>เพิ่ม</td>
            <td>ลบ</td>
            <td>ยกเลิก</td>
          </tr>
        </thead>
            <tbody>
              <tr :key="key" v-for="(p, key) in products">
                <td>{{ p.name }}</td>
                <td>{{ p.price }} บ.</td>
                <td>{{ p.quantity }} จาน</td>
                <td><div @click="inclese(key)"><a class="delete"></a></div></td>
                <td><div @click="declese(key)"><a class="delete"></a></div></td>
                <td><div @click="remove(key)"><a class="delete"></a></div></td>
                </tr>
                <tr>
                  <td><b>ราคารวม:</b></td>
                  <td> {{CountQuantity}} จาน</td>
                  <td><b>{{ total }} บ.</b></td>
              </tr>
            </tbody>
    </table>
    <p>ผู้สั่ง : {{this.users}}</p>
    <p>ร้านค้า : {{this.SelectShops}}</p>
    <hr>
    <div :key="key" v-for="(shop, key) in shops"> จำนวนคิว ณ ขณะนี้ {{shop.q}}
    <p><button v-show="products.length" class='button is-primary' @click='checkout'>เช็คราคา</button></p><br>
    <p><router-link to="/shop"><button v-show="products.length" class='button is-primary'>กลับไปเลือกเมนู</button></router-link></p><br>
    <p><button v-show="products.length" class='button is-primary' @click="order(products, shop.q, key)">ยืนยัน</button></p>
  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'
var database = firebase.database()
var foodcenterRef = database.ref('/foodcenter')
export default {
  data () {
    return {
      date: Date.now(),
      shops: {},
      updateQ: '',
      updateCount: '',
      search: ''
    }
  },
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
    },
    CountQuantity () {
      return this.products.reduce((CountQuantity, c) => {
        return CountQuantity + c.quantity
      }, 0)
    }
  },
  methods: {
    checkout () {
      alert('ราคาทั้งหมด ' + this.total + ' บาท' + ' จานทั้งหมด ' + this.CountQuantity + ' จาน')
    },
    order (products, q, key, CountQuantity, total) {
      alert('สั่งOrderนี้เรียบร้อยแล้ว')
      for (var i = 0; i < products.length; i++) {
        let data = {
          name: products[i].name,
          price: products[i].price,
          quantity: products[i].quantity,
          customer: this.users,
          CountQuantity: this.CountQuantity,
          total: this.total,
          index: products.length - 1
        }
        let record = {
          amount: products[i].quantity
        }
        foodcenterRef.child('order').child(this.SelectShops).child(this.date).child(this.users).push(data)
        const dbRefObject2 = foodcenterRef.child('record').child(this.SelectShops).child(products[i].name)
        dbRefObject2.on('value', snap => {
          this.search = snap.val()
          console.log(this.search)
        })
        if (this.search === null) {
          foodcenterRef.child('record').child(this.SelectShops).child(products[i].name).set(record)
        } else {
          console.log(this.search)
          this.updateCount = this.search.amount + products[i].quantity
          foodcenterRef.child('record').child(this.SelectShops).child(products[i].name).child('amount').set(this.updateCount)
        }
      }
      this.updateQ = q
      foodcenterRef.child('detail').child(this.SelectShops).child(key).update({
        q: this.updateQ + 1
      })
      this.$store.dispatch('CartCle')
      this.$router.push('/foodcenter')
    },
    ...mapActions({
      inclese: 'incleseAmount',
      declese: 'decleseAmount',
      remove: 'Cartremove'
    })
  },
  mounted () {
    const dbRefObject = foodcenterRef.child('detail').child(this.SelectShops)
    dbRefObject.on('value', snap => {
      this.shops = snap.val()
      console.log(this.shops)
    })
  }
}
</script>
