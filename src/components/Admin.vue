<template>
    <div>
      <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet"><br>
        <h1 class="title">&nbsp;&nbsp;ข้อมูล User และร้านค้าใน Food Center</h1>
      <div class="box">
              <h4 id="let" class="title is-3">User</h4>
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">
                  จำนวน Users:&nbsp;{{this.numberOfuser}}
                </div>
              </article>
              <div class="message-body">
                                    <div class="container">
                                      <div class="columns is-multiline">
 <div class="column is-5" :key="key" v-for="(user, key) in users">
 <div :key="key" v-for="(user, key) in user">
        <h1>Username:&nbsp;{{user.username}} Password:&nbsp;{{user.password}} Permiision:&nbsp;{{user.permission}}</h1>
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
                       <div :key="key" v-for="(shop, key) in shop">
        <h1>ชื่อร้าน:&nbsp;{{shop.name}} เบอร์:&nbsp;{{shop.tel}} จำนวนคิว:&nbsp;{{shop.q}}</h1>
      </div>
        </div>
                                    </div>
                          </div>
                </div>
          </div>
      <section class="container cards-container">
        <div :key="key" v-for="(shop, key) in shops">
      <div :key="key" class="column is-narrow" v-for="(shop, key ) in filteredshop">
                <!-- Loop through the `items` array from the current season to show each item -->
                <span>{{ shops }}</span>
              </div>
        </div>
    </section>
    </div>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: 'Admin',
  data: function () {
    return {
      users: {},
      shops: {},
      numberOfuser: 0,
      numberOfshop: 0,
      search: ''
    }
  },
  methods: {
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
    firebase.database().ref().child('foodcenter').child('detail').on('value', function (snapshot) {
      console.log('There are ' + snapshot.numChildren() + 'messages')
    })
  },
  computed: {
    filteredshop (shop) {
      var _this = this
      if (this.search.length === 0) return this.shop
      return this.shop.map(function (shop) {
        return {
          name: shop.name.filter(function (name) {
            return name.includes(_this.search)
          })
        }
      })
    }
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
