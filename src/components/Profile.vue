<template>
<div class="card" data-ripple="false" style="height: auto;">
  <br>
  <div class="card__title">
    <h4 class="primary--text">Profile</h4>
  </div>
  <div class="card__text">
    <div class="input-group input-group--required input-group--text-field primary--text">
      <label>firstName</label>
      <div class="input-group__input"><input name="firstName" tabindex="0" aria-label="firstName" required="" type="text"></div>
      <div class="input-group__details">
        <div class="input-group__messages"></div>
      </div>
    </div>
    <div class="input-group input-group--required input-group--text-field primary--text"><label>lastName</label>
      <div class="input-group__input"><input name="lastName" tabindex="0" aria-label="lastName" required="" type="text"></div>
      <div class="input-group__details">
        <div class="input-group__messages"></div>
      </div>
    </div>
    <div class="input-group input-group--dirty input-group--text-field primary--text"><label>Phone</label>
      <div class="input-group__input"><input name="phone" tabindex="0" aria-label="Phone" type="number"></div>
      <div class="input-group__details">
        <div class="input-group__messages"></div>
      </div>
    </div>
    <div class="input-group input-group--text-field input-group--multi-line primary--text"><label>Address</label>
      <div class="input-group__input"><textarea name="address" tabindex="0" aria-label="Address" rows="5"></textarea></div>
      <div class="input-group__details">
        <div class="input-group__messages"></div>
      </div>
    </div>
    <div class="layout wrap">
      <div class="flex xs2">
        <li class="subheader">Status: </li>
      </div>
      <div class="flex xs10">
        <div><span tabindex="0" class="chip chip--outline green green--text">Pending Member</span></div>
      </div>
    </div>
    <div class="layout wrap">
      <div class="flex xs2">
        <li class="subheader">Receipt: </li>
      </div>
      <div class="flex xs10">
        <div><span tabindex="0" class="chip chip--outline green green--text">No</span></div>
      </div>
    </div>
    <div class="layout wrap">
      <div class="flex">
        <li class="subheader">
          <p>Point: 0</p>
        </li>
      </div>
    </div> <button type="button" class="white--text btn btn--block btn--raised theme--light primary" data-ripple="true">
      <div class="btn__content">Update</div>
    </button>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Profile',
  data: function () {
    return {
      email: '',
      password: '',
      uid: ''
    }
  },
  methods: {
    update: function (e) {
      firebase
        .auth()
        .currentUser.updateEmail(this.email)
        .then(
          user => {
          },
          err => {
            console.log(err.message)
          }
        )
      firebase
        .auth()
        .currentUser.updatePassword(this.password)
        .then(
          user => {
            alert('Account Update')
            // this.$router.go({ path: '#/' })
            this.router.next({ path: 'login' })
          },
          err => {
            console.log(err.message)
          }
        )
      e.preventDefault()
    }
  }
}
</script>
