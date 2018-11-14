<template>
<div class="container">
  <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
  <center><h3>Profile</h3></center>
    <div class="row">
      <div class="col-25">
        <label for="fname">First Name</label>
      </div>
      <div class="col-75">
        <input type="text" id="fname" name="firstname" placeholder="Your name..">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="lname">Last Name</label>
      </div>
      <div class="col-75">
        <input type="text" id="lname" name="lastname" placeholder="Your last name..">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="lname">Phone number</label>
      </div>
      <div class="col-75">
        <input type="text" id="phone" name="phone" placeholder="Your Phone number..">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Address</label>
      </div>
      <div class="col-75">
        <textarea id="address" name="address" placeholder="Your address.." style="height:200px"></textarea>
      </div>
    </div><input type="submit" value="Submit">
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
      </div>
      <button type="button" class="button button3" data-ripple="true">
      Update
    </button>
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
<style>
.button {
    background-color: #4CAF50; /* Green */
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
    font-family: 'Prompt', sans-serif;
}
.button1:hover {
    background-color: #4CAF50;
    color: white;
    font-family: 'Prompt', sans-serif;
}
.button2 {
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #008CBA;
    font-family: 'Prompt', sans-serif;
}
.button2:hover {
    background-color: #008CBA;
    color: white;
    font-family: 'Prompt', sans-serif;
}
.button3 {
    margin-bottom: 7px;
    background-color: white;
    color: black;
    border: 2px solid #f44336;
    font-family: 'Prompt', sans-serif;
}
.button3:hover {
    background-color: #f44336;
    color: white;
}
.button4 {
    margin-bottom: 7px;
    background-color: white;
    color: black;
    border: 2px solid #B8860B;
    font-family: 'Prompt', sans-serif;
}
.button4:hover {background-color: #B8860B;
}
.button5 {
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #7FFF00;
    font-family: 'Prompt', sans-serif;
}
.button5:hover {
    background-color: #7FFF00;
    color: white;
}
.button6 {
    margin-bottom: 7px;
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
div {
  font-family: 'Prompt', sans-serif;
}
* {
    box-sizing: border-box;
}
input[type=text], select, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
}
label {
    padding: 12px 12px 12px 0;
    display: inline-block;
}
input[type=submit] {
    margin-top: 7px;
    background-color: white;
    color: black;
    border: 2px solid #7FFF00;
    font-family: 'Prompt', sans-serif;
}
input[type=submit]:hover {
   background-color: #7FFF00;
    color: white;
}
.container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
}
.col-25 {
    float: left;
    width: 25%;
    margin-top: 6px;
}
.col-75 {
    float: left;
    width: 75%;
    margin-top: 6px;
}
/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}
/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
    .col-25, .col-75, input[type=submit] {
        width: 100%;
        margin-top: 0;
    }
}
</style>
