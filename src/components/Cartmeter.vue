<template>
  <div class="cart">
    <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
    <div class="columns is-mobile is-centered">
    <div class="column is-12-mobile is-three-fifths-tablet">
    <div class="box card">
      <h1 class="title"> &nbsp;Order ของคุณ</h1>
      <p v-show="!products.length">
        &nbsp;<i>คุณยังไม่ได้เลือกเมนู!</i>
        &nbsp;<router-link to="/meter">กลับไปหน้าเมนู</router-link>
      </p>
       <table class="table is-striped" v-show="products.length">
        <thead>&nbsp;
          <tr>
            <td>ชื่อเมนู</td>
            <td>ราคา</td>
            <td>จำนวน</td>
            <td>ประเภท</td>
            <td>เพิ่ม</td>
            <td>ลบ</td>
            <td>ยกเลิก</td>
          </tr>
        </thead>
            <tbody>
              <tr :key="key" v-for="(p, key) in products">
                <td>{{ p.name }}</td>
                <td>{{ p.price * p.quantity }} บ.</td>
                <td>{{ p.quantity * p.meters[0].qty }} {{ p.unit }}</td>
                <td><center>{{ p.type }}</center></td>
                <td><center><div @click="inclese(key)"><i class="fas fa-plus"></i></div></center></td>
                <td><center><div @click="declese(key)"><i class="fas fa-minus"></i></div></center></td>
                <td><center><div @click="beforeremove(key)"><i class="fas fa-times"></i></div></center></td>
                </tr>
                <tr>
                  <td><b>ราคารวม:</b></td>
                  <!-- <td> {{CountQuantity}} อย่าง</td> -->
                  <td> {{products.length}} อย่าง</td>
                  <td><b>{{ total }} บ.</b></td>
              </tr>
            </tbody>
    </table>
    &nbsp;ผู้สั่ง : {{this.users}} <br>
    &nbsp;ร้านค้า : {{this.shops.name}}
    <hr>
    <!-- &nbsp;จำนวนคิว ณ ขณะนี้ {{shops.q}} คิว  <br> -->
    <!-- &nbsp;เวลารายการอาหารล่าสุด&nbsp;{{shops.SaveDate.slice(11,16)}}<br> -->
    <router-link to="/meter"><button v-show="products.length" class='button button13'>กลับไปเลือกเมนู</button></router-link>
    <button v-show="products.length" class='button button14' @click="order(products, shops.q, CountQuantity, total, shops.SaveDate)">ยืนยันการสั่ง</button>
  </div>
  </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'
import axios from 'axios'
var database = firebase.database()
var foodcenterRef = database.ref('/meters')
var moment = require('moment-timezone')
export default {
  data () {
    return {
      date: Date.now(),
      shops: {},
      updateQ: '',
      updateCount: '',
      search: '',
      updateDoingcount: '',
      minutes: 0,
      reports: {},
      recordshop: {},
      viewstock: {},
      detail: '',
      email: '',
      once: {},
      meter: {},
      recordRef: {}
    }
  },
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      users: 'user',
      SelectShops: 'selectShop',
      hasshop: 'hasShop'
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
    async order (products, q, CountQuantity, total, gettime) {
      alert('สั่งOrderนี้เรียบร้อยแล้ว')
      await this.report()
      await this.reportmonth()
      await this.reportyear()
      //
      await this.reportmeter()
      await this.reportmetermonth()
      await this.reportmeteryear()
      await this.recordmeter(products)
      //
      await this.Cutstock(products)
      await this.sendmail(products)
      for (var i = 0; i < products.length; i++) {
        let date = moment().tz('Asia/Bangkok').format()
        let time = moment().tz('Asia/Bangkok').format().slice(0, 10)
        let Addminute = ''
        if (q === 0) {
          // this.minutes = this.minutes + 3
          if (products[i].type === 'ผัด') { this.minutes = this.minutes + 4 }
          if (products[i].type === 'ทอด') { this.minutes = this.minutes + 4 }
          if (products[i].type === 'ต้ม') { this.minutes = this.minutes + 6 }
          if (products[i].type === 'เเกง') { this.minutes = this.minutes + 6 }
          if (products[i].type === 'นึ่ง') { this.minutes = this.minutes + 5 }
          if (products[i].type === 'ย่าง') { this.minutes = this.minutes + 5 }
          Addminute = moment().tz('Asia/Bangkok').add('minute', this.minutes).format().slice(11, 16)
        } else {
          // this.minutes = this.minutes + 3
          if (products[i].type === 'ผัด') { this.minutes = this.minutes + 4 }
          if (products[i].type === 'ทอด') { this.minutes = this.minutes + 4 }
          if (products[i].type === 'ต้ม') { this.minutes = this.minutes + 6 }
          if (products[i].type === 'เเกง') { this.minutes = this.minutes + 6 }
          if (products[i].type === 'นึ่ง') { this.minutes = this.minutes + 5 }
          if (products[i].type === 'ย่าง') { this.minutes = this.minutes + 5 }
          Addminute = moment(gettime).tz('Asia/Bangkok').add('minute', this.minutes).format().slice(11, 16)
        }
        let data = {
          name: products[i].name,
          price: products[i].price,
          quantity: products[i].quantity,
          customer: this.users,
          CountQuantity: this.CountQuantity,
          total: this.total,
          index: products.length - 1,
          date: date,
          time: time,
          minute: Addminute
        }
        let record = {
          amount: products[i].quantity
        }
        await foodcenterRef.child('order').child(this.SelectShops).child(this.date).child('menu').child(i).set(data)
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
      await foodcenterRef.child('order').child(this.SelectShops).child(this.date).child('customer').set(this.users)
      await foodcenterRef.child('order').child(this.SelectShops).child(this.date).child('order').set(this.shops.countdoing)
      await foodcenterRef.child('order').child(this.SelectShops).child(this.date).child('status').set('กำลังรอ')
      this.updateQ = q
      this.updateDoingcount = this.shops.countdoing
      let SaveDate = ''
      if (q === 0) {
        SaveDate = moment().tz('Asia/Bangkok').add('minute', this.minutes).format()
      } else {
        SaveDate = moment(gettime).tz('Asia/Bangkok').add('minute', this.minutes).format()
      }
      foodcenterRef.child('detail').child(this.SelectShops).update({
        q: this.updateQ + 1,
        countdoing: this.updateDoingcount + 1,
        SaveDate: SaveDate
      })
      this.$store.dispatch('CartCle')
      this.$router.push('/foodcenter')
    },
    report () {
      let foundday = ''
      let day = moment().tz('Asia/Bangkok').format().slice(0, 10)
      const reportday = foodcenterRef.child('report').child(this.SelectShops).child('day').orderByChild('label').equalTo(day)
      reportday.on('child_added', snap => {
        foundday = snap.val()
      })
      if (foundday === '') {
        let data = {
          label: day,
          value: this.total
        }
        foodcenterRef.child('report').child(this.SelectShops).child('day').child(day).set(data)
        foodcenterRef.child('detail').child(this.SelectShops).child('countdoing').set(1)
      } else {
        let updatavalue = foundday.value + this.total
        foodcenterRef.child('report').child(this.SelectShops).child('day').child(day).child('value').set(updatavalue)
      }
    },
    reportmonth () {
      let foundmonth = ''
      let month = moment().tz('Asia/Bangkok').format().slice(0, 7)
      const reportmonth = foodcenterRef.child('report').child(this.SelectShops).child('month').orderByChild('label').equalTo(month)
      reportmonth.on('child_added', snap => {
        foundmonth = snap.val()
      })
      if (foundmonth === '') {
        let data = {
          label: month,
          value: this.total
        }
        foodcenterRef.child('report').child(this.SelectShops).child('month').child(month).set(data)
      } else {
        let updatavalue = foundmonth.value + this.total
        foodcenterRef.child('report').child(this.SelectShops).child('month').child(month).child('value').set(updatavalue)
      }
    },
    reportyear () {
      let foundyear = ''
      let year = moment().tz('Asia/Bangkok').format().slice(0, 4)
      const reportyear = foodcenterRef.child('report').child(this.SelectShops).child('year').orderByChild('label').equalTo(year)
      reportyear.on('child_added', snap => {
        foundyear = snap.val()
      })
      if (foundyear === '') {
        let data = {
          label: year,
          value: this.total
        }
        foodcenterRef.child('report').child(this.SelectShops).child('year').child(year).set(data)
      } else {
        let updatavalue = foundyear.value + this.total
        foodcenterRef.child('report').child(this.SelectShops).child('year').child(year).child('value').set(updatavalue)
      }
    },
    Cutstock (products) {
      console.log(products)
      let stock = null
      for (var i = 0; i < products.length; i++) {
        for (var y = 0; y < products[i].meters.length; y++) {
          const checkstock = foodcenterRef.child('stock').child(this.SelectShops).child(products[i].meters[y].keystock)
          checkstock.on('value', snap => {
            stock = snap.val() // ดึงข้อมูลอาหาร
            console.log(stock)
          })
          stock.stockamount = stock.stockamount - products[i].meters[y].qty * products[i].quantity
          foodcenterRef.child('stock').child(this.SelectShops).child(products[i].meters[y].keystock).child('stockamount').set(stock.stockamount)
        }
      }
    },
    async sendmail (products) {
      await this.deliver(products)
      await this.before()
      await this.sortcode(products)
      await axios.get('https://foodcenternoti.herokuapp.com/', {
        params: {
          id: `<p>มีรายละเอียดดังนี้</p>
                  <ul>  
                  ` + this.detail + `
                  </ul> 
                  <p>ราคารวม : ` + this.total + ` บาท<p>
                  <p>ผู้ทำการสั่งซื้อวัตถุดิบ : ` + this.users + `<p>`,
          name: this.SelectShops,
          email: this.email,
          subject: 'การสั่งซื้อวัตถุดิบ',
          type: 'email'
        }
      })
        .then(response => {
          // JSON responses are automatically parsed.
          this.posts = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    sortcode (products) {
      for (var i = 0; i < products.length; i++) {
        this.detail = this.detail + '<li >ชื่อวัตถุดิบ: ' + products[i].name + 'จำนวน: ' + products[i].quantity + ' ' + products[i].unit + '  ราคา: ' + products[i].quantity * products[i].price + '  บาท' + '<br></li>'
      }
    },
    before () {
      database.ref('/user').orderByChild('hasShop').equalTo(this.SelectShops).once('child_added', snap => {
        this.email = snap.val().email
      })
    },
    deliver (products) {
      for (var i = 0; i < products.length; i++) {
        let data = {
          foodname: products[i].name,
          foodamount: products[i].quantity * products[i].meters[0].qty
        }
        database.ref('/foodcenter/deliver').child(this.hasshop).push(data)
      }
    },
    reportmeter () {
      let foundday = ''
      let day = moment().tz('Asia/Bangkok').format().slice(0, 10)
      const reportday = firebase.database().ref().child('foodcenter/reportmeter').child(this.hasshop).child('day').orderByChild('label').equalTo(day)
      reportday.on('child_added', snap => {
        foundday = snap.val()
      })
      if (foundday === '') {
        let data = {
          label: day,
          value: this.total
        }
        firebase.database().ref().child('foodcenter/reportmeter').child(this.hasshop).child('day').child(day).set(data)
      } else {
        let updatavalue = foundday.value + this.total
        firebase.database().ref().child('foodcenter/reportmeter').child(this.hasshop).child('day').child(day).child('value').set(updatavalue)
      }
    },
    reportmetermonth () {
      let foundmonth = ''
      let month = moment().tz('Asia/Bangkok').format().slice(0, 7)
      const reportmonth = firebase.database().ref().child('foodcenter/reportmeter').child(this.hasshop).child('month').orderByChild('label').equalTo(month)
      reportmonth.on('child_added', snap => {
        foundmonth = snap.val()
      })
      if (foundmonth === '') {
        let data = {
          label: month,
          value: this.total
        }
        firebase.database().ref().child('foodcenter/reportmeter').child(this.hasshop).child('month').child(month).set(data)
      } else {
        let updatavalue = foundmonth.value + this.total
        firebase.database().ref().child('foodcenter/reportmeter').child(this.hasshop).child('month').child(month).child('value').set(updatavalue)
      }
    },
    reportmeteryear () {
      let foundyear = ''
      let year = moment().tz('Asia/Bangkok').format().slice(0, 4)
      const reportyear = firebase.database().ref().child('foodcenter/reportmeter').child(this.hasshop).child('year').orderByChild('label').equalTo(year)
      reportyear.on('child_added', snap => {
        foundyear = snap.val()
      })
      if (foundyear === '') {
        let data = {
          label: year,
          value: this.total
        }
        firebase.database().ref().child('foodcenter/reportmeter').child(this.hasshop).child('year').child(year).set(data)
      } else {
        let updatavalue = foundyear.value + this.total
        firebase.database().ref().child('foodcenter/reportmeter').child(this.hasshop).child('year').child(year).child('value').set(updatavalue)
      }
    },
    recordmeter (products) {
      for (var i = 0; i < products.length; i++) {
        let found = ''
        const meter = firebase.database().ref().child('foodcenter/recordmeter').child(this.hasshop).orderByChild('name').equalTo(products[i].name)
        meter.on('child_added', snap => {
          found = snap.val()
        })
        if (found) {
          let updateprice = found.price + (products[i].price * products[i].quantity)
          let updateqty = found.quantity + (products[i].quantity * products[i].meters[0].qty)
          firebase.database().ref().child('foodcenter/recordmeter').child(this.hasshop).child(products[i].name).child('price').set(updateprice)
          firebase.database().ref().child('foodcenter/recordmeter').child(this.hasshop).child(products[i].name).child('quantity').set(updateqty)
        } else {
          let data = {
            name: products[i].name,
            type: products[i].unit,
            quantity: products[i].quantity * products[i].meters[0].qty,
            price: products[i].price * products[i].quantity
          }
          firebase.database().ref().child('foodcenter/recordmeter').child(this.hasshop).child(products[i].name).set(data)
        }
      }
    },
    beforeremove (key) {
      this.$swal({
        title: 'คุณกำลังลบเมนูอาหารนี้?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.remove(key)
          this.$swal(
            'ลบเเล้ว!',
            'เมนูอาหารโดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
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
    const dbRefObject1 = foodcenterRef.child('report').child(this.SelectShops)
    dbRefObject1.on('value', snap => {
      this.reports = snap.val()
      console.log(this.reports)
    })
    const dbRefObject2 = foodcenterRef.child('record').child(this.SelectShops)
    dbRefObject2.on('value', snap => {
      this.recordshop = snap.val()
      console.log(this.recordshop)
    })
    const dbRefObject3 = foodcenterRef.child('stock').child(this.SelectShops)
    dbRefObject3.on('value', snap => {
      this.viewstock = snap.val()
    })
    const dbRefObject4 = database.ref('/user')
    dbRefObject4.on('value', snap => {
      this.once = snap.val()
    })
    const dbRefObject5 = firebase.database().ref().child('foodcenter/reportmeter').child(this.hasshop)
    dbRefObject5.on('value', snap => {
      this.meter = snap.val()
    })
    const dbRefObject6 = firebase.database().ref().child('foodcenter/recordmeter')
    dbRefObject6.on('value', snap => {
      this.recordRef = snap.val()
    })
    // ดึงข้อมูลมาซึ้งกัน
  }
}
</script>
<style>
/* .report {
  text-align: center;
} */
.cart {
  font-size: 19px;
  font-family: 'Prompt', sans-serif;
}
.file-label {
  font-size: 18px;
  display: unset;
}
.file-cta {
    font-size: 18px;
    padding: 1% 1%;
    margin: 8px 0;
    background-color: #209cee;
    border-color: transparent;
    color: #fff;
}
</style>
