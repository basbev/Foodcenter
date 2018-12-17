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
                 <h3 class="title is-3">ร้าน&nbsp; {{ detail.name }}&nbsp; เบอร์&nbsp; {{ detail.tel }}&nbsp;<img v-bind:src="detail.status" width="80" height="60" ></h3>
                 <button v-if="permission !== '1'" class="button button3" @click="setprofile(detail.name, detail.tel, detail.status)">เเก้ไขโปรไฟล์</button>
                 <div v-if="updateKey === true">
                   <input type="text" v-model="updateName" placeholder="ชื่อร้าน">
                   <input type="text" v-model="updatePhone" placeholder="เบอร์โทร">
                    <select name="status" v-model="updateStatus">
  <option value="https://www.img.live/images/2018/11/20/bb0bf29aaea59877.png">เปิด</option>
  <option value="https://www.img.live/images/2018/11/20/d57b23a07352f87d.png">ปิด</option>
</select>
                   <button v-if="permission !== '1'" class="button button2" @click="updateprofile(updateName, updatePhone, updateStatus)">บันทึกโปรไฟล์</button>
                 </div>
                <br>
          <img src="/static/hot.png" width="130" height="100" ><div :key="key" v-for="(record, key) in records">
          <h3>&nbsp;&nbsp;{{key}}</h3>
          </div>
           <div class="box">
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">ค้นหา
          <div>
       <select name="status" v-model="Searchtype">
  <option value="menushow">อาหารเเนะนำ</option>
  <option value="menu">อาหารทั่วไป</option>
</select>
<input type="text" v-model="Search" placeholder="ค้นหาเมนู">
      <button class="button button7" @click="Searchnow(Search, Searchtype)">ค้นหาอาหาร</button>
    </div>
    <div v-if="result !== ''">
<h3>ชื่อเมนู:&nbsp;{{result.foodname}}</h3>
                      <h3>ราคา:&nbsp;{{result.foodprice}}&nbsp;บาท</h3>
                      <img v-bind:src="result.foodpic" width="300" height="350"><br>
                      <button @click="Cart(result.foodname, result.foodprice, result.foodtype, key)" class="button button3">เพิ่มลง Order</button>
    </div>
    </div>
              </article>
              </div>
          <div class="box">
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">
<img src="/static/pro.png" width="130" height="100" >
                   <div class="row" :key="key" v-for="(promo, key) in promo">
                      <h4>&nbsp; {{promo.prodetail}} </h4>
                       <button v-if="permission !== '1'" class="button button5" @click="DelPromo(key)">ลบ</button>
                        <button v-if="permission !== '1'" @click="SetUpdatePromo(key, promo.prodetail)" class="button button3">เเก้ไขโปรโมชั่น</button>
                    <hr>
                    <div v-if="updateKey === key">
        <input type="text" v-model="updateprodetail" placeholder="รายละเอียดโปร">
        <button @click="UpdatePromo(key, updateprodetail)" class="button button2">บันทึกโปรโมชั่น</button>
        <hr>
      </div>
                          </div>
                </div>
              </article>
              <div v-if="permission !== '1'">
                <input type="text" v-model="prodetail" placeholder="รายละเอียดโปรโมชั่น" size="30">
      <button class="button button2" @click="insertpromo(prodetail)">เพิ่มโปรโมชั่น</button>
              </div>
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
                      <img v-url={filename:menushow.foodpic} width="300" height="350"/><br>
                      <button @click="Cart(menushow.foodname, menushow.foodprice, menushow.foodtype, key)" class="button button3">เพิ่มลง Order</button>
                      <button v-if="permission !== '1'" @click="SetUpdateMenuShow(key, menushow.foodname, menushow.foodprice, menushow.foodpic, menushow.foodtype)" class="button button3">เเก้ไขเมนูเเนะนำ</button>
                      <button v-if="permission!== '1'" class="button button3" @click="DeleteMenushow(menushow.key)">ลบ</button>
                    <hr>
                    <div v-if="updateKey === key">
        <input type="text" v-model="updatefoodname" placeholder="ชื่อ">
         <select name="status" v-model="updatefoodtype">
  <option value="ผัด">ผัด</option>
  <option value="ทอด">ทอด</option>
  <option value="ต้ม">ต้ม</option>
  <option value="แกง">แกง</option>
  <option value="นึ่ง">นึ่ง</option>
  <option value="ย่าง">ย่าง</option>
</select>
        <input type="text" v-model="updatefoodprice" placeholder="ราคา">
        <label class="file-label">
      <input class="file-input" type="file" name="resume" @change="onFileChangeupdate($event.target.files[0])">
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          Info file…
        </span>
      </span>
    </label>
    <span class="file-name" v-if="dataImg1">
        {{dataImg1.name}}
      </span>
        <button @click="UpdateMenuShow(menushow.key, updatefoodname, updatefoodprice, updatefoodpic, updatefoodtype)" class="button button2">บันทึกเมนูเเนะนำ</button>
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
              <div v-if="permission !== '1'">
      <input type="text" v-model="foodname" placeholder="ชื่อเมนูอาหาร">
       <select name="status" v-model="foodtype">
  <option value="ผัด">ผัด</option>
  <option value="ทอด">ทอด</option>
  <option value="ต้ม">ต้ม</option>
  <option value="แกง">แกง</option>
  <option value="นึ่ง">นึ่ง</option>
  <option value="ย่าง">ย่าง</option>
</select>
      <input type="number" v-model="foodprice" min="5" max="50" placeholder="ราคาต่อจาน">
    <label class="file-label">
      <input class="file-input" type="file" name="resume" @change="onFileChange($event.target.files[0])">
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          Info file…
        </span>
      </span>
    </label>
      <button class="button button1" @click="insertmenushow(foodname, foodprice , foodpic, foodtype)">เพิ่มเมนูแนะนำ</button>
              <span class="file-name" v-if="dataImg">
        {{this.dataImg.name}}
      </span>
      <br>
              </div>
              <div class="bucket" @click="isComponentModalActive = true">
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
                      <button @click="Cart(menu.foodname, menu.foodprice, menu.foodtype, key)" class="button button3">เพิ่มลง Order</button>
                      <button v-if="permission !== '1'" @click="SetUpdateMenu(key, menu.foodname, menu.foodprice, menu.foodtype)" class="button button3">เเก้ไขเมนูอาหาร</button>
                      <button v-if="permission !== '1'" @click="DeleteMenu(menu.key)" class="button button3">ลบ</button>
                      <hr>
                                      <div v-if="updateKey === key">
        <input type="text" v-model="updateMenufood" placeholder="ชื่อเมนู">
        <select name="status" v-model="updateMenutype">
  <option value="ผัด">ผัด</option>
  <option value="ทอด">ทอด</option>
  <option value="ต้ม">ต้ม</option>
  <option value="แกง">แกง</option>
  <option value="นึ่ง">นึ่ง</option>
  <option value="ย่าง">ย่าง</option>
</select>
        <input type="text" v-model="updateMenuprice" placeholder="ราคา">
        <button @click="UpdateMenu(menu.key, updateMenufood, updateMenuprice, updateMenutype)" class="button button2">บันทึกเมนูอาหาร</button>
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
            <div v-if="permission !== '1'">
      <input type="text" v-model="foodname" placeholder="ชื่อเมนูอาหาร">
       <select name="status" v-model="foodtype">
  <option value="ผัด">ผัด</option>
  <option value="ทอด">ทอด</option>
  <option value="ต้ม">ต้ม</option>
  <option value="แกง">แกง</option>
  <option value="นึ่ง">นึ่ง</option>
  <option value="ย่าง">ย่าง</option>
</select>
      <input type="number" v-model="foodprice" min="5" max="50" placeholder="ราคาต่อจาน">
      <button class="button button5" @click="insertmenu(foodname, foodprice, foodtype)">เพิ่มเมนู</button>
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
                       <button v-if="permission !== '1'" class="button button5" @click="DelReview(key)">ลบ</button>
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
var storageRef = firebase.storage().ref()
export default {
  name: 'shop',
  data () {
    return {
      foodname: '',
      foodprice: '',
      foodpic: '',
      foodtype: '',
      menu: '',
      menushow: '',
      review: '',
      menus: {},
      scorce: '',
      view: '',
      updateKey: '',
      updatefoodname: '',
      updatefoodtype: '',
      updatefoodprice: '',
      updatefoodpic: '',
      updateMenufood: '',
      updateMenuprice: '',
      updateMenutype: '',
      promo: '',
      prodetail: '',
      updateProdetail: '',
      records: '',
      detail: '',
      updateName: '',
      updatePhone: '',
      updateStatus: '',
      result: '',
      Searchtype: '',
      Search: '',
      dataImg: '',
      dataImg1: ''
    }
  },
  created () {
  },
  methods: {
    onFileChange (fileImg) {
      this.dataImg = fileImg
      console.log(this.dataImg)
    },
    onFileChangeupdate (fileImg) {
      this.dataImg1 = fileImg
      console.log(this.dataImg1)
    },
    insertmenu (foodname, foodprice, foodtype) {
      let data = {
        foodname: foodname,
        foodtype: foodtype,
        foodprice: foodprice
      }
      foodcenterRef.child('menu').child(this.selectShop).push(data)
      this.foodname = ''
      this.foodprice = ''
      this.foodtype = ''
    },
    async insertmenushow (foodname, foodprice, foodpic, foodtype) {
      await storageRef.child(this.dataImg.name).put(this.dataImg)
      let data = {
        foodname: foodname,
        foodprice: foodprice,
        foodtype: foodtype,
        foodpic: this.dataImg.name
      }
      await foodcenterRef.child('menushow').child(this.selectShop).push(data)
      this.foodname = ''
      this.foodprice = ''
      this.foodpic = ''
      this.foodtype = ''
      this.dataImg = ''
    },
    insertreview (view, scorce) {
      let data = {
        view: view,
        scorce: scorce,
        namere: this.user
      }
      foodcenterRef.child('review').child(this.selectShop).push(data)
      this.view = ''
      this.scorce = ''
      this.namere = ''
    },
    insertpromo (prodetail) {
      let data = {
        prodetail: prodetail
      }
      foodcenterRef.child('promo').child(this.selectShop).push(data)
      this.prodetail = ''
    },
    Cart (foodname, foodprice, type, key) {
      console.log(foodname, foodprice, type, key)
      this.$store.dispatch('AddCart', {foodname, foodprice, type, key})
    },
    SetUpdateMenuShow (key, foodname, foodprice, foodpic, foodtype) {
      this.updateKey = key
      this.updatefoodname = foodname
      this.updatefoodprice = foodprice
      this.updatefoodpic = foodpic
      this.updatefoodtype = foodtype
    },
    async UpdateMenuShow (key, foodname, foodprice, foodpic, foodtype) {
      await storageRef.child(this.dataImg1.name).put(this.dataImg1)
      await foodcenterRef.child('menushow').child(this.selectShop).child(key).update({
        foodname: foodname,
        foodprice: foodprice,
        foodpic: this.dataImg1.name,
        foodtype: foodtype
      })
      this.updateKey = ''
      this.foodname = ''
      this.foodprice = ''
      this.foodpic = ''
      this.foodtype = ''
      this.dataImg1 = ''
    },
    SetUpdatePromo (key, prodetail) {
      this.updateKey = key
      this.updateProdetail = prodetail
    },
    UpdatePromo (key, prodetail) {
      foodcenterRef.child('promo').child(this.selectShop).child(key).update({
        prodetail: prodetail
      })
      this.updateKey = ''
      this.prodetail = ''
    },
    SetUpdateMenu (key, menufood, menuprice, menutype) {
      this.updateKey = key
      this.updateMenufood = menufood
      this.updateMenuprice = menuprice
      this.updateMenutype = menutype
    },
    setprofile (name, phone, status) {
      this.updateKey = true
      this.updateName = name
      this.updatePhone = phone
      this.updateStatus = status
    },
    updateprofile (name, phone, status) {
      foodcenterRef.child('detail').child(this.selectShop).update({
        name: name,
        tel: phone,
        status: status
      })
      this.updateKey = ''
      this.updateName = ''
      this.updatePhone = ''
      this.updateStatus = ''
    },
    UpdateMenu (key, updateMenufood, updateMenuprice, updateMenutype) {
      foodcenterRef.child('menu').child(this.selectShop).child(key).update({
        foodname: updateMenufood,
        foodtype: updateMenutype,
        foodprice: updateMenuprice
      })
      this.updateKey = ''
      this.updateMenufood = ''
      this.updateMenuprice = ''
      this.updateMenutype = ''
    },
    DelReview (key) {
      foodcenterRef.child('review').child(this.selectShop).child(key).remove()
    },
    DelPromo (key) {
      foodcenterRef.child('promo').child(this.selectShop).child(key).remove()
    },
    DeleteMenu (key) {
      foodcenterRef.child('menu').child(this.selectShop).child(key).remove()
    },
    DeleteMenushow (key) {
      foodcenterRef.child('menushow').child(this.selectShop).child(key).remove()
    },
    Searchnow (Search, Searchtype) {
      this.result = ''
      console.log(this.Searchtype, this.Search)
      // const newsRef2 = foodcenterRef.child('detail').child('ป้าสมบูรณ์').orderByChild('name').equalTo('ป้าสมบูรณ์')
      const newsRef2 = foodcenterRef.child(this.Searchtype).child(this.selectShop).orderByChild('foodname').equalTo(this.Search)
      newsRef2.on('child_added', snap => {
        this.result = snap.val()
        console.log(this.result)
      })
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
    const dbRefObjectdetail = foodcenterRef.child('detail').child(this.selectShop)
    const dbRefObject = foodcenterRef.child('menu').child(this.selectShop)
    const dbRefObjectshow = foodcenterRef.child('menushow').child(this.selectShop)
    const dbRefObjectreview = foodcenterRef.child('review').child(this.selectShop)
    const dbRefObjectMenuhit = foodcenterRef.child('record').child(this.selectShop)
    const dbRefObjectpromo = foodcenterRef.child('promo').child(this.selectShop)
    dbRefObject.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.menus = data
      console.log(this.menus)
    })
    dbRefObjectshow.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.menushow = data
      // console.log(this.menushow)
    })
    dbRefObjectreview.on('value', snap => {
      this.review = snap.val()
      // console.log(this.review)
    })
    dbRefObjectMenuhit.orderByChild('amount').limitToLast(3).on('value', snap => {
      this.records = snap.val()
      // console.log(this.records)
    })
    dbRefObjectpromo.on('value', snap => {
      this.promo = snap.val()
      // console.log(this.promo)
    })
    dbRefObjectdetail.on('value', snap => {
      this.detail = snap.val()
      // console.log(this.detail)
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
.bucket {
  position: fixed;
  top: 45%;
  right: 70%;
  cursor: pointer;
}
.file-label {
  display: unset;
}
.file-cta {
    background-color: #209cee;
    border-color: transparent;
    color: #fff;
}
</style>
