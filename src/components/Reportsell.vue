<template>
<div class="report">
  <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
  <br>
  <br>
  <h1 class="title"><center>สรุปยอดขายร้าน{{this.selectShop}}</center></h1>
  <br>
  <div class="columns">
  <div class="column">
  </div>
  <div class="column is-two-fifths">
    <article class="message is-dark">
      <div class="message-header"><p>ยอดขาย</p></div>
      <div class="message-body" style="position: relative;">
      <button class="button button2" @click="exportPdf">exportPDF</button>
      <button class="button button3" @click="getDataFirebase(getvalue, day)">รายวัน</button>
      <button class="button button4" @click="getDataFirebase(getvalue, month)">รายเดือน</button>
      <button class="button button5" @click="getDataFirebase(getvalue, year)">รายปี</button>
      <!-- <button class="button button5" @click="getdonut(getvalue, year)">สรุปรายได้กำไร</button> -->
      </div>
      </article>
  </div>
  <div class="column is-two-fifths">
    <article class="message is-dark">
      <div class="message-header"><p>กำไร</p></div>
      <div class="message-body" style="position: relative;">
      <!-- <button class="button button2" @click="exportPdf">exportPDF</button> -->
      <button class="button button3" @click="getDataFirebaseprofit(getvalue, day)">รายวัน</button>
      <button class="button button4" @click="getDataFirebaseprofit(getvalue, month)">รายเดือน</button>
      <button class="button button5" @click="getDataFirebaseprofit(getvalue, year)">รายปี</button>
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
    <!-- </div> -->
    <!-- <div class="column buttonGroup"> -->
      <!-- Profit -->
      <!-- <h1>กำไร</h1>
      <button class="button button3" @click="getDataFirebaseprofit(getvalue, day)">รายวัน</button>
      <button class="button button4" @click="getDataFirebaseprofit(getvalue, month)">รายเดือน</button>
      <button class="button button5" @click="getDataFirebaseprofit(getvalue, year)">รายปี</button>
      <button class="button button5" @click="showsellhit()">เมนูขายดี</button> -->
      <!-- Profit -->
    <!-- </div> -->
    <!--  -->
    <!-- <div class="columns is-multiline">
    <div class="column">
    <div class="box notification is-primary">
    <div class="heading">Top Seller Total</div>
    <div class="title"><button class="button button2" @click="exportPdf">exportPDF</button></div>
    </div>
    </div>
    <div class="column">
    <div class="box notification is-primary">
    <div class="heading">Top Seller Total</div>
    <div class="title"><button class="button button3" @click="getDataFirebase(getvalue, day)">รายวัน</button></div>
    </div>
    </div>
    <div class="column">
    <div class="box notification is-primary">
    <div class="heading">Top Seller Total</div>
    <div class="title"><button class="button button3" @click="getDataFirebase(getvalue, day)">รายวัน</button></div>
    </div>
    </div>
    <div class="column">
    <div class="box notification is-primary">
    <div class="heading">Top Seller Total</div>
    <div class="title"><button class="button button3" @click="getDataFirebase(getvalue, day)">รายวัน</button></div>
    </div>
    </div>
    <div class="column">
    <div class="box notification is-primary">
    <div class="heading">Top Seller Total</div>
    <div class="title"><button class="button button3" @click="getDataFirebase(getvalue, day)">รายวัน</button></div>
    </div>
    </div>
    <div class="column">
    <div class="box notification is-primary">
    <div class="heading">Top Seller Total</div>
    <div class="title"><button class="button button3" @click="getDataFirebase(getvalue, day)">รายวัน</button></div>
    </div>
    </div>
    <div class="column">
    <div class="box notification is-primary">
    <div class="heading">Top Seller Total</div>
    <div class="title"><button class="button button3" @click="getDataFirebase(getvalue, day)">รายวัน</button></div>
    </div>
    </div>
    <div class="column">
    <div class="box notification is-primary">
    <div class="heading">Top Seller Total</div>
    <div class="title"><button class="button button3" @click="getDataFirebase(getvalue, day)">รายวัน</button></div>
    </div>
    </div>
    <div class="column">
    <div class="box notification is-primary">
    <div class="heading">Top Seller Total</div>
    <div class="title"><button class="button button3" @click="getDataFirebase(getvalue, day)">รายวัน</button></div>
    </div>
    </div>
    </div> -->
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
                <div id="chart2"></div>
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
                <div class="message-header"><p>สรุปรายได้กำไร</p></div>
                <div class="message-body" style="position: relative;">
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
                    <td>{{record.amount}}</td>
                  </tr>
                </tbody>
              </table>
                </div>
                </article>
              </div>
              <div class="column">
                <article class="message is-dark">
                <div class="message-header"><p>วันที่ขายดี</p></div>
                <div class="message-body" style="position: relative;">
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>วัน</th>
                    <th>จำนวน</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="key" v-for="(record, key) in reportmoney">
                    <td>{{record.Week}}</td>
                    <td>{{record.money}}</td>
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
                    <td>{{record.price}}</td>
                    <td>{{record.quantity}}</td>
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
      dayhit: '',
      moneyhit: '',
      menudayhit: []
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
        this.ShowGraph(this.getvalue)
      })
    },
    getDataFirebaseprofit (getvalue, scale) {
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
        this.ShowGraph(this.getvalue)
      })
    },
    ShowGraph: function (getvalue) {
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
                position: 'top' // top, center, bottom
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + ' ' + 'บาท'
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
            categories: this.getvalue1,
            position: 'top',
            labels: {
              offsetY: -18
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
            text: 'Report Foodcenter, 2019',
            floating: true,
            offsetY: 320,
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
      // this.records.sort((a, b) => a.key < b.key ? -1 : 1)
    },
    sortHighest2 () {
      this.reportmoney.sort((a, b) => a.money < b.money ? 1 : -1)
      this.engtothai(this.reportmoney)
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
      console.log(this.allday)
      // this.showPie()
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
          // labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
          // series: [44, 55, 13, 43, 22],
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
        // this.Graphdonut(this.getvalue)
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
        // this.getvalue1 = data1
        // this.Graphdonut(this.getvalue)
      })
      this.reducevalue()
    },
    reducevalue () {
      const result = this.getvalue.reduce((sum, number) => {
        return sum + number
      }, 0)
      const result2 = this.getvalue2.reduce((sum, number) => {
        return sum + number
      }, 0)
      this.Graphdonut(result, result2)
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
          series: [getvalue, getvalue2],
          labels: ['รายได้รวม', 'กำไร'],
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
    engtothaiday () {
      for (var i = 0; i < this.dayhit.length; i++) {
        if (this.dayhit[i] === 'Monday') { this.dayhit[i] = 'จันทร์' }
        if (this.dayhit[i] === 'Tuesday') { this.dayhit[i] = 'อังคาร' }
        if (this.dayhit[i] === 'Wednesday') { this.dayhit[i] = 'พุธ' }
        if (this.dayhit[i] === 'Thursday') { this.dayhit[i] = 'พฤหัสบดี' }
        if (this.dayhit[i] === 'Friday') { this.dayhit[i] = 'ศุกร์' }
        if (this.dayhit[i] === 'Saturday') { this.dayhit[i] = 'เสาร์' }
        if (this.dayhit[i] === 'Sunday') { this.dayhit[i] = 'อาทิตย์' }
      }
      this.showPie()
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
      this.dayhit = data2
      this.moneyhit = data1
      // console.log(data.Week)
      this.sortHighest2()
      // this.showPie()
      this.engtothaiday()
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
    // this.getsell()
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
