<template>
  <div class='hello'>
    <center><link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
    <img src = "/static/logo1.png" width="300">
    <div>
      <input type="text" v-model="name" placeholder="ชื่อร้านอาหาร">
      <input type="text" v-model="tel" placeholder="เบอร์">
      <button class="button button7" @click="insertTofoodcenter(tel, name)">เพิ่มร้านอาหาร</button>
    </div></center>
    <hr>
  <section class="section">
        <div class="container">
          <div class="columns is-multiline">
            <div class="column is-one-third" :key="key" v-for="(details, key) in shops">
              <article class="notification media has-background-white">
                <figure class="media-left">
                  <span class="icon">
                    <i class="has-text-warning fa fa-columns fa-lg"></i>
                  </span>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <h1 class="title is-size-4">ร้าน</h1>
                    <div v-if="updateKey === key">
        <input type="text" v-model="updateName" placeholder="NAME">
        <input type="text" v-model="updateTel" placeholder="TEL">
        <button class="button button2" @click="updatefoodcenter(updateTel, updateName, key)">Save</button>
      </div>
      <div v-else>
        <div class="row">
          <div class="column">
        <h1>&nbsp;&nbsp;{{details.name}}</h1>
    <h3>Tel:&nbsp;{{details.tel}}</h3>
     <h1>คิวที่ต้องรอ :&nbsp;<hk>&nbsp;&nbsp;{{details.q}}&nbsp;&nbsp;</hk></h1>
        <button class="button button4" @click="setUpdatefoodcenter(details.tel, details.name, key)">Update</button>
        <button class="button button6" @click="deletefoodcenter(key)">Delete</button>
        <button @click="SelectShop(details.name)" class="button button3">Select</button>
        </div>
        </div>
      </div>
                  </div>
                </div>
              </article>
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
  name: 'foodcenter',
  data () {
    return {
      foodcenters: {},
      tel: '',
      name: '',
      updateTel: '',
      updateName: '',
      updateKey: '',
      q: '',
      shops: {},
      orders: {},
      count: 0
    }
  },
  methods: {
    insertTofoodcenter (tel, name) {
      let data = {
        tel: tel,
        name: name,
        q: 0
      }
      foodcenterRef.child('detail').push(data)
      this.tel = ''
      this.name = ''
    },
    setUpdatefoodcenter (tel, name, key) {
      this.updateKey = key
      this.updateTel = tel
      this.updateName = name
    },
    updatefoodcenter (tel, name, key) {
      foodcenterRef.child('detail').child(key).update({
        tel: tel,
        name: name
      })
      this.updateKey = ''
      this.updateTel = ''
      this.updateName = ''
    },
    deletefoodcenter (key) {
      foodcenterRef.child('detail').child(key).remove()
    },
    SelectShop (name) {
      this.$store.dispatch('selectShop', {name})
        .then(
          user => {
            this.$router.push('/shop')
          },
          err => {
            alert(err.message)
          }
        )
    }
  },
  mounted () {
    const dbRefObject = foodcenterRef.child('detail')
    dbRefObject.on('value', snap => {
      this.shops = snap.val()
      console.log(this.shops)
      console.log(this.selectShop)
    })
    const dbRefOrder = foodcenterRef.child('order')
    dbRefOrder.on('value', snap => {
      this.orders = snap.val()
      console.log(this.orders)
    })
  },
  computed: {
    selectShop () {
      return this.$store.getters.selectShop
    }
  }
}
// <div :key="key" v-for="(order, key) in orders" v-if="key === detail.name">
//      <div :key="key" v-for="(order, key) in order">
//         <div :key="key" v-for="(shopee, key) in order">
//    </div>
//    </div>
//    </div>
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
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
}
.button1:hover {
    background-color: #4CAF50;
    color: white;
}
.button2 {
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #008CBA;
}
.button2:hover {
    background-color: #008CBA;
    color: white;
}
.button3 {
    margin-bottom: 7px;
    background-color: white;
    color: black;
    border: 2px solid #f44336;
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
}
.button4:hover {background-color: #B8860B;
}
.button5 {
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #7FFF00;
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
}
input[type=number], select {
    width: 10%;
    padding: 1% 1%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
div {
  font-family: 'Prompt', sans-serif;
}
hk {
   font-size: 30px;
    background-color: #F0E68C;
}
</style>
