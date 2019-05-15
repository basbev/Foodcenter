<template>
  <section class='section'>
    <div class='container'>
      <div class='columns is-multiline'>
        <div class='column is-4' :key='key' v-for='(order, key) in orders'>
        <div class='card'>
          <header class='card-header'>
            <p class="card-header-title">
              คิวที่: {{order.order + 1}}
              <br>
              ผู้ใช้: {{order.customer}}
              <br>
              สถานะ: {{order.status}}
              <br>
            </p>
          </header>
          <div :key="keyy" v-for="(detail, keyy) in order.menu">
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
            <div v-if="keyy === detail.index">
              <div class="card-content">
                <div class="content">
                  รวมทั้งหมด {{detail.CountQuantity}} จาน : ราคาทั้งหมด: {{detail.total}}
                  <br>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <button
              v-if="order.status === 'กำลังรอ' & permission == '2'"
              @click="updatemenunow(order.customer, order.order, order.key, key)"
              class="button button7 card-footer-item"
            >กำลังทำ</button>
            <button
              v-if="order.status === 'กำลังทำ' & permission == '2'"
              @click="complete(order.key, shops.q)"
              class="button button7 card-footer-item"
            >ทำเสร็จเเล้ว</button>
            <button
              v-if="permission == '2'"
              class="button button8 card-footer-item"
              @click="OrderComp(order.key, shops.q, shops.countdoing, order.order)"
            >จ่ายเเล้ว</button>
          </footer>
        </div>
      </div>
      </div>
      <br>
      <div class="columns groupPanal">
        <div class="column">
          <button
            v-if="groupmenu == '' & permission == '2'"
            class="button button8"
            @click="group()"
          >กรุ๊ปรวมเมนูอาหาร</button>
          <button
            v-if="groupmenu != '' & permission == '2'"
            class="button button8"
          >กรุ๊ปรวมเมนูอาหารเเล้ว</button>
          <button
            v-if="groupmenu != '' & permission == '2'"
            class="button button8"
            @click="completedgroup()"
          >ทำเสร็จเเล้ว</button>
        </div>
        <div class="column is-8">
          <div v-for="(menu, key) in groupmenu" :key="key">
            <strong>{{menu.foodname}} : {{menu.quantity}}</strong>
          </div>
          <!-- <div v-for="(groups, key) in grouporder" :key="key">
          </div>-->
          <div v-if="groupmenu != ''">จากคิวที่ : {{grouporder}}</div>
        </div>

      </div>
    </div>
  </section>
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
      updatecount: '',
      groupmenu: [],
      getmenuall: [],
      grouporder: [],
      keygrouporder: [],
      findindex: ''
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
        .child(key)
        .remove()
      console.log(key)
    },
    updatemenunow (name, order, key) {
      // console.log(key)
      // if (this.findindex === key) {
      foodcenterRef
        .child('detail')
        .child(this.selectShop)
        .update({
          doing: name
        })
      foodcenterRef
        .child('order')
        .child(this.selectShop)
        .child(key)
        .update({
          status: 'กำลังทำ'
        })
      // } else { alert('ไม่สามารถทำข้ามคิวได้') }
    },
    complete (key, q) {
      foodcenterRef
        .child('order')
        .child(this.selectShop)
        .child(key)
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
    },
    group () {
      // this.getmenu()
      alert(`ทำการกรุ๊ปเมนู`)
      for (var i = 0; i < this.orders.length; i++) {
        if (this.orders[i].status === 'กำลังรอ') {
          this.grouporder.push(this.orders[i].order)
          this.keygrouporder.push(this.orders[i].key)
          // alert(`กรุ๊ปเมนู one: ` + i)
          for (var y = 0; y < this.orders[i].menu.length; y++) {
            // alert(`กรุ๊ปเมนู two: ` + y)
            const record = this.groupmenu.find(
              p => p.foodname === this.orders[i].menu[y].name
            )
            if (!record) {
              this.groupmenu.push({
                foodname: this.orders[i].menu[y].name,
                quantity: this.orders[i].menu[y].quantity
              })
            } else {
              record.quantity += this.orders[i].menu[y].quantity
            }
          }
        } else {}
      }
      if (this.groupmenu.length === 0) {
        alert(`ไม่มีเมนูที่สามารถกรุ๊ปได้`)
      }
      console.log(this.groupmenu)
    },
    getmenu () {
      const menuRef = foodcenterRef.child('order').child(this.selectShop)
      menuRef.once('value', snap => {
        var data = []
        // var data1 = []
        snap.forEach(ss => {
          // var item = ss.val().menu
          // data1 = ss.val().menu
          // data.push(data1)
          // this.getmenuall = data
          // console.log(data)
        })
        this.getmenuall = data
        // console.log(data)
      })
    },
    completedgroup () {
      for (var i = 0; i < this.keygrouporder.length; i++) {
        // alert(`Key in as` + this.keygrouporder[i])
        this.complete(this.keygrouporder[i], this.shops.q)
      }
      this.keygrouporder = []
      this.groupmenu = []
      this.grouporder = []
    },
    findstatus () {
      let found = false
      for (var i = 0; i < this.orders.length; i++) {
        if (this.orders[i].status === 'กำลังรอ' && found === false) {
          this.findindex = i
          found = true
        }
      }
    }
  },
  mounted () {
    const dbRefObject = foodcenterRef.child('order').child(this.selectShop)
    dbRefObject.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.orders = data
      console.log(this.orders)
      this.findstatus()
    })
    const dbRefObject1 = foodcenterRef.child('detail').child(this.selectShop)
    dbRefObject1.on('value', snap => {
      this.shops = snap.val()
      console.log(this.shops)
    })
  },
  computed: {
    ...mapGetters({
      selectShop: 'selectShop',
      permission: 'permission'
    })
  }
  // Date/Time: {{Date(key)}}
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.card {
  border-radius: 10px;
  border: none;
  margin: 10px;
}
.groupPanal {
  background: white;
  border-radius: 10px;
  padding: 30px
}
</style>
