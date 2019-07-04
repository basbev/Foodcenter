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
  <div class="column is-two-fifths">
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
  <div class="column is-two-fifths">
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
  <div class="column">
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
                <div class="message-header"><p>Chart</p></div>
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
                <div class="message-header"><p>เมนูอาหารขายดีตลอดกาล</p></div>
                <div class="message-body" style="position: relative;">
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>ชื่อเมนู</th>
                    <th>จำนวน</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="key" v-for="(record, key) in records">
                    <td>{{record.key}}</td>
                    <td>{{record.amount}} จาน</td>
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
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import ApexCharts from 'apexcharts'
export default {
  name: 'Reportsell',
  data: function () {
    return {
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
      reportsell: '',
      reportmoney: '',
      reportprofit: '',
      Week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      allday: [],
      date: new Date(),
      dayhit: [],
      moneyhit: [],
      menudayhit: [],
      select: 0,
      select2: 'day',
      piedaymoney: '',
      summoney: 0,
      tmpreportmoney: '',
      detail: ''
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
    ShowGraph: function (getvalue, scale) {
      // console.log(Math.max(...this.getvalue))
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
            name: 'Inflation',
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
              enabled: true,
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
            text: 'รายงาน, ' + scale,
            floating: true,
            // offsetY: 320,
            align: 'center',
            style: {
              color: '#444'
            }}
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
                width: 200,
                height: 200
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
      var ref = firebase.database().ref('foodcenter/report/' + this.selectShop + '/' + scale)
      await ref.on('value', snap => {
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
        this.getvalue2 = data
      })
      this.reducevalue()
    },
    reducevalue () {
      // การขาย
      const result = this.getvalue.reduce((sum, number) => {
        return sum + number
      }, 0)
      // กำไรขั้นต้น
      const result2 = this.getvalue2.reduce((sum, number) => {
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
                width: 200
                // height: 200
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
      this.getdonut(this.getvalue, this.year)
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
