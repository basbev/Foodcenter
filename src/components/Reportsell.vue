<template>
<div class="report">
  <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
  <br>
  <h1>Report :: {{this.selectShop}}</h1><br>
    <button class="button button2" @click="exportPdf">exportPDF</button>
        <button class="button button3" @click="getDataFirebase(getvalue, day)">รายวัน</button>
        <button class="button button4" @click="getDataFirebase(getvalue, month)">รายเดือน</button>
        <button class="button button5" @click="getDataFirebase(getvalue, year)">รายปี</button>
    <div id="chart-container">
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import FusionCharts from 'FusionCharts'
export default {
  name: 'Reportsell',
  data: function () {
    return {
      getvalue: [],
      day: 'day',
      month: 'month',
      year: 'year'
    }
  },
  methods: {
    exportPdf () {
      window.print()
    },
    getDataFirebase (getvalue, scale) {
      alert(`Pls Wait`)
      var ref = firebase.database().ref('foodcenter/report/ป้าสมบูรณ์/' + scale)
      ref.once('value', snap => {
        var data = []
        snap.forEach(ss => {
          var item = ss.val()
          data.push(item)
        })
        this.getvalue = data
        console.log(this.getvalue)
        this.ShowGraph(this.getvalue)
      })
    },
    ShowGraph: function (getvalue) {
      console.log(this.getvalue)
      var firebaseChart = new FusionCharts({
        type: 'column2d',
        renderAt: 'chart-container',
        width: '650',
        height: '400',
        dataFormat: 'json',
        dataSource: {
          'chart': {
            'caption': 'Report',
            'subCaption': 'Days{br}Foodcenter Inc.',
            'subCaptionFontBold': '0',
            'captionFontSize': '20',
            'subCaptionFontSize': '17',
            'captionPadding': '15',
            'captionFontColor': '#8C8C8C',
            'baseFontSize': '14',
            'baseFont': 'Barlow',
            'canvasBgAlpha': '0',
            'bgColor': '#FFFFFF',
            'bgAlpha': '100',
            'showBorder': '0',
            'showCanvasBorder': '0',
            'showPlotBorder': '0',
            'showAlternateHGridColor': '0',
            'usePlotGradientColor': '0',
            'paletteColors': '#6AC1A5',
            'showValues': '0',
            'divLineAlpha': '5',
            'showAxisLines': '1',
            'drawAnchors': '0',
            'xAxisLineColor': '#8C8C8C',
            'xAxisLineThickness': '0.7',
            'xAxisLineAlpha': '50',
            'yAxisLineColor': '#8C8C8C',
            'yAxisLineThickness': '0.7',
            'yAxisLineAlpha': '50',
            'baseFontColor': '#8C8C8C',
            'toolTipBgColor': '#FA8D67',
            'toolTipPadding': '10',
            'toolTipColor': '#FFFFFF',
            'toolTipBorderRadius': '3',
            'toolTipBorderAlpha': '0',
            'drawCrossLine': '1',
            'crossLineColor': '#8C8C8C',
            'crossLineAlpha': '60',
            'crossLineThickness': '0.7',
            'alignCaptionWithCanvas': '1'
          },
          'data': getvalue
        }
      })
      firebaseChart.render()
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters({
      permission: 'permission',
      selectShop: 'selectShop'
    })
  }
}
</script>
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
.button1 {
    margin-top: 7px;
    width: 10%;
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
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
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #f44336;
}
.button3:hover {
    background-color: #f44336;
    color: white;
}
.button4 {
    margin-top: 7px;
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
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #FF00FF;
}
.button7 {
    margin-top: 13px;
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
hk {
   font-size: 30px;
    background-color: #F0E68C;
}
</style>
