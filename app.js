const express = require('express')
const app = express()
const session = require('express-session')
const port = 3000
const router = require('./routers/index')


//set up ejs
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))

app.use(session({
  secret : 'its secret',
  resave: false, //menyimpan jejak user mau bentuk apapun jika false berarti tidak menyimpan
  saveUninitialized: false, 
  cookie: {
  secure : false,
  sameSite: true}
}))


app.use(router)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})