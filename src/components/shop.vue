<template>
<div>
    <section class="section">
      <div class="container"><br>
        <div class="columns">
          <div class="column is-3">
            <aside class="is-medium menu">
          <ul class="menu-list">
            <li class="is-right"><a href="#const" class="is-active"><i class=""></i> เมนูเเนะนำ</a></li>
            <li><a href="#let" class="is-active"><i class=""></i> เมนูทั่วไป</a></li>
            <li><a href="#let2" class="is-active"><i class=""></i> ความเห็นจากลูกค้า</a></li>
          </ul>
            </aside>
          </div>
          <div class="column is-9">
            <div class="content is-medium">
              <div class="content">
              <img v-url={filename:detail.banner}>
              <div :key="key" v-if="(shop, key) in detail"></div>
                 <h3 class="title is-3">ร้าน&nbsp; {{ detail.name }}<br><img src="https://www.img.live/images/2018/11/20/img_352451.png" height="15">&nbsp;{{ detail.tel }}&nbsp;<img v-bind:src="detail.status" width="90" height="70" ></h3>
                 <button v-if="permission !== '1'" class="button button11" @click="setprofile(detail.name, detail.tel, detail.status, detail.banner)">เเก้ไขโปรไฟล์</button>
                 <div v-if="updateKey === true">
                   <input type="text" v-model="updateName" placeholder="ชื่อร้าน">
                   <input type="number" v-model="updatePhone" placeholder="เบอร์โทร">
                    <select name="status" v-model="updateStatus">
  <option value="https://www.img.live/images/2018/11/20/bb0bf29aaea59877.png">เปิด</option>
  <option value="https://www.img.live/images/2018/11/20/d57b23a07352f87d.png">ปิด</option>
</select>
<label class="file-label">
      <input class="file-input" type="file" name="banner" @change="onFileChangebanner($event.target.files[0])">
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          อัพโหลดรูป
        </span>
      </span>
    </label>
      <span class="file-name" v-if="dataImg2">
        {{this.dataImg2.name}}
      </span>
                   <button v-if="permission !== '1'" class="button button12" @click="updateprofile(updateName, updatePhone, updateStatus, updateBanner )">บันทึกโปรไฟล์</button>
                 </div>
              </div>
                <br>
          <img src="/static/hotsale.png"><div :key="key" v-for="(record, key) in records">
          <h3>&nbsp;&nbsp;{{key}}<img src="https://sv1.picz.in.th/images/2019/01/09/9uitK9.png" height="30" width="30"></h3>
          </div>
           <div class="box">
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">ค้นหา
          <div>
          <div class="columns">
            <!-- <div class="column">
              <select name="status" class="input is-large" v-model="Searchtype">
                <option value="menushow">อาหารเเนะนำ</option>
                <option value="menu">อาหารทั่วไป</option>
              </select>
            </div> -->
            <div class="column">
              <!-- <input type="text" v-model="Search" placeholder="ค้นหาเมนู" v-if="Searchtype === ''" disabled class="input is-large">
          <input type="text" v-model="Search" placeholder="ค้นหาเมนู" @input="filterShop(Search)" v-if="Searchtype === 'menushow'" class="input is-large"> -->
          <input type="text" v-model="Search" placeholder="ค้นหาเมนู" @input="filterShop2(Search)" class="input is-large">
            </div>
          </div>
      <!--<button class="button button11" @click="Searchnow(Search, Searchtype)">ค้นหาอาหาร</button>-->
    </div>
    <div v-if="result !== ''">
<h3>{{result.foodname}}</h3>
                      <h3>ราคา:&nbsp;{{result.foodprice}}&nbsp;บาท</h3>
                      <img v-bind:src="result.foodpic" width="300" height="350"><br>
                      <button @click="Cart(result.foodname, result.foodprice, result.foodtype, result.key)" class="button button3">เพิ่มลง Order</button>
    </div>
    <div v-if="showData.length > 0">
      <div class="columns is-multiline">
        <div class="column is-6" v-for="(menu, key) in showData" :key="key">
          <div class="foodList">
            <h3>{{menu.foodname}}</h3>
            <h6>ราคา:&nbsp;{{menu.foodprice}}&nbsp;บาท</h6>
            <img v-url={filename:menu.foodpic} width="300" height="350"/><br>
            <button @click="Cart(menu.foodname, menu.foodprice, menu.foodtype, menu.key)" class="button button3">เพิ่มลง Order</button>
          </div>
        </div>
      </div>
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
<img src="/static/pro.png">
                   <div class="row" :key="key" v-for="(promo, key) in promo">
                      <h4>&nbsp; {{promo.prodetail}}<img src="https://sv1.picz.in.th/images/2019/01/09/9uitK9.png" height="30" width="30"></h4>
                       <button v-if="permission !== '1'" class="button button3" @click="DelPro(key)">ลบ</button>
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
              <div class="bucket" @click="isComponentModalActive = true">
        <div class="nav-item is-tab" :class="{ 'active-bottom-border': $route.path === '/cart' }">
          <div class="field is-grouped">
              <router-link to='/cart' class="button button9">
                <span class="icon">
                  <i class="fa fa-shopping-cart"></i>
                </span>
                <span>สั่ง Order ({{itemsInCart}})</span>
              </router-link>
          </div>
        </div>
              </div>
              <div v-if="permission !== '1'">
                <input type="text" v-model="prodetail" placeholder="รายละเอียดโปรโมชั่น" size="30" required class="input is-large">
      <button class="button button12" @click="insertpromo(prodetail)">เพิ่มโปรโมชั่น</button>
              </div>
          </div>
            <div class="box">
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
                      <h3>{{menu.foodname}}</h3>
                      <h6>ราคา:&nbsp;{{menu.foodprice}}&nbsp;บาท</h6>
                      <h6>จำนวน:&nbsp;{{menu.amount}}&nbsp;ชิ้น</h6>
                      <img v-url={filename:menu.foodpic} width="300" height="350"/><br>
                      <button @click="Cart(menu.foodname, menu.foodprice, menu.foodtype, menu.key, menu.amount)" class="button button3">เพิ่มลง Order</button>
                      <button v-if="permission !== '1'" @click="SetUpdateMenu(key, menu.foodname, menu.foodprice, menu.foodtype, menu.foodpic, menu.menupre)" class="button button3">เเก้ไขเมนูอาหาร</button>
                      <button v-if="permission !== '1'" @click="DelFood(menu.key)" class="button button3">ลบ</button>
                      <hr>
                                      <div v-if="updateKey === key">
        <input type="text" v-model="updateMenufood" placeholder="ชื่อเมนู">
        <select name="status" v-model="updateMenutype">
  <option value="ผัด" selected>ผัด</option>
  <option value="ทอด">ทอด</option>
  <option value="ต้ม">ต้ม</option>
  <option value="แกง">แกง</option>
  <option value="นึ่ง">นึ่ง</option>
  <option value="ย่าง">ย่าง</option>
</select>
        <input type="text" v-model="updateMenuprice" placeholder="ราคา">
         <select name="menupre" v-model="menupre">
  <option value="เมนูทั่วไป" selected>เมนูทั่วไป</option>
  <option value="เมนูแนะนำ">เมนูแนะนำ</option>
</select>
        <label class="file-label">
      <input class="file-input" type="file" name="resume" @change="onFileChangefoodupdate($event.target.files[0])">
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          อัพโหลดรูป
        </span>
      </span>
    </label>
    <span class="file-name" v-if="dataImg4">
        {{dataImg4.name}}
      </span>
        <button @click="UpdateMenu(menu.key, updateMenufood, updateMenuprice, updateMenutype, updateMenupic, updateMenumenupre)" class="button button2">บันทึกเมนูอาหาร</button>
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
  <option value="ผัด" selected>ผัด</option>
  <option value="ทอด">ทอด</option>
  <option value="ต้ม">ต้ม</option>
  <option value="แกง">แกง</option>
  <option value="นึ่ง">นึ่ง</option>
  <option value="ย่าง">ย่าง</option>
</select>
      <input type="number" v-model="foodprice" min="5" max="50" placeholder="ราคาต่อจาน">
       <select name="menupre" v-model="menupre" placeholder="รีวิว">
  <option value="เมนูทั่วไป" selected>เมนูทั่วไป</option>
  <option value="เมนูแนะนำ">เมนูแนะนำ</option>
</select>
      <label class="file-label">
      <input class="file-input" type="file" name="resume" @change="onFileChangefood($event.target.files[0])">
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          อัพโหลดรูป
        </span>
      </span>
    </label>
      <button class="button button11" @click="insertmenu(foodname, foodprice, foodtype, foodpic, menupre)">เพิ่มเมนู</button>
      <span class="file-name" v-if="dataImg3">
        {{this.dataImg3.name}}
      </span>
            </div>
    </div>
           <div class="box">
              <h4 id="let2" class="title is-3">ความเห็นจากลูกค้า</h4>
                                    <div class="row" :key="key" v-for="(review, key) in review">
                      <div class="message-body"><p><h5>Review:&nbsp;</h5>{{review.view}}
                      <img v-bind:src="review.scorce" width="40" height="40" ><br>
                       <h5>โดย คุณ:&nbsp;{{review.namere}}</h5><br>
                       <button v-if="permission !== '1'" class="button button3" @click="DelRe(key)">ลบความเห็น</button>
                       </div>
                          </div>
                <input type="text" v-model="view" placeholder="รีวิว" size="30" class="input is-large">
                <input  type="radio" id="bad" name="gender" value="https://www.img.in.th/images/bd7e44b282baa7d06dfdf02f51bc915f.png" v-model="scorce">
<label for="bad">แย่</label>
<input type="radio" id="ok" name="gender" value="https://www.img.in.th/images/a1f452362b9c5f26d9dfc720a424b989.png" v-model="scorce">
<label for="ok">ok</label>
<input type="radio" id="good" name="gender" value="https://www.img.in.th/images/2a8e04f7dd719a60eba986227acb5c0a.png" v-model="scorce">
<label for="good">ดีมาก</label>
      <button class="button button12" @click="insertreview(view, scorce)">เพิ่มรีวิว</button>
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
      menupre: '',
      menu: '',
      menumenupre: '',
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
      updateMenupre: '',
      updateMenufood: '',
      updateMenuprice: '',
      updateMenutype: '',
      updateMenupic: '',
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
      dataImg1: '',
      dataImg3: '',
      dataImg4: '',
      dataImg2: '',
      banner: '',
      showData: [],
      tmp: ''
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
    onFileChangefood (fileImg) {
      this.dataImg3 = fileImg
      console.log(this.dataImg3)
    },
    onFileChangefoodupdate (fileImg) {
      this.dataImg4 = fileImg
      console.log(this.dataImg4)
    },
    onFileChangebanner (fileImg) {
      this.dataImg2 = fileImg
      console.log(this.dataImg2)
    },
    async insertmenu (foodname, foodprice, foodtype, foodpic, menupre) {
      let data = {
        foodname: foodname,
        foodtype: foodtype,
        foodprice: foodprice,
        menupre: menupre,
        foodpic: this.dataImg3.name
      }
      if (foodname === '' || foodprice === '' || this.dataImg3 === '' || foodtype === '' || menupre === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        await foodcenterRef.child('menu').child(this.selectShop).push(data)
        await storageRef.child(this.dataImg3.name).put(this.dataImg3)
        // this.tmp = await storageRef.child(this.dataImg3.name).getDownloadURL()
        this.foodname = ''
        this.foodprice = ''
        this.foodtype = ''
        this.foodpic = ''
        this.menupre = ''
        this.dataImg3 = ''
      }
      // console.log(this.tmp)
    },
    async insertmenushow (foodname, foodprice, foodpic, foodtype) {
      let data = {
        foodname: foodname,
        foodprice: foodprice,
        foodtype: foodtype,
        foodpic: this.dataImg.name
      }
      if (foodname === '' || foodprice === '' || this.dataImg === '' || foodtype === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        await storageRef.child(this.dataImg.name).put(this.dataImg)
        await foodcenterRef.child('menushow').child(this.selectShop).push(data)
        this.foodname = ''
        this.foodprice = ''
        this.foodpic = ''
        this.foodtype = ''
        this.dataImg = ''
      }
    },
    insertreview (view, scorce) {
      let data = {
        view: view,
        scorce: scorce,
        namere: this.user
      }
      if (view === '' || scorce === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        foodcenterRef.child('review').child(this.selectShop).push(data)
        this.view = ''
        this.scorce = ''
        this.namere = ''
      }
    },
    insertpromo (prodetail) {
      let data = {
        prodetail: prodetail
      }
      if (prodetail === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        foodcenterRef.child('promo').child(this.selectShop).push(data)
        this.prodetail = ''
      }
    },
    Cart (foodname, foodprice, type, key, amount) {
      if (amount > 0) {
        this.$store.dispatch('AddCart', {foodname, foodprice, type, key, amount})
      } else {
        this.$swal.fire({
          type: 'warning',
          title: 'ของหมด!'
        })
      }
      console.log()
    },
    SetUpdateMenuShow (key, foodname, foodprice, foodpic, foodtype) {
      this.updateKey = key
      this.updatefoodname = foodname
      this.updatefoodprice = foodprice
      this.updatefoodpic = foodpic
      this.updatefoodtype = foodtype
    },
    async UpdateMenuShow (key, foodname, foodprice, foodpic, foodtype) {
      if (this.dataImg1 !== '') {
        await storageRef.child(this.dataImg1.name).put(this.dataImg1)
        await foodcenterRef.child('menushow').child(this.selectShop).child(key).update({
          foodname: foodname,
          foodprice: foodprice,
          foodpic: this.dataImg1.name,
          foodtype: foodtype
        })
      } else {
        await foodcenterRef.child('menushow').child(this.selectShop).child(key).update({
          foodname: foodname,
          foodprice: foodprice,
          foodtype: foodtype
        })
      }
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
    SetUpdateMenu (key, menufood, menuprice, menutype, menupic, menumenupre) {
      this.updateKey = key
      this.updateMenufood = menufood
      this.updateMenuprice = menuprice
      this.updateMenutype = menutype
      this.updateMenupic = menupic
      this.updateMenumenupre = menumenupre
    },
    async UpdateMenu (key, updateMenufood, updateMenuprice, updateMenutype, updateMenupic) {
      if (this.dataImg4 !== '') {
        await storageRef.child(this.dataImg4.name).put(this.dataImg4)
        foodcenterRef.child('menu').child(this.selectShop).child(key).update({
          foodname: updateMenufood,
          foodtype: updateMenutype,
          foodprice: updateMenuprice,
          foodpic: this.dataImg4.name
        })
      } else {
        foodcenterRef.child('menu').child(this.selectShop).child(key).update({
          foodname: updateMenufood,
          foodtype: updateMenutype,
          foodprice: updateMenuprice
        })
      }
      this.updateKey = ''
      this.updateMenufood = ''
      this.updateMenuprice = ''
      this.updateMenutype = ''
      this.updateMenupic = ''
      this.dataImg4 = ''
    },
    setprofile (name, phone, status, banner) {
      this.updateKey = true
      this.updateName = name
      this.updatePhone = phone
      this.updateStatus = status
      this.updateBanner = banner
    },
    async updateprofile (name, phone, status, banner) {
      if (this.dataImg2 !== '') {
        await storageRef.child(this.dataImg2.name).put(this.dataImg2)
        await foodcenterRef.child('detail').child(this.selectShop).update({
          name: name,
          tel: phone,
          banner: this.dataImg2.name,
          status: status
        })
      } else {
        await foodcenterRef.child('detail').child(this.selectShop).update({
          name: name,
          tel: phone,
          status: status
        })
      }
      this.updateKey = ''
      this.updateName = ''
      this.updatePhone = ''
      this.updateStatus = ''
      this.updateBanner = ''
      this.dataImg2 = ''
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
    },
    filterShop (Search) {
      if (Search.length > 0) {
        this.showData = this.menushow.filter(
          (shop) => {
            if (shop.foodname.toString().indexOf(Search) >= 0 ||
              shop.foodprice.toString().indexOf(Search) >= 0 ||
              shop.foodtype.toString().indexOf(Search) >= 0) {
              return shop
            }
          }
        )
      } else {
        this.showData = []
      }
    },
    filterShop2 (Search) {
      if (Search.length > 0) {
        this.showData = this.menus.filter(
          (shop) => {
            if (shop.foodname.toString().indexOf(Search) >= 0 ||
              shop.foodprice.toString().indexOf(Search) >= 0 ||
              shop.foodtype.toString().indexOf(Search) >= 0) {
              return shop
            }
          }
        )
      } else {
        this.showData = []
      }
    },
    DelFood (key) {
      this.$swal({
        title: 'คุณกำลังลบเมนูอาหาร?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.DeleteMenu(key)
          this.$swal(
            'ลบเเล้ว!',
            'เมนูอาหารโดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    DelFoodhot (key) {
      this.$swal({
        title: 'คุณกำลังลบเมนูอาหารเเนะนำ?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.DeleteMenushow(key)
          this.$swal(
            'ลบเเล้ว!',
            'เมนูอาหารเเนะนำโดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    DelPro (key) {
      this.$swal({
        title: 'คุณกำลังลบโปรโมชั่นนี้?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.DelPromo(key)
          this.$swal(
            'ลบเเล้ว!',
            'โปรโมชั่นนี้โดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    DelRe (key) {
      this.$swal({
        title: 'คุณกำลังลบความคิดเห็นนี้?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.DelReview(key)
          this.$swal(
            'ลบเเล้ว!',
            'ความคิดเห็นนี้โดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
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
      permission: 'permission',
      cartProducts: 'cartProducts'
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
      // console.log(this.menus)
    })
    dbRefObjectshow.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.menushow = data
      console.log(this.menushow)
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
      console.log(this.detail)
    })
  }
}
</script>
<style>

.report {
  text-align: center;
}

.bucket {
  position: fixed;
  bottom: 5vh;
  left: 5vw;
  cursor: pointer;
  z-index: 100;
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
.foodList {
  border-radius: 10px;
  border: 2px solid #efefef;
  padding: 20px;
}
  .input[type=text], select {
    width: 100%;
  }
  .input[type=number], select {
    width: 100%;
  }
  .input.is-large, .textarea.is-large {
  font-size: 1.0rem;
  }
</style>
