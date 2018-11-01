import firebase from 'firebase'

const state = {
  user: null,
  password: null,
  profile: null,
  getuser: null,
  selectShop: null
}

const getters = {
  user: state => state.user,
  isLoggedIn: state => (state.user !== null),
  selectShop: state => state.selectShop
}

const mutations = {
  setUser: (state, userSet, passSet) => {
    state.user = userSet
    state.password = passSet
  },
  setselectShop: (state, shop) => {
    state.selectShop = shop
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
      console.log(state.profile.username, state.profile.password)
      if (state.profile.username === payload.username && state.profile.password === payload.password) {
        const userSet = state.profile.username
        const passSet = state.profile.password
        commit('setUser', userSet, passSet)
        alert('Successfully sign in')
      } else alert(`Username Or Password incorrect`)
    } else alert(`Username Or Password incorrect`)
  },
  loginfacebook: ({commit}) => {
    var provider = new firebase.auth.FacebookAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(
        user => {
          const userSet = firebase.auth().currentUser.displayName
          const passSet = firebase.auth().currentUser.password
          commit('setUser', userSet, passSet)
          alert(`You are logged in as ${userSet}`)
        },
        err => {
          alert(err.message)
        }
      )
  },
  autoSign ({commit}, payload) {
    commit('setUser', payload.displayName)
  },
  selectShop ({commit}, shop) {
    commit('setselectShop', shop)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
