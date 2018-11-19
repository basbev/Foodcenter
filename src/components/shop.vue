<template>
<div>
  <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
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
          <div :key="key" v-for="(record, key) in records">
          เมนูขายดี ** {{key}}
          </div>
              <div class="box">
                <h4 id="const" class="title is-3">เมนูอาหารเเนะนำ</h4>
                <article class="message is-primary">
                  <span class="icon has-text-primary">
                  <i class="fab fa-hot"></i>
                  </span>
                  <div class="message-body">
                  <div class="container">
                  <div class="columns is-multiline">
                                    <div class="column is-5" :key="key" v-for="(menushow, key) in menushow">
                          <h3>ชื่อเมนู:&nbsp;{{menushow.foodname}}</h3>
                      <h3>ราคา:&nbsp;{{menushow.foodprice}}&nbsp;บาท</h3>
                      <img v-bind:src="menushow.foodpic" width="300" height="350"><br>
                      <button @click="Cart(menushow.foodname, menushow.foodprice, key)" class="button button3">เพิ่มลง Order</button>
                      <button v-if="permission === '3'" @click="SetUpdateMenuShow(key, menushow.foodname, menushow.foodprice, menushow.foodpic)" class="button button3">เเก้ไขเมนูเเนะนำ</button>
                      <button v-if="permission === '3'" class="button button3" @click="DeleteMenushow(key)">ลบ</button>
                    <hr>
                    <div v-if="updateKey === key">
        <input type="text" v-model="updatefoodname" placeholder="ชื่อ">
        <input type="text" v-model="updatefoodprice" placeholder="ราคา">
        <input type="text" v-model="updatefoodpic" placeholder="ลิ้งรูปภาพ">
        <button @click="UpdateMenuShow(key, updatefoodname, updatefoodprice, updatefoodpic)" class="button button2">บันทึกเมนูเเนะนำ</button>
        <hr>
      </div>
      <div v-else>
                  </div>
                  </div>
                  </div>
                          </div>
                  </div>
                </article>
            </div>
            <div>
              <div v-if="permission === '3'">
      <input type="text" v-model="foodname" placeholder="ชื่อเมนูอาหาร">
      <input type="number" v-model="foodprice" min="5" max="50" placeholder="ราคาต่อจาน">
      <input type="text" v-model="foodpic" placeholder="linkรูป">
      <button class="button button1" @click="insertmenushow(foodname, foodprice , foodpic)">เพิ่มเมนูแนะนำ</button>
              </div>
        <div class="nav-item is-tab" :class="{ 'active-bottom-border': $route.path === '/cart' }">
          <div class="field is-grouped">
            <p class="control">
              <router-link to='/cart' class="button button4">
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
                                    <div class="container">
                  <div class="columns is-multiline">
                                    <div class="column is-5" :key="key" v-for="(menu, key) in menus">
                          <h3>ชื่อเมนู:&nbsp;{{menu.foodname}}</h3>
                      <h3>ราคา:&nbsp;{{menu.foodprice}}&nbsp;บาท</h3>
                      <button @click="Cart(menu.foodname, menu.foodprice, key)" class="button button3">เพิ่มลง Order</button>
                      <button v-if="permission === '3'" @click="SetUpdateMenu(key, menu.foodname, menu.foodprice)" class="button button3">เเก้ไขเมนูอาหาร</button>
                      <button v-if="permission === '3'" @click="DeleteMenu(key)" class="button button3">ลบ</button>
                      <hr>
                                      <div v-if="updateKey === key">
        <input type="text" v-model="updateMenufood" placeholder="ชื่อเมนู">
        <input type="text" v-model="updateMenuprice" placeholder="ราคา">
        <button @click="UpdateMenu(key, updateMenufood, updateMenuprice)" class="button button2">บันทึกเมนูอาหาร</button>
        <hr>
      </div>
      <div v-else>
        </div>
        </div>
                                    </div>
                          </div>
                </div>
          </div>
          <div>
            <div v-if="permission === '3'">
      <input type="text" v-model="foodname" placeholder="ชื่อเมนูอาหาร">
      <input type="number" v-model="foodprice" min="5" max="50" placeholder="ราคาต่อจาน">
      <button class="button button5" @click="insertmenu(foodname, foodprice)">เพิ่มเมนู</button>
            </div>
        <div class="nav-item is-tab" :class="{ 'active-bottom-border': $route.path === '/cart' }">
          <div class="field is-grouped">
            <p class="control">
              <router-link to='/cart' class="button button4">
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
                      <div class="message-body"><p><h5>Review:&nbsp;</h5>{{review.view}}
                      <img v-bind:src="review.scorce" width="40" height="40" ><br>
                       <h5>โดย คุณ:&nbsp;{{review.namere}}</h5><br>
                       <button class="button button5" @click="DelReview(key)">ลบ</button>
                       </div>
                          </div>
                <input type="text" v-model="view" placeholder="รีวิว" size="30">
                <input  type="radio" id="bad" name="gender" value="https://www.img.in.th/images/bd7e44b282baa7d06dfdf02f51bc915f.png" v-model="scorce">
<label for="bad">แย่</label>
<input type="radio" id="ok" name="gender" value="https://www.img.in.th/images/a1f452362b9c5f26d9dfc720a424b989.png" v-model="scorce">
<label for="ok">ok</label>
<input type="radio" id="good" name="gender" value="https://www.img.in.th/images/2a8e04f7dd719a60eba986227acb5c0a.png" v-model="scorce">
<label for="good">ดีมาก</label>
      <button class="button button2" @click="insertreview(view, scorce)">เพิ่มรีวิว</button>
          </div>
      </div>
    </div>
  </div>
</div>
</section>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
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
      scorce: '',
      view: '',
      updateKey: '',
      updatefoodname: '',
      updatefoodprice: '',
      updatefoodpic: '',
      updateMenufood: '',
      updateMenuprice: '',
      records: ''
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
    },
    SetUpdateMenuShow (key, foodname, foodprice, foodpic) {
      this.updateKey = key
      this.updatefoodname = foodname
      this.updatefoodprice = foodprice
      this.updatefoodpic = foodpic
    },
    UpdateMenuShow (key, foodname, foodprice, foodpic) {
      foodcenterRef.child('menushow').child(this.selectShop.name).child(key).update({
        foodname: foodname,
        foodprice: foodprice,
        foodpic: foodpic
      })
      this.updateKey = ''
      this.foodname = ''
      this.foodprice = ''
      this.foodpic = ''
    },
    SetUpdateMenu (key, menufood, menuprice) {
      this.updateKey = key
      this.updateMenufood = menufood
      this.updateMenuprice = menuprice
    },
    UpdateMenu (key, updateMenufood, updateMenuprice) {
      foodcenterRef.child('menu').child(this.selectShop.name).child(key).update({
        foodname: updateMenufood,
        foodprice: updateMenuprice
      })
      this.updateKey = ''
      this.updateMenufood = ''
      this.updateMenuprice = ''
    },
    DelReview (key) {
      foodcenterRef.child('review').child(this.selectShop.name).child(key).remove()
    },
    DeleteMenu (key) {
      foodcenterRef.child('menu').child(this.selectShop.name).child(key).remove()
    },
    DeleteMenushow (key) {
      foodcenterRef.child('menushow').child(this.selectShop.name).child(key).remove()
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
      return this.$store.state.hasShop
    },
    user () {
      return this.$store.getters.user
    },
    ...mapGetters({
      permission: 'permission'
    })
  },
  mounted () {
    const dbRefObject = foodcenterRef.child('menu').child(this.selectShop.name)
    const dbRefObjectshow = foodcenterRef.child('menushow').child(this.selectShop.name)
    const dbRefObjectreview = foodcenterRef.child('review').child(this.selectShop.name)
    const dbRefObjectMenuhit = foodcenterRef.child('record').child(this.selectShop.name)
    dbRefObject.on('value', snap => {
      this.menus = snap.val()
      console.log(this.menus)
    })
    dbRefObjectshow.on('value', snap => {
      this.menushow = snap.val()
      console.log(this.menushow)
    })
    dbRefObjectreview.on('value', snap => {
      this.review = snap.val()
      console.log(this.review)
    })
    dbRefObjectMenuhit.orderByChild('amount').limitToLast(3).on('value', snap => {
      this.records = snap.val()
      console.log(this.records)
    })
  }
}
</script>
<style>
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
.button1 {
    margin-top: 7px;
    width: 10%;
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
    font-family: 'Prompt', sans-serif;
}
.button1:hover {
    background-color: #4CAF50;
    color: white;
    font-family: 'Prompt', sans-serif;
}
.button2 {
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #008CBA;
    font-family: 'Prompt', sans-serif;
}
.button2:hover {
    background-color: #008CBA;
    color: white;
    font-family: 'Prompt', sans-serif;
}
.button3 {
    margin-bottom: 7px;
    background-color: white;
    color: black;
    border: 2px solid #f44336;
    font-family: 'Prompt', sans-serif;
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
    font-family: 'Prompt', sans-serif;
}
.button4:hover {background-color: #B8860B;
}
.button5 {
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #7FFF00;
    font-family: 'Prompt', sans-serif;
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
    margin-top: 13px;
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
    font-family: 'Prompt', sans-serif;
}
input[type=number], select {
    width: 11%;
    padding: 1% 1%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Prompt', sans-serif;
}
div {
  font-family: 'Prompt', sans-serif;
}
</style>
