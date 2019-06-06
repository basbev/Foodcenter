var nodemailer = require('nodemailer')
const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('send mail')
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
