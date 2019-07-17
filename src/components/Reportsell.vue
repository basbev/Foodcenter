<template>
<div class="report">
  <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
  <br>
  <br>
  <h1 class="title"><center>สรุปยอดขายร้าน {{this.detail.name}}</center></h1>
  <br>
  <div class="columns">
  <div class="column">
  </div>
  <div class="column is-one-third">
    <article class="message is-dark">
      <div class="message-header"><p>ยอดขาย</p></div>
      <div class="message-body" style="position: relative;">
      <button class="button is-link" @click="exportPdf">exportPDF</button>
      <button class="button" @click="getDataFirebase(getvalue, day)" v-bind:class="{ 'is-warning is-hovered': select === 'day' }">รายวัน</button>
      <button class="button" @click="getDataFirebase(getvalue, month)" v-bind:class="{ 'is-warning is-hovered': select === 'month' }">รายเดือน</button>
      <button class="button" @click="getDataFirebase(getvalue, year)" v-bind:class="{ 'is-warning is-hovered': select === 'year' }">รายปี</button>
      <!-- <button class="button button5" @click="getdonut(getvalue, year)">สรุปรายได้กำไร</button> -->
      </div>
      </article>
  </div>
  <div class="column is-one-third">
    <article class="message is-dark">
      <div class="message-header"><p>กำไร</p></div>
      <div class="message-body" style="position: relative;">
      <!-- <button class="button button2" @click="exportPdf">exportPDF</button> -->
      <button class="button" @click="getDataFirebaseprofit(getvalue, day)" v-bind:class="{ 'is-warning is-hovered': select === 'proday' }">รายวัน</button>
      <button class="button" @click="getDataFirebaseprofit(getvalue, month)" v-bind:class="{ 'is-warning is-hovered': select === 'promonth' }">รายเดือน</button>
      <button class="button" @click="getDataFirebaseprofit(getvalue, year)" v-bind:class="{ 'is-warning is-hovered': select === 'proyear' }">รายปี</button>
      <!-- <button class="button button5" @click="showsellhit()">เมนูขายดี</button> -->
      </div>
      </article>
  </div>
  <div class="column is-one-third">
    <!-- วัตถุดิบ -->
    <article class="message is-dark">
      <div class="message-header"><p>การสั่งซื้อวัตถุดิบ</p></div>
      <div class="message-body" style="position: relative;">
      <!-- <button class="button button2" @click="exportPdf">exportPDF</button> -->
      <button class="button" @click="getDataFirebasemeter(getvalue, day)" v-bind:class="{ 'is-warning is-hovered': select === 'meterday' }">รายวัน</button>
      <button class="button" @click="getDataFirebasemeter(getvalue, month)" v-bind:class="{ 'is-warning is-hovered': select === 'metermonth' }">รายเดือน</button>
      <button class="button" @click="getDataFirebasemeter(getvalue, year)" v-bind:class="{ 'is-warning is-hovered': select === 'meteryear' }">รายปี</button>
      <!-- <button class="button button5" @click="showsellhit()">เมนูขายดี</button> -->
      </div>
      </article>
  </div>
</div>
  <div class="columns">
    <!-- <div class="column buttonGroup"> -->
      <div class="is-one-quarter"></div>
                <div class="column is-half">
      <!--  -->
      </div>
      <div class="column is-half">
      </div>
    <!--  -->
  </div>
              <!--  -->
              <div class="columns">
              <div class="column">
              </div>
              <div class="column is-three-fifths">
               <article class="message is-dark">
                <div class="message-header"><p>Chart</p>
                <button v-if="select === 'day' || select === 'proday' || select === 'meterday'" class="button" @click="selectday()">เลือกวัน</button>
                <button v-if="select === 'month' || select === 'promonth' || select === 'metermonth'" class="button" @click="selectmonth()">เลือกเดือน</button>
                <button v-if="select === 'year' || select === 'proyear' || select === 'meteryear'" class="button" @click="selectyear()">เลือกปี</button>
                </div>
                <div class="message-body" style="position: relative;">
                <div id="chart"></div>
                </div>
                </article>
              </div>
              <div class="column">
                <article class="message is-dark">
                <div class="message-header"><p>Chart</p></div>
                <div class="message-body" style="position: relative;">
                <div id="chart2"></div>*ยอดขายรวมในเเต่ละวันในสัปดาห์
                </div>
                </article>
              </div>
              <div class="column">
              </div>
            </div>
            <!-- table -->
            <div class="columns">
              <div class="column">
                <article class="message is-dark">
                <div class="message-header"><p>สรุปกำไรขั้นต้น</p></div>
                <div class="message-body" style="position: relative;">
                  <br>
                  <!-- *จำนวนเงินทั้งหมด {{this.summoney}} บาท. -->
                  *รายได้จากการขายทั้งหมด {{this.summoney}} บาท.
                  <div id="chart3"></div>
                </div>
                </article>
              </div>
              <div class="column">
               <article class="message is-dark">
                <div class="message-header"><p>เมนูอาหารขายดีตลอดกาล เเละ การสั่งวัตถุดิบยอดฮิต</p></div>
                <div class="message-body" style="position: relative;">
                  <a class="button" @click="sellofmenu()" v-bind:class="{ 'is-warning is-hovered': select3 === 'menu' }">เมนูอาหารขายดีตลอดกาล</a>
                  <a class="button" @click="sellofmeter()" v-bind:class="{ 'is-warning is-hovered': select3 === 'meter' }">การสั่งวัตถุดิบยอดฮิต</a>
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th v-if="select3 === 'menu'">ชื่อเมนู</th>
                    <th v-if="select3 === 'meter'">ชื่อวัตถุดิบ</th>
                    <th>จำนวน</th>
                    <th v-if="select3 === 'meter'">ราคา</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="key" v-for="(record, key) in records">
                    <td>{{record.key}}</td>
                    <td v-if="record.amount">{{record.amount}} จาน</td>
                    <td v-if="record.quantity">{{record.quantity}} {{record.type}}</td>
                    <td v-if="record.price">{{record.price}} บาท</td>
                  </tr>
                </tbody>
              </table>
                </div>
                </article>
              </div>
              <div class="column">
                <article class="message is-dark">
                <div class="message-header"><p>ช่วงเวลาขายดี</p></div>
                <div class="message-body" style="position: relative;">
                  <a class="button" @click="sellofweek()" v-bind:class="{ 'is-warning is-hovered': select2 === 'day' }">รายวัน</a>
                  <a class="button" @click="sellofmonth()" v-bind:class="{ 'is-warning is-hovered': select2 === 'month' }">รายเดือน</a>
                  <a class="button" @click="sellofyear()" v-bind:class="{ 'is-warning is-hovered': select2 === 'year' }">รายปี</a>
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th v-if="select2 === 'day'">วัน</th>
                    <th v-if="select2 === 'month'">เดือน</th>
                    <th v-if="select2 === 'year'">ปี</th>
                    <th>จำนวน</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="key" v-for="(record, key) in reportmoney">
                    <td v-if="record.Week">{{record.Week}}</td>
                    <td v-if="record.month">{{record.month}}</td>
                    <td v-if="record.label">{{record.label}}</td>
                    <td v-if="record.value">{{record.value}} บาท.</td>
                    <td v-if="record.money">{{record.money}} บาท.</td>
                  </tr>
                </tbody>
              </table>
                </div>
                </article>
              </div>
              <div class="column">
                <article class="message is-dark">
                <div class="message-header"><p>เมนูอาหารขายดีประจำวัน</p></div>
                <div class="message-body" style="position: relative;">
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>วัน</th>
                    <th>ชื่อเมนู</th>
                    <th>ราคาเมนู</th>
                    <th>จำนวนเมนู</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="key" v-for="(record, key) in allday">
                    <td>{{record.Week}}</td>
                    <td>{{record.name}}</td>
                    <td>{{record.price}} บาท.</td>
                    <td>{{record.quantity}} จาน.</td>
                  </tr>
                </tbody>
              </table>
                </div>
                </article>
              </div>
            </div>
            <!-- table -->
              <!--  -->
              <div id="modal-ter" class="modal is-active" v-show="showmodal" @close="showmodal = false">
                          <div class="modal-background"></div>
                            <div class="modal-card">
                              <header class="modal-card-head">
                                <p class="modal-card-title">เลือกวันที่เริ่มต้น เเละ เลือกวันที่สิ้นสุด</p>
                                <button class="delete" aria-label="close" @click="Closemodal()"></button>
                              </header>
                              <section class="modal-card-body">
                                <div class="content">
                                  <!-- เนื้อหา -->
                                  <!-- <form action> -->
                                    <div class="columns">
                                      <div class="column is-3">
                                        <h5 style="padding-top:10%">
                                        วันที่เริ่มต้น
                                        </h5>
                                      </div>
                                      <div class="column">
                                        <div class="control has-icons-left">
                                          <flat-pickr v-model="date" :config="configs.basic" style="width:100%;margin-top: 0px;padding-left: 2.25em;"></flat-pickr>
                                        <span class="icon is-small is-left">
                                          <i class="fas fa-calendar-alt"></i>
                                        </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="columns">
                                      <div class="column is-3">
                                        <h5 style="padding-top:10%">
                                        วันที่สิ้นสุด
                                        </h5>
                                      </div>
                                      <div class="column">
                                        <div class="control has-icons-left">
                                          <flat-pickr v-model="date2" :config="configs.basic" style="width:100%;margin-top: 0px;padding-left: 2.25em;"></flat-pickr>
                                        <span class="icon is-small is-left">
                                          <i class="fas fa-calendar-alt"></i>
                                        </span>
                                        </div>
                                      </div>
                                    </div>
                                <!-- </form> -->
                                <!-- เนื้อหา -->
                              </div>
                            </section>
                            <footer class="modal-card-foot">
                              <button class="button is-success" @click="findday()">ตกลง</button>
                              <!-- <button class="button is-success">บันทึกข้อมูล</button> -->
                              <button class="button" @click="Closemodal()">ยกเลิก</button>
                            </footer>
                          </div>
                        </div>
                      <div id="modal-ter" class="modal is-active" v-show="showmodal2" @close="showmodal2 = false">
                          <div class="modal-background"></div>
                            <div class="modal-card">
                              <header class="modal-card-head">
                                <p class="modal-card-title">เลือกเดือนที่เริ่มต้น เเละ เลือกเดือนที่สิ้นสุด</p>
                                <button class="delete" aria-label="close" @click="Closemodal2()"></button>
                              </header>
                              <section class="modal-card-body">
                                <div class="content">
                                  <!-- เนื้อหา -->
                                  <!-- <form action> -->
                                    <div class="columns">
                                      <div class="column is-3">
                                        <h5 style="padding-top:10%">
                                        เดือนที่เริ่มต้น
                                        </h5>
                                      </div>
                                      <div class="column">
                                        <div class="control has-icons-left">
                                          <flat-pickr v-model="date3" :config="configs.month" style="width:100%;margin-top: 0px;padding-left: 2.25em;"></flat-pickr>
                                        <span class="icon is-small is-left">
                                          <i class="fas fa-calendar-alt"></i>
                                        </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="columns">
                                      <div class="column is-3">
                                        <h5 style="padding-top:10%">
                                        เดือนที่สิ้นสุด
                                        </h5>
                                      </div>
                                      <div class="column">
                                        <div class="control has-icons-left">
                                          <flat-pickr v-model="date4" :config="configs.month" style="width:100%;margin-top: 0px;padding-left: 2.25em;"></flat-pickr>
                                        <span class="icon is-small is-left">
                                          <i class="fas fa-calendar-alt"></i>
                                        </span>
                                        </div>
                                      </div>
                                    </div>
                                <!-- </form> -->
                                <!-- เนื้อหา -->
                              </div>
                            </section>
                            <footer class="modal-card-foot">
                              <button class="button is-success" @click="findmonth()">ตกลง</button>
                              <!-- <button class="button is-success">บันทึกข้อมูล</button> -->
                              <button class="button" @click="Closemodal2()">ยกเลิก</button>
                            </footer>
                          </div>
                        </div>
              <div id="modal-ter" class="modal is-active" v-show="showmodal3" @close="showmodal3 = false">
                          <div class="modal-background"></div>
                            <div class="modal-card">
                              <header class="modal-card-head">
                                <p class="modal-card-title">เลือกปีที่เริ่มต้น เเละ เลือกปีที่สิ้นสุด</p>
                                <button class="delete" aria-label="close" @click="Closemodal3()"></button>
                              </header>
                              <section class="modal-card-body">
                                <div class="content">
                                  <!-- เนื้อหา -->
                                  <!-- <form action> -->
                                    <div class="columns">
                                      <div class="column is-3">
                                        <h5 style="padding-top:10%">
                                        ปีที่เริ่มต้น
                                        </h5>
                                      </div>
                                      <div class="column">
                                        <div class="control has-icons-left">
                                          <flat-pickr v-model="date5" :config="configs.year" style="width:100%;margin-top: 0px;padding-left: 2.25em;"></flat-pickr>
                                        <span class="icon is-small is-left">
                                          <i class="fas fa-calendar-alt"></i>
                                        </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="columns">
                                      <div class="column is-3">
                                        <h5 style="padding-top:10%">
                                        ปีที่สิ้นสุด
                                        </h5>
                                      </div>
                                      <div class="column">
                                        <div class="control has-icons-left">
                                          <flat-pickr v-model="date6" :config="configs.year" style="width:100%;margin-top: 0px;padding-left: 2.25em;"></flat-pickr>
                                        <span class="icon is-small is-left">
                                          <i class="fas fa-calendar-alt"></i>
                                        </span>
                                        </div>
                                      </div>
                                    </div>
                                <!-- </form> -->
                                <!-- เนื้อหา -->
                              </div>
                            </section>
                            <footer class="modal-card-foot">
                              <button class="button is-success" @click="findyear()">ตกลง</button>
                              <!-- <button class="button is-success">บันทึกข้อมูล</button> -->
                              <button class="button" @click="Closemodal3()">ยกเลิก</button>
                            </footer>
                          </div>
                        </div>
</div>
</template>
<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import ApexCharts from 'apexcharts'
export default {
  name: 'Reportsell',
  components: {
    flatPickr
  },
  data: function () {
    return {
      configs: {
        basic: {
          altFormat: 'j M, Y',
          dateFormat: 'd-m-Y'
        },
        month: {
          dateFormat: 'm-Y'
        },
        year: {
          dateFormat: 'Y'
        }
      },
      getvalue: [],
      getvalue1: [],
      getvalue2: [],
      day: 'day',
      month: 'month',
      year: 'year',
      showchart: '',
      showchart2: '',
      showchart3: '',
      records: '',
      showtable: false,
      showsell: false,
      showsellweek: false,
      showmoneyweek: false,
      report: '',
      reportsell: '',
      reportmoney: '',
      reportprofit: '',
      Week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      allday: [],
      date: null,
      date2: null,
      date3: null,
      date4: null,
      date5: null,
      date6: null,
      dayhit: [],
      moneyhit: [],
      menudayhit: [],
      select: 0,
      select2: 'day',
      select3: 'menu',
      piedaymoney: '',
      summoney: 0,
      tmpreportmoney: '',
      detail: '',
      tmprecords: '',
      recordmeter: '',
      showmodal: false,
      showmodal2: false,
      showmodal3: false,
      tmpvalue: '',
      tmpvalu2: '',
      tmpgetvalue: '',
      tmpgetvalue1: ''
    }
  },
  methods: {
    async getsell () {
      this.menudayhit = []
      await this.Week.forEach((day) => {
        // console.log('Do getsell')
        var ref = firebase.database().ref().child('foodcenter/weeksell').child(this.selectShop).child(day).orderByChild('quantity').limitToLast(1)
        ref.on('value', snap => {
          snap.forEach(ss => {
            var item = ss.val()
            item.Week = day
            this.menudayhit.push(item)
          })
        })
        // console.log(this.menudayhit)
      })
      this.allday = this.menudayhit
      // await this.sortHighest3()
    },
    async beforeallday () {
      await this.getsell()
      await this.sortHighest3()
    },
    exportPdf () {
      var tempTitle = document.title
      document.title = 'Report.pdf'
      window.print()
      document.title = tempTitle
    },
    getDataFirebase (getvalue, scale) {
      this.select = scale
      var ref = firebase.database().ref('foodcenter/report/' + this.selectShop + '/' + scale)
      ref.once('value', snap => {
        var data = []
        var data1 = []
        snap.forEach(ss => {
          var item = ss.val().value
          var item1 = ss.val().label
          data.push(item)
          data1.push(item1)
        })
        this.getvalue = data
        this.getvalue1 = data1
        this.ShowGraph(this.getvalue, scale)
      })
    },
    getDataFirebaseprofit (getvalue, scale) {
      this.select = 'pro' + scale
      var ref = firebase.database().ref('foodcenter/reportprofit/' + this.selectShop + '/' + scale)
      ref.once('value', snap => {
        var data = []
        var data1 = []
        snap.forEach(ss => {
          var item = ss.val().value
          var item1 = ss.val().label
          data.push(item)
          data1.push(item1)
        })
        this.getvalue = data
        this.getvalue1 = data1
        this.ShowGraph(this.getvalue, scale)
      })
    },
    getDataFirebasemeter (getvalue, scale) {
      this.select = 'meter' + scale
      var ref = firebase.database().ref('foodcenter/reportmeter/' + this.selectShop + '/' + scale)
      ref.once('value', snap => {
        var data = []
        var data1 = []
        snap.forEach(ss => {
          var item = ss.val().value
          var item1 = ss.val().label
          data.push(item)
          data1.push(item1)
        })
        this.getvalue = data
        this.getvalue1 = data1
        this.ShowGraph(this.getvalue, scale)
      })
    },
    ShowGraph: function (getvalue, scale, value, value2) {
      // console.log(Math.max(...this.getvalue))
      let range = ''
      if (value !== undefined && value2 !== undefined) {
        range = value + ' ถึง ' + value2
      }
      if (scale === 'day') { scale = 'ประจำวัน' }
      if (scale === 'month') { scale = 'ประจำเดือน' }
      if (scale === 'year') { scale = 'ประจำปี' }
      this.showtable = false
      this.showsell = true
      if (this.showchart !== '') { this.showchart.destroy() }
      this.showchart = new ApexCharts(document.querySelector('#chart'),
        {
          chart: {
            height: 350,
            type: 'bar'
          },
          plotOptions: {
            bar: {
              horizontal: false,
              dataLabels: {
                position: 'top', // top, center, bottom
                columnWidth: '80%'
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              // return val + ' ' + 'บาท'
              return val
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ['#304758']
            }
          },
          series: [{
            name: 'ยอดขาย',
            data: this.getvalue
          }],
          xaxis: {
            title: {
              text: 'วันที่เปิดการขาย'
            },
            rotate: -90,
            categories: this.getvalue1,
            // position: 'top',
            labels: {
              // offsetY: 10,
              rotate: -90
            },
            axisBorder: {
              show: true
            },
            axisTicks: {
              show: true
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5
                }
              }
            },
            tooltip: {
              // enabled: true,
              offsetY: -35
            }
          },
          fill: {
            gradient: {
              shade: 'light',
              type: 'horizontal',
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [50, 0, 100, 100]
            }
          },
          yaxis: {
            // max: Math.max(...this.getvalue),
            // min: 0,
            title: {
              text: 'ยอดขาย'
            },
            axisBorder: {
              show: true
            },
            axisTicks: {
              show: true
            },
            labels: {
              show: true,
              formatter: function (val) {
                return val + ' ' + 'บาท'
              }
            }
          },
          title: {
            text: 'รายงาน, ' + scale + ' ' + range,
            floating: true,
            // offsetY: 320,
            align: 'center',
            style: {
              color: '#444'
            }},
          responsive: [
            {
              breakpoint: 1000,
              options: {
                chart: {
                  height: 700
                },
                plotOptions: {
                  bar: {
                    horizontal: true
                  }
                },
                legend: {
                  position: 'bottom'
                },
                dataLabels: {
                  offsetY: 0,
                  offsetX: 30,
                  enabled: true,
                  // offsetX: -6,
                  style: {
                    fontSize: '12px',
                    colors: ['#000000']
                  }
                },
                stroke: {
                  show: true,
                  width: 1,
                  colors: ['#000000']
                },
                yaxis: {
                  title: {
                    text: 'วันที่'
                  },
                  axisBorder: {
                    show: true
                  },
                  axisTicks: {
                    show: true
                  },
                  labels: {
                    show: true,
                    formatter: function (val) {
                      return val
                    }
                  }
                },
                xaxis: {
                  title: {
                    text: 'บาท'
                  },
                  rotate: -90,
                  labels: {
                    show: true,
                    rotate: -90,
                    rotateAlways: true,
                    formatter: function (val) {
                      return val
                    }
                  },
                  axisBorder: {
                    show: true
                  },
                  axisTicks: {
                    show: true
                  },
                  crosshairs: {
                    fill: {
                      type: 'gradient',
                      gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5
                      }
                    }
                  },
                  tooltip: {
                    offsetY: -35
                  }
                }
              }
            }
          ]
        }
      )
      this.showchart.render()
    },
    sortHighest () {
      this.records.sort((a, b) => a.amount < b.amount ? 1 : -1)
    },
    sortHighest2 () {
      this.reportmoney.sort((a, b) => a.money < b.money ? 1 : -1)
      this.engtothai(this.reportmoney)
    },
    beforesortpie () {
      for (var i = 0; i < this.piedaymoney.length; i++) {
        if (this.piedaymoney[i].Week === 'Monday') {
          this.piedaymoney[i].Week = 'จันทร์ ' + this.piedaymoney[i].money + ' บาท'
          this.piedaymoney[i].sort = 0
        }
        if (this.piedaymoney[i].Week === 'Tuesday') {
          this.piedaymoney[i].Week = 'อังคาร ' + this.piedaymoney[i].money + ' บาท'
          this.piedaymoney[i].sort = 1
        }
        if (this.piedaymoney[i].Week === 'Wednesday') {
          this.piedaymoney[i].Week = 'พุธ ' + this.piedaymoney[i].money + ' บาท'
          this.piedaymoney[i].sort = 2
        }
        if (this.piedaymoney[i].Week === 'Thursday') {
          this.piedaymoney[i].Week = 'พฤหัสบดี ' + this.piedaymoney[i].money + ' บาท'
          this.piedaymoney[i].sort = 3
        }
        if (this.piedaymoney[i].Week === 'Friday') {
          this.piedaymoney[i].Week = 'ศุกร์ ' + this.piedaymoney[i].money + ' บาท'
          this.piedaymoney[i].sort = 4
        }
        if (this.piedaymoney[i].Week === 'Saturday') {
          this.piedaymoney[i].Week = 'เสาร์ ' + this.piedaymoney[i].money + ' บาท'
          this.piedaymoney[i].sort = 5
        }
        if (this.piedaymoney[i].Week === 'Sunday') {
          this.piedaymoney[i].Week = 'อาทิตย์ ' + this.piedaymoney[i].money + ' บาท'
          this.piedaymoney[i].sort = 6
        }
      }
      console.log('DO beforesortpie')
      this.sortpie()
    },
    sortpie () {
      this.piedaymoney.sort((a, b) => a.sort > b.sort ? 1 : -1)
      // เเยกข้อมูล
      for (var i = 0; i < this.piedaymoney.length; i++) {
        this.dayhit.push(this.piedaymoney[i].Week)
        this.moneyhit.push(this.piedaymoney[i].money)
      }
      this.showPie()
    },
    async sortHighest3 () {
      await this.allday.sort((a, b) => a.quantity < b.quantity ? 1 : -1)
      await this.engtothai(this.allday)
      console.log('Do sortHighest3')
    },
    engtothai (day) {
      for (var i = 0; i < day.length; i++) {
        if (day[i].Week === 'Monday') { day[i].Week = 'จันทร์' }
        if (day[i].Week === 'Tuesday') { day[i].Week = 'อังคาร' }
        if (day[i].Week === 'Wednesday') { day[i].Week = 'พุธ' }
        if (day[i].Week === 'Thursday') { day[i].Week = 'พฤหัสบดี' }
        if (day[i].Week === 'Friday') { day[i].Week = 'ศุกร์' }
        if (day[i].Week === 'Saturday') { day[i].Week = 'เสาร์' }
        if (day[i].Week === 'Sunday') { day[i].Week = 'อาทิตย์' }
      }
      console.log(day)
    },
    showPie () {
      if (this.showchart2 !== '') { this.showchart2.destroy() }
      this.showchart2 = new ApexCharts(document.querySelector('#chart2'),
        {
          chart: {
            width: 380,
            type: 'pie'
          },
          labels: this.dayhit,
          series: this.moneyhit,
          responsive: [{
            breakpoint: 480,
            options: {
              plotOptions: {
                pie: {
                  donut: {
                    size: '65%'
                  }
                }
              },
              chart: {
                width: 380,
                height: 380
              },
              hart: {
                width: 100,
                height: 100
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      )
      this.showchart2.render()
    },
    showsellhit () {
      this.showtable = true
      this.showsell = false
      this.getsell()
    },
    async getdonut (getvalue, scale) {
      let value = ''
      let value2 = ''
      var ref = firebase.database().ref('foodcenter/report/' + this.selectShop + '/' + scale)
      await ref.on('value', snap => {
        var data = []
        // var data1 = []
        snap.forEach(ss => {
          var item = ss.val().value
          // var item1 = ss.val().label
          data.push(item)
          // data1.push(item1)
        })
        value = data
        // this.getvalue1 = data1
      })
      var ref2 = firebase.database().ref('foodcenter/reportprofit/' + this.selectShop + '/' + scale)
      await ref2.on('value', snap => {
        var data = []
        var data1 = []
        snap.forEach(ss => {
          var item = ss.val().value
          var item1 = ss.val().label
          data.push(item)
          data1.push(item1)
        })
        console.log(data)
        value2 = data
      })
      this.reducevalue(value, value2)
    },
    reducevalue (value, value2) {
      // การขาย
      const result = value.reduce((sum, number) => {
        return sum + number
      }, 0)
      // กำไรขั้นต้น
      const result2 = value2.reduce((sum, number) => {
        return sum + number
      }, 0)
      this.Graphdonut(result - result2, result2)
      this.summoney = result
    },
    Graphdonut (getvalue, getvalue2) {
      console.log(getvalue)
      console.log(getvalue2)
      if (this.showchart3 !== '') { this.showchart3.destroy() }
      this.showchart3 = new ApexCharts(document.querySelector('#chart3'),
        {
          chart: {
            type: 'donut',
            width: 380
          },
          // title: {
          //   text: 'Number of leads'
          // },
          series: [getvalue, getvalue2],
          labels: ['ต้นทุนขาย ' + getvalue + ' บาท', 'กำไรขั้นต้น ' + getvalue2 + ' บาท'],
          responsive: [{
            breakpoint: 480,
            options: {
              plotOptions: {
                pie: {
                  donut: {
                    size: '65%'
                  }
                }
              },
              chart: {
                width: 300,
                height: 300
              },
              hart: {
                width: 100
                // height: 100
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      )
      this.showchart3.render()
    },
    sellofweek () {
      this.select2 = 'day'
      this.reportmoney = this.tmpreportmoney
    },
    sellofmonth () {
      this.select2 = 'month'
      if (!this.tmpreportmoney) { this.tmpreportmoney = this.reportmoney }
      let tmp = ''
      var Refmonth = firebase.database().ref('foodcenter/report/' + this.selectShop + '/' + 'month')
      Refmonth.once('value', snap => {
        var data = []
        snap.forEach(ss => {
          var item = ss.val()
          data.push(item)
        })
        tmp = data
        this.sumsellofmonth(tmp)
      })
    },
    sumsellofmonth (month) {
      let summonth = []
      // console.log(month)
      for (var i = 0; i < month.length; i++) {
        // console.log(month[i].label.slice(5, 7))
        const found = summonth.find(p => p.month === month[i].label.slice(5, 7))
        if (found) {
          found.value = found.value + month[i].label
        } else {
          summonth.push({
            month: month[i].label.slice(5, 7),
            money: month[i].value
          })
        }
      }
      // console.log(summonth)
      this.engtothaisellofmonth(summonth)
    },
    engtothaisellofmonth (month) {
      month.forEach((item) => {
        if (item.month === '01') {
          item.month = 'มกราคม'
          item.sort = 1
        }
        if (item.month === '02') {
          item.month = 'กุมภาพันธ์'
          item.sort = 2
        }
        if (item.month === '03') {
          item.month = 'มีนาคม'
          item.sort = 3
        }
        if (item.month === '04') {
          item.month = 'เมษายน'
          item.sort = 4
        }
        if (item.month === '05') {
          item.month = 'พฤษภาคม'
          item.sort = 5
        }
        if (item.month === '06') {
          item.month = 'มิถุนายน'
          item.sort = 6
        }
        if (item.month === '07') {
          item.month = 'กรกฎาคม'
          item.sort = 7
        }
        if (item.month === '08') {
          item.month = 'สิงหาคม'
          item.sort = 8
        }
        if (item.month === '09') {
          item.month = 'กันยายน'
          item.sort = 9
        }
        if (item.month === '10') {
          item.month = 'ตุลาคม'
          item.sort = 10
        }
        if (item.month === '11') {
          item.month = 'พฤศจิกายน'
          item.sort = 11
        }
        if (item.month === '12') {
          item.month = 'ธันวาคม'
          item.sort = 12
        }
      })
      this.sortHighest4(month)
    },
    async sortHighest4 (month) {
      this.reportmoney = await month.sort((a, b) => a.money < b.money ? 1 : -1)
      // console.log(month)
    },
    sellofyear () {
      this.select2 = 'year'
      if (!this.tmpreportmoney) { this.tmpreportmoney = this.reportmoney }
      let tmp = ''
      var Refyear = firebase.database().ref('foodcenter/report/' + this.selectShop + '/' + 'year')
      Refyear.once('value', snap => {
        var data = []
        snap.forEach(ss => {
          var item = ss.val()
          data.push(item)
        })
        tmp = data
        this.reportmoney = tmp.sort((a, b) => a.money < b.money ? 1 : -1)
      })
    },
    sellofmenu () {
      this.select3 = 'menu'
      this.records = this.tmprecords
    },
    sellofmeter () {
      this.select3 = 'meter'
      this.tmprecords = this.records
      const dbRefObjectMenuhit = firebase.database().ref().child('foodcenter/recordmeter').child(this.selectShop)
      dbRefObjectMenuhit.orderByChild('amount').limitToLast(5).on('value', snap => {
        var data = []
        snap.forEach(ss => {
          var item = ss.val()
          item.key = ss.key
          data.push(item)
        })
        this.records = data.sort((a, b) => a.money < b.money ? 1 : -1)
      })
    },
    selectday () {
      this.showmodal = true
      // this.config.enable = this.getvalue1
    },
    Closemodal () {
      this.showmodal = false
    },
    findday () {
      let tmp = ''
      let tmp2 = ''
      let value = []
      let value2 = []
      if (this.tmpgetvalue) {
        this.getvalue = this.tmpgetvalue
        this.getvalue1 = this.tmpgetvalue1
      }
      console.log(this.date, this.date2)
      tmp = this.date.slice(6, 10) + this.date.slice(2, 6) + this.date.slice(0, 2)
      tmp2 = this.date2.slice(6, 10) + this.date2.slice(2, 6) + this.date2.slice(0, 2)
      console.log(tmp, tmp2)
      let found = this.getvalue1.findIndex(p => p === tmp)
      let found2 = this.getvalue1.findIndex(p => p === tmp2)
      console.log(found, found2)
      if (tmp <= tmp2) {
        if (this.date.slice(3, 5) === this.date2.slice(3, 5) && this.date.slice(6, 10) === this.date2.slice(6, 10)) {
          for (var i = this.date.slice(0, 2); i <= this.date2.slice(0, 2); i++) {
            // console.log(this.date.slice(6, 10) + this.date.slice(2, 6) + ((i.toString().length === 1) ? '0' + '' + i : i))
            let foundday = this.getvalue1.find(p => p === this.date.slice(6, 10) + this.date.slice(2, 6) + ((i.toString().length === 1) ? '0' + '' + i : i))
            let foundindex = this.getvalue1.findIndex(p => p === this.date.slice(6, 10) + this.date.slice(2, 6) + ((i.toString().length === 1) ? '0' + '' + i : i))
            console.log(foundday)
            if (foundday) {
              value.push(foundday)
              value2.push(this.getvalue[foundindex])
            }
          }
        } else {
          let betweenyear = this.date2.slice(6, 10) - this.date.slice(6, 10)
          // let betweenmonth = this.date2.slice(3, 5) - this.date.slice(3, 5)
          let year = parseInt(this.date.slice(6, 10), 10)
          let month = parseInt(this.date.slice(3, 5), 10)
          let day = ''
          let start = ''
          let startmonth = ''
          let lastmonth = ''
          for (var a = 0; a <= betweenyear; a++) {
            console.log(betweenyear)
            if (a === 0) {
              lastmonth = (betweenyear === 0) ? parseInt(this.date2.slice(3, 5), 10) : 12
              startmonth = month
            }
            if (a !== 0) {
              lastmonth = parseInt(this.date2.slice(3, 5), 10)
              startmonth = 1
            }
            for (var b = startmonth; b <= lastmonth; b++) {
              console.log(lastmonth)
              if (b === lastmonth && a === betweenyear) { day = parseInt(this.date2.slice(0, 2), 10) } else { day = new Date(year, month, 0).getDate() }
              if (b !== 0) { start = 0 } else { start = this.date.slice(0, 2) }
              for (var c = start; c <= day; c++) {
                console.log(year + '-' + ((month.toString().length === 1) ? '0' + '' + month : month) + '-' + ((c.toString().length === 1) ? '0' + '' + c : c))
                let foundday = this.getvalue1.find(p => p === year + '-' + ((month.toString().length === 1) ? '0' + '' + month : month) + '-' + ((c.toString().length === 1) ? '0' + '' + c : c))
                let foundindex = this.getvalue1.findIndex(p => p === year + '-' + ((month.toString().length === 1) ? '0' + '' + month : month) + '-' + ((c.toString().length === 1) ? '0' + '' + c : c))
                console.log(foundday)
                if (foundday) {
                  value.push(foundday)
                  value2.push(this.getvalue[foundindex])
                }
              }
              month = ((month === 12) ? 0 : month) + 1
            }
            year = year + 1
          }
        }
        console.log(value, value2)
        this.tmpgetvalue = this.getvalue
        this.tmpgetvalue1 = this.getvalue1
        this.getvalue = value2
        this.getvalue1 = value
        this.ShowGraph(this.getvalue, this.select, tmp, tmp2)
        this.showmodal = false
        this.date = ''
        this.date2 = ''
      } else {
        this.$swal({
          type: 'error',
          title: 'ขออภัย...',
          text: 'กรุณาเลือกวันที่มีในกราฟด้วย เเละ วันเริ่มต้นควรน้อยกว่าวันสิ้นสุด'
        })
      }
    },
    selectmonth () {
      this.showmodal2 = true
    },
    Closemodal2 () {
      this.showmodal2 = false
    },
    findmonth () {
      let tmp = ''
      let tmp2 = ''
      console.log(this.date3, this.date4)
      tmp = this.date3.slice(3, 7) + this.date3.slice(2, 3) + this.date3.slice(0, 2)
      tmp2 = this.date4.slice(3, 7) + this.date4.slice(2, 3) + this.date4.slice(0, 2)
      console.log(tmp, tmp2)
      let found = this.getvalue1.findIndex(p => p === tmp)
      let found2 = this.getvalue1.findIndex(p => p === tmp2)
      console.log(found, found2)
      if (found !== -1 && found2 !== -1 && found <= found2) {
        this.getvalue = this.getvalue.slice(found, found2 + 1)
        this.getvalue1 = this.getvalue1.slice(found, found2 + 1)
        this.ShowGraph(this.getvalue, this.select)
        this.showmodal2 = false
        this.date3 = ''
        this.date4 = ''
      } else {
        this.$swal({
          type: 'error',
          title: 'ขออภัย...',
          text: 'กรุณาเลือกเดือนที่มีในกราฟด้วย เเละ เดือนเริ่มต้นควรน้อยกว่าเดือนสิ้นสุด'
        })
      }
    },
    selectyear () {
      this.showmodal3 = true
    },
    Closemodal3 () {
      this.showmodal3 = false
    },
    findyear () {
      let tmp = ''
      let tmp2 = ''
      console.log(this.date5, this.date6)
      tmp = this.date5
      tmp2 = this.date6
      console.log(tmp, tmp2)
      let found = this.getvalue1.findIndex(p => p === tmp)
      let found2 = this.getvalue1.findIndex(p => p === tmp2)
      console.log(found, found2)
      if (found !== -1 && found2 !== -1 && found <= found2) {
        this.getvalue = this.getvalue.slice(found, found2 + 1)
        this.getvalue1 = this.getvalue1.slice(found, found2 + 1)
        this.ShowGraph(this.getvalue, this.select)
        this.showmodal3 = false
        this.date5 = ''
        this.date6 = ''
      } else {
        this.$swal({
          type: 'error',
          title: 'ขออภัย...',
          text: 'กรุณาเลือกปีที่มีในกราฟด้วย เเละ ปีเริ่มต้นควรน้อยกว่าปีสิ้นสุด'
        })
      }
    }
  },
  mounted () {
    this.getDataFirebase(this.getvalue, this.day)
    const dbRefObjectMenuhit = firebase.database().ref().child('foodcenter/record').child(this.selectShop)
    dbRefObjectMenuhit.orderByChild('amount').limitToLast(5).on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.records = data
      console.log(data)
      this.sortHighest()
    })
    firebase.database().ref().child('foodcenter/weekmoney').child(this.selectShop).on('value', snap => {
      var data = []
      var data1 = []
      var data2 = []
      snap.forEach(ss => {
        var item = ss.val()
        item.Week = ss.key
        var item1 = ss.val().money
        var item2 = ss.key
        data.push(item)
        data1.push(item1)
        data2.push(item2)
      })
      this.reportmoney = data
      this.sortHighest2()
    })
    firebase.database().ref().child('foodcenter/weeksell').child(this.selectShop).on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.reportsell = data
      console.log(data)
      this.beforeallday()
    })
    firebase.database().ref().child('foodcenter/reportprofit').child(this.selectShop).on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.reportprofit = data
      console.log(data)
      // this.getdonut(this.getvalue, this.year)
    })
    firebase.database().ref().child('foodcenter/weekmoney').child(this.selectShop).on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.Week = ss.key
        data.push(item)
      })
      this.piedaymoney = data
      this.beforesortpie()
    })
    firebase.database().ref().child('foodcenter/detail').child(this.selectShop).on('value', snap => {
      this.detail = snap.val()
    })
    firebase.database().ref().child('foodcenter/report').child(this.selectShop).on('value', snap => {
      this.report = snap.val()
      this.getdonut(this.getvalue, this.year)
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
<style scoped>
/* .report {
  text-align: center;
} */
.buttonGroup {
  background:#ffffff;
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  margin: 20px;
  position: relative;
}
.button6:hover {background-color: #FFB6C1;
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
</style>
