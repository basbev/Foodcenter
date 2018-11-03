<template>
<div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <aside class="is-medium menu">
          <p class="menu-label">
            categories
          </p>
          <ul class="menu-list">
            <li class="is-right"><a href="#const" class="is-active"><i class=""></i> เมนูอาหารเเนะนำ</a></li>
            <li><a href="#let" class="is-active"><i class=""></i> เมนูอาหารทั่วไป</a></li>
          </ul>
            </aside>
          </div>
          <div class="column is-9">
            <div class="content is-medium">
          <h3 class="title is-3">ร้านอาหาร {{ this.selectShop.name }} </h3>
              <div class="box">
                <h4 id="const" class="title is-3">เมนูอาหารเเนะนำ</h4>
                <article class="message is-primary">
                  <span class="icon has-text-primary">
                  <i class="fab fa-hot"></i>
                  </span>
                  <div class="message-body">
                    ไม่มีเมนูเเนะนำ.
                  </div>
                </article>
            </div>
            <div class="box">
              <h4 id="let" class="title is-3">เมนูอาหารทั่วไป</h4>
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">
                  เมนูประจำร้าน
                </div>
              </article>
              <div class="message-body">
                                    <div class="row" :key="key" v-for="(menu, key) in menus">
                          <h1>name :{{menu.foodname}}</h1>
                      <h1>Tel :{{menu.foodprice}}</h1>
                      <button @click="AddCart" class="button is-danger">Add Cart</button>
                          </div>
                </div>
          </div>
      </div>
    </div>
  </div>
  <div>
      <input type="text" v-model="foodname" placeholder="ชื่อเมนูอาหาร">
      <input type="text" v-model="foodprice" placeholder="ราคาต่อจาน">
      <button @click="insertmenu(foodname, foodprice)">เพิ่มร้านอาหาร</button>
    </div>
</div>
</section>
    </div>
</template>
<script>
import * as firebase from 'firebase'
var database = firebase.database()
var foodcenterRef = database.ref('/foodcenter')
export default {
  name: 'shop',
  data () {
    return {
      foodname: '',
      foodprice: '',
      menu: '',
      menus: {}
    }
  },
  created () {
  },
  methods: {
    insertmenu (foodname, foodprice) {
      let data = {
        foodname: foodname,
        foodprice: foodprice
      }
      foodcenterRef.child('menu').child(this.selectShop.name).push(data)
      this.foodname = ''
      this.foodprice = ''
    }
  },
  computed: {
    selectShop () {
      return this.$store.getters.selectShop
    }
  },
  mounted () {
    const dbRefObject = foodcenterRef.child('menu').child(this.selectShop.name)
    dbRefObject.on('value', snap => {
      this.menus = snap.val()
      console.log(this.menus)
    })
  }
}
</script>
<style scoped>
</style>
