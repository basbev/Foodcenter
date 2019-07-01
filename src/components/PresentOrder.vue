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
              <button class="button button4">ปุ่มแจ้งเตือน</button>
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
              @click="updatemenunow(findkey.order.customer, findkey.order, findkey.key, key)"
              class="button button7 card-footer-item"
            >กำลังทำ</button>
            <button
              v-if="findkey.status === 'กำลังทำ' & permission == '2'"
              @click="complete(findkey.key, shops.q)"
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
var database = firebase.database()
var foodcenterRef = database.ref('/foodcenter')
export default {
  props: ['orderKey'],
  data () {
    return {
      findkey: [],
      nodata: true
    }
  },
  computed: {
    ...mapGetters({
      selectShop: 'selectShop',
      permission: 'permission'
    })
  },
  watch: {
    orderKey: function (val) {
      if (val !== '') {
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
    }
  }
}
</script>
