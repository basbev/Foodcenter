<template>
  <div class="hello">
  <div class="container profile">
    <!-- <div class="section profile-heading">
      <div class="columns">
        <div class="column is-2">
          <div class="image is-128x128 avatar">
            <img src="https://placehold.it/256x256">
          </div>
        </div>
        <div class="column is-4 name">
          <p>
            <span class="title is-bold">John Smith</span>
            <span class="button is-primary is-outlined follow">Follow</span>
          </p>
          <p class="tagline">The users profile bio would go here, of course. It could be two lines</p>
        </div>
        <div class="column is-2 followers has-text-centered">
          <p class="stat-val">129k</p>
          <p class="stat-key">followers</p>
        </div>
        <div class="column is-2 following has-text-centered">
          <p class="stat-val">2k</p>
          <p class="stat-key">following</p>
        </div>
        <div class="column is-2 likes has-text-centered">
          <p class="stat-val">29</p>
          <p class="stat-key">likes</p>
        </div>
      </div>
    </div> -->
    <!-- <div class="profile-options">
      <div class="tabs is-fullwidth">
        <ul>
          <li class="link is-active"><a><span class="icon"><i class="fa fa-list"></i></span> <span>My Lists</span></a></li>
          <li class="link"><a><span class="icon"><i class="fa fa-heart"></i></span> <span>My Likes</span></a></li>
          <li class="link"><a><span class="icon"><i class="fa fa-th"></i></span> <span>My Posts</span></a></li>
          <li class="link"><a><span class="icon"><i class="fa fa-bookmark"></i></span> <span>My Bookmarks</span></a></li>
        </ul>
      </div>
    </div> -->
    <div class="card">
      <!-- Main container -->
      <nav class="level">
        <!-- Left side -->
        <br>
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <!-- <strong>{{Countstock}}</strong> รายการ -->
            </p>
          </div>
          <div class="level-item">
            <p class="control has-addons">
              <input class="input" v-model="Search" placeholder="ค้นหา" @input="filter(Search)">
              <!-- <button class="button">
                ค้นหา
              </button> -->
            </p>
            &nbsp;&nbsp;
            &nbsp;&nbsp;
            <strong>{{(showData.length>0)?showData.length:Countstock}}</strong> &nbsp;รายการ
          </div>
        </div>
        <!-- Right side -->
        <div class="level-right">
          <!-- <p class="level-item"><strong>All</strong></p>
          <p class="level-item"><a>Published</a></p>
          <p class="level-item"><a>Drafts</a></p>
          <p class="level-item"><a>Deleted</a></p>
          <p class="level-item"><a class="button is-success">New</a></p> -->
          <div @click="setunit" class="button is-info">
                      <span class="icon">
                        <i class="fa fa-book"></i>
                      </span>
                      <span>หน่วยวัตถุดิบ </span>
              </div>
              &nbsp;&nbsp;
              <div @click="setdeliverstock" class="button is-danger">
                      <span class="icon">
                        <i class="fa fa-shopping-cart"></i>
                      </span>
                      <span>วัตถุดิบที่สั่งซื้อ ({{this.deliver.length}})</span>
              </div>
        </div>
      </nav>
    </div>
    <!-- <div class="spacer"></div> -->
    <!-- <section class="section">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="columns is-mobile"> -->
          <!--  -->
          <div class="columns">
          <div class="column">
          </div>
          <div class="column">
            <div class="level">
            <p class="level-item">
              <input class="input" type="number" placeholder="รายการที่เเสดงต่อหน้า" v-model.number="pageSize" @input="updateTable()" min="1">
              &nbsp;รายการ
            </p>
            &nbsp;&nbsp;
            <a class="button is-success" @click="setInsertstock()">เพิ่มวัตถุดิบ</a>
           </div>
          </div>
          <div class="column">
          </div>
        </div>
           <!--  -->
          <!--  -->
        <!-- </div>
      </div>
    </section> -->
  </div>
  <div class="columns">
  <div class="column">
  </div>
  <div class="column is-half">
   <section class="panel card">
            <p class="panel-heading">
            <center>รายการวัถตุดิบในร้านอาหาร</center>
              <!-- <a class="button is-success right">New</a> -->
            </p>
            <!-- <hr> -->
            <div class="">
              <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>ชื่อวัตถุดิบ</th>
                    <th>จำนวน</th>
                    <th>หน่วยวัตถุดิบ</th>
                    <th>เเก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <!-- <tfoot>
                  <tr>
                    <th>ชื่อวัตถุดิบ</th>
                    <th>จำนวน</th>
                    <th>หน่วยวัตถุดิบ</th>
                    <th>เเก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </tfoot> -->
                <tbody>
                  <tr :key="key" v-for="(stock, key) in (showData.length>0)?showData:slot">
                    <td>{{stock.stockname}}</td>
                    <td>{{stock.stockamount}}</td>
                    <td>{{stock.type}}</td>
                    <td class="is-icon has-text-centered">
                      <center><button class="button is-warning" @click="setEditstock(stock.key, stock.stockname, stock.stockamount, stock.safety, stock.type)"><i class="fas fa-edit" ></i></button></center>
                    </td>
                    <td class="is-icon has-text-centered">
                    <center><button class="button is-danger" @click="Delstock(stock.key)"><i class="fa fa-trash"></i></button></center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
  </div>
  <div class="column">
  </div>
</div>
  <!--show modal-->
    <div id="modal-ter" class="modal is-active" v-show="showModal" @close="showModal = false">
      <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">วัตถุดิบ</p>
              <button class="delete" aria-label="close" @click="Closemodal()"></button>
          </header>
          <section class="modal-card-body">
            <div class="">
              <!-- เนื้อหา -->
              <form action>
              <br>
              <div>
               <div class="columns">
                <div class="column is-2">
                  ชื่อวัตถุดิบ :
                </div>
                <div class="column">
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="stockname"
                    placeholder="วัตถุดิบ"
                    @input="filterstock(stockname)"
                  >
                  <div class="options">
                    <ul>
                      <li v-for="stock in showData2" :key="stock.key" @click="itemClicked(stock.stockname)">
                        {{stock.stockname}}
                      </li>
                    </ul>
                  </div>
                  </div>
                  <div class="column is-2">
                    ประมาณ :
                  </div>
                  <div class="column">
                    <input
                     class="form-control mb-2"
                      type="number"
                     v-model="stockamount"
                      placeholder="กรัม/จำนวน"
                    >
                  </div>
                </div>
                <div class="columns">
                <div class="column is-2">
                  safety :
                </div>
                <div class="column">
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="safety"
                    placeholder="safety"
                  >
                  </div>
                  <div class="column is-2">
                  ประเภทหน่วยวัตถุดิบ :
                </div>
                <div class="column">
                  <select name="main meter" v-model="typeunit" aria-readonly="">
                    <option
                    :key="key"
                    v-for="(dep, key) in units"
                    :value="dep.name"
                    >{{dep.name}}</option>
                    </select>
                  </div>
                </div>
                <!-- <div class="columns">
                <div class="column is-2">
                  ชื่อวัตถุดิบ :
                </div>
                <div class="column">
                  <input
                    type="text"
                    v-model="query"
                    placeholder="วัตถุดิบ"
                    @input="filterstock(query)"
                  >
                  <div class="options">
                    <ul>
                      <li v-for="stock in showData2" :key="stock.key" @click="itemClicked(stock.stockname)">
                        {{stock.stockname}}
                      </li>
                    </ul>
                  </div>
                  </div>
                </div> -->
              </div>
              </form>
              <!-- เนื้อหา -->
            </div>
          </section>
          <footer class="modal-card-foot">
            <button v-if="!statusEdit" class="button is-success" @click="checkstock(stockname, stockamount, safety)">เพิ่มข้อมูล</button>
            <button v-if="statusEdit" class="button is-success" @click="Editstock(updatekey, stockname, stockamount, safety)">บันทึกข้อมูล</button>
            <button class="button" @click="Closemodal()">ยกเลิก</button>
          </footer>
        </div>
    </div>
  <!--show modal-->
  <!-- incomestock -->
  <div id="modal-ter" class="modal is-active" v-show="showModal2" @close="showModal2 = false">
      <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">วัตถุดิบ</p>
              <button class="delete" aria-label="close" @click="Closemodal2()"></button>
          </header>
          <section class="modal-card-body">
            <div class="content">
              <!-- เนื้อหา -->
              <br>
              <div>
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>ชื่อวัตถุดิบ</th>
                    <th>จำนวน</th>
                    <th>เพิ่ม</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <!-- <tfoot>
                  <tr>
                    <th>ชื่อวัตถุดิบ</th>
                    <th>จำนวน</th>
                    <th>เเก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </tfoot> -->
                <tbody>
                  <tr :key="key" v-for="(stock, key) in deliver">
                    <td>{{stock.foodname}}</td>
                    <td>{{stock.foodamount}}</td>
                    <td class="is-icon">
                      <button class="button is-success" @click="addstock(stock.foodname, stock.foodamount, stock.key)"><i class="fa fa-plus"></i></button>
                    </td>
                    <td class="is-icon">
                      <button class="button is-danger" @click="Deldeliver2(stock.key)"><i class="fa fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
              <!-- เนื้อหา -->
            </div>
          </section>
          <footer class="modal-card-foot">
            <!-- <button v-if="!statusEdit" class="button is-success" @click="Insertstock(stockname, stockamount, safety)">เพิ่มข้อมูล</button>
            <button v-if="statusEdit" class="button is-success" @click="Editstock(updatekey, stockname, stockamount, safety)">บันทึกข้อมูล</button> -->
            <button class="button" @click="Closemodal2()">ยกเลิก</button>
          </footer>
        </div>
    </div>
  <!-- incomestock -->
  <!-- หน่วยวัตถุดิบ -->
  <div id="modal-ter" class="modal is-active" v-show="showModal3" @close="showModal3 = false">
      <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">หน่วยวัตถุดิบ</p>
              <button class="delete" aria-label="close" @click="Closemodal3()"></button>
          </header>
          <section class="modal-card-body">
            <div class="content">
              <!-- เนื้อหา -->
              <br>
              <!-- เพิ่มวัตถุดิบ -->
              <div class="columns" v-if="!updateunit">
              <div class="column">
                ชื่อหน่วยวัตถุดิบ :
              </div>
              <div class="column">
                <input
                    class="form-control mb-2"
                    type="text"
                    v-model="unit"
                    placeholder="หน่วย"
                  >
              </div>
              <div class="column">
                <button class="button is-success" @click="checkunit(unit)">เพิ่มหน่วยวัตถุดิบ</button>
              </div>
            </div>
            <!-- edit -->
                <div class="columns" v-if="updateunit">
                <div class="column">
                  ชื่อหน่วยวัตถุดิบ :
                </div>
                <div class="column">
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="updateunit"
                    placeholder="หน่วย"
                  >
                  </div>
                </div>
                <div class="columns" v-if="updateunit">
                  <button class="button is-success" @click="updateunitfire()">เเก้ไขหน่วยวัตถุดิบ</button>
                </div>
                <!-- edit -->
              <!-- <div class="columns" v-if="!updateunit">
                <div class="column is-3">
                  ชื่อหน่วยวัตถุดิบ :
                </div>
                <div class="column is-6">
                  <input
                    class="form-control mb-2"
                    type="text"
                    v-model="unit"
                    placeholder="หน่วย"
                  >
                  </div>
                  <div class="column is-3">
                </div>
                </div> -->
                <!-- เพิ่มวัตถุดิบ -->
              <div>
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>ชื่อหน่วยวัตถุดิบ</th>
                    <th>เเก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <!-- <tfoot>
                  <tr>
                    <th>ชื่อวัตถุดิบ</th>
                    <th>จำนวน</th>
                    <th>เเก้ไข</th>
                    <th>ลบ</th>
                  </tr>
                </tfoot> -->
                <tbody>
                  <tr :key="key" v-for="(unit, key) in units">
                    <td> {{unit.name}}</td>
                    <td class="is-icon">
                      <center><button class="button is-warning" @click="setupdate(unit.name, unit.key)"><i class="fas fa-edit"></i></button></center>
                    </td>
                    <td class="is-icon">
                      <center><button class="button is-danger" @click="Delunit(unit.key)"><i class="fa fa-trash"></i></button></center>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
              <!-- เนื้อหา -->
            </div>
          </section>
          <footer class="modal-card-foot">
            <!-- <button v-if="!statusEdit" class="button is-success" @click="Insertstock(stockname, stockamount, safety)">เพิ่มข้อมูล</button>
            <button v-if="statusEdit" class="button is-success" @click="Editstock(updatekey, stockname, stockamount, safety)">บันทึกข้อมูล</button> -->
                  <!-- <div class="columns">
                    <div class="column"></div>
                  <center> -->
                  <div class="columns">
                    <div class="column">
                      <!-- &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; -->
                    <button class="button is-danger" @click="Closemodal3()">ยกเลิก</button>
                    </div>
                  </div>
          </footer>
        </div>
    </div>
    <!-- หน่วยวัตถุดิบ -->
  <div class="columns">
  <div class="column">
  </div>
  <div class="column is-half">
     <!--  -->
          <!-- <nav class="pagination" role="navigation" aria-label="pagination">
            <ul class="pagination-list">
            <a class="pagination-previous" v-on:click="updatePage(currentPage - 1)" :disabled="showPreviousLink()">ก่อนหน้า</a>
            <li v-for="(page,index) in totalPages()" :key="index">
            <a class="pagination-link" v-on:click="updatePage(index)" v-bind:class="{ 'is-current': currentPage === index }">{{page}}</a>
            </li>
            <a class="pagination-next" v-on:click="updatePage(currentPage + 1)" :disabled="showNextLink()">ถัดไป</a>
           </ul>
          </nav> -->
          <nav class="pagination is-centered" role="navigation" aria-label="pagination">
          <ul class="pagination-list">
            <li><a class="pagination-previous" v-on:click="updatePage(currentPage - 1)" :disabled="showPreviousLink()">ก่อนหน้า</a></li>
            <li v-for="(page,index) in totalPages()" :key="index">
            <a class="pagination-link" v-on:click="updatePage(index)" v-bind:class="{ 'is-current': currentPage === index }">{{page}}</a>
            </li>
            <li><a class="pagination-next" v-on:click="updatePage(currentPage + 1)" :disabled="showNextLink()">ถัดไป</a></li>
          </ul>
        </nav>
          <!--  -->
  </div>
  <div class="column">
  </div>
  </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
export default {
  name: 'stockshop',
  data () {
    return {
      datastock: [],
      showModal: false,
      showModal2: false,
      showModal3: false,
      stockname: '',
      stockamount: '',
      statusEdit: false,
      updatekey: '',
      showData: [],
      showData2: [],
      Search: '',
      Countstock: 0,
      select: '',
      pageSize: 5,
      currentPage: 0,
      slot: [],
      safety: '',
      deliver: '',
      units: '',
      unit: '',
      updateunit: '',
      updatekey2: '',
      typeunit: '',
      query: ''
    }
  },
  mounted () {
    const dbRefObject = firebase.database().ref().child('foodcenter/stock/' + this.selectShop)
    const dbRefObject1 = firebase.database().ref().child('foodcenter/deliver/' + this.selectShop)
    const dbRefObject2 = firebase.database().ref().child('foodcenter/unit/' + this.selectShop)
    dbRefObject.on('value', snap => {
      var data = []
      this.Countstock = snap.numChildren()
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.datastock = data
      this.updateTable()
    })
    dbRefObject1.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.deliver = data
    })
    dbRefObject2.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.units = data
    })
  },
  computed: {
    ...mapGetters({
      permission: 'permission',
      cartProducts: 'cartProducts',
      selectShop: 'selectShop'
    })
  },
  methods: {
    Delstock (key) {
      this.$swal({
        title: 'คุณกำลังลบวัตถุดิบนี้?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.Deletestock(key)
          this.$swal(
            'ลบเเล้ว!',
            'วัตถุดิบนี้โดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    Deldeliver2 (key) {
      this.$swal({
        title: 'คุณกำลังลบวัตถุดิบนี้?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.Deletedeliver(key)
          this.$swal(
            'ลบเเล้ว!',
            'วัตถุดิบนี้โดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    Delunit (key) {
      this.$swal({
        title: 'คุณกำลังลบวัตถุดิบนี้?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.Deleteunit(key)
          this.$swal(
            'ลบเเล้ว!',
            'วัตถุดิบนี้โดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    setInsertstock () {
      this.showModal = true
      this.stockname = ''
      this.stockamount = ''
      this.safety = 0
      this.showData2 = []
      this.typeunit = ''
    },
    setdeliverstock () {
      this.showModal2 = true
    },
    setunit () {
      this.showModal3 = true
    },
    setupdate (name, key) {
      this.updateunit = name
      this.updatekey2 = key
    },
    updateunitfire () {
      firebase.database().ref().child('foodcenter/unit/' + this.selectShop).child(this.updatekey2).update({
        name: this.updateunit
      })
      this.updateunit = ''
    },
    insertunit () {
      if (this.unit === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรอกข้อมูลให้ครบ!!!'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        let data = {
          name: this.unit
        }
        firebase.database().ref().child('foodcenter/unit/' + this.selectShop).push(data)
        this.unit = ''
      }
    },
    Insertstock (stockname, stockamount, safety) {
      if (safety === '') { safety = 0 }
      let data = {
        stockname: stockname,
        stockamount: parseInt(stockamount, 10),
        safety: parseInt(safety, 10),
        type: this.typeunit
      }
      if (stockname === '' || stockamount === '' || this.typeunit === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        firebase.database().ref().child('foodcenter/stock/' + this.selectShop).push(data)
        this.stockname = ''
        this.stockamount = ''
        this.showModal = false
        this.safety = ''
        this.typeunit = ''
      }
    },
    checkstock (stockname, stockamount, safety) {
      const found = this.datastock.find(p => p.stockname === stockname)
      if (found) {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'วัตถุดิบนี้ซ้ำ!!!'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else { this.Insertstock(stockname, stockamount, safety) }
    },
    setEditstock (key, stockname, stockamount, safety, type) {
      if (!safety) { safety = 0 }
      this.showModal = true
      this.statusEdit = true
      this.stockname = stockname
      this.stockamount = stockamount
      this.updatekey = key
      this.safety = safety
      this.typeunit = type
    },
    Editstock (key, stockname, stockamount, safety) {
      if (safety) {
        firebase.database().ref().child('foodcenter/stock/' + this.selectShop).child(key).update({
          stockname: stockname,
          stockamount: parseInt(stockamount, 10),
          safety: parseInt(safety, 10),
          type: this.typeunit
        })
        this.showModal = false
        this.statusEdit = false
        this.stockname = ''
        this.stockamount = ''
        this.updatekey = ''
        this.safety = ''
        this.typeunit = ''
      } else {
        firebase.database().ref().child('foodcenter/stock/' + this.selectShop).child(key).update({
          stockname: stockname,
          stockamount: parseInt(stockamount, 10),
          type: this.typeunit
        })
        this.showModal = false
        this.statusEdit = false
        this.stockname = ''
        this.stockamount = ''
        this.updatekey = ''
        this.typeunit = ''
      }
    },
    Closemodal () {
      this.showModal = false
      this.statusEdit = false
    },
    Closemodal2 () {
      this.showModal2 = false
    },
    Closemodal3 () {
      this.showModal3 = false
      this.updateunit = ''
    },
    Deletestock (key) {
      firebase.database().ref().child('foodcenter/stock/' + this.selectShop).child(key).remove()
    },
    Deletedeliver (key) {
      firebase.database().ref().child('foodcenter/deliver/' + this.selectShop).child(key).remove()
    },
    Deleteunit (key) {
      firebase.database().ref().child('foodcenter/unit/' + this.selectShop).child(key).remove()
    },
    filter (Search) {
      if (Search.length > 0) {
        this.showData = this.datastock.filter(
          (stock) => {
            if (stock.stockname.toString().indexOf(Search) >= 0 ||
              stock.stockamount.toString().indexOf(Search) >= 0) {
              return stock
            }
          }
        )
      } else {
        this.showData = []
      }
    },
    filterstock (Search) {
      if (Search.length > 0) {
        this.showData2 = this.datastock.filter(
          (stock) => {
            if (stock.stockname.toString().indexOf(Search) >= 0 ||
              stock.stockamount.toString().indexOf(Search) >= 0) {
              return stock
            }
          }
        )
      } else {
        this.showData2 = []
      }
    },
    totalPages () {
      return Math.ceil(this.datastock.length / this.pageSize)
    },
    showPreviousLink () {
      return this.currentPage === 0
    },
    showNextLink () {
      return this.currentPage === (this.totalPages() - 1)
    },
    updatePage (pageNumber) {
      // เช็คว่าหน้าเเรกสุดหรือหน้าสุดท้ายหรือเปล่า
      if (pageNumber !== -1 && pageNumber < this.totalPages()) {
        this.currentPage = pageNumber
        this.updateTable()
      }
    },
    updateTable () {
      this.slot = this.datastock.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
      // if we have 0 , go back a page
      if (this.slot.length === 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1)
      }
      console.log(this.currentPage, this.pageSize)
    },
    addstock (name, amount, key) {
      const found = this.datastock.find(p => p.stockname === name)
      if (found) {
        firebase.database().ref().child('foodcenter/stock/' + this.selectShop).child(found.key).update({
          stockamount: found.stockamount + amount
        })
        this.Deletedeliver(key)
      } else {
        let data = {
          stockname: name,
          stockamount: amount,
          safety: 0
        }
        firebase.database().ref().child('foodcenter/stock/' + this.selectShop).push(data)
        this.Deletedeliver(key)
      }
    },
    itemClicked (select) {
      this.stockname = select
      this.showData2 = []
    },
    checkunit (unit) {
      const found = this.units.find(p => p.name === unit)
      if (found) {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'หน่วยวัตถุดิบนี้ซ้ำ!!!'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else { this.insertunit(unit) }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.options ul {
  list-style-type: none;
  max-height: 150px;
  overflow-y: scroll;
  border: 1px solid #d4d4d4;
  min-width: 180px;
  position: absolute;
  z-index: 10;
}
.options ul li {
    padding: 5px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
}
input[type=text], select {
  margin: 0px 0;
}
.options ul li:hover {
    background: #8c8c8c;
    color: #fff;
}
/* .content ul {
} */
</style>
