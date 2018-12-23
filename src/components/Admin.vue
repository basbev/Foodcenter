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
      updateStatus: ''
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
    margin-top: 7px;
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
    margin-top: 7px;
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
    margin-top: 7px;
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
