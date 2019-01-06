<template>
    <div>
      <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet"><br>
        <h1 class="title">&nbsp;&nbsp;ข้อมูลผู้ใช้ และ ร้านอาหารใน Food Center</h1>
      <div class="box">
              <h4 id="let" class="title is-3">User</h4>
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">
                  จำนวน Users:&nbsp;{{this.numberOfuser}} <br>
                  Permission <br>
                  1 ลูกค้า &nbsp;&nbsp;2 ร้านค้า &nbsp;&nbsp;3 ผู้ดูเเลศูนย์อาหาร&nbsp;&nbsp;4. ผู้ดูเเลระบบ
                </div>
              </article>
              <div class="message-body">
                                    <div class="container">
                                      <div class="columns is-multiline">
 <div class="column is-5" :key="key" v-for="(user, key) in users">
   <div v-if="updateKey === key">
     <input type="text" v-model="user.username" placeholder="Username" disabled>
     <input type="text" v-model="updatepassword" placeholder="password">
     <input type="text" v-model="updatefirstname" placeholder="firstname">
     <input type="text" v-model="updatelastname" placeholder="lastname">
     <input type="text" v-model="updatephone" placeholder="phone">
     <input type="text" v-model="updateaddress" placeholder="address">
     <input type="text" v-model="updatepermission" placeholder="permission">
     <button class="button button4" @click="updateUser(key, updatepassword, updatefirstname, updatelastname, updatephone, updateaddress, updatepermission)">Save</button>
   </div>
   <div v-else>
        <h1>Username:&nbsp;{{user.username}} Password:&nbsp;{{user.password}} firstname:&nbsp;{{user.firstname}}
          lastname:&nbsp;{{user.lastname}} phone:&nbsp;{{user.phonenumber}} address:&nbsp;{{user.address}}
          permission:&nbsp;{{user.permission}}
        </h1>
        <button class="button button4" @click="setUpdateUser(key, user.firstname, user.lastname, user.password, user.permission, user.phonenumber, user.address)">Update</button>
   </div>
      </div>
                          </div>
                </div>
                </div>
          </div>
          <div class="box">
              <h4 id="let" class="title is-3">ร้านอาหาร</h4>
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">
                  จำนวนร้านค้า:&nbsp;{{this.numberOfshop}}
                </div>
              </article>
  <div class="message-body">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-5" :key="key" v-for="(shop, key) in shops">
            <div v-if="updateKey === key">
      <input type="text" v-model="updateName" placeholder="Name">
     <input type="text" v-model="updateTel" placeholder="Phonenumber">
     <input type="text" v-model="updateQ" placeholder="Q">
     <input type="text" v-model="updateStatus" placeholder="Status">
     <button class="button button4" @click="updateShop(key, updateName, updateTel, updateQ, updateStatus)">Save</button>
              </div>
                <div v-else>
                  <h1>ชื่อร้าน:&nbsp;{{shop.name}} เบอร์:&nbsp;{{shop.tel}} จำนวนคิว:&nbsp;{{shop.q}} สถานะ:&nbsp;<img v-bind:src="shop.status" width="80" height="60"></h1>
                  <button class="button button4" @click="setUpdateshop(key, shop.name, shop.tel, shop.q, shop.status)">Update</button>
                    </div>
        </div>
                                    </div>
                          </div>
                </div>
          </div>
          <div class="box">
              <h4 id="let" class="title is-3">Facebook</h4>
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">
                  จำนวน ID :&nbsp;{{this.numberOffacebook}}
                </div>
              </article>
  <div class="message-body">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-5" :key="key" v-for="(shop, key) in facebooks">
                  <h1>Email: &nbsp;{{shop.email}} Username: &nbsp;{{shop.username}} </h1>
        </div>
                                    </div>
                          </div>
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
      facebooks: ''
    }
  },
  methods: {
    setUpdateUser (key, firstname, lastname, password, permission, phone, address) {
      this.updateKey = key
      this.updatefirstname = firstname
      this.updatelastname = lastname
      this.updatepassword = password
      this.updatepermission = permission
      this.updatephone = phone
      this.updateaddress = address
    },
    setUpdateshop (key, name, tel, q, status) {
      this.updateKey = key
      this.updateName = name
      this.updateTel = tel
      this.updateQ = q
      this.updateStatus = status
    },
    updateUser (key, updatepassword, updatefirstname, updatelastname, updatephone, updateaddress, updatepermission) {
      userRef.child(key).update({
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
      console.log(key)
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
    }
  },
  mounted () {
    const Refuser = firebase.database().ref().child('user')
    const Reffacebook = firebase.database().ref().child('facebook')
    const RefFoodcenter = firebase.database().ref().child('foodcenter').child('detail')
    Refuser.on('value', snap => {
      this.users = snap.val()
      this.numberOfuser = snap.numChildren()
      console.log(this.users)
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
