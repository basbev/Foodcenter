<template>
  <div class='hello'>
    <center><link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
    <br><br><br>
    <img src = "/static/logo1.png" width="300">
    <div v-if="permission !== '1'">
      <input class="putname" type="text" v-model="name" placeholder="ชื่อร้านอาหาร">
      <input class="putphone" type="text" v-model="tel" placeholder="เบอร์">
      <button class="button button10" @click="insertTofoodcenter(tel, name)">เพิ่มร้านอาหาร</button>
    </div>
    <div>
      <input type="text" v-model="Search" placeholder="ค้นหาร้านอาหาร" @input="filterShop(Search)">
    </div>
    <section class="section" v-if="result !== ''">
        <div class="container">
          <div class="columns is-multiline">
            <article class="notification media">
                <figure class="media-left">
                  <span class="icon">
                    <i class="has-text-warning fa fa-columns fa-lg"></i>
                  </span>
                </figure>
                <div class="media-content">
                  <div class="content">
                     <div class="row">
          <div class="column">
    <div>
     <h1>&nbsp;&nbsp;{{result.name}}&nbsp;&nbsp;<img v-bind:src="result.status" width="70" height="55" ></h1>
    <h3><img src="https://www.img.live/images/2018/11/20/img_352451.png" width="25" height="20">&nbsp;{{result.tel}}</h3>
     <h1>คิวที่ต้องรอ :&nbsp;<hk>&nbsp;&nbsp;{{result.q}}&nbsp;&nbsp;</hk></h1>
     <h1>กำลังทำของ:&nbsp;{{result.doing}}&nbsp;&nbsp;</h1>
    </div>
    </div>
        </div>
      </div>
                  </div>
              </article>
          </div>
        </div>
      </section>
    </center>
    <hr>
  <section class="section" v-if="!showData.length > 0">
     <div class="allshop">
    <label>ร้านอาหารทั้งหมด {{this.numberOfShop}} ร้าน</label>
    </div>
        <div class="container">
          <div class="columns is-multiline">
            <div class="column is-one-third" :key="detail.key" v-for="(detail, key) in shops">
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
        <button class="button button2" @click="updatefoodcenter(updateTel, updateName, detail.key)">Save</button>
      </div>
      <div v-else>
        <div class="row">
          <div class="column">
        <h1>&nbsp;&nbsp;{{detail.name}}&nbsp;&nbsp;<img v-bind:src="detail.status" width="70" height="55" ></h1>
    <h3><img src="https://www.img.live/images/2018/11/20/img_352451.png" width="25" height="20">&nbsp;{{detail.tel}}</h3>
     <h1>คิวที่ต้องรอ :&nbsp;<hk>&nbsp;&nbsp;{{detail.q}}&nbsp;&nbsp;</hk></h1>
     <h1>กำลังทำของ:&nbsp;{{detail.doing}}&nbsp;&nbsp;</h1>
        <button v-if="permission === '3'" class="button button4" @click="setUpdatefoodcenter(detail.tel, detail.name, key)">Update</button>
        <button v-if="permission === '3'" class="button button6" @click="deletefoodcenter(detail.key)">Delete</button>
        <button v-if="detail.status === 'https://www.img.live/images/2018/11/20/bb0bf29aaea59877.png'" @click="SelectShop(detail.key)" class="button button3">Select</button>
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
      <section class="section" v-if="showData.length > 0">
    <label>กำลังค้นหา : {{Search}}</label>
        <div class="container">
          <div class="columns is-multiline">
            <div class="column is-one-third" :key="key" v-for="(detail, key) in showData">
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
        <button class="button button2" @click="updatefoodcenter(updateTel, updateName, detail.key)">Save</button>
      </div>
      <div v-else>
        <div class="row">
          <div class="column">
        <h1>&nbsp;&nbsp;{{detail.name}}&nbsp;&nbsp;<img v-bind:src="detail.status" width="70" height="55" ></h1>
    <h3><img src="https://www.img.live/images/2018/11/20/img_352451.png" width="25" height="20">&nbsp;{{detail.tel}}</h3>
     <h1>คิวที่ต้องรอ :&nbsp;<hk>&nbsp;&nbsp;{{detail.q}}&nbsp;&nbsp;</hk></h1>
     <h1>กำลังทำของ:&nbsp;{{detail.doing}}&nbsp;&nbsp;</h1>
        <button v-if="permission === '3'" class="button button4" @click="setUpdatefoodcenter(detail.tel, detail.name, key)">Update</button>
        <button v-if="permission === '3'" class="button button6" @click="deletefoodcenter(detail.key)">Delete</button>
        <button v-if="detail.status === 'https://www.img.live/images/2018/11/20/bb0bf29aaea59877.png'" @click="SelectShop(detail.key)" class="button button3">Select</button>
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
import { mapGetters } from 'vuex'
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
      count: 0,
      result: '',
      Search: '',
      showData: [],
      numberOfShop: 0
    }
  },
  methods: {
    insertTofoodcenter (tel, name) {
      let data = {
        tel: tel,
        name: name,
        q: 0,
        status: 'ปิดบริการ'
      }
      foodcenterRef.child('detail').child(this.name).set(data)
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
      this.$store.dispatch('selectShop', name)
        .then(
          user => {
            this.$router.push('/shop')
          },
          err => {
            alert(err.message)
          }
        )
    },
    Searchnow (Search) {
      this.result = ''
      // const newsRef2 = foodcenterRef.child('detail').child('ป้าสมบูรณ์').orderByChild('name').equalTo('ป้าสมบูรณ์')
      const newsRef2 = foodcenterRef.child('detail').orderByChild('name').equalTo(this.Search)
      newsRef2.on('child_added', snap => {
        this.result = snap.val()
        console.log(this.result)
      })
    },
    filterShop (Search) {
      if (Search.length > 0) {
        this.showData = this.shops.filter(
          (shop) => {
            if (shop.name.toString().indexOf(Search) >= 0 ||
              shop.tel.toString().indexOf(Search) >= 0 ||
              shop.q.toString().indexOf(Search) >= 0) {
              return shop
            }
          }
        )
      } else {
        this.showData = []
      }
    }
  },
  mounted () {
    const dbRefObject = foodcenterRef.child('detail')
    dbRefObject.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
        this.numberOfShop = snap.numChildren()
      })
      this.shops = data
      console.log(this.shops)
      JSON.stringify(this.shops)
      // console.log(JSON.stringify(this.shops))
    })
  },
  computed: {
    ...mapGetters({
      permission: 'permission',
      selectShop: 'selectShop'
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.report {
  text-align: center;
}
.button {
    background-color: rgb(37, 108, 175);
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
    font-size: 15px;
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
    margin-top: 7px;
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
.button8 {
    margin-top: 7px;
    width: 12%;
    background-color: white;
    color: black;
    border: 2px solid #f44336;
}
.button8:hover {
    background-color: #f42136;
    color: white;
}
.button10 {
    font-size: 20px;
    margin-top: 7px;
    width: 10%;
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
}
.button10:hover {
    background-color: #4CAF50;
    color: white;
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
.putname{
  width: 15%;
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
.allshop {
  font-size: 18px;
}
hk {
   font-size: 30px;
    background-color: #F0E68C;
}
</style>
