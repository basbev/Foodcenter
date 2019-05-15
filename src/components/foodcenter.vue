<template>
  <div class='hello'>
    <center>
    <!-- <img src = "/static/logo1.png" width="300"> -->
    <carousel v-if="shops" :data="shopsSlide"></carousel>

    <div class="formAddRes">
      <div class="columns searchCol">
        <div class="column">
          <input type="text" v-model="Search" class="inputSearch" placeholder="ค้นหาร้านอาหาร" @input="filterShop(Search)">
        </div>
      </div>
      <div v-if="permission !== '1' & permission !== null" >
        <hr>
        <h3 class="is-size-4">เพิ่มร้านอาหาร</h3>
        <div class="columns">
          <div class="column">
            <input class="input is-large" type="text" v-model="name" placeholder="ชื่อร้านอาหาร">
          </div>
          <div class="column">
            <input class="input is-large" type="number" v-model="tel" placeholder="เบอร์">
          </div>
          <div class="column is-3">
            <button class="button is-warning" @click="insertTofoodcenter(tel, name)">
              <span class="icon is-small">
                <i class="fas fa-plus"></i>
              </span>
              เพิ่มร้านอาหาร
            </button>
          </div>
        </div>
      </div>
    </div>
    <section class="section" v-if="result !== ''">
        <div class="container">
          <div class="columns is-multiline">
            <article class="media card">
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
      <h1>&nbsp;&nbsp;{{result.name}}&nbsp;&nbsp;
      <img v-bind:src="result.status" width="70" height="55" ></h1>
      <img src="https://www.img.live/images/2018/11/20/img_352451.png" height="15">&nbsp;{{result.tel}}
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
  <section class="section" v-if="!showData.length > 0">
     <div class="allshop">
    <label>ร้านอาหารทั้งหมด {{this.numberOfShop}} ร้าน</label>
    </div>
        <div class="container">
          <div class="columns is-multiline" v-if="shops">
            <div class="column is-one-third" :key="detail.key" v-for="(detail) in shops">
              <div :class="(detail.status === 'https://www.img.live/images/2018/11/20/bb0bf29aaea59877.png' & permission !== null)?'has-background-white card shadow':'has-background-white card'">
              <article class="notification media has-background-white" @click="SelectShop(detail.key, detail.status)">
                <figure class="media-left">
                  <span class="icon">
                    <i class="has-text-warning fa fa-columns fa-lg"></i>
                  </span>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <div class="shopName"><h1 class="title is-size-4">ร้าน {{detail.name}}</h1></div>
                    <div class="shopRating"><img src="https://www.img.in.th/images/8c44fe4d804dca493a0e04341aa9e06f.png" width="20" height="20">&nbsp;
                      <span class="is-size-4">{{((detail.Rating) === 0)?'0.00':detail.Rating}}</span>
                    </div>
                    <!-- <div v-if="updateKey === key">
        <input type="text" v-model="updateName" placeholder="NAME">
        <input type="text" v-model="updateTel" placeholder="TEL">
        <button class="button button1" @click="updatefoodcenter(updateTel, updateName, detail.key)">Save</button>
      </div> -->
      <div>
        <div class="row">
          <div class="column">
        <img class="statusImg" v-bind:src="detail.status" width="70" height="55">
    <img src="https://www.img.live/images/2018/11/20/img_352451.png" class="imageTel">&nbsp;{{detail.tel}}
     <h1>คิวที่รอ :&nbsp;<span class="number">&nbsp;&nbsp;{{detail.q}}&nbsp;&nbsp;</span></h1>
     <h5>กำลังทำของ:&nbsp;{{detail.doing}}&nbsp;&nbsp;</h5>
        <!-- <button v-if="permission === '3'" class="button button4" @click="setUpdatefood(detail.tel, detail.name, key)">Update1</button> -->
        <!-- <button v-if="permission === '3'" class="button button6" @click="deletefoodcenter(detail.key)">Delete</button> -->
        </div>
        </div>
      </div>
                  </div>
                </div>
              </article>
                  <button v-if="permission === '3'" class="button button4" @click="setUpdatefoodcenter(detail.tel, detail.name, detail.key)">Update</button>
                  <button v-if="permission === '3'" class="button button3" @click="DelFood(detail.key)">Delete</button>
                  <button class="button button2-invert" @click="GoSee(detail.key)" v-if="detail.doing !== 'ว่าง'">Order&nbsp;</button>
                </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section" v-if="showData.length > 0">
    <label>กำลังค้นหา : {{Search}}</label>
        <div class="container">
          <div class="columns is-multiline">
            <div class="column is-one-third" :key="detail.key" v-for="(detail) in showData">
              <div :class="(detail.status === 'https://www.img.live/images/2018/11/20/bb0bf29aaea59877.png' & permission !== null)?'has-background-white card shadow':'has-background-white card'">
                <article class="notification media has-background-white" @click="SelectShop(detail.key, detail.status)">
                  <figure class="media-left">
                    <span class="icon">
                      <i class="has-text-warning fa fa-columns fa-lg"></i>
                    </span>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <div class="shopName"><h1 class="title is-size-4">ร้าน {{detail.name}}</h1></div>
                      <div class="shopRating"><img src="https://www.img.in.th/images/8c44fe4d804dca493a0e04341aa9e06f.png" width="20" height="20">&nbsp;
                        <span class="is-size-4">{{((detail.Rating) === 0)?'0.00':detail.Rating}}</span>
                      </div>
                      <div>
                        <div class="row">
                          <div class="column">
                            <img class="statusImg" v-bind:src="detail.status" width="70" height="55">
                            <img src="https://www.img.live/images/2018/11/20/img_352451.png" class="imageTel">&nbsp;{{detail.tel}}
                            <h1>คิวที่รอ :&nbsp;<span class="number">&nbsp;&nbsp;{{detail.q}}&nbsp;&nbsp;</span></h1>
                            <h5>กำลังทำของ:&nbsp;{{detail.doing}}&nbsp;&nbsp;</h5>
        <!-- <button v-if="permission === '3'" class="button button4" @click="setUpdatefood(detail.tel, detail.name, key)">Update1</button> -->
        <!-- <button v-if="permission === '3'" class="button button6" @click="deletefoodcenter(detail.key)">Delete</button> -->
        </div>
        </div>
      </div>
                  </div>
                </div>
              </article>
                  <button v-if="permission === '3'" class="button button4" @click="setUpdatefoodcenter(detail.tel, detail.name, detail.key)">Update</button>
                  <button v-if="permission === '3'" class="button button3" @click="DelFood(detail.key)">Delete</button>
                  <button class="button button2-invert" @click="GoSee(detail.key)" v-if="detail.doing !== 'ว่าง'">Order&nbsp;</button>
                </div>
            </div>
          </div>
        </div>
      </section>
        <div id="modal-ter" class="modal is-active" v-show="showModal" @close="showModal = false">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="box">
              <!-- <center><button class="delete" aria-label="close" @click="showModal = false"></button></center>
              <h3><center>Update {{updateName}}</center></h3><br> -->
              <header class="modal-card-head">
                <p class="modal-card-title">เเก้ไขร้านอาหาร {{tmp}}</p>
                <button class="delete" aria-label="close" @click="showModal = false">></button>
              </header>
              <form action>
                <br>
             <div>
              <!-- <div class="columns">
                <div class="column is-2">
                  ชื่อ :
                </div>
                <div class="column">
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updateName"
                    placeholder="ชื่อ"
                  >
                </div>
                <div class="column is-2">
                  นามสกุล :
                </div>
                <div class="column">
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updateTel"
                    placeholder="นามสุกล"
                  >
                </div>
              </div> -->
              <div class="columns">
                <div class="column is-3">
                  ชื่อร้านอาหาร :
                </div>
                <div class="column">
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updateName"
                    placeholder="ชื่อร้านอาหาร"
                  >
                </div>
              </div>
              <div class="columns">
                <div class="column is-3">
                  เบอร์ติดต่อร้านอาหาร :
                </div>
                <div class="column">
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updateTel"
                    placeholder="เบอร์ติดต่อร้านอาหาร"
                  >
                </div>
              </div>
              <button
                    class="button button1"
                    @click="updatefoodcenter(updateTel, updateName, updateKey)"
                  >save</button>

          </div>
        </form>
            </div>
          </div>
          <!-- <button class="modal-close" @click="showModal = false"></button> -->
        </div>
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
      numberOfShop: 0,
      showModal: false,
      tmp: '',
      shoppoints: ''
    }
  },
  methods: {
    insertTofoodcenter (tel, name) {
      let data = {
        tel: tel,
        name: name,
        q: 0,
        status: 'https://www.img.live/images/2018/11/20/d57b23a07352f87d.png',
        Rating: 0
      }
      let data2 = {
        count: 0,
        scorce: 0,
        shop: name
      }
      if (tel === '' || name === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        foodcenterRef.child('detail').child(this.name).set(data)
        foodcenterRef.child('shoppoint').child(this.name).set(data2)
        this.tel = ''
        this.name = ''
      }
    },
    setUpdatefoodcenter (tel, name, key) {
      this.updateKey = key
      this.updateTel = tel
      this.updateName = name
      this.showModal = true
      this.tmp = name
    },
    updatefoodcenter (tel, name, key) {
      foodcenterRef.child('detail').child(key).update({
        tel: tel,
        name: name
      })
      this.updateKey = ''
      this.updateTel = ''
      this.updateName = ''
      this.showModal = false
    },
    deletefoodcenter (key) {
      foodcenterRef.child('detail').child(key).remove()
    },
    SelectShop (name, status) {
      if (status === 'https://www.img.live/images/2018/11/20/bb0bf29aaea59877.png' && this.permission !== null) {
        this.$store.dispatch('selectShop', name)
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
    },
    GoSee (name) {
      this.$store.dispatch('selectShop', name)
        .then(
          user => {
            this.$router.push('/order')
          },
          err => {
            alert(err.message)
          }
        )
    },
    DelFood (key) {
      this.$swal({
        title: 'คุณกำลังลบร้านค้า?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.deletefoodcenter(key)
          this.$swal(
            'ลบเเล้ว!',
            'ร้านค้าโดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    async setUpdatefood1 (tel, name, key) {
      const inputValue = name
      const {
        value: Text
      } = await this.$swal({
        title: 'Input Text address',
        input: 'text',
        inputValue: inputValue,
        inputPlaceholder: 'ชื่อร้านอาหาร'
      })
      if (Text) {
        this.$swal('Entered Text: ' + Text)
      }
    },
    sortHighest () {
      this.shops.sort((a, b) => a.Rating < b.Rating ? 1 : -1)
    }
    // async setUpdatefood (tel, name, key) {
    //   // document.getElementById('swal-input1').value = name
    //   const {value: formValues} = await this.$swal({
    //     title: 'เเก้ไขร้านค้า',
    //     html:
    //       'ชื่อร้านค้า' +
    //       '<input id="swal-input1" class="swal2-input" placeholder="ชื่อร้านอาหาร" value=' + name + '>' +
    //       'เบอร์โทรร้านค้า' +
    //       '<input id="swal-input2" class="swal2-input" placeholder="ชื่อร้านอาหาร" value=' + tel + '>',
    //     focusConfirm: false,
    //     inputValidator: () => {
    //       return new Promise((resolve) => {
    //         if (document.getElementById('swal-input1').value === '') {
    //           resolve('You need to select oranges :)')
    //         } else {
    //           resolve('You need to select oranges :)')
    //         }
    //         // document.getElementById('swal-input1').value,
    //         // document.getElementById('swal-input2').value
    //       })
    //     }
    //     // inputValidator: (value) => {
    //     //   return new Promise((resolve) => {
    //     //     if (formValues[0] === 'oranges') {
    //     //       resolve()
    //     //     } else {
    //     //       // resolve('You need to select oranges :)')
    //     //     }
    //     //   })
    //     // }
    //   })
    //   if (formValues) {
    //     this.$swal(JSON.stringify(formValues))
    //     // this.updatefoodcenter()
    //   }
    // }
  },
  mounted () {
    const dbRefObject = foodcenterRef.child('detail')
    const shoppoint = foodcenterRef.child('shoppoint')
    shoppoint.on('value', snap => {
      this.shoppoints = snap.val()
      console.log(this.shoppoints)
    })
    dbRefObject.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
        this.numberOfShop = snap.numChildren()
      })
      this.shops = data
      this.sortHighest()
      // console.log(this.shops)
      // JSON.stringify(this.shops)
      // console.log(JSON.stringify(this.shops))
    })
  },
  computed: {
    ...mapGetters({
      permission: 'permission',
      selectShop: 'selectShop'
    }),
    shopsSlide () {
      let arr = []
      if (this.shops.length) {
        this.shops.forEach(function (shop, index) {
          let url = 'https://firebasestorage.googleapis.com/v0/b/foodcenter-23d67.appspot.com/o/' + shop.banner + '?alt=media&token=1fe47dd7-7085-4433-8dc5-b98ffb219d37'
          // arr.push('<img v-url={filename:'+ menu.foodpic+'} width="300" height="350"/>')
          arr.push('<span>' +
          '<img src="' + url + '" class="imgMenuCover">' +
          // '<span class="textCover"><h1 class="title has-text-white">' + menu.foodname + '</h1>' + menu.foodprice + ' บาท </span>' +
          // '<button @click="this.Cart(' + menu.foodname + ', ' + menu.foodprice + ', ' + menu.foodtype + ', ' + index + ')" class="button button3">เพิ่มลง Order</button>' +
          '</span>')
        })
      }
      return arr
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.imageTel {
  width: 15px;
  height: 15px;
}
input[type=text], select {
    padding: 1% 1%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
.inputSearch {
  /* width: 50%!important; */
  padding-bottom: 0px;
}
.formAddRes {
  background:#ffffff;
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  margin-top: 20px;
}
.report {
  text-align: center;
}

.allshop {
  font-size: 18px;
}
.number {
  margin-top: -20px;
  font-size: 30px;
  background-color: #ffdd57;
  border-radius: 50%;
  width: 70px;
  height: 70px;
}
.inputSearch {
  margin-top: 400px;
  position: relative;
}
.searchCol {
  margin-bottom: 0px;
}
.shopName, .shopRating {
  display: inline-block;
}
.shopRating {
  float: right;
}
.statusImg {
  top: 60%;
  right: 20px;
  position: absolute;
}
.shadow {
  box-shadow: none;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
}
.shadow:hover, .shadow:focus {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.card {
  margin: 0px;
  text-align: center;
}
.card article {
  margin-bottom: 0px;
  padding-bottom: 0px;
}
@media only screen and (max-width: 600px) {
  body {
    /* background-color: lightblue; */
  }
}

</style>
