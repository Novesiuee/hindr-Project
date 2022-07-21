const express = require('express')
const app = express()
const port = 3000



//set up ejs
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))


// buat ngetes
// app.get('/', (req, res) => {
//   res.render('register-form')
// })
app.get('/', (req, res) => {
  res.render('login-form')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})