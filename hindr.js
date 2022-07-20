const express = require ('express')
const app = express()
const port = 3000
// const router = require ('./routers') // baru masuk ke folder doang

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
// app.use('/', router)

app.listen(port, ()=>{
    console.log(`hindr is listening to port ${port}`);
})