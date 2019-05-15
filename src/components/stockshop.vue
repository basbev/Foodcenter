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
    <div class="box">
      <!-- Main container -->
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <!-- <strong>{{Countstock}}</strong> รายการ -->
              <strong>{{(showData.length>0)?showData.length:Countstock}}</strong> รายการ
            </p>
          </div>
          <div class="level-item">
            <p class="control has-addons">
              <input class="input" v-model="Search" placeholder="Find a post" @input="filter(Search)">
              <!-- <button class="button">
                ค้นหา
              </button> -->
            </p>
          </div>
        </div>
        <!-- Right side -->
        <!-- <div class="level-right">
          <p class="level-item"><strong>All</strong></p>
          <p class="level-item"><a>Published</a></p>
          <p class="level-item"><a>Drafts</a></p>
          <p class="level-item"><a>Deleted</a></p>
          <p class="level-item"><a class="button is-success">New</a></p>
        </div> -->
      </nav>
    </div>
    <div class="spacer"></div>
    <section class="section">
      <div class="columns is-mobile is-multiline">
        <div class="column is-one-quarter-fullhd is-full-mobile">
          <!--  -->
          <div class="level-right">
            <p class="level-item"><input class="input" type="number" placeholder="รายการที่เเสดงต่อหน้า" v-model.number="pageSize"></p>
            <p class="level-item"><a class="button is-success" @click="updateTable()">รายการ</a></p>
            <p class="level-item"><a class="button is-success" @click="setInsertstock()">New</a></p>
           </div>
           <br>
          <!--  -->
          <section class="panel">
            <p class="panel-heading">
              รายการวัถตุดิบในร้านอาหาร
              <!-- <a class="button is-success right">New</a> -->
            </p>
            <!-- <hr> -->
            <div class="panel-block">
              <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>ชื่อวัตถุดิบ</th>
                    <th>จำนวน</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>ชื่อวัตถุดิบ</th>
                    <th>จำนวน</th>
                    <th></th>
                    <th></th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr :key="key" v-for="(stock, key) in (showData.length>0)?showData:slot">
                    <td>{{stock.stockname}}</td>
                    <td>{{stock.stockamount}}</td>
                    <td class="is-icon">
                      <button class="btn" @click="setEditstock(stock.key, stock.stockname, stock.stockamount, stock.safety)"><i class="fas fa-edit"></i></button>
                    </td>
                    <td class="is-icon">
                      <button class="btn" @click="Delstock(stock.key)"><i class="fa fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <!--  -->
          <nav class="pagination" role="navigation" aria-label="pagination">
            <a class="pagination-previous" v-on:click="updatePage(currentPage - 1)" :disabled="showPreviousLink()">Previous</a>
            <a class="pagination-next" v-on:click="updatePage(currentPage + 1)" :disabled="showNextLink()">Next page</a>
            <ul class="pagination-list">
            <li v-for="(page,index) in totalPages()" :key="index">
            <a class="pagination-link" v-on:click="updatePage(index)" v-bind:class="{ 'is-current': currentPage === index }">{{page}}</a>
            </li>
           </ul>
          </nav>
          <!--  -->
        </div>
      </div>
    </section>
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
            <div class="content">
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
                  >
                  </div>
                  <div class="column is-2">
                    ประมาณ :
                  </div>
                  <div class="column">
                    <input
                     class="form-control mb-2"
                      type="text"
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
                </div>
              </div>
              </form>
              <!-- เนื้อหา -->
            </div>
          </section>
          <footer class="modal-card-foot">
            <button v-if="!statusEdit" class="button is-success" @click="Insertstock(stockname, stockamount, safety)">เพิ่มข้อมูล</button>
            <button v-if="statusEdit" class="button is-success" @click="Editstock(updatekey, stockname, stockamount, safety)">บันทึกข้อมูล</button>
            <button class="button" @click="Closemodal()">ยกเลิก</button>
          </footer>
        </div>
    </div>
  <!--show modal-->
  <!-- Select -->
    <!-- <select class="is-hovered" v-model="select">
            <option
              :key="key"
              v-for="(dep, key) in datastock"
              :value="dep.stockname"
              >{{dep.stockname}}</option>
                    </select> -->
  <!-- Select -->
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
      stockname: '',
      stockamount: '',
      statusEdit: false,
      updatekey: '',
      showData: [],
      Search: '',
      Countstock: 0,
      select: '',
      pageSize: 5,
      currentPage: 0,
      slot: [],
      safety: ''
    }
  },
  mounted () {
    const dbRefObject = firebase.database().ref().child('foodcenter/stock/' + this.selectShop)
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
    setInsertstock () {
      this.showModal = true
      this.stockname = ''
      this.stockamount = ''
      this.safety = 0
    },
    Insertstock (stockname, stockamount, safety) {
      if (safety === '') { safety = 0 }
      let data = {
        stockname: stockname,
        stockamount: parseInt(stockamount, 10),
        safety: parseInt(safety, 10)
      }
      if (stockname === '' || stockamount === '') {
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
      }
    },
    setEditstock (key, stockname, stockamount, safety) {
      if (safety) { safety = 0 }
      this.showModal = true
      this.statusEdit = true
      this.stockname = stockname
      this.stockamount = stockamount
      this.updatekey = key
      this.safety = safety
    },
    Editstock (key, stockname, stockamount, safety) {
      if (safety) {
        firebase.database().ref().child('foodcenter/stock/' + this.selectShop).child(key).update({
          stockname: stockname,
          stockamount: parseInt(stockamount, 10),
          safety: parseInt(safety, 10)
        })
        this.showModal = false
        this.statusEdit = false
        this.stockname = ''
        this.stockamount = ''
        this.updatekey = ''
        this.safety = ''
      } else {
        firebase.database().ref().child('foodcenter/stock/' + this.selectShop).child(key).update({
          stockname: stockname,
          stockamount: parseInt(stockamount, 10)
        })
        this.showModal = false
        this.statusEdit = false
        this.stockname = ''
        this.stockamount = ''
        this.updatekey = ''
      }
    },
    Closemodal () {
      this.showModal = false
      this.statusEdit = false
    },
    Deletestock (key) {
      firebase.database().ref().child('foodcenter/stock/' + this.selectShop).child(key).remove()
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
