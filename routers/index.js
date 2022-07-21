const Controller = require('../controllers/controller')
const router = require('express').Router()
const {loggedIn, admin} = require('../middlewares/auth')


//landing page

router.get('/hindr', Controller.landingPage)


//register form

router.get('/hindr/register', Controller.formRegister)
router.post('/hindr/register', Controller.postRegister)


//login form

router.get('/hindr/login', Controller.formLogin)
router.post('/hindr/login', Controller.postLogin)


//logout

router.get('/hindr/logout', Controller.logout)


router.use(loggedIn)

//user endpoint
router.get('/hindr/home', Controller.homePage)
router.get('/hindr/preferences/:id', Controller.formPreference)
router.post('/hindr/preferences/:id', Controller.postPreference)
router.get('/hindr/match', Controller.match)
router.post('/hindr/match',Controller.postMatch)
router.get('/hindr/match/:id', Controller.profileById)
router.get('/hindr/user/edit/:id', Controller.formEditById)
router.post('/hindr/user/edit/:id', Controller.postEditById)
router.get('/hindr/user/delete/:id', Controller.deleteById)

//session admin
router.use(admin)


//admin endpoint

module.exports = router