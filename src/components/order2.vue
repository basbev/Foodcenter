<template>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-2">
      <div class="card">
      <aside class="menu">
        <h1 class="menu-label title is-5">
          รายการทั้งหมด
        </h1>
        <ul class="menu-list overflow-y" style="max-height:1000px;height:50rem;">
          <li :class="[{active:key === present_order},{activen:key === next_order},{activenew:order.key === newkey}]" :key='key' v-for='(order, key) in orders'><a @click="viewOrder(order.key,key)">
        <span class="panel-icon">
          <i class="far fa-file-alt"></i>
        </span>
        Orderที่ {{order.order}}</a></li>
        </ul>
      </aside>
    </div>
    </div>
    <div class="column is-10">
      <div class="columns">
        <div class="column is-5">
          <h1 class="title is-4 mt-3">กำลังทำ</h1>
          <present-order :orderKey="present_key"></present-order>
        </div>
        <div class="column is-5">
           <h1 class="title is-4 mt-3">รายการถัดไป</h1>
          <next-order :orderKey="next_key"></next-order>
        </div>
      </div>
        <div class="columns groupPanal is-10">
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
    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as firebase from 'firebase'
import PresentOrder from './PresentOrder'
import NextOrder from './NextOrder'
var database = firebase.database()
var foodcenterRef = database.ref('/foodcenter')
export default {
  name: 'order',
  components: { PresentOrder, NextOrder },
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
      findindex: '',
      present_order: '',
      next_order: '',
      present_key: '',
      next_key: '',
      newkey: ''
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
      // console.log(key)
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
      // console.log(this.groupmenu)
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
        this.newkey = this.orders[i].key
      }
    },
    viewOrder (key, index) {
      this.present_order = index
      this.present_key = this.orders[index].key
      var nkey = index + 1
      // console.log(nkey)
      // console.log(this.orders.length)
      if (nkey < this.orders.length) {
        this.next_order = index + 1
        this.next_key = this.orders[this.next_order].key
      } else {
        this.next_order = ''
        this.next_key = ''
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
      // console.log(this.orders)
      this.findstatus()
    })
    const dbRefObject1 = foodcenterRef.child('detail').child(this.selectShop)
    dbRefObject1.on('value', snap => {
      this.shops = snap.val()
      // console.log(this.shops)
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
.active{
  background:rgb(232, 235, 80);
}
.activen{
  background:rgb(250, 211, 104);
}
.activenew{
  background:rgb(255, 159, 95);
}
</style>
