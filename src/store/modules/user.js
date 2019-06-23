import firebase from 'firebase'
const Swal = require('sweetalert2')
const state = {
  user: null,
  password: null,
  profile: null,
  getuser: null,
  selectShop: null,
  added: [],
  permission: null,
  hasShop: null,
  stocklist: [],
  stocklimit: [],
  token: null,
  key: null
}

const getters = {
  user: state => state.user,
  isLoggedIn: state => (state.user !== null),
  selectShop: state => state.selectShop,
  cartProducts: state => {
    return state.added.map(({ Akey, quantity }) => {
      const product = state.added.find(p => p.Akey === Akey)

      return {
        key: product.Akey,
        name: product.foodname,
        price: product.foodprice,
        quantity,
        type: product.type,
        meters: product.meters,
        Cost: product.Cost,
        unit: product.unit
      }
    })
  },
  permission: state => state.permission,
  hasShop: state => state.hasShop,
  token: state => state.token,
  key: state => state.key
}

const mutations = {
  setUser: (state, {userSet, passSet, perSet, shopSet, key}) => {
    console.log(userSet)
    console.log(passSet)
    console.log(perSet)
    console.log(shopSet)
    state.user = userSet
    state.password = passSet
    state.permission = perSet
    state.hasShop = shopSet
    state.key = key
  },
  setToken: (state, token) => {
    console.log('token', token)
    state.token = token
  },
  setselectShop: (state, shop) => {
    state.selectShop = shop
  },
  ADD_TO_CART: (state, {Akey, foodname, foodprice, type, meters, Cost, unit}) => {
    var tmp = 0 // กำหนดว่าครบไหม
    const record = state.added.find(p => p.Akey === Akey) // หาจำนวนจาน
    for (var i = 0; i < meters.length; i++) {
      const dual = state.stocklist.find(p => p.key === meters[i].keystock)
      const stock = state.stocklimit.find(p => p.key === meters[i].keystock)
      console.log('stock.qty', stock)
      console.log('dual.stockamount', dual.stockamount)
      if (!stock) {
        state.stocklimit.push({
          key: meters[i].keystock,
          name: meters[i].name,
          qty: meters[i].qty
        })
      } else {
        console.log('stock.qty', stock.qty)
        console.log('dual.stockamount', dual.stockamount)
        if (stock.qty < dual.stockamount && tmp !== 1) {
          stock.qty = stock.qty + meters[i].qty
          tmp = 0
        } else { tmp = 1 }
      }
    }
    if (tmp === 0) {
      if (!record) {
        state.added.push({
          Akey,
          foodname,
          foodprice,
          quantity: 1,
          type,
          meters,
          Cost,
          unit
        })
      } else { record.quantity++ }
    } else { Swal.fire('ไม่สามารถเพิ่มได้!', 'เนื่องจากวัตถุดิบที่ใช้ไม่เพียงพอ!', 'error') }
  },
  stocklist: (state, payload) => {
    state.stocklist = payload
    // console.log(state.stocklist)
  },
  setUserFacebook: (state, userSet) => {
    console.log(userSet)
    state.user = userSet
    state.permission = '1'
  },
  DeleteCart: (state) => {
    state.added = []
    state.stocklimit = []
  },
  Cartremove: (state, index) => {
    for (var i = 0; i < state.added[index].meters.length; i++) {
      const stock = state.stocklimit.find(p => p.key === state.added[index].meters[i].keystock)
      stock.qty = stock.qty - state.added[index].meters[i].qty * state.added[index].quantity
    }
    state.added.splice(index, 1)
  },
  incleseAmount: (state, index) => {
    var tmp = 0
    for (var i = 0; i < state.added[index].meters.length; i++) {
      const dual = state.stocklist.find(p => p.key === state.added[index].meters[i].keystock)
      const stock = state.stocklimit.find(p => p.key === state.added[index].meters[i].keystock)
      if (stock.qty < dual.stockamount && tmp !== 1) {
        stock.qty = stock.qty + state.added[index].meters[i].qty
        tmp = 0
      } else { tmp = 1 }
    }
    if (tmp === 0) {
      state.added[index].quantity++
    } else { Swal.fire('ไม่สามารถเพิ่มได้!', 'เนื่องจากวัตถุดิบที่ใช้ไม่เพียงพอ!', 'error') }
  },
  decleseAmount: (state, index) => {
    if (state.added[index].quantity > 1) {
      for (var i = 0; i < state.added[index].meters.length; i++) {
        const stock = state.stocklimit.find(p => p.key === state.added[index].meters[i].keystock)
        stock.qty = stock.qty - state.added[index].meters[i].qty
      }
      state.added[index].quantity--
    } else { Swal.fire('ไม่สามารถลบได้!', 'เนื่องจากขั้นต้นในการสั่งเมนูนี้!', 'error') }
  },
  LOAD (state, {user, permission, selectShop, hasShop}) {
    state.user = user
    state.permission = permission
    state.selectShop = selectShop
    state.hasShop = hasShop
  },
  LOADTOKEN (state, {token}) {
    state.token = token
  },
  logout: (state) => {
    state.user = null
    state.permission = null
    state.token = null
  }
}

const actions = {
  signIn: ({commit, dispatch}, payload) => {
    const dbRefObject = firebase.database().ref().child('user')
    const dbReflist = dbRefObject.orderByChild('username').equalTo(payload.username)
    dbReflist.on('child_added', snap => {
      state.profile = snap.val()
      state.key = snap.key
      console.log(state.profile)
    })
    if (state.profile != null) {
      console.log(state.profile.username, state.profile.password, state.profile.permission)
      if (state.profile.username === payload.username && state.profile.password === payload.password) {
        const userSet = state.profile.username
        const passSet = state.profile.password
        const perSet = state.profile.permission
        const shopSet = state.profile.hasShop
        const key = state.key
        console.log(userSet, passSet, perSet, shopSet, key)
        commit('setUser', {userSet, passSet, perSet, shopSet, key})
        commit('setselectShop', shopSet)
        dispatch('save')
      } else alert(`Username Or Password incorrect`)
    } else alert(`Username Or Password incorrect`)
  },
  loginfacebook: ({commit}, payload) => {
    const dbRefObject = firebase.database().ref().child('facebook')
    const dbReflist = dbRefObject.orderByChild('username').equalTo(payload)
    dbReflist.once('child_added', snap => {
      state.profile = snap.val()
      console.log(state.profile)
    })
    if (state.profile == null) {
      var dbRefObject1 = firebase.database().ref().child('facebook')
      let data = {
        username: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
        token: state.token
      }
      dbRefObject1.push(data)
    }
    console.log(payload)
    commit('setUser', payload)
  },
  saveToken: ({commit, dispatch}, payload) => {
    console.log('Token', payload)
    commit('setToken', payload)
    dispatch('save')
  },
  autoSign ({commit}, payload) {
    commit('setUserFacebook', payload.displayName)
  },
  selectShop ({commit, dispatch}, shop) {
    commit('setselectShop', shop)
    dispatch('save')
  },
  AddCart ({commit}, payload) {
    const Akey = payload.key
    const foodname = payload.foodname
    const foodprice = payload.foodprice
    const type = payload.type
    const meters = payload.meters
    const Cost = payload.Cost
    const unit = payload.typeunit
    console.log(Akey, foodname, foodprice, type, meters, Cost, unit)
    commit('ADD_TO_CART', {Akey, foodname, foodprice, type, meters, Cost, unit})
  },
  stocklist ({commit}, payload) {
    commit('stocklist', (payload))
  },
  CartCle ({commit}) {
    commit('DeleteCart')
  },
  Cartremove ({commit}, index) {
    commit('Cartremove', index)
  },
  incleseAmount ({commit}, index) {
    commit('incleseAmount', index)
  },
  decleseAmount ({commit}, index) {
    commit('decleseAmount', index)
  },
  load ({commit}) {
    let Getuser = localStorage.getItem('user')
    let Getpermission = localStorage.getItem('permission')
    let GetselectShop = localStorage.getItem('selectShop')
    let GethasShop = localStorage.getItem('hasShop')
    let Gettoken = localStorage.getItem('token')
    if (Getuser !== 'null' && GetselectShop !== 'undefined') {
      let user = JSON.parse(Getuser)
      let permission = JSON.parse(Getpermission)
      let selectShop = JSON.parse(GetselectShop)
      let hasShop = JSON.parse(GethasShop)
      let token = JSON.parse(Gettoken)
      commit('LOAD', {user, permission, selectShop, hasShop})
      commit('LOADTOKEN', {token})
      // console.log('show1')
    }
    if (Getuser !== 'null' && GetselectShop === 'undefined') {
      let user = JSON.parse(Getuser)
      let permission = JSON.parse(Getpermission)
      let token = JSON.parse(Gettoken)
      commit('LOAD', {user, permission})
      commit('LOADTOKEN', {token})
      // console.log('show2')
    }
  },
  save ({state}) {
    localStorage.setItem('user', JSON.stringify(state.user))
    localStorage.setItem('permission', JSON.stringify(state.permission))
    localStorage.setItem('selectShop', JSON.stringify(state.selectShop))
    localStorage.setItem('hasShop', JSON.stringify(state.hasShop))
    localStorage.getItem('token', JSON.stringify(state.token))
    console.log(state.selectShop, state.permission)
  },
  clearlogin ({commit, dispatch}) {
    commit('logout')
    dispatch('save')
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
