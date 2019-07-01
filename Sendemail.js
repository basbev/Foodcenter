var nodemailer = require('nodemailer')
const express = require('express')
const axios = require('axios')
var FCM = require('fcm-node')
var serverKey = 'AAAAARJwAew:APA91bEzG_Xsv0t3cS7-TdMrE9Iy4hTmRxcDdwpTK1FfGPksEzN9NlgJglSzvNpGpVml7azDqqekZTIT9YVHu736vty6R1pQ7pDVt0coXFAUKmepIFRqYctlaWfvI1LKOfW6gUuj_y2-' //put your server key here
var fcm = new FCM(serverKey)

var firebase = require('firebase')
firebase.initializeApp({
  apiKey: 'AIzaSyDIfmWOTTfPFqBIN7h3J3-yt-Ey2hpYnOk',
  authDomain: 'foodcenter-23d67.firebaseapp.com',
  databaseURL: 'https://foodcenter-23d67.firebaseio.com/',
  projectId: 'foodcenter-23d67',
  storageBucket: 'foodcenter-23d67.appspot.com',
  messagingSenderId: '4604297708'
})


var database = firebase.database()
var orderRef = database.ref('foodcenter/order')

const app = express()
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('send mail || Noti')
  let params = req.query
  console.log(req.query)
  mail(params)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function mail (params) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Foodcenterkmutnb@gmail.com',
      pass: 'Foodcenterkmutnb58'
    }
  })
  var mailOptions = {
    from: 'Foodcenterkmutnb@gmail.com',
    to: params.email,
    subject: params.subject,
    // text: `Foodcenter Welcome.` + params.id,
    html: '<h1>' + params.subject + ' ' + params.name + '</h1><p>' + params.id + '</p>'
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })  
}
/* setInterval(() => {
  const userFacebookList = facebookObject.orderByChild('username').equalTo(username)

},30000) */
setInterval(()=>{
  username = null
  orderNoti = {}
  let pathNoti = ''
  orderRef.on('value', snap => {//fetch ร้าน
    let orders = snap.val()
    Object.keys(orders).forEach(function (keyStore) {
      let store = []
      Object.keys(orders[keyStore]).sort().forEach(function(key) { //เรียงเวลา
        orders[keyStore][key]["key"] = key
        store.push(orders[keyStore][key]);
      });
      let order = store.find((val) => {
        return val.status === 'กำลังรอ'
      })
      console.log(order)
      if (order && !order.alerted) {
        username = order.customer
        pathNoti = keyStore + '/' + order.key
        orderNoti = order
      }
    });
  })
  if (username) {
    const facebookObject = firebase.database().ref('facebook')
    const userFacebookList = facebookObject.orderByChild('username').equalTo(username)
  
    const userObject = firebase.database().ref('user')
    const userlist = userObject.orderByChild('username').equalTo(username)
    let token = null
    userFacebookList.once('value', snap => { //find user
      let user = snap.val()
      if (user) {
        user = user[Object.keys(user)[0]]
        token = user.token
        if (token) {
          Object.keys(token).forEach(function (noti) {
            sentNoti(noti, orderNoti)
          })
          saveAlerted(pathNoti)
        }
      }
    })
    if (!token) {
      userlist.once('value', snap => {
        let user = snap.val()
        if (user) {
          user = user[Object.keys(user)[0]]
          token = user.token
          // console.log(user)
          if (token) {
            Object.keys(token).forEach(function (noti) {
              sentNoti(noti, orderNoti)
            })
            saveAlerted(pathNoti)
          }
        }
      })
    }
  }
}, 60000);
function saveAlerted (pathNoti) {
  orderRef.child(pathNoti+ '/alerted').set(true)
}
function sentNoti (token, order) {
  if (token) {
    // console.log("sent noti",order)
    let strMenu = ''
    order.menu.forEach((item) => {
      strMenu += item.name + ' ' + item.quantity + ' '
    })
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: token, 
      // collapse_key: 'your_collapse_key',
      notification: {
          title: 'ถึงคิวคุณแล้ว ผู้ใช้: ' + order.customer, 
          body: strMenu
      },
      
      data: {  //you can send only notification or only data(or include both)
          my_key: 'my value',
          my_another_key: 'my another value'
      }
    };
  
    fcm.send(message, function(err, response){
      if (err) {
          console.log("Something has gone wrong!");
      } else {
          console.log("Successfully sent with response: ", response);
      }
    });
  }
}