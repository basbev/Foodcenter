<template>
<div class="report">
  <h1>Report :: {{this.selectShop}}</h1><br>
    <button @click="exportPdf">exportPDF</button>
        <button @click="getDataFirebase(getvalue, day)">รายวัน</button>
        <button @click="getDataFirebase(getvalue, month)">รายเดือน</button>
        <button @click="getDataFirebase(getvalue, year)">รายปี</button>
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
</style>
