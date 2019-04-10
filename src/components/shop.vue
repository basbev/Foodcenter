<template>
<div>
  <link href="https://fonts.googleapis.com/css?family=Sriracha" rel="stylesheet">
    <section class="section">
      <div class="container"><br>
        <div class="columns">
          <div class="column is-3">
            <aside class="is-medium menu">
          <ul class="menu-list">
            <li><a href="#let1" class="is-active"><i class=""></i> เมนูทั่วไป</a></li>
            <li><a href="#let2" class="is-active"><i class=""></i> ความเห็นจากลูกค้า</a></li>
          </ul>
            </aside>
          </div>
          <div class="column is-9">
            <div class="content is-medium">
              <div class="content">
                <div class="box">
              <img v-url={filename:detail.banner}>
              <div :key="key" v-if="(shop, key) in detail"></div>
                 <h3 class="title is-3">ร้าน&nbsp; {{ detail.name }}&nbsp;&nbsp;<img src="https://www.img.live/images/2018/11/20/img_352451.png" height="15">&nbsp;{{ detail.tel }}&nbsp;<img v-bind:src="detail.status" width="90" height="70" ></h3>
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
          <input type="text" v-model="Search" placeholder="ค้นหาเมนู" @input="filterShop(Search)" class="input is-large">
          <br>ค้นหาแบบประเภทอาหาร
          <select v-model="Searchtype" placeholder="ค้นหาตามประเภท">
            <option value="ผัด">ผัด</option>
            <option value="ทอด">ทอด</option>
            <option value="ต้ม">ต้ม</option>
            <option value="แกง">แกง</option>
            <option value="นึ่ง">นึ่ง</option>
            <option value="ย่าง">ย่าง</option>
          </select>
          <button @click="filterShop2(Searchtype)">ค้นหาตามประเภท</button>
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
        <div class="column is-6" v-for="(menu) in showData" :key="menu.Key">
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
                <h4 id="let1" class="title is-3">เมนูประจำร้าน</h4>
              </article>
              <div class="message-body">
                                    <div class="container">
                  <div class="columns is-multiline">
                                    <div class="column is-5" :key="key" v-for="(menu, key) in menus">
                      <h3>{{menu.foodname}}</h3>
                      <h6>ราคา:&nbsp;{{menu.foodprice}}&nbsp;บาท</h6>
                      <h6>จำนวน:&nbsp;{{menu.amount}}&nbsp;ชิ้น</h6>
                      <img v-url={filename:menu.foodpic} width="300" height="350"/><br>
                      <button v-if="checkstock[key] === 1" class="button is-danger" disabled>เพิ่มลง Order</button>
                      <button v-if="checkstock[key] === 0" @click="Cart(menu.foodname, menu.foodprice, menu.foodtype, menu.key, menu.meters)" class="button button3">เพิ่มลง Order</button>
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
<div class="field is-horizontal" v-for="ameter in meters" :key="ameter.id">
  <div class="field-label is-normal">
    <label class="label">วัตถุดิบ</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control is-expanded">
        <select name="main meter" v-model="ameter.name" aria-readonly="">
          <!-- <option value="ข้าว">ข้าว</option>
          <option value="ไข่">ไข่</option>
          <option value="หมู">หมู</option>
          <option value="ไก่">ไก่</option>
          <option value="ปลา">ปลา</option>
          <option value="หมึก">หมึก</option>
          <option value="กุ้ง">กุ้ง</option> -->
          <option
              :key="key"
              v-for="(dep, key) in datastock"
              :value="dep.stockname"
              >{{dep.stockname}}</option>
        </select>
      </p>
    </div>
    <div class="field">
      <p class="control is-expanded">
        <input class="input is-success" type="number" placeholder="จำนวน" v-model="ameter.qty">
      </p>
    </div>
  </div>
</div>
<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">วัตถุดิบ</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control is-expanded">
        <select name="main meter" v-model="meter.name">
          <!-- <option value="ข้าว">ข้าว</option>
          <option value="ไข่">ไข่</option>
          <option value="หมู">หมู</option>
          <option value="ไก่">ไก่</option>
          <option value="ปลา">ปลา</option>
          <option value="หมึก">หมึก</option>
          <option value="กุ้ง">กุ้ง</option> -->
          <option
              :key="key"
              v-for="(dep, key) in datastock"
              :value="dep"
              >{{dep.stockname}}</option>
        </select>
      </p>
    </div>
    <div class="field">
      <p class="control is-expanded">
        <input class="input is-success" type="number" placeholder="จำนวน" v-model="meter.qty" value="1">
      </p>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-primary" @click="addMeter()">
          Add
        </button>
      </div>
    </div>
  </div>
</div>

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
      <button class="button button11" @click="insertmenu(foodname, foodprice, foodtype, foodpic,meters)">เพิ่มเมนู</button>
      <span class="file-name" v-if="dataImg3">
        {{this.dataImg3.name}}
      </span>
            </div>
    </div>
           <div class="box">
              <h4 id="let2" class="title is-3">ความเห็นจากลูกค้า</h4>
                                    <div class="row" :key="key" v-for="(review, key) in review">
                      <div class="message-body"><p><h5>Review:&nbsp;</h5>{{review.view}}
                      <br>
                       <h5>โดย คุณ:&nbsp;{{review.namere}}</h5><br>
                       <button v-if="permission !== '1'" class="button button3" @click="DelRe(key)">ลบความเห็น</button>
                       </div>
                          </div>
                <input type="text" v-model="view" placeholder="รีวิว" size="30" class="input is-large">
                <button class="button button12" @click="insertreview(view)">เพิ่มรีวิว</button><br>
                 คะแนนความพอใจ&nbsp;
               <label>
  <input type="radio" name="gender" value="1" v-model="scorce" checked>
  <img src="https://www.img.in.th/images/486b6b89ed3a3edf208dff6e23fbafe0.png" width="50" height="50">&nbsp;
</label>
<label>
  <input type="radio" name="gender" value="2" v-model="scorce" checked>
  <img src="https://www.img.in.th/images/cd14adea49489f944878fcc639e8a57e.png" width="50" height="50">&nbsp;
</label>
<label>
  <input type="radio" name="gender" value="3" v-model="scorce" checked>
  <img src="https://www.img.in.th/images/510e0be800bc068fd916dab1d805b191.png" width="50" height="50">&nbsp;
</label>
<label>
  <input type="radio" name="gender" value="4" v-model="scorce" checked>
  <img src="https://www.img.in.th/images/5bf2ec6b8f18634def9581978db43b47.png" width="50" height="50">&nbsp;
</label>
<label>
  <input type="radio" name="gender" value="5" v-model="scorce" checked>
  <img src="https://www.img.in.th/images/8256a389f0bd4eea53824c49a6e54752.png" width="50" height="50">&nbsp;
</label>
      <button class="button button12" @click="insertreviewpoint(scorce)">เพิ่มคะแนนร้านค้า</button>
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
      tmp: '',
      vote: '',
      meter: {
        name: '',
        qty: 1
      },
      meters: [],
      datastock: [],
      checkstock: [],
      tmp1: ''
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
    async insertmenu (foodname, foodprice, foodtype, foodpic, meters) {
      let data = {
        foodname: foodname,
        foodtype: foodtype,
        foodprice: foodprice,
        meters: meters,
        foodpic: this.dataImg3.name
      }
      if (foodname === '' || foodprice === '' || this.dataImg3 === '' || foodtype === '' || meters === '') {
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
        this.meters = []
        this.meter = {
          name: '',
          qty: 1
        }
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
    insertreviewpoint (scorce) {
      scorce = parseInt(scorce, 10)
      console.log(scorce)
      let data = {
        scorce: scorce,
        count: 1,
        shop: this.selectShop
      }
      if (isNaN(scorce)) {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรุณาเลือกคะแนนร้านค้า'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        if (this.vote.length !== 0) {
          console.log(this.vote)
          let Refcount = this.vote[0].count + 1
          let Refscorce = this.vote[0].scorce + scorce
          foodcenterRef.child('shoppoint').child(this.vote[0].key).child('count').set(Refcount)
          foodcenterRef.child('shoppoint').child(this.vote[0].key).child('scorce').set(Refscorce)
        } else {
          console.log('else')
          foodcenterRef.child('shoppoint').child(this.selectShop).set(data)
        }
        this.scorce = ''
        alert('ให้คะแนนร้านค้าเรียบร้อยแล้ว')
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
    Cart (foodname, foodprice, type, key, meters) {
      this.$store.dispatch('AddCart', {foodname, foodprice, type, key, meters})
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
    filterShop2 (Searchtype) {
      console.log('ทำ')
      if (Searchtype.length > 0) {
        this.showData = this.menus.filter(
          (shop) => {
            if (shop.foodtype === Searchtype) {
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
    addMeter () {
      this.meter.keystock = this.meter.name.key
      this.meter.name = this.meter.name.stockname
      this.meter.qty = parseInt(this.meter.qty, 10)
      this.meters.push(this.meter)
      this.meter = {
        name: '',
        qty: 1
      }
      console.log(this.meters)
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
    },
    async checkstocklist (data) {
      var stock = ''
      for (var x = 0; x < this.menus.length; x++) {
        var tmp = 0
        for (var y = 0; y < this.menus[x].meters.length; y++) {
          const checked = foodcenterRef.child('stock').child(this.selectShop).child(this.menus[x].meters[y].keystock)
          await checked.on('value', snap => {
            stock = snap.val()
          })
          if (this.menus[x].meters[y].qty <= stock.stockamount && tmp !== 1) { tmp = 0 } else { tmp = 1 }
        }
        this.checkstock.push(tmp)
      }
      this.$store.dispatch('stocklist', data)
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
    const dbRefObjectvote = foodcenterRef.child('shoppoint').orderByChild('shop').equalTo(this.selectShop)
    const dbRefObjectstock = foodcenterRef.child('stock').child(this.selectShop)
    dbRefObject.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.menus = data
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
    })
    dbRefObjectMenuhit.orderByChild('amount').limitToLast(3).on('value', snap => {
      this.records = snap.val()
    })
    dbRefObjectpromo.on('value', snap => {
      this.promo = snap.val()
    })
    dbRefObjectdetail.on('value', snap => {
      this.detail = snap.val()
      console.log(this.detail.banner)
    })
    dbRefObjectvote.on('value', snap => {
      var datavote = []
      snap.forEach(ss => {
        var itemvote = ss.val()
        itemvote.key = ss.key
        datavote.push(itemvote)
      })
      this.vote = datavote
      console.log(this.vote)
    })
    dbRefObjectstock.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.datastock = data
      this.checkstocklist(data)
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
  div {
  font-family: 'Sriracha', cursive;
}
</style>
