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
            <li><a href="#/foodcenter" class="is-active"><i class=""></i> หน้าร้านอาหาร</a></li>
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
                  <div class="row" :key="key" v-for="(menushow, key) in menushow">
                          <h1>Menu :{{menushow.foodname}}</h1>
                      <h1>Price :{{menushow.foodprice}} บาท</h1>
                      <img v-bind:src="menushow.foodpic" width="300" height="350"><br>
                      <button @click="Cart(menushow.foodname, menushow.foodprice, key)" class="button is-danger">เพิ่มลง Order</button>
                          </div>
                  </div>
                </article>
            </div>
            <div>
      <input type="text" v-model="foodname" placeholder="ชื่อเมนูอาหาร">
      <input type="number" v-model="foodprice" min="5" max="50" placeholder="ราคาต่อจาน">
      <input type="text" v-model="foodpic" placeholder="linkรูป">
      <button @click="insertmenushow(foodname, foodprice , foodpic)">เพิ่มเมนูแนะนำ</button>
        <div class="nav-item is-tab" :class="{ 'active-bottom-border': $route.path === '/cart' }">
          <div class="field is-grouped">
            <p class="control">
            </p>
          </div>
        </div>
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
                          <h1>Menu :{{menu.foodname}}</h1>
                      <h1>Price :{{menu.foodprice}} บาท</h1>
                      <button @click="Cart(menu.foodname, menu.foodprice, key)" class="button is-danger">เพิ่มลง Order</button>
                          </div>
                </div>
          </div>
          <div>
      <input type="text" v-model="foodname" placeholder="ชื่อเมนูอาหาร">
      <input type="number" v-model="foodprice" min="5" max="50" placeholder="ราคาต่อจาน">
      <button @click="insertmenu(foodname, foodprice)">เพิ่มเมนู</button>
        <div class="nav-item is-tab" :class="{ 'active-bottom-border': $route.path === '/cart' }">
          <div class="field is-grouped">
            <p class="control">
              <router-link to='/cart' class="button is-info">
                <span class="icon">
                  <i class="fa fa-shopping-cart"></i>
                </span>
                <span>สั่ง Order ({{itemsInCart}})</span>
              </router-link>
            </p>
          </div>
        </div>
    </div>
           <div class="box">
              <h4 id="let" class="title is-3">รีวิวจากลูกค้า</h4>
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">
                  รีวิวการใช้บริการ
                </div>
              </article>
                                    <div class="row" :key="key" v-for="(review, key) in review">
                      <div class="message-body"><h5>Review : </h5>{{review.view}}
                      <img v-bind:src="review.scorce" width="48" height="48" ><br>
                       <h5>โดย คุณ: {{review.namere}}</h5><br>
                       ___________________________</div><br>
                          </div>
                <input type="text" v-model="view" placeholder="รีวิว" size="30">
                <input  type="radio" id="bad" name="gender" value="https://scontent.fbkk21-1.fna.fbcdn.net/v/t1.0-9/45660940_2012396278825644_1335758975362138112_n.jpg?_nc_cat=106&_nc_ht=scontent.fbkk21-1.fna&oh=7653eabaa7f02d02fea263441880642e&oe=5C81EF8F" v-model="scorce">
<label for="bad">แย่</label>
<input type="radio" id="ok" name="gender" value="https://scontent.fbkk21-1.fna.fbcdn.net/v/t1.0-9/45578328_2012396275492311_7949175370366844928_n.jpg?_nc_cat=100&_nc_ht=scontent.fbkk21-1.fna&oh=06d29933f8410766bc43a956487850b2&oe=5C4144E3" v-model="scorce">
<label for="ok">ok</label>
<input type="radio" id="good" name="gender" value="https://scontent.fbkk21-1.fna.fbcdn.net/v/t1.0-9/45640418_2012396288825643_4887231943109771264_n.jpg?_nc_cat=109&_nc_ht=scontent.fbkk21-1.fna&oh=14000d38405d4d8a28213d83543ef185&oe=5C3D8AD7" v-model="scorce">
<label for="good">ดีมาก</label>
      <button @click="insertreview(view, scorce)">เพิ่มรีวิว</button>
          </div>
      </div>
    </div>
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
      foodpic: '',
      menu: '',
      menushow: '',
      review: '',
      menus: {},
      // test
      scorce: '',
      view: ''
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
    },
    insertmenushow (foodname, foodprice, foodpic) {
      let data = {
        foodname: foodname,
        foodprice: foodprice,
        foodpic: foodpic
      }
      foodcenterRef.child('menushow').child(this.selectShop.name).push(data)
      this.foodname = ''
      this.foodprice = ''
      this.foodpic = ''
    },
    insertreview (view, scorce) {
      let data = {
        view: view,
        scorce: scorce,
        namere: this.user
      }
      foodcenterRef.child('review').child(this.selectShop.name).push(data)
      this.view = ''
      this.scorce = ''
      this.namere = ''
    },
    Cart (foodname, foodprice, key) {
      console.log(foodname, foodprice, key)
      this.$store.dispatch('AddCart', {foodname, foodprice, key})
      console.log(this.added)
    }
  },
  computed: {
    selectShop () {
      return this.$store.getters.selectShop
    },
    added () {
      return this.$store.state.added
    },
    itemsInCart () {
      let cart = this.$store.getters.cartProducts
      return cart.reduce((accum, item) => accum + item.quantity, 0)
    },
    hasShop () {
      return this.$store.getters.hasShop
    },
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    const dbRefObject = foodcenterRef.child('menu').child(this.selectShop.name)
    const dbRefObjectshow = foodcenterRef.child('menushow').child(this.selectShop.name)
    const dbRefObjectreview = foodcenterRef.child('review').child(this.selectShop.name)
    dbRefObject.on('value', snap => {
      this.menus = snap.val()
      console.log(this.menus)
      console.log(this.added)
    })
    dbRefObjectshow.on('value', snap => {
      this.menushow = snap.val()
      console.log(this.menushow)
      console.log(this.added)
    })
    dbRefObjectreview.on('value', snap => {
      this.review = snap.val()
      console.log(this.review)
      console.log(this.added)
    })
  }
}
</script>
<style>
</style>
