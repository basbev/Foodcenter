<template>
  <div>
    <div class="card" v-if="nodata">
      <h1>ไม่พบรายการ</h1>
    </div>
    <div class='card' v-else>
          <header class='card-header'>
            <p class="card-header-title">
              คิวที่: {{findkey.order}}
              <br>
              ผู้ใช้: {{findkey.customer}}
              <br>
              สถานะ: {{findkey.status}}
              <br>
            </p>
            <p>
              <button class="button button4" @click="noti(findkey.customer, findkey)">ปุ่มแจ้งเตือน</button>
            </p>
          </header>
          <div :key="keyy" v-for="(detail, keyy) in findkey.menu">
            <div class="card-content">
              <div class="content">
                <strong>เมนูอาหาร: {{detail.name}}</strong>
                <br>
                <strong>จำนวน: {{detail.quantity}} จาน</strong>
                <br>
                ราคา: {{detail.price}} บาท
                <br>
                เวลาคำนวณ : {{detail.minute}} นาที
                <br>
                <!--วันที่ : {{detail.date}}-->
              </div>
            </div>
            <div>
              <div v-if="keyy === detail.index">
              <div class="card-content">
                <div class="content">
                  รวมทั้งหมด {{detail.CountQuantity}} จาน : ราคาทั้งหมด: {{detail.total}}
                  <br>
                </div>
              </div>
            </div>
            </div>
          </div>
          <footer class="card-footer">
             <button
              v-if="findkey.status === 'กำลังรอ' & permission == '2'"
              @click="updatemenunow(findkey.customer, findkey.order, findkey.key)"
              class="button button7 card-footer-item"
            >กำลังทำ</button>
            <button
              v-if="findkey.status === 'กำลังทำ' & permission == '2'"
              @click="complete(findkey.key, shops.q, findkey.customer, findkey)"
              class="button button7 card-footer-item"
            >ทำเสร็จเเล้ว</button>
            <button
              v-if="permission == '2'"
              class="button button8 card-footer-item"
              @click="OrderComp(findkey.key, shops.q, shops.countdoing, findkey.order)"
            >จ่ายเเล้ว</button>
          </footer>
        </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as firebase from 'firebase'
import axios from 'axios'
var database = firebase.database()
var foodcenterRef = database.ref('/foodcenter')
export default {
  props: ['orderKey'],
  data () {
    return {
      findkey: [],
      nodata: true,
      keyorder: '',
      shops: '',
      orders: [],
      findindex: ''
    }
  },
  computed: {
    ...mapGetters({
      selectShop: 'selectShop',
      permission: 'permission'
    })
  },
  mounted () {
    const dbRefObject1 = foodcenterRef.child('detail').child(this.selectShop)
    dbRefObject1.on('value', snap => {
      this.shops = snap.val()
    })
    const dbRefObject = foodcenterRef.child('order').child(this.selectShop)
    dbRefObject.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.orders = data
      // console.log(this.orders)
      this.findstatus()
    })
  },
  watch: {
    orderKey: function (val) {
      if (val !== '') {
        this.keyorder = val
        console.log(val)
        const dbRefObject = foodcenterRef.child('order').child(this.selectShop).child(val)
        dbRefObject.on('value', snap => {
          console.log(snap.val())
          this.findkey = snap.val()
        })
        this.nodata = false
      } else {
        this.nodata = true
      }
    }
  },
  methods: {
    OrderComp (key, q, c, order) {
      this.updateQ = q
      this.updatecount = c
      // foodcenterRef
      //   .child('detail')
      //   .child(this.selectShop)
      //   .update({
      //     q: this.updateQ - 1
      //     // countdoing: this.updatecount + 1,
      //     // count: order
      //   })
      foodcenterRef
        .child('order')
        .child(this.selectShop)
        .child(this.keyorder)
        .remove()
      console.log(this.keyorder)
      this.nodata = true
    },
    updatemenunow (name, order, key) {
      // console.log(key)
      if (this.findindex === this.keyorder) {
        foodcenterRef
          .child('detail')
          .child(this.selectShop)
          .update({
            doing: name
          })
        foodcenterRef
          .child('order')
          .child(this.selectShop)
          .child(this.keyorder)
          .update({
            status: 'กำลังทำ'
          })
      } else {
        this.$swal({
          type: 'error',
          title: 'ลัดคิว',
          text: 'กรุณาทำทีละรายการ!!!'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      }
    },
    complete (key, q, username, orderNoti) {
      foodcenterRef
        .child('order')
        .child(this.selectShop)
        .child(this.keyorder)
        .update({
          status: 'ทำเสร็จเเล้ว'
        })
      foodcenterRef
        .child('detail')
        .child(this.selectShop)
        .update({
          doing: 'ว่าง'
        })
      foodcenterRef
        .child('detail')
        .child(this.selectShop)
        .update({
          q: q - 1
          // countdoing: this.updatecount + 1,
          // count: order
        })
      this.noti(username, orderNoti)
    },
    async noti (username, orderNoti) {
      this.interfacealert(username)
      const userFacebookList = firebase.database().ref('facebook').orderByChild('username').equalTo(username)
      const userlist = firebase.database().ref('user').orderByChild('username').equalTo(username)
      let token = null
      userFacebookList.once('value', snap => { // find user
        let user = snap.val()
        if (user) {
          // alert('facebook')
          user = user[Object.keys(user)[0]]
          token = user.token
          if (token) {
            Object.keys(token).forEach(noti => {
              this.sentNoti(noti, orderNoti)
            })
            // saveAlerted(pathNoti)
          }
        }
      })
      if (!token) {
        userlist.once('value', snap => {
          let user = snap.val()
          if (user) {
            // alert('web')
            user = user[Object.keys(user)[0]]
            token = user.token
            if (token) {
              Object.keys(token).forEach(noti => {
                // alert(noti)
                this.sentNoti(noti, orderNoti)
              })
              // saveAlerted(pathNoti)
            }
          }
        })
      }
    },
    async sentNoti (noti, order) {
      await axios.get('https://foodcenternoti.herokuapp.com/', {
        params: {
          noti: noti,
          order: order,
          type: 'noti'
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
    interfacealert (username) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
      Toast.fire({
        type: 'success',
        title: 'เเจ้งเตือนผู้ใช้ ' + username + ' เรียบร้อยเเล้ว'
      })
    },
    findstatus () {
      let found = false
      for (var i = 0; i < this.orders.length; i++) {
        if (this.orders[i].status === 'กำลังรอ' && found === false) {
          this.findindex = this.orders[i].key
          found = true
        }
      }
    }
  }
}
</script>
