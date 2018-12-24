<template>
  <div class="cart">
    <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
     &nbsp;<h1 class="title"> &nbsp;Order ของคุณ</h1>
    <div class="box">
      <p v-show="!products.length">
        &nbsp;<i>คุณยังไม่ได้เลือกเมนู!</i>
        &nbsp;<router-link to="/shop">กลับไปหน้าเมนู</router-link>
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
                <td>{{ p.price }} บ.</td>
                <td>{{ p.quantity }} จาน</td>
                <td>{{ p.type }}</td>
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
    &nbsp;ผู้สั่ง : {{this.users}} <br>
    &nbsp;ร้านค้า : {{this.SelectShops}}
    <hr>
    &nbsp;จำนวนคิว ณ ขณะนี้ {{shops.q}} คิว  <br>
    &nbsp;เวลา&nbsp;{{shops.SaveDate}}<br>
    <router-link to="/shop"><button v-show="products.length" class='button button13'>กลับไปเลือกเมนู</button></router-link>
    <button v-show="products.length" class='button button14' @click="order(products, shops.q, CountQuantity, total, shops.SaveDate)">ยืนยันการสั่ง</button>
  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'
var database = firebase.database()
var foodcenterRef = database.ref('/foodcenter')
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
      recordshop: {}
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
    async order (products, q, CountQuantity, total, gettime) {
      alert('สั่งOrderนี้เรียบร้อยแล้ว')
      await this.report()
      await this.reportmonth()
      await this.reportyear()
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
  }
}
</script>
<style>
.report {
  text-align: center;
}
.button {
    background-color: rgb(37, 108, 175);
    border: none;
    color: white;
    text-align: center;
    font-size: 14px;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
   font-family: 'Prompt', sans-serif;
}
.button1 {
    margin-top: 7px;
    width: 20%;
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
}
.button1:hover {
    background-color: #4CAF50;
    color: white;
}
.button2 {
    font-size: 15px;
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
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #f44336;
}
.button3:hover {
    background-color: #f44336;
    color: white;
}
.button4 {
    font-size: 15px;
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #B8860B;
}
.button4:hover {background-color: #B8860B;
}
.button5 {
    font-size: 15px;
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
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #FF00FF;
}
.button6:hover {background-color: #FFB6C1;
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
.button9 {
    font-size: 20px;
    margin-right: 20px;
    background-color: white;
    color: black;
    border: 2px solid #B8860B;
}
.button9:hover {background-color: #B8860B;
}
p {
    border-left: 20px solid #DC143C;
    border-radius: 12px;
    border: 2px solid #F0E68C;
    background-color: #F5DEB3;
}
.button10 {
    font-size: 20px;
    margin-top: 7px;
    width: 10%;
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
}
.button10:hover {
    background-color: #4CAF50;
    color: white;
}
.button11 {
    font-size: 18px;
    margin-top: 8px;
    width: 12%;
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
}
.button11:hover {
    background-color: #4CAF50;
    color: white;
}
.button12 {
    font-size: 18px;
    margin-top: 8px;
    background-color: white;
    color: black;
    border: 2px solid #008CBA;
}
.button12:hover {
    background-color: #008CBA;
    color: white;
}
.button13 {
    font-size: 18px;
    margin-left: 8px;
    margin-top: 3px;
    background-color: white;
    color: black;
    border: 2px solid #008CBA;
}
.button13:hover {
    background-color: #008CBA;
    color: white;
}
.button14 {
    margin-top: 3px;
    font-size: 18px;
    margin-left: 8px;
    background-color: white;
    color: black;
    border: 2px solid #DC143C;
}
.button14:hover {
    background-color: #DC543C;
    color: white;
}
input[type=text], select {
    font-size: 17px;
    width: 19%;
    padding: 1% 1%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
input[type=number], select {
    width: 13%;
    font-size: 17px;
    padding: 1% 1%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
.cart {
  font-size: 19px;
  font-family: 'Prompt', sans-serif;
}
hk {
   font-size: 30px;
    background-color: #F0E68C;
}
.bucket {
  position: fixed;
  top: 65%;
  right: 72%;
  cursor: pointer;
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
