<template>
    <div>
      <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet"><br>
        <h1 class="title">&nbsp;&nbsp;ข้อมูลผู้ใช้ และ ร้านอาหารใน Food Center</h1>
      <div class="card">
              <h4 id="let" class="title is-3">User</h4>
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">
                  จำนวน Users:&nbsp;{{this.numberOfuser}} <br>
                  Permission <br>
                  1 ลูกค้า &nbsp;&nbsp;2 ร้านค้า &nbsp;&nbsp;3 ผู้ดูเเลศูนย์อาหาร&nbsp;&nbsp;4. ผู้ดูเเลระบบ&nbsp;&nbsp;5. ร้านวัตถุดิบ
                </div>
              </article>
              <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>ชื่อผู้ใช้</th>
                    <th>พาสเวิร์ด</th>
                    <th>ชื่อ</th>
                    <th>นามสกุล</th>
                    <th>โทรศัทพ์</th>
                    <th>ที่อยู่</th>
                    <th>สิทธิ์เข้าถึง</th>
                    <th>เเก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <!-- <tfoot>
                  <tr>
                    <th>ชื่อผู้ใช้</th>
                    <th>พาสเวิร์ด</th>
                    <th>ชื่อ</th>
                    <th>นามสกุล</th>
                    <th>โทรศัทพ์</th>
                    <th>ที่อยู่</th>
                    <th>สิทธิ์เข้าถึง</th>
                    <th>เเก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </tfoot> -->
                <tbody>
                  <tr :key="key" v-for="(user, key) in users">
                    <td>{{user.username}}</td>
                    <!-- <td>{{user.password}}{{convertPassword(user.password)}}</td> -->
                    <td>{{convertPassword(user.password)}}</td>
                    <td>{{user.firstname}}</td>
                    <td>{{user.lastname}}</td>
                    <td>{{user.phonenumber}}</td>
                    <td>{{user.address}}</td>
                    <td v-if="user.permission === '1'">ลูกค้า</td>
                    <td v-if="user.permission === '2'">ร้านค้า</td>
                    <td v-if="user.permission === '3'">ผู้ดูเเลศูนย์อาหาร</td>
                    <td v-if="user.permission === '4'">ผู้ดูเเลระบบ</td>
                    <td v-if="user.permission === '5'">ร้านวัตถุดิบ</td>
                    <td class="has-text-centered">
                      <button @click="setUpdateUser(key, user.firstname, user.lastname, user.password, user.permission, user.phonenumber, user.address, user.username)" class="button button13">
                        <span class="aicon">
                          <i class="fas fa-edit"></i>
                        </span>
                      </button>
                    </td>
                    <td class="has-text-centered">
                      <button @click="befoceDeluser(key)" class="button button3">
                        <span class="aicon">
                          <i class="fas fa-trash"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div class="card">
              <h4 id="let" class="title is-3">ร้านอาหาร</h4>
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">
                  จำนวนร้านค้า:&nbsp;{{this.numberOfshop}}
                </div>
              </article>
              <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>ชื่อร้าน</th>
                    <th>เบอร์โทร</th>
                    <th>คิวที่รอ</th>
                    <th>สถานะ</th>
                    <th>เเก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <!-- <tfoot>
                  <tr>
                    <th>ชื่อร้าน</th>
                    <th>เบอร์โทร</th>
                    <th>คิวที่รอ</th>
                    <th>สถานะ</th>
                    <th>เเก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </tfoot> -->
                <tbody>
                  <tr :key="key" v-for="(shop, key) in shops">
                    <td>{{shop.name}}</td>
                    <td>{{shop.tel}}</td>
                    <td>{{shop.q}}</td>
                    <td><img v-bind:src="shop.status" width="80" height="60"></td>
                    <td class="has-text-centered">
                      <button @click="setUpdateshop(key, shop.name, shop.tel, shop.q, shop.status)" class="button button13">
                        <span class="aicon">
                          <i class="fas fa-edit"></i>
                        </span>
                      </button>
                    </td>
                    <td class="has-text-centered">
                      <button @click="befoceDelshop(key)" class="button button3">
                        <span class="aicon">
                          <i class="fas fa-trash"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div class="card">
              <h4 id="let" class="title is-3">Facebook</h4>
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">
                  จำนวน ID :&nbsp;{{this.numberOffacebook}}
                </div>
              </article>
  <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>อีเมล์</th>
                    <th>ชื่อผู้ใช้</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <!-- <tfoot>
                  <tr>
                    <th>อีเมล์</th>
                    <th>ชื่อผู้ใช้</th>
                    <th>ลบ</th>
                  </tr>
                </tfoot> -->
                <tbody>
                  <tr :key="key" v-for="(shop, key) in facebooks">
                    <td>{{shop.email}}</td>
                    <td>{{shop.username}}</td>
                    <td class="has-text-centered">
                      <button @click="befoceDelface(key)" class="button button3">
                        <span class="aicon">
                          <i class="fas fa-trash"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
          <!--show modal-->
          <div id="modal-ter" class="modal is-active" v-show="showModal" @close="showModal = false">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">เเก้ไขผู้ใช้</p>
                <button class="delete" aria-label="close" @click="Closemodal()"></button>
              </header>
              <section class="modal-card-body">
                <div class="content">
                  <!-- เนื้อหา -->
                  <!-- <form action> -->
                  <br>
                  <div>
                   <div class="columns">
                    <div class="column is-2">
                      Username :
                    </div>
                    <div class="column">
                      <input
                        class="form-control mb-2 input"
                        type="text"
                        v-model="updateusername"
                        placeholder="ชื่อผู้ใช้"
                      >
                    </div>
                    <div class="column is-2">
                      Password :
                    </div>
                    <div class="column">
                      <input
                       class="form-control mb-2 input"
                        type="Password"
                       v-model="updatepassword"
                        placeholder="พาสเวิร์ด"
                      >
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-2">
                      firstname :
                    </div>
                    <div class="column">
                      <input
                       class="form-control mb-2 input"
                        type="text"
                       v-model="updatefirstname"
                        placeholder="ชื่อ"
                      >
                    </div>
                    <div class="column is-2">
                      lastname :
                    </div>
                    <div class="column">
                      <input
                       class="form-control mb-2 input"
                        type="text"
                       v-model="updatelastname"
                        placeholder="นามสกุล"
                      >
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-2">
                      phone :
                    </div>
                    <div class="column">
                      <input
                       class="form-control mb-2 input"
                        type="text"
                       v-model="updatephone"
                        placeholder="เบอร์โทร"
                      >
                    </div>
                    <div class="column is-2">
                      address :
                    </div>
                    <div class="column">
                      <input
                       class="form-control mb-2 input"
                        type="text"
                       v-model="updateaddress"
                        placeholder="ที่อยู่"
                      >
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-2">
                      permission :
                    </div>
                    <!-- <div class="column is-4">
                      <input
                       class="form-control mb-2 input"
                        type="text"
                       v-model="updatepermission"
                        placeholder="การเข้าถึงข้อมูล"
                      >
                    </div> -->
                    <select v-model="updatepermission" style="width:25%">
                          <option value="1">ลูกค้า</option>
                          <option value="2">ร้านค้า</option>
                          <option value="3">ผู้ดูเเลศูนย์อาหาร</option>
                          <option value="4">ผู้ดูเเลระบบ</option>
                          <option value="5">ร้านวัตถุดิบ</option>
                        </select>
                  </div>
                </div>
                <!-- </form> -->
                <!-- เนื้อหา -->
              </div>
            </section>
            <footer class="modal-card-foot">
              <!-- <button class="button is-success">เพิ่มข้อมูล</button> -->
              <button class="button is-success" @click="updateUser(updateKey, updatepassword, updatefirstname, updatelastname, updatephone, updateaddress, updatepermission)">บันทึกข้อมูล</button>
              <button class="button" @click="Closemodal()">ยกเลิก</button>
            </footer>
                  <!--show modal-->
          </div>
        </div>
        <!--show modal-->
        <div id="modal-ter" class="modal is-active" v-show="showModal2" @close="showModal2 = false">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">เเก้ไขผู้ใช้</p>
              <button class="delete" aria-label="close" @click="Closemodal2()"></button>
            </header>
            <section class="modal-card-body">
              <div class="content">
                <!-- เนื้อหา -->
                <!-- <form action> -->
                <br>
                <div>
                 <div class="columns">
                  <div class="column is-2">
                    ชื่อร้าน :
                  </div>
                  <div class="column">
                    <input
                      class="form-control mb-2 input"
                      type="text"
                      v-model="updateName"
                      placeholder="ชื่อร้าน"
                    >
                  </div>
                  <div class="column is-2">
                    เบอร์ :
                  </div>
                  <div class="column">
                    <input
                     class="form-control mb-2 input"
                      type="text"
                     v-model="updateTel"
                      placeholder="เบอร์"
                    >
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-2">
                    จำนวนคิว :
                  </div>
                  <div class="column">
                    <input
                     class="form-control mb-2 input"
                      type="text"
                     v-model="updateQ"
                      placeholder="จำนวน"
                    >
                  </div>
                  <div class="column is-2">
                    สถานะ :
                  </div>
                  <div class="column">
                    <select name="status" v-model="updateStatus">
                      <option value="https://www.img.live/images/2018/11/20/bb0bf29aaea59877.png">เปิด</option>
                      <option value="https://www.img.live/images/2018/11/20/d57b23a07352f87d.png">ปิด</option>
                    </select>
                  </div>
                </div>
              </div>
              <!-- </form> -->
              <!-- เนื้อหา -->
            </div>
          </section>
          <footer class="modal-card-foot">
            <!-- <button class="button is-success">เพิ่มข้อมูล</button> -->
            <button class="button is-success" @click="updateShop(updateKey, updateName, updateTel, updateQ, updateStatus)">บันทึกข้อมูล</button>
            <button class="button" @click="Closemodal2()">ยกเลิก</button>
          </footer>
    <!--show modal-->
          </div>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase'
var database = firebase.database()
var userRef = database.ref('/user')
var shopRef = database.ref('/foodcenter').child('detail')
export default {
  name: 'Admin',
  data: function () {
    return {
      users: {},
      shops: {},
      numberOfuser: 0,
      numberOfshop: 0,
      search: '',
      updateKey: '',
      updatefirstname: '',
      updatelastname: '',
      updatepassword: '',
      updatepermission: '',
      updatephone: '',
      updateaddress: '',
      updateName: '',
      updateTel: '',
      updateQ: '',
      updateStatus: '',
      numberOffacebook: '',
      facebooks: '',
      showModal: '',
      showModal2: '',
      updateusername: ''
    }
  },
  methods: {
    setUpdateUser (key, firstname, lastname, password, permission, phone, address, username) {
      console.log(key)
      this.updateKey = key
      this.updatefirstname = firstname
      this.updatelastname = lastname
      this.updatepassword = password
      this.updatepermission = permission
      this.updatephone = phone
      this.updateaddress = address
      this.showModal = true
      this.updateusername = username
    },
    setUpdateshop (key, name, tel, q, status) {
      this.showModal2 = true
      this.updateKey = key
      this.updateName = name
      this.updateTel = tel
      this.updateQ = q
      this.updateStatus = status
    },
    updateUser (updateKey, updatepassword, updatefirstname, updatelastname, updatephone, updateaddress, updatepermission) {
      console.log(updateKey)
      userRef.child(updateKey).update({
        password: updatepassword,
        firstname: updatefirstname,
        lastname: updatelastname,
        phonenumber: updatephone,
        address: updateaddress,
        permission: updatepermission
      })
      this.updateKey = ''
      this.updatefirstname = ''
      this.updatelastname = ''
      this.updatepassword = ''
      this.updatepermission = ''
      this.updatephone = ''
      this.updateaddress = ''
      this.showModal = false
    },
    updateShop (key, name, tel, q, Status) {
      shopRef.child(key).update({
        name: name,
        q: q,
        status: Status,
        tel: tel
      })
      this.updateKey = ''
      this.updateName = ''
      this.updateTel = ''
      this.updateQ = ''
      this.updateStatus = ''
      this.showModal2 = false
    },
    Closemodal () {
      this.showModal = false
    },
    Closemodal2 () {
      this.showModal2 = false
    },
    Delshop (key) {
      firebase.database().ref().child('foodcenter/detail/').child(key).remove()
    },
    befoceDelshop (key) {
      this.$swal({
        title: 'คุณกำลังลบร้านอาหาร?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.Delshop(key)
          this.$swal(
            'ลบเเล้ว!',
            'ร้านอาหารโดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    befoceDelface (key) {
      this.$swal({
        title: 'คุณกำลังลบร้านอาหาร?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.Delface(key)
          this.$swal(
            'ลบเเล้ว!',
            'ร้านอาหารโดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    Delface (key) {
      firebase.database().ref().child('facebook/').child(key).remove()
    },
    befoceDeluser (key) {
      this.$swal({
        title: 'คุณกำลังลบร้านอาหาร?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.Deluser(key)
          this.$swal(
            'ลบเเล้ว!',
            'ร้านอาหารโดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    Deluser (key) {
      firebase.database().ref().child('user').child(key).remove()
    },
    convertPassword (password) {
      let str = ''
      for (var i = 0; i < password.length; i++) {
        str += '*'
      }
      return str
    }
  },
  mounted () {
    const Refuser = firebase.database().ref().child('user')
    const Reffacebook = firebase.database().ref().child('facebook')
    const RefFoodcenter = firebase.database().ref().child('foodcenter').child('detail')
    Refuser.on('value', snap => {
      this.users = snap.val()
      this.numberOfuser = snap.numChildren()
    })
    RefFoodcenter.on('value', snap => {
      this.shops = snap.val()
      this.numberOfshop = snap.numChildren()
      console.log(this.shops)
    })
    Reffacebook.on('value', snap => {
      this.facebooks = snap.val()
      this.numberOffacebook = snap.numChildren()
      console.log(this.facebooks)
    })
  },
  computed: {
  }
}
</script>
<style>
.nav {
    height: auto;
    margin-bottom: 2rem;
}
.nav-item img {
    max-height: 3.5rem;
}

.active-bottom-border {
    border-bottom: 3px solid #00d1b2;
    color: #00d1b2;
    padding-bottom: calc(.75rem - 8px);
}
</style>
