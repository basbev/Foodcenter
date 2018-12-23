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
    <p>ผู้สั่ง : {{this.users}}</p>
    <p>ร้านค้า : {{this.SelectShops}}</p>
    <hr>
     จำนวนคิว ณ ขณะนี้ {{shops.q}} :: {{shops.SaveDate}}
    <p><button v-show="products.length" class='button is-primary' @click='checkout'>เช็คราคา</button></p><br>
    <p><router-link to="/shop"><button v-show="products.length" class='button is-primary'>กลับไปเลือกเมนู</button></router-link></p><br>
    <p><button v-show="products.length" class='button is-primary' @click="order(products, shops.q, CountQuantity, total, shops.countdoing, shops.SaveDate)">ยืนยัน</button></p>
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
      reports: {}
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
    async order (products, q, CountQuantity, total, countdoing, gettime) {
      alert('สั่งOrderนี้เรียบร้อยแล้ว')
      await this.report()
      await this.reportmonth()
      await this.reportyear()
      for (var i = 0; i < products.length; i++) {
        let date = moment().tz('Asia/Bangkok').format()
        let time = moment().tz('Asia/Bangkok').format().slice(0, 10)
        let Addminute = ''
        if (q === 0) {
          this.minutes = this.minutes + 3
          Addminute = moment().tz('Asia/Bangkok').add('minute', this.minutes).format().slice(11, 16)
        } else {
          this.minutes = this.minutes + 3
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
        await foodcenterRef.child('order').child(this.SelectShops).child(this.date).child('menu').push(data)
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
      await foodcenterRef.child('order').child(this.SelectShops).child(this.date).child('order').set(countdoing)
      await foodcenterRef.child('order').child(this.SelectShops).child(this.date).child('status').set('กำลังรอ')
      this.updateQ = q
      this.updateDoingcount = countdoing
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
  }
}
</script>
<style>
.report {
  text-align: center;
}
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
