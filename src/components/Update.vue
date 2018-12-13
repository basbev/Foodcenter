<template>
  <div class="hello">
    <div class="container">
      <div v-for="(foodStoreName, key) in foodCenter.menu" :key="key">
        <label>{{key}}</label>
        <input type="radio" v-model="storeName" :value="key">
      </div>
      <input type="text" v-model="keyWord" @input="filterAll(keyWord)">
      <br><br>
      <div v-if="!showData.length > 0">
        <label>show all</label>
        <div v-for="(allMenu, name) in foodCenter.menu" :key="name">
          <label>{{name}}</label>
          <div v-for="(menu, index) in allMenu" :key="index">
            <p>{{menu.foodName}}{{menu.foodPrice}}{{menu.foodType}}</p>
          </div>
       </div>
      </div>
      <div v-if="showData.length > 0">
      <label>show filter</label>
      <br>
      <label>{{storeName}}</label>
       <div v-for="(data) in showData" :key="data['.key']">
        <p>{{data.foodName}}{{data.foodPrice}}{{data.foodType}}</p>
       </div>
      </div>
    </div>
    <div>
      <br><br>
      foodcenter
      <input type="text" v-model="keyWord1" @input="filterShop(keyWord1)">
      <br><br>
      <div v-if="!showData1.length > 0">
        <label>show all</label>
          <div v-for="(shop) in shops" :key="shop['key']">
            <p>{{shop.name}}{{shop.tel}}{{shop.q}}</p>
          </div>
      </div>
      <div v-if="showData1.length > 0">
      <label>show filter</label>
      <br>
       <div v-for="(data) in showData1" :key="data['key']">
        <p>{{data.name}}{{data.tel}}{{data.q}}</p>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
var database = firebase.database()
var foodcenterRef = database.ref('/foodcenter')
export default {
  name: 'HelloWorld',
  data () {
    return {
      keyWord: '',
      keyWord1: '',
      storeName: 'somBool',
      showData: [],
      showData1: [],
      shops: '',
      foodCenter: {
        menu: {
          somBool: [
            {
              '.key': 'key1',
              foodName: 'กระเพราหมู',
              foodPrice: '35',
              foodType: 'ผัด'
            },
            {
              '.key': 'key2',
              foodName: 'ต้มยำกุ้ง',
              foodPrice: '40',
              foodType: 'ต้ม'
            },
            {
              '.key': 'key3',
              foodName: 'ปลาทอด',
              foodPrice: '45',
              foodType: 'ทอด'
            }
          ],
          fatuncle: [
            {
              '.key': 'key1',
              foodName: 'กระเพราเนื้อ',
              foodPrice: '45',
              foodType: 'ผัด'
            },
            {
              '.key': 'key2',
              foodName: 'ต้มยำหมู',
              foodPrice: '55',
              foodType: 'ต้ม'
            },
            {
              '.key': 'key3',
              foodName: 'หมูทอด',
              foodPrice: '60',
              foodType: 'ทอด'
            }
          ]
        }
      }
    }
  },
  methods: {
    filterAll (keyWord) {
      if (keyWord.length > 0) {
        this.showData = this.foodCenter.menu[this.storeName].filter(
          (allMenu) => {
            if (allMenu.foodName.toString().indexOf(keyWord) >= 0 ||
              allMenu.foodPrice.toString().indexOf(keyWord) >= 0 ||
              allMenu.foodType.toString().indexOf(keyWord) >= 0) {
              return allMenu
            }
          }
        )
      } else {
        this.showData = []
      }
    },
    filterShop (keyWord1) {
      if (keyWord1.length > 0) {
        this.showData1 = this.shops.filter(
          (allMenu) => {
            if (allMenu.name.toString().indexOf(keyWord1) >= 0 ||
              allMenu.tel.toString().indexOf(keyWord1) >= 0 ||
              allMenu.q.toString().indexOf(keyWord1) >= 0) {
              return allMenu
            }
          }
        )
      } else {
        this.showData1 = []
      }
    }
  },
  mounted () {
    const dbRefObject = foodcenterRef.child('detail')
    dbRefObject.on('value', snap => {
      var data = []
      snap.forEach(ss => {
        var item = ss.val()
        item.key = ss.key
        data.push(item)
      })
      this.shops = data
      console.log(this.shops)
      console.log(this.foodCenter)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
