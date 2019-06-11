<template>
<div class="report">
  <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
  <br>
  <h1 class="title">Report : {{this.selectShop}}</h1>
  <div class="columns">
    <div class="column buttonGroup">
      <h1>รายได้</h1>
      <button class="button button2" @click="exportPdf">exportPDF</button>
      <button class="button button3" @click="getDataFirebase(getvalue, day)">รายวัน</button>
      <button class="button button4" @click="getDataFirebase(getvalue, month)">รายเดือน</button>
      <button class="button button5" @click="getDataFirebase(getvalue, year)">รายปี</button>
    </div>
    <div class="column buttonGroup">
      <!-- Profit -->
      <h1>กำไร</h1>
      <button class="button button3" @click="getDataFirebaseprofit(getvalue, day)">รายวัน</button>
      <button class="button button4" @click="getDataFirebaseprofit(getvalue, month)">รายเดือน</button>
      <button class="button button5" @click="getDataFirebaseprofit(getvalue, year)">รายปี</button>
      <button class="button button5" @click="showsellhit()">เมนูขายดี</button>
      <!-- Profit -->
    </div>
  </div>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-if="showtable">
                <thead>
                  <tr>
                    <th>ชื่อเมนู</th>
                    <th>จำนวน</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>ชื่อเมนู</th>
                    <th>จำนวน</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr :key="key" v-for="(record, key) in records">
                    <td>{{record.key}}</td>
                    <td>{{record.amount}}</td>
                  </tr>
                </tbody>
              </table>
              <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-if="showtable">
                <thead>
                  <tr>
                    <th>วัน</th>
                    <th>จำนวน</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>วัน</th>
                    <th>จำนวน</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr :key="key" v-for="(record, key) in reportmoney">
                    <td>{{record.Week}}</td>
                    <td>{{record.money}}</td>
                  </tr>
                </tbody>
              </table>
              <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-if="showtable">
                <thead>
                  <tr>
                    <th>วัน</th>
                    <th>ชื่อเมนู</th>
                    <th>ราคาเมนู</th>
                    <th>จำนวนเมนู</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>วัน</th>
                    <th>ชื่อเมนู</th>
                    <th>ราคาเมนู</th>
                    <th>จำนวนเมนู</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr :key="key" v-for="(record, key) in allday">
                    <td>{{record.Week}}</td>
                    <td>{{record.name}}</td>
                    <td>{{record.price}}</td>
                    <td>{{record.quantity}}</td>
                  </tr>
                </tbody>
              </table>
  <div id="chart"></div>
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
      day: 'day',
      month: 'month',
      year: 'year',
      showchart: '',
      records: '',
      showtable: false,
      showsell: false,
      showsellweek: false,
      showmoneyweek: false,
      reportsell: '',
      reportmoney: '',
      Week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      allday: [],
      date: new Date()
    }
  },
  methods: {
    async getsell () {
      this.allday = []
      for (var i = 0; i < this.Week.length; i++) {
        var ref = firebase.database().ref().child('foodcenter/weeksell').child(this.selectShop).child(this.Week[i]).orderByChild('quantity').limitToLast(1)
        await ref.on('value', snap => {
          snap.forEach(ss => {
            var item = ss.val()
            item.Week = this.Week[i]
            this.allday.push(item)
          })
        })
        console.log(this.allday)
      }
      this.sortHighest3()
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
    },
    sortHighest2 () {
      this.reportmoney.sort((a, b) => a.money < b.money ? 1 : -1)
      this.engtothai(this.reportmoney)
    },
    sortHighest3 () {
      this.allday.sort((a, b) => a.quantity < b.quantity ? 1 : -1)
      this.engtothai(this.allday)
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
    },
    showsellhit () {
      this.showtable = true
      this.showsell = false
      this.getsell()
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
      snap.forEach(ss => {
        var item = ss.val()
        item.Week = ss.key
        data.push(item)
      })
      this.reportmoney = data
      console.log(data)
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
      // this.sortHighest3()
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
.report {
  text-align: center;
}
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
