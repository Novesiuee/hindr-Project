const Controller = require('../controllers/controller')
const router = require('express').Router()


//register form
router.get('/register', Controller.formRegister)
router.post('/register', Controller.postRegister)

//login form
router.use(function (req, res, next){
    next()
})

router.get('/login', Controller.formLogin)
router.post('/login', Controller.postLogin)


//admin endpoint



//user endpoint
module.exports = router