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
        name: product.foodname,
        price: product.foodprice,
        quantity,
        type: product.type
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
  ADD_TO_CART: (state, {Akey, foodname, foodprice, type}) => {
    const record = state.added.find(p => p.Akey === Akey)
    console.log(Akey, foodname, foodprice, type)
    if (!record) {
      state.added.push({
        Akey,
        foodname,
        foodprice,
        quantity: 1,
        type
      })
    } else {
      record.quantity++
    }
  },
  setUserFacebook: (state, userSet) => {
    console.log(userSet)
    state.user = userSet
  },
  DeleteCart: (state) => {
    state.added = []
  },
  Cartremove: (state, index) => {
    state.added.splice(index, 1)
  },
  incleseAmount: (state, index) => {
    if (state.added[index].quantity < 10) {
      state.added[index].quantity++
    }
  },
  decleseAmount: (state, index) => {
    if (state.added[index].quantity > 1) {
      state.added[index].quantity--
    }
  }
}

const actions = {
  signIn: ({commit}, payload) => {
    const dbRefObject = firebase.database().ref().child('user')
    const dbReflist = dbRefObject.child(payload.username)
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
      } else alert(`Username Or Password incorrect`)
    } else alert(`Username Or Password incorrect`)
  },
  loginfacebook: ({commit}, payload) => {
    console.log(payload)
    commit('setUser', payload)
  },
  autoSign ({commit}, payload) {
    commit('setUserFacebook', payload.displayName)
  },
  selectShop ({commit}, shop) {
    commit('setselectShop', shop)
  },
  AddCart ({commit}, payload) {
    console.log(payload)
    const Akey = payload.key
    const foodname = payload.foodname
    const foodprice = payload.foodprice
    const type = payload.type
    console.log(Akey, foodname, foodprice, type)
    commit('ADD_TO_CART', {Akey, foodname, foodprice, type})
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
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
