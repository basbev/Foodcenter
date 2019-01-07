<template>
  <div class='hello'>
    <center>
    <br><br><br>
    <img src = "/static/logo1.png" width="300">
    <div class="columns">
      <div class="column">
        <input type="text" v-model="Search" class="inputSearch" placeholder="ค้นหาร้านอาหาร" @input="filterShop(Search)">
      </div>
    </div>
    <div v-if="permission !== '1' & permission !== null" class="formAddRes">
      <h3>เพิ่มร้านอาหาร</h3>
      <div class="columns">
        <div class="column">
          <input class="input is-large" type="text" v-model="name" placeholder="ชื่อร้านอาหาร">
        </div>
        <div class="column">
          <input class="input is-large" type="number" v-model="tel" placeholder="เบอร์">
        </div>
        <div class="column is-3">
          <button class="button button1" @click="insertTofoodcenter(tel, name)">เพิ่มร้านอาหาร</button>
        </div>
      </div>
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
    <hr>
  <section class="section" v-if="!showData.length > 0">
     <div class="allshop">
    <label>ร้านอาหารทั้งหมด {{this.numberOfShop}} ร้าน</label>
    </div>
        <div class="container">
          <div class="columns is-multiline">
            <div class="column is-one-third" :key="detail.key" v-for="(detail) in shops">
              <article class="notification media has-background-white">
                <figure class="media-left">
                  <span class="icon">
                    <i class="has-text-warning fa fa-columns fa-lg"></i>
                  </span>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <h1 class="title is-size-4">ร้าน {{detail.name}}</h1>
                    <!-- <div v-if="updateKey === key">
        <input type="text" v-model="updateName" placeholder="NAME">
        <input type="text" v-model="updateTel" placeholder="TEL">
        <button class="button button1" @click="updatefoodcenter(updateTel, updateName, detail.key)">Save</button>
      </div> -->
      <div>
        <div class="row">
          <div class="column">
        <img v-bind:src="detail.status" width="70" height="55"><br>
    <img src="https://www.img.live/images/2018/11/20/img_352451.png" class="imageTel">&nbsp;{{detail.tel}}
     <h1>คิวที่รอ :&nbsp;<span class="number">&nbsp;&nbsp;{{detail.q}}&nbsp;&nbsp;</span></h1>
     <h5>กำลังทำของ:&nbsp;{{detail.doing}}&nbsp;&nbsp;</h5>
        <button v-if="permission === '3'" class="button button4" @click="setUpdatefoodcenter(detail.tel, detail.name, detail.key)">Update</button>
        <!-- <button v-if="permission === '3'" class="button button4" @click="setUpdatefood(detail.tel, detail.name, key)">Update1</button> -->
        <!-- <button v-if="permission === '3'" class="button button6" @click="deletefoodcenter(detail.key)">Delete</button> -->
        <button v-if="permission === '3'" class="button button3" @click="DelFood(detail.key)">Delete</button>
        <button v-if="detail.status === 'https://www.img.live/images/2018/11/20/bb0bf29aaea59877.png' & permission !== null" @click="SelectShop(detail.key)" class="button button6">Select&nbsp;</button>
        <button class="button button2" @click="GoSee(detail.key)">Order&nbsp;</button>
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
            <div class="column is-one-third" :key="detail.key" v-for="(detail) in showData">
              <article class="notification media has-background-white">
                <figure class="media-left">
                  <span class="icon">
                    <i class="has-text-warning fa fa-columns fa-lg"></i>
                  </span>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <h1 class="title is-size-4">ร้าน</h1>
                    <!-- <div v-if="updateKey === key">
        <input type="text" v-model="updateName" placeholder="NAME">
        <input type="text" v-model="updateTel" placeholder="TEL">
        <button class="button button1" @click="updatefoodcenter(updateTel, updateName, detail.key)">Save</button>
      </div> -->
      <div>
        <div class="row">
          <div class="column">
        <h1>&nbsp;&nbsp;{{detail.name}}&nbsp;&nbsp;<img v-bind:src="detail.status" width="70" height="55" ></h1>
    <h5><img src="https://www.img.live/images/2018/11/20/img_352451.png" width="25" height="20">&nbsp;{{detail.tel}}</h5>
     <h2>คิวที่ต้องรอ :&nbsp;<hk>&nbsp;&nbsp;{{detail.q}}&nbsp;&nbsp;</hk></h2>
     <h5>กำลังทำของ:&nbsp;{{detail.doing}}&nbsp;&nbsp;</h5>
        <button v-if="permission === '3'" class="button button4" @click="setUpdatefoodcenter(detail.tel, detail.name, detail.key)">Update</button>
        <!-- <button v-if="permission === '3'" class="button button6" @click="deletefoodcenter(detail.key)">Delete</button> -->
        <button v-if="permission === '3'" class="button button6" @click="DelFood(detail.key)">Delete</button>
        <button v-if="detail.status === 'https://www.img.live/images/2018/11/20/bb0bf29aaea59877.png'" @click="SelectShop(detail.key)" class="button button3">Select</button>
        <button class="button button2" @click="GoSee(detail.key)">Order</button>
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
      tmp: ''
    }
  },
  methods: {
    insertTofoodcenter (tel, name) {
      let data = {
        tel: tel,
        name: name,
        q: 0,
        status: 'https://www.img.live/images/2018/11/20/d57b23a07352f87d.png'
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
  width: 30%!important;
}
.formAddRes {
  background:#ffffff;
  width: 80%;
  padding: 20px;
  border-radius: 10px;
}
.report {
  text-align: center;
}

.allshop {
  font-size: 18px;
}
.number {
  font-size: 30px;
  background-color: #ffdd57;
  border-radius: 50%;
}
.swal2-popup #swal2-content {
    text-align: left;
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
