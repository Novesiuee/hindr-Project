const Controller = require('../controllers/controller')
const router = require('express').Router()
const {loggedIn, admin} = require('../middlewares/auth')

//register form
router.get('/register', Controller.formRegister)
router.post('/register', Controller.postRegister)



//login form

router.get('/login', Controller.formLogin)
router.post('/login', Controller.postLogin)

//logout

router.get('/logout', Controller.logout)


router.use(loggedIn)

//user endpoint


//session admin
router.use(admin)


//admin endpoint

module.exports = router