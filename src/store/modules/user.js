import firebase from 'firebase'

const state = {
  user: null,
  password: null,
  profile: null,
  getuser: null,
  selectShop: null,
  added: [],
  permission: null,
  hasShop: null
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
        lastamount: product.amount
      }
    })
  },
  permission: state => state.permission,
  hasShop: state => state.hasShop
}

const mutations = {
  setUser: (state, {userSet, passSet, perSet, shopSet}) => {
    console.log(userSet)
    console.log(passSet)
    console.log(perSet)
    state.user = userSet
    state.password = passSet
    state.permission = perSet
    state.hasShop = shopSet
  },
  setselectShop: (state, shop) => {
    state.selectShop = shop
  },
  ADD_TO_CART: (state, {Akey, foodname, foodprice, type, amount}) => {
    const record = state.added.find(p => p.Akey === Akey)
    console.log(Akey, foodname, foodprice, type)
    if (!record) {
      state.added.push({
        Akey,
        foodname,
        foodprice,
        quantity: 1,
        type,
        amount
      })
    } else {
      if (record.quantity < amount) {
        record.quantity++
      } else {
        console.log('เกินไปนะ')
      }
    }
  },
  setUserFacebook: (state, userSet) => {
    console.log(userSet)
    state.user = userSet
    state.permission = '1'
  },
  DeleteCart: (state) => {
    state.added = []
  },
  Cartremove: (state, index) => {
    state.added.splice(index, 1)
  },
  incleseAmount: (state, index) => {
    if (state.added[index].quantity < state.added[index].amount) {
      state.added[index].quantity++
    }
  },
  decleseAmount: (state, index) => {
    if (state.added[index].quantity > 1) {
      state.added[index].quantity--
    }
  },
  LOAD (state, {user, permission, selectShop}) {
    state.user = user
    state.permission = permission
    state.selectShop = selectShop
  },
  logout: (state) => {
    state.user = null
    state.permission = null
  }
}

const actions = {
  signIn: ({commit, dispatch}, payload) => {
    const dbRefObject = firebase.database().ref().child('user')
    const dbReflist = dbRefObject.orderByChild('username').equalTo(payload.username)
    dbReflist.on('child_added', snap => {
      state.profile = snap.val()
      console.log(state.profile)
    })
    if (state.profile != null) {
      console.log(state.profile.username, state.profile.password, state.profile.permission)
      if (state.profile.username === payload.username && state.profile.password === payload.password) {
        const userSet = state.profile.username
        const passSet = state.profile.password
        const perSet = state.profile.permission
        const shopSet = state.profile.hasShop
        console.log(userSet, passSet, perSet)
        commit('setUser', {userSet, passSet, perSet, shopSet})
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
        email: firebase.auth().currentUser.email
      }
      dbRefObject1.push(data)
    }
    console.log(payload)
    commit('setUser', payload)
  },
  autoSign ({commit}, payload) {
    commit('setUserFacebook', payload.displayName)
  },
  selectShop ({commit, dispatch}, shop) {
    commit('setselectShop', shop)
    dispatch('save')
  },
  AddCart ({commit}, payload) {
    console.log(payload)
    const Akey = payload.key
    const foodname = payload.foodname
    const foodprice = payload.foodprice
    const type = payload.type
    const amount = payload.amount
    console.log(Akey, foodname, foodprice, type, amount)
    commit('ADD_TO_CART', {Akey, foodname, foodprice, type, amount})
  },
  CartCle ({commit}) {
    commit('DeleteCart')
  },
  Cartremove ({commit}, index) {
    commit('Cartremove', index)
  },
  incleseAmount ({commit, dispatch}, index) {
    commit('incleseAmount', index)
  },
  decleseAmount ({commit}, index) {
    commit('decleseAmount', index)
  },
  load ({commit}) {
    let Getuser = localStorage.getItem('user')
    let Getpermission = localStorage.getItem('permission')
    let GetselectShop = localStorage.getItem('selectShop')
    if (Getuser !== 'null' && GetselectShop !== 'undefined') {
      let user = JSON.parse(Getuser)
      let permission = JSON.parse(Getpermission)
      let selectShop = JSON.parse(GetselectShop)
      commit('LOAD', {user, permission, selectShop})
      console.log('show1')
    }
    if (Getuser !== 'null' && GetselectShop === 'undefined') {
      let user = JSON.parse(Getuser)
      let permission = JSON.parse(Getpermission)
      commit('LOAD', {user, permission})
      console.log('show2')
    }
  },
  save ({state}) {
    localStorage.setItem('user', JSON.stringify(state.user))
    localStorage.setItem('permission', JSON.stringify(state.permission))
    localStorage.setItem('selectShop', JSON.stringify(state.selectShop))
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
