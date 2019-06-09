<template>
  <div>
    <!-- <link href="https://fonts.googleapis.com/css?family=Sriracha" rel="stylesheet"> -->
    <div class="container is-fluid">
      <div class="card header" :key="key" v-for="(shop, key) in detail">
        <div class="columns">
          <div class="column is-two-thirds">
            <h1 class="title is-size-1">{{ shop.name }} <img v-bind:src="shop.status" class="statusOpen"></h1>
            <i class="fas fa-phone"></i> {{ shop.tel }}
            <button v-if="permission !== '1'" class="button button13" @click="setprofile(shop.name, shop.tel, shop.status, shop.banner)">
              <span class="icon">
                <i class="fas fa-user-edit"></i>
              </span>
              Edit Profile
            </button>
            <!-- <img v-url={filename:shop.banner}> -->
          </div>
          <div class="column has-text-centered">
            <div class="ratingHeaderCol" v-if="vote[0]">
              <h3 class="is-size-3">{{(vote[0].scorce/vote[0].count).toFixed(2,10)}}</h3>
              <star-rating :star-size="30" :show-rating="false" :read-only="true" :rating="vote[0].scorce/vote[0].count" :increment="0.01"></star-rating>
            </div>
          </div>
        </div>
        <aside class="is-medium menu">
          <ul class="menu-list">
            <li><a href="#let1" class=""><i class=""></i> เมนูทั่วไป</a></li>
            <li><a href="#let2" class=""><i class=""></i> ความเห็นจากลูกค้า</a></li>
          </ul>
        </aside>
        <carousel v-if="menus" :Cart="Cart" :data="foodRecoment"></carousel>
      </div>
    </div>
        <div class="container">
          <div class="columns">
            <div class="column is-12">
                    <!-- Profile -->
                    <div :key="key" v-for="(shop, key) in detail">
                      <!-- setprofile -->
                    <!-- Profile -->
                    <!--show modal-->
                      <div id="modal-ter" class="modal is-active" v-show="showModal" @close="showModal = false">
                        <div class="modal-background"></div>
                        <div class="modal-card">
                          <header class="modal-card-head">
                            <p class="modal-card-title">เเก้ไขโปรไฟล์ : {{selectShop}}</p>
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
                                  ชื่อร้านอาหาร :
                                </div>
                                <div class="column">
                                  <input
                                    class="form-control mb-2"
                                    type="text"
                                    v-model="updateName"
                                    placeholder="ร้านอาหาร"
                                  >
                                </div>
                                <div class="column is-2">
                                  เบอร์โทร :
                                </div>
                                <div class="column">
                                  <input
                                   class="form-control mb-2"
                                    type="text"
                                   v-model="updatePhone"
                                    placeholder="เบอร์โทร"
                                  >
                                </div>
                              </div>
                              <div class="columns">
                                <div class="column is-2">
                                  สถานะ :
                                </div>
                                <div class="column">
                                  <select name="status" v-model="updateStatus">
                                    <option value="https://www.img.live/images/2018/11/20/bb0bf29aaea59877.png">เปิด</option>
                                    <option value="https://www.img.live/images/2018/11/20/d57b23a07352f87d.png">ปิด</option>
                                  </select>
                                </div>
                                <div class="column is-2">
                                  อัพโหลดรูป :
                                </div>
                                <div class="column">
                                  <label class="file-label">
                                    <input class="file-input" type="file" name="banner" @change="onFileChangebanner($event.target.files[0])">
                                    <span class="file-cta">
                                      <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                      </span>
                                      <span class="file-label">
                                        อัพโหลดรูป
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div class="columns">
                                <div class="column is-2">
                                  ไฟล์ที่อัพโหลด :
                                </div>
                                <span class="file-name" v-if="dataImg2">
                                  {{dataImg2.name}}
                                </span>
                              </div>
                            </div>
                            <!-- </form> -->
                            <!-- เนื้อหา -->
                          </div>
                        </section>
                        <footer class="modal-card-foot">
                          <!-- <button class="button is-success">เพิ่มข้อมูล</button> -->
                          <button class="button is-success" @click="updateprofile(updateName, updatePhone, updateStatus, updateBanner )">บันทึกข้อมูล</button>
                          <button class="button" @click="Closemodal()">ยกเลิก</button>
                        </footer>
                  <!--show modal-->
                  <!-- Profile -->
                </div>
              </div>
            <div class="card">
              <article class="">
                <div class="">
                  <h3 class="title is-3">ค้นหา</h3>
                  <div>
                    <div class="columns">
                      <!-- <div class="column">
                        <select name="status" class="input is-large" v-model="Searchtype">
                          <option value="menushow">อาหารเเนะนำ</option>
                          <option value="menu">อาหารทั่วไป</option>
                        </select>
                      </div> -->
                      <div class="column">
                        <!-- <input type="text" v-model="Search" placeholder="ค้นหาเมนู" v-if="Searchtype === ''" disabled class="input is-large">
                        <input type="text" v-model="Search" placeholder="ค้นหาเมนู" @input="filterShop(Search)" v-if="Searchtype === 'menushow'" class="input is-large"> -->
                        <input type="text" v-model="Search" placeholder="ค้นหาเมนู" @input="filterShop(Search)" class="input is-large">
                         <div>
                           ขายดี
                          <label :class="(Search == record.key)?'button is-primary':'button'" :key="key" v-for="(record, key) in records">
                            <i class="fas fa-star star"></i>
                            <input type="radio" class="radioButton" :value="record.key" v-model="Search" @input="filterShop(record.key)">
                            <h3>&nbsp;&nbsp;{{record.key}} {{record.amount}} จาน</h3>
                          </label>
                        </div>
                      </div>
                    </div>
                    <!--<button class="button button11" @click="Searchnow(Search, Searchtype)">ค้นหาอาหาร</button>-->
                  </div>
                  <div v-if="result !== ''">
                    <h3 class="title is-3">{{result.foodname}}</h3>
                    <h3>ราคา&nbsp;{{result.foodprice}}&nbsp;บาท</h3>
                    <img v-bind:src="result.foodpic" width="300" height="350"><br>
                    <button @click="Cart(result.foodname, result.foodprice, result.foodtype, result.key)" class="button button3">เพิ่มลง Order</button>
                  </div>
                  <div class="foodLists" v-if="showData.length > 0">
                    <div class="columns is-multiline ">
                      <div class="column is-6 is-4-tablet is-3-desktop" v-for="(menu) in showData" :key="menu.Key">
                        <div class="foodList">
                          <div class="detail">
                            <h3 class="title is-3">{{menu.foodname}}</h3>
                            <h6 class="">ราคา&nbsp;{{menu.foodprice}}&nbsp;บาท</h6>
                          </div>
                          <span class="icon is-small cartButton" v-if="checkstock[key] === 0" @click="Cart(menu.foodname, menu.foodprice, menu.foodtype, menu.key, menu.meters, menu.Cost)">
                            <i class="fas fa-cart-plus"></i>
                          </span>
                          <span class="icon is-small cartButton disable" v-if="checkstock[key] === 1">
                            <i class="fas fa-cart-plus"></i>
                          </span>
                          <img v-url={filename:menu.foodpic} width="100%" height="auto"/><br>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="Search !==''" class="has-text-centered result">
                    <h5 class="title is-5">
                      ไม่พบ "{{Search}}"
                    </h5>
                  </div>
                </div>
              </article>
            </div>
            <div class="card">
              <article class="">
                <div class="">
                  <img src="/static/pro.png">
                  <div class="row promotion" :key="key" v-for="(promo, key) in promo">
                    <span v-if="updateKey !== key">
                      <h4 class="title is-4"><img src="https://sv1.picz.in.th/images/2019/01/09/9uitK9.png" height="30" width="30">&nbsp; {{promo.prodetail}}</h4>
                    </span>
                    <span v-else>
                      <input type="text" v-model="updateProdetail" placeholder="รายละเอียดโปร">
                    </span>
                    <div class="editPromotionBtn">
                      <button v-if="permission !== '1' && updateKey !== key" @click="SetUpdatePromo(key, promo.prodetail)" class="button button13">
                        <span class="icon">
                          <i class="fas fa-edit"></i>
                        </span>
                      </button>
                      <button v-if="permission !== '1' && updateKey !== key" class="button button3" @click="DelPro(key)">
                        <span class="icon">
                          <i class="fas fa-trash"></i>
                        </span>
                      </button>
                      <button v-if="updateKey === key" @click="UpdatePromo(key, updateProdetail)" class="button is-success">
                        <span class="icon">
                          <i class="fas fa-save"></i>
                        </span>
                      </button>
                    </div>
                    <hr>
                  </div>
                </div>
              </article>
              <div class="bucket" @click="isComponentModalActive = true">
                <div class="nav-item is-tab" :class="{ 'active-bottom-border': $route.path === '/cartmeter' }">
                  <div class="field is-grouped">
                    <router-link to='/cartmeter' class="button button9">
                      <span class="icon">
                        <i class="fa fa-shopping-cart"></i>
                      </span>
                      <span>สั่ง Order ({{itemsInCart}})</span>
                    </router-link>
                  </div>
                </div>
              </div>
              <div v-if="permission !== '1'">
                <input type="text" v-model="prodetail" placeholder="รายละเอียดโปรโมชั่น" size="30" required class="input is-large">
                <button class="button is-warning" @click="insertpromo(prodetail)">
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                  เพิ่มโปรโมชั่น
                </button>
              </div>
            </div>
              <div class="card">
                <article class="message is-primary">
                  <span class="icon has-text-primary">
                    <i class="fas fa-info-circle"></i>
                  </span>
                  <h4 id="let1" class="title is-3">เมนูประจำร้าน</h4>
                  <button class="button button11" @click="setinsertmenu()">เพิ่มเมนู</button>
                </article>
                  <div class="">
                    <div class="columns is-multiline">
                      <div class="column is-6 is-4-tablet is-3-desktop" :key="key" v-for="(menu, key) in menus">
                        <div class="foodList">
                          <div class="detail">
                            <h3 class="title is-3">{{menu.foodname}}</h3>
                            <h6 class="">ราคา&nbsp;{{menu.foodprice}}&nbsp;บาท</h6>
                            <h6>จำนวน&nbsp;{{menu.type}}&nbsp;ชิ้น</h6>
                          </div>
                          <span class="icon is-small cartButton" v-if="checkstock[key] === 0" @click="Cart(menu.foodname, menu.foodprice, menu.foodtype, menu.key, menu.meters, menu.Cost, menu.type)">
                            <i class="fas fa-cart-plus"></i>
                          </span>
                          <span class="icon is-small cartButton disable" v-if="checkstock[key] === 1">
                            <i class="fas fa-cart-plus"></i>
                          </span>
                          <img v-url={filename:menu.foodpic} width="100%" height="auto"/>
                          <div class="editMenuBtns">
                            <button v-if="permission !== '1'" @click="SetUpdateMenu(menu.key, menu.foodname, menu.foodprice, menu.foodtype, menu.foodpic, menu.meters, menu.Cost, menu.type)" class="button button13-white">
                              <span class="icon">
                                <i class="fas fa-edit"></i>
                              </span>
                            </button>
                            <button v-if="permission !== '1'" @click="DelFood(menu.key)" class="button button3-white">
                              <span class="icon">
                                <i class="fas fa-trash"></i>
                              </span>
                            </button>
                          </div>
                        </div>
                        <!-- update menu -->
                        <!--show modal-->
                        <div id="modal-ter" class="modal is-active" v-show="showModal3" @close="showModal3 = false">
                          <div class="modal-background"></div>
                            <div class="modal-card">
                              <header class="modal-card-head">
                                <p class="modal-card-title">เเก้ไขเมนูอาหาร</p>
                                <button class="delete" aria-label="close" @click="Closemodal3()"></button>
                              </header>
                              <section class="modal-card-body">
                                <div class="content">
                                  <!-- เนื้อหา -->
                                  <!-- <form action> -->
                                  <br>
                                  <div>
                                   <div class="columns">
                                    <div class="column is-2">
                                      ชื่อเมนูอาหาร :
                                    </div>
                                    <div class="column">
                                      <input type="text" v-model="updateMenufood" placeholder="ชื่อเมนูอาหาร">
                                    </div>
                                    <div class="column is-2">
                                      ประเภทอาหาร :
                                    </div>
                                    <div class="column">
                                      <select name="status" v-model="updateMenutype">
                                        <option value="ผัด" selected>ผัด</option>
                                        <option value="ทอด">ทอด</option>
                                        <option value="ต้ม">ต้ม</option>
                                        <option value="แกง">แกง</option>
                                        <option value="นึ่ง">นึ่ง</option>
                                        <option value="ย่าง">ย่าง</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="columns">
                                    <div class="column is-2">
                                      ราคาต่อจาน :
                                    </div>
                                    <div class="column">
                                      <input type="number" v-model="updateMenuprice" min="5" max="50" placeholder="ราคาต่อจาน">
                                    </div>
                                    <div class="column is-2">
                                      ราคาทุนจาน :
                                    </div>
                                    <div class="column">
                                      <input type="number" v-model="updatecost" min="5" max="50" placeholder="ราคาทุนจาน">
                                    </div>
                                  </div>
                                  <div class="columns">
                                    <div class="column is-2">
                                      อัพโหลดรูป :
                                    </div>
                                    <div class="column">
                                      <label class="file-label">
                                        <input class="file-input" type="file" name="banner" @change="onFileChangefood($event.target.files[0])">
                                        <span class="file-cta">
                                          <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                          </span>
                                          <span class="file-label">
                                            อัพโหลดรูป
                                          </span>
                                        </span>
                                      </label>
                                    </div>
                                    <div class="column is-2">
                                      ไฟล์ที่อัพโหลด :
                                    </div>
                                    <div class="column">
                                      <span class="file-name" v-if="dataImg3">
                                      {{dataImg3.name}}
                                      </span>
                                    </div>
                                  </div>
                                  <!-- type -->
                          <div class="columns">
                              <div class="column is-2">
                                ชื่อหน่วยวัตถุดิบ
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
                          <!-- type -->
                                  <div class="columns" v-for="ameter in meters" :key="ameter.id">
                                    <div class="column is-2">
                                      ชื่อวัตถุดิบ :
                                    </div>
                                    <div class="column">
                                      <select name="main meter" v-model="ameter.name" aria-readonly="">
                                        <option
                                          :key="key"
                                          v-for="(dep, key) in datastock"
                                          :value="dep.stockname"
                                          >{{dep.stockname}}
                                        </option>
                                      </select>
                                    </div>
                                    <div class="column is-2">
                                      จำนวน :
                                    </div>
                                    <div class="column">
                                      <input class="input is-success" type="number" placeholder="จำนวน" v-model="ameter.qty">
                                      <button @click="removemeter()"><i class="fas fa-times"></i></button>
                                    </div>
                                  </div>
                                  <div class="columns">
                                    <div class="column is-2">
                                      เพิ่มวัตถุดิบ :
                                    </div>
                                    <div class="column">
                                      <select name="main meter" v-model="meter.name">
                                        <option
                                          :key="key"
                                          v-for="(dep, key) in datastock"
                                          :value="dep"
                                          >{{dep.stockname}}
                                        </option>
                                      </select>
                                    </div>
                                    <div class="column is-2">
                                      จำนวน :
                                    </div>
                                    <div class="column">
                                      <input class="input" type="number" placeholder="จำนวน" v-model="meter.qty" value="1">
                                      <button class="button is-primary" @click="addMeter()">Add</button>
                                    </div>
                                  </div>
                                </div>
                                <!-- </form> -->
                                <!-- เนื้อหา -->
                              </div>
                            </section>
                            <footer class="modal-card-foot">
                              <button class="button is-success" @click="UpdateMenu(updateKey, updateMenufood, updateMenuprice, updateMenutype, updateMenupic, updatecost)">อัพเดทเมนู</button>
                              <!-- <button class="button is-success">บันทึกข้อมูล</button> -->
                              <button class="button" @click="Closemodal3()">ยกเลิก</button>
                            </footer>
                          </div>
                        </div>
                    <!--show modal-->
                        <!-- update menu -->
                                        <!-- <div v-if="updateKey === key">
          <input type="text" v-model="updateMenufood" placeholder="ชื่อเมนู">
          <select name="status" v-model="updateMenutype">
    <option value="ผัด" selected>ผัด</option>
    <option value="ทอด">ทอด</option>
    <option value="ต้ม">ต้ม</option>
    <option value="แกง">แกง</option>
    <option value="นึ่ง">นึ่ง</option>
    <option value="ย่าง">ย่าง</option>
  </select>
          <input type="text" v-model="updateMenuprice" placeholder="ราคา">
           <select name="menupre" v-model="menupre">
    <option value="เมนูทั่วไป" selected>เมนูทั่วไป</option>
    <option value="เมนูแนะนำ">เมนูแนะนำ</option>
  </select> -->
  <!--  -->
          <!-- <div class="field is-horizontal" v-for="ameter in meters" :key="ameter.id">
    <div class="field-label is-normal">
      <label class="label">วัตถุดิบ</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <select name="main meter" v-model="ameter.name" aria-readonly="">
            <option
                :key="key"
                v-for="(dep, key) in datastock"
                :value="dep.stockname"
                >{{dep.stockname}}</option>
          </select>
        </p>
      </div>
      <div class="field">
        <p class="control is-expanded">
          <input class="input is-success" type="number" placeholder="จำนวน" v-model="ameter.qty">
          <button @click="removemeter()"><i class="fas fa-times"></i></button>
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">วัตถุดิบ</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <select name="main meter" v-model="meter.name">
            <option
                :key="key"
                v-for="(dep, key) in datastock"
                :value="dep"
                >{{dep.stockname}}</option>
          </select>
        </p>
      </div>
      <div class="field">
        <p class="control is-expanded">
          <input class="input is-success" type="number" placeholder="จำนวน" v-model="meter.qty" value="1">
        </p>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" @click="addMeter()">
            Add
          </button>
        </div>
      </div>
    </div>
  </div> -->
  <!--  -->
          <!-- <label class="file-label">
        <input class="file-input" type="file" name="resume" @change="onFileChangefoodupdate($event.target.files[0])">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            อัพโหลดรูป
          </span>
        </span>
      </label>
      <span class="file-name" v-if="dataImg4">
          {{dataImg4.name}}
        </span>
          <button @click="UpdateMenu(menu.key, updateMenufood, updateMenuprice, updateMenutype, updateMenupic)" class="button button2">บันทึกเมนูอาหาร</button>
          <hr>
        </div>
        <div v-else>
          </div> -->
                      </div>
                    </div>
                  </div>
              </div>
              <div>
              <!-- <div v-if="permission !== '1'">
        <input type="text" v-model="foodname" placeholder="ชื่อเมนูอาหาร">
         <select name="status" v-model="foodtype">
    <option value="ผัด" selected>ผัด</option>
    <option value="ทอด">ทอด</option>
    <option value="ต้ม">ต้ม</option>
    <option value="แกง">แกง</option>
    <option value="นึ่ง">นึ่ง</option>
    <option value="ย่าง">ย่าง</option>
  </select>
        <input type="number" v-model="foodprice" min="5" max="50" placeholder="ราคาต่อจาน">
        <input type="number" v-model="Cost" min="5" max="50" placeholder="ราคาทุนจาน">
  <div class="field is-horizontal" v-for="ameter in meters" :key="ameter.id">
    <div class="field-label is-normal">
      <label class="label">วัตถุดิบ</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <select name="main meter" v-model="ameter.name" aria-readonly="">
            <option
                :key="key"
                v-for="(dep, key) in datastock"
                :value="dep.stockname"
                >{{dep.stockname}}</option>
          </select>
        </p>
      </div>
      <div class="field">
        <p class="control is-expanded">
          <input class="input is-success" type="number" placeholder="จำนวน" v-model="ameter.qty">
          <button @click="removemeter()"><i class="fas fa-times"></i></button>
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">วัตถุดิบ</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <select name="main meter" v-model="meter.name">
            <option
                :key="key"
                v-for="(dep, key) in datastock"
                :value="dep"
                >{{dep.stockname}}</option>
          </select>
        </p>
      </div>
      <div class="field">
        <p class="control is-expanded">
          <input class="input is-success" type="number" placeholder="จำนวน" v-model="meter.qty" value="1">
        </p>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" @click="addMeter()">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
        <label class="file-label">
        <input class="file-input" type="file" name="resume" @change="onFileChangefood($event.target.files[0])">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            อัพโหลดรูป
          </span>
        </span>
      </label>
         <button class="button button11" @click="setinsertmenu()">เพิ่มเมนู</button>
        <button class="button button11" @click="insertmenu(foodname, foodprice, foodtype, foodpic,meters, Cost)">เพิ่มเมนู</button>
        <span class="file-name" v-if="dataImg3">
          {{this.dataImg3.name}}
        </span>
              </div> -->
              <!-- เพิ่มเมนูอาหาร -->
              <!--show modal-->
                <div id="modal-ter" class="modal is-active" v-show="showModal2" @close="showModal2 = false">
                  <div class="modal-background"></div>
                    <div class="modal-card">
                      <header class="modal-card-head">
                        <p class="modal-card-title">เพิ่มเมนูอาหาร {{selectShop}}</p>
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
                                ชื่อวัตถุดิบ
                              </div>
                              <div class="column">
                                <input type="text" v-model="foodname" placeholder="ชื่อเมนูอาหาร">
                              </div>
                              <div class="column is-2">
                                ประเภทอาหาร :
                              </div>
                              <div class="column">
                                <select name="status" v-model="foodtype">
                                  <option value="ผัด" selected>ผัด</option>
                                  <option value="ทอด">ทอด</option>
                                  <option value="ต้ม">ต้ม</option>
                                  <option value="แกง">แกง</option>
                                  <option value="นึ่ง">นึ่ง</option>
                                  <option value="ย่าง">ย่าง</option>
                                </select>
                              </div>
                            </div>
                            <div class="columns">
                              <div class="column is-2">
                                ราคาต่อจาน
                              </div>
                              <div class="column">
                                <input type="number" v-model="foodprice" min="5" max="50" placeholder="ราคาต่อจาน">
                              </div>
                              <div class="column is-2">
                                ราคาทุนจาน
                              </div>
                              <div class="column">
                                <input type="number" v-model="Cost" min="5" max="50" placeholder="ราคาทุนจาน">
                              </div>
                            </div>
                            <div class="columns">
                              <div class="column is-2">
                                อัพโหลดรูป
                              </div>
                              <div class="column">
                                <label class="file-label">
                                <input class="file-input" type="file" name="banner" @change="onFileChangefood($event.target.files[0])">
                                <span class="file-cta">
                                  <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                  </span>
                                  <span class="file-label">
                                    อัพโหลดรูป
                                  </span>
                                </span>
                              </label>
                            </div>
                            <div class="column is-2">
                              ไฟล์ที่อัพโหลด :
                            </div>
                            <div class="column">
                              <span class="file-name" v-if="dataImg3">
                                {{dataImg3.name}}
                              </span>
                            </div>
                          </div>
                          <!-- type -->
                          <div class="columns">
                              <div class="column is-2">
                                ชื่อหน่วยวัตถุดิบ
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
                          <!-- type -->
                          <div class="columns" v-for="ameter in meters" :key="ameter.id">
                            <div class="column is-2">
                              ชื่อวัตถุดิบ :
                            </div>
                            <div class="column">
                              <select name="main meter" v-model="ameter.name" aria-readonly="">
                                <option
                                    :key="key"
                                    v-for="(dep, key) in datastock"
                                    :value="dep.stockname"
                                    >{{dep.stockname}}</option>
                              </select>
                            </div>
                            <div class="column is-2">
                              จำนวน :
                            </div>
                            <div class="column">
                              <input class="input is-success" type="number" placeholder="จำนวน" v-model="ameter.qty">
                              <button @click="removemeter()"><i class="fas fa-times"></i></button>
                            </div>
                          </div>
                          <div class="columns">
                            <div class="column is-2">
                              เพิ่มวัตถุดิบ :
                            </div>
                          <div class="column">
                            <select name="main meter" v-model="meter.name">
                              <option
                                :key="key"
                                v-for="(dep, key) in datastock"
                                :value="dep"
                                >{{dep.stockname}}</option>
                            </select>
                          </div>
                          <div class="column is-2">
                            จำนวน :
                          </div>
                          <div class="column">
                            <input class="input" type="number" placeholder="จำนวน" v-model="meter.qty" value="1">
                            <button class="button is-primary" @click="addMeter()">Add</button>
                          </div>
                        </div>
                      </div>
                        <!-- </form> -->
                        <!-- เนื้อหา -->
                    </div>
                  </section>
                  <footer class="modal-card-foot">
                    <button class="button is-success" @click="insertmenu(foodname, foodprice, foodtype, foodpic,meters, Cost, typeunit)">เพิ่มเมนู</button>
                    <!-- <button class="button is-success">บันทึกข้อมูล</button> -->
                    <button class="button" @click="Closemodal2()">ยกเลิก</button>
                  </footer>
                </div>
              </div>
              <!--show modal-->
              <!-- เพิ่มเมนูอาหาร -->
            </div>
            <div class="card">
              <h3 id="let2" class="title is-3">ความเห็นจากลูกค้า</h3>
              <div class="message-body comment" :key="key" v-for="(review, key) in review">
                <div class="">
                  <h5>Review:&nbsp;</h5>{{review.view}}
                  <h5>โดย คุณ&nbsp;{{review.namere}}</h5>
                  <button v-if="permission !== '1'" class="deleteComment button button3" @click="DelRe(key)">
                    <span class="icon">
                      <i class="fas fa-trash"></i>
                    </span>
                  </button>
                </div>
              </div>
              <hr>
              <input type="text" v-model="view" placeholder="รีวิว" size="30" class="input is-large">
              <button class="button button12" @click="insertreview(view)">เพิ่มรีวิว</button><br>
              คะแนนความพอใจ&nbsp;
              <star-rating :star-size="40" :show-rating="true" v-model="scorce"></star-rating><br>
              <button class="button is-warning" @click="insertreviewpoint(scorce)">เพิ่มคะแนนร้านค้า</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as firebase from 'firebase'
var database = firebase.database()
var foodcenterRef = database.ref('/meters')
var storageRef = firebase.storage().ref()
export default {
  name: 'shop',
  data () {
    return {
      foodname: '',
      foodprice: '',
      Cost: '',
      foodpic: '',
      foodtype: '',
      menupre: '',
      menu: '',
      menumenupre: '',
      menushow: '',
      review: '',
      menus: {},
      scorce: 0,
      view: '',
      updateKey: '',
      updatefoodname: '',
      updatefoodtype: '',
      updatefoodprice: '',
      updatefoodpic: '',
      updateMenumeters: '',
      updateMenufood: '',
      updateMenuprice: '',
      updateMenutype: '',
      updateMenupic: '',
      promo: '',
      prodetail: '',
      updateProdetail: '',
      records: '',
      detail: [],
      updateName: '',
      updatePhone: '',
      updateStatus: '',
      result: '',
      Searchtype: '',
      Search: '',
      dataImg: '',
      dataImg1: '',
      dataImg3: '',
      dataImg4: '',
      dataImg2: '',
      banner: '',
      showData: [],
      tmp: '',
      vote: '',
      meter: {
        name: '',
        qty: 1
      },
      meters: [],
      datastock: [],
      checkstock: [],
      tmp1: '',
      showModal: false,
      showModal2: false,
      showModal3: false,
      updatecost: '',
      units: '',
      typeunit: ''
    }
  },
  created () {
  },
  methods: {
    onFileChange (fileImg) {
      this.dataImg = fileImg
      console.log(this.dataImg)
    },
    onFileChangeupdate (fileImg) {
      this.dataImg1 = fileImg
      console.log(this.dataImg1)
    },
    onFileChangefood (fileImg) {
      this.dataImg3 = fileImg
      console.log(this.dataImg3)
    },
    onFileChangefoodupdate (fileImg) {
      this.dataImg4 = fileImg
      console.log(this.dataImg4)
    },
    onFileChangebanner (fileImg) {
      this.dataImg2 = fileImg
      console.log(this.dataImg2)
    },
    async insertmenu (foodname, foodprice, foodtype, foodpic, meters, Cost, type) {
      await this.truestock()
      foodtype = 'วัตถุดิบ'
      let data = {
        foodname: foodname,
        foodtype: foodtype,
        foodprice: foodprice,
        meters: meters,
        foodpic: this.dataImg3.name,
        Cost: parseInt(Cost, 10),
        type: type
      }
      if (foodname === '' || foodprice === '' || this.dataImg3 === '' || foodtype === '' || meters.length === 0 || Cost === '' || type === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        await foodcenterRef.child('menu').child(this.selectShop).push(data)
        await storageRef.child(this.dataImg3.name).put(this.dataImg3)
        // this.tmp = await storageRef.child(this.dataImg3.name).getDownloadURL()
        this.foodname = ''
        this.foodprice = ''
        this.foodtype = ''
        this.foodpic = ''
        this.menupre = ''
        this.dataImg3 = ''
        this.meters = []
        this.meter = {
          name: '',
          qty: 1
        }
        this.Cost = ''
        this.showModal2 = false
        this.type = ''
      }
      // console.log(this.tmp)
    },
    async insertmenushow (foodname, foodprice, foodpic, foodtype) {
      let data = {
        foodname: foodname,
        foodprice: foodprice,
        foodtype: foodtype,
        foodpic: this.dataImg.name
      }
      if (foodname === '' || foodprice === '' || this.dataImg === '' || foodtype === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        await storageRef.child(this.dataImg.name).put(this.dataImg)
        await foodcenterRef.child('menushow').child(this.selectShop).push(data)
        this.foodname = ''
        this.foodprice = ''
        this.foodpic = ''
        this.foodtype = ''
        this.dataImg = ''
      }
    },
    insertreview (view) {
      let data = {
        view: view,
        // scorce: scorce,
        namere: this.user
      }
      if (view === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        foodcenterRef.child('review').child(this.selectShop).push(data)
        this.view = ''
        this.scorce = ''
        this.namere = ''
      }
    },
    insertreviewpoint (scorce) {
      scorce = parseInt(scorce, 10)
      console.log(scorce)
      let data = {
        scorce: scorce,
        count: 1,
        shop: this.selectShop
      }
      if (isNaN(scorce)) {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรุณาเลือกคะแนนร้านค้า'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        if (this.vote.length !== 0) {
          console.log(this.vote)
          let Refcount = this.vote[0].count + 1
          let Refscorce = this.vote[0].scorce + scorce
          let Rating = Refscorce / Refcount
          foodcenterRef.child('shoppoint').child(this.vote[0].key).child('count').set(Refcount)
          foodcenterRef.child('shoppoint').child(this.vote[0].key).child('scorce').set(Refscorce)
          foodcenterRef.child('detail').child(this.selectShop).child('Rating').set(Rating.toFixed(2))
        } else {
          console.log('else')
          foodcenterRef.child('detail').child(this.selectShop).child('Rating').set(scorce)
          foodcenterRef.child('shoppoint').child(this.selectShop).set(data)
        }
        this.scorce = 0
        alert('ให้คะแนนร้านค้าเรียบร้อยแล้ว')
      }
    },
    insertpromo (prodetail) {
      let data = {
        prodetail: prodetail
      }
      if (prodetail === '') {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'กรุณากรอกข้อมูลให้ครบ'
          // footer: '<a href>Why do I have this issue?</a>'
        })
      } else {
        foodcenterRef.child('promo').child(this.selectShop).push(data)
        this.prodetail = ''
      }
    },
    Cart (foodname, foodprice, type, key, meters, Cost, typeunit) {
      console.log(foodname, foodprice, type, key, meters, Cost, typeunit)
      this.$store.dispatch('AddCart', {foodname, foodprice, type, key, meters, Cost, typeunit})
    },
    SetUpdateMenuShow (key, foodname, foodprice, foodpic, foodtype) {
      this.updateKey = key
      this.updatefoodname = foodname
      this.updatefoodprice = foodprice
      this.updatefoodpic = foodpic
      this.updatefoodtype = foodtype
    },
    async UpdateMenuShow (key, foodname, foodprice, foodpic, foodtype) {
      if (this.dataImg1 !== '') {
        await storageRef.child(this.dataImg1.name).put(this.dataImg1)
        await foodcenterRef.child('menushow').child(this.selectShop).child(key).update({
          foodname: foodname,
          foodprice: foodprice,
          foodpic: this.dataImg1.name,
          foodtype: foodtype
        })
      } else {
        await foodcenterRef.child('menushow').child(this.selectShop).child(key).update({
          foodname: foodname,
          foodprice: foodprice,
          foodtype: foodtype
        })
      }
      this.updateKey = ''
      this.foodname = ''
      this.foodprice = ''
      this.foodpic = ''
      this.foodtype = ''
      this.dataImg1 = ''
    },
    SetUpdatePromo (key, prodetail) {
      this.updateKey = key
      this.updateProdetail = prodetail
    },
    UpdatePromo (key, prodetail) {
      foodcenterRef.child('promo').child(this.selectShop).child(key).update({
        prodetail: prodetail
      })
      this.updateKey = ''
      this.prodetail = ''
    },
    SetUpdateMenu (key, menufood, menuprice, menutype, menupic, meters, Cost, type) {
      this.updateKey = key
      this.updateMenufood = menufood
      this.updateMenuprice = menuprice
      this.updateMenutype = menutype
      this.updateMenupic = menupic
      this.meters = meters
      this.showModal3 = true
      this.updatecost = Cost
      this.typeunit = type
    },
    async UpdateMenu (key, updateMenufood, updateMenuprice, updateMenutype, updateMenupic, updatecost) {
      await this.truestock()
      if (this.dataImg4 !== '') {
        await storageRef.child(this.dataImg4.name).put(this.dataImg4)
        foodcenterRef.child('menu').child(this.selectShop).child(key).update({
          foodname: updateMenufood,
          foodtype: updateMenutype,
          foodprice: updateMenuprice,
          foodpic: this.dataImg4.name,
          meters: this.meters,
          Cost: updatecost,
          type: this.typeunit
        })
      } else {
        foodcenterRef.child('menu').child(this.selectShop).child(key).update({
          foodname: updateMenufood,
          foodtype: updateMenutype,
          foodprice: updateMenuprice,
          meters: this.meters,
          Cost: updatecost,
          type: this.typeunit
        })
      }
      this.updateKey = ''
      this.updateMenufood = ''
      this.updateMenuprice = ''
      this.updateMenutype = ''
      this.updateMenupic = ''
      this.dataImg4 = ''
      this.meters = []
      this.showModal3 = false
      this.updatecost = ''
      this.typeunit = ''
    },
    setprofile (name, phone, status, banner) {
      // this.updateKey = true
      this.updateName = name
      this.updatePhone = phone
      this.updateStatus = status
      this.updateBanner = banner
      this.showModal = true
    },
    async updateprofile (name, phone, status, banner) {
      if (this.dataImg2 !== '') {
        await storageRef.child(this.dataImg2.name).put(this.dataImg2)
        await foodcenterRef.child('detail').child(this.selectShop).update({
          name: name,
          tel: phone,
          banner: this.dataImg2.name,
          status: status
        })
      } else {
        await foodcenterRef.child('detail').child(this.selectShop).update({
          name: name,
          tel: phone,
          status: status
        })
      }
      this.updateKey = ''
      this.updateName = ''
      this.updatePhone = ''
      this.updateStatus = ''
      this.updateBanner = ''
      this.dataImg2 = ''
      this.showModal = false
    },
    DelReview (key) {
      foodcenterRef.child('review').child(this.selectShop).child(key).remove()
    },
    DelPromo (key) {
      foodcenterRef.child('promo').child(this.selectShop).child(key).remove()
    },
    DeleteMenu (key) {
      foodcenterRef.child('menu').child(this.selectShop).child(key).remove()
    },
    DeleteMenushow (key) {
      foodcenterRef.child('menushow').child(this.selectShop).child(key).remove()
    },
    Searchnow (Search, Searchtype) {
      this.result = ''
      console.log(this.Searchtype, this.Search)
      // const newsRef2 = foodcenterRef.child('detail').child('ป้าสมบูรณ์').orderByChild('name').equalTo('ป้าสมบูรณ์')
      const newsRef2 = foodcenterRef.child(this.Searchtype).child(this.selectShop).orderByChild('foodname').equalTo(this.Search)
      newsRef2.on('child_added', snap => {
        this.result = snap.val()
        console.log(this.result)
      })
    },
    filterShop (Search) {
      if (Search.length > 0) {
        this.showData = this.menus.filter(
          (shop) => {
            if (shop.foodname.toString().indexOf(Search) >= 0 ||
              shop.foodprice.toString().indexOf(Search) >= 0 ||
              shop.foodtype.toString().indexOf(Search) >= 0) {
              return shop
            }
          }
        )
      } else {
        this.showData = []
      }
    },
    filterShop2 (Searchtype) {
      console.log('ทำ')
      if (Searchtype.length > 0) {
        this.showData = this.menus.filter(
          (shop) => {
            if (shop.foodtype === Searchtype) {
              return shop
            }
          }
        )
      } else {
        this.showData = []
      }
    },
    DelFood (key) {
      this.$swal({
        title: 'คุณกำลังลบเมนูอาหาร?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.DeleteMenu(key)
          this.$swal(
            'ลบเเล้ว!',
            'เมนูอาหารโดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    DelFoodhot (key) {
      this.$swal({
        title: 'คุณกำลังลบเมนูอาหารเเนะนำ?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.DeleteMenushow(key)
          this.$swal(
            'ลบเเล้ว!',
            'เมนูอาหารเเนะนำโดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    DelPro (key) {
      this.$swal({
        title: 'คุณกำลังลบโปรโมชั่นนี้?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.DelPromo(key)
          this.$swal(
            'ลบเเล้ว!',
            'โปรโมชั่นนี้โดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    addMeter () {
      this.meter.keystock = this.meter.name.key
      this.meter.name = this.meter.name.stockname
      this.meter.qty = parseInt(this.meter.qty, 10)
      this.meters.push(this.meter)
      this.meter = {
        name: '',
        qty: 1
      }
      console.log(this.meters)
    },
    DelRe (key) {
      this.$swal({
        title: 'คุณกำลังลบความคิดเห็นนี้?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ยืนยัน!',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.value) {
          this.DelReview(key)
          this.$swal(
            'ลบเเล้ว!',
            'ความคิดเห็นนี้โดนลบเรียบร้อยเเล้ว.',
            'success'
          )
        }
      })
    },
    async checkstocklist () {
      var stock = ''
      for (var x = 0; x < this.menus.length; x++) {
        var tmp = 0
        for (var y = 0; y < this.menus[x].meters.length; y++) {
          const checked = foodcenterRef.child('stock').child(this.selectShop).child(this.menus[x].meters[y].keystock)
          await checked.on('value', snap => {
            stock = snap.val()
          })
          if (this.menus[x].meters[y].qty <= stock.stockamount && tmp !== 1) { tmp = 0 } else { tmp = 1 }
        }
        this.checkstock.push(tmp)
      }
      this.$store.dispatch('stocklist', this.datastock)
    },
    removemeter () {
      this.meters.splice(0, 1)
    },
    truestock () {
      for (var i = 0; i < this.meters.length; i++) {
        var tmp = this.datastock.find(p => p.stockname === this.meters[i].name)
        this.meters[i].keystock = tmp.key
      }
    },
    Closemodal () {
      this.showModal = false
    },
    Closemodal2 () {
      this.showModal2 = false
    },
    Closemodal3 () {
      this.showModal3 = false
    },
    setinsertmenu () {
      this.showModal2 = true
      this.meters = []
    },
    sortHighest () {
      this.records.sort((a, b) => a.amount < b.amount ? 1 : -1)
    }
  },
  computed: {
    selectShop () {
      return this.$store.getters.selectShop
    },
    added () {
      return this.$store.state.added
    },
    itemsInCart () {
      let cart = this.$store.getters.cartProducts
      return cart.reduce((accum, item) => accum + item.quantity, 0)
    },
    hasShop () {
      return this.$store.getters.hasShop
    },
    user () {
      return this.$store.getters.user
    },
    foodRecoment () {
      let arr = []
      this.menus.forEach(function (menu, index) {
        let url = 'https://firebasestorage.googleapis.com/v0/b/foodcenter-23d67.appspot.com/o/' + menu.foodpic + '?alt=media&token=1fe47dd7-7085-4433-8dc5-b98ffb219d37'
        // arr.push('<img v-url={filename:'+ menu.foodpic+'} width="300" height="350"/>')
        arr.push('<span>' +
        '<img src="' + url + '" class="imgMenuCover">' +
        '<span class="textCover"><h1 class="title has-text-white">' + menu.foodname + '</h1>' + menu.foodprice + ' บาท </span>' +
        // '<button @click="this.Cart(' + menu.foodname + ', ' + menu.foodprice + ', ' + menu.foodtype + ', ' + index + ')" class="button button3">เพิ่มลง Order</button>' +
        '</span>')
      })
      return arr
    },
    ...mapGetters({
      permission: 'permission',
      cartProducts: 'cartProducts'
    })
  },
  mounted () {
    const dbRefObjectdetail = foodcenterRef.child('detail').child(this.selectShop)
    const dbRefObject = foodcenterRef.child('menu').child(this.selectShop)
    const dbRefObjectshow = foodcenterRef.child('menushow').child(this.selectShop)
    const dbRefObjectreview = foodcenterRef.child('review').child(this.selectShop)
    const dbRefObjectMenuhit = foodcenterRef.child('record').child(this.selectShop)
    const dbRefObjectpromo = foodcenterRef.child('promo').child(this.selectShop)
    const dbRefObjectvote = foodcenterRef.child('shoppoint').orderByChild('shop').equalTo(this.selectShop)
    const dbRefObjectstock = foodcenterRef.child('stock').child(this.selectShop)
    const dbRefObject2 = firebase.database().ref().child('meters/unit/' + this.selectShop)
    dbRefObject.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.menus = data
    })
    dbRefObjectshow.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.menushow = data
      console.log(this.menushow)
    })
    dbRefObjectreview.on('value', snap => {
      this.review = snap.val()
    })
    dbRefObjectMenuhit.orderByChild('amount').limitToLast(3).on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.records = data
      this.sortHighest()
    })
    dbRefObjectpromo.on('value', snap => {
      this.promo = snap.val()
    })
    dbRefObjectdetail.on('value', snap => {
      var data = snap.val()
      data.key = snap.key
      this.detail = []
      this.detail.push(data)
      console.log(this.detail)
    })
    dbRefObjectvote.on('value', snap => {
      var datavote = []
      snap.forEach(ss => {
        var itemvote = ss.val()
        itemvote.key = ss.key
        datavote.push(itemvote)
      })
      this.vote = datavote
      console.log(this.vote)
    })
    dbRefObjectstock.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.datastock = data
      this.checkstocklist()
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
  }
}
</script>
<style>

  .report {
    text-align: center;
  }

  .bucket {
    position: fixed;
    bottom: 5vh;
    right: 2vw;
    cursor: pointer;
    z-index: 1;
  }
  .file-label {
    font-size: 18px;
    display: unset;
  }
  .file-cta {
    font-size: 18px;
    padding: 1% 1%;
    margin: 8px 0;
    background-color: #209cee;
    border-color: transparent;
    color: #fff;
  }
  .foodList {
    border-radius: 10px;
    position: relative;
    height: 300px;
    overflow: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .foodList .detail {
    padding: 1.25rem;
  }
  .foodLists {
    margin-top: 20px;
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
  div {
    /* font-family: 'Sriracha', cursive; */
  }
  .header {
    padding: 0px;
  }
  .header .column {
    padding: 20px;
  }
  * {
    box-sizing: border-box;
   }
  .scoreHeader {
    border-radius: 20px;
    background: #ffdd57;
    color: white;
    height: 60%;
    width: 60%;
  }
  .imgMenuCover {
    width: 100%;
    height: auto;
  }
  .carousel__list {
    max-height: 350px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .textCover {
    position: absolute;
    top:10%;
    left: 10%;
    color: #ffdd57;
    /* font-size: 2rem; */
    background: #2a2a2a;
    padding: 10px 20px;
  }
  .statusOpen {
    height: 40px;
    width: auto;
    margin-left:20px;
  }
  .radioButton {
    display: none;
  }
  label.button {
    margin: 5px;
  }
  .star {
    color: #ffdd57;
  }
  .cartButton {
    font-size: 2.0rem;
    color: #ffdd57;
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
  }
  .cartButton:hover {
    color: #dfc14b;
  }
  .cartButton.disable {
    color: #bdbdbd;
    cursor: default;
  }
  .columns {
    margin: 0px;
  }
  .ratingHeaderCol {
    padding-top: 20px;
  }
  .result {
    padding:20px;
  }
  .comment {
    position: relative;
    margin-bottom: 10px;
  }
  .deleteComment {
    position: absolute;
    top:45%;
    right: 20px;
  }
  .editPromotionBtn {
    position: absolute;
    top:10px;
    right: 20px;
  }
  .promotion {
    position: relative;
  }
  .editMenuBtns {
    position: absolute;
    left: 35%;
    bottom: 20px;
  }
  .title {
    margin-bottom: 0px!important;
  }
  .vue-star-rating {
    display: initial!important;
  }
</style>
