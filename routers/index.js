const Controller = require('../controllers/controller')
const router = require('express').Router()
const {loggedIn, admin} = require('../middlewares/auth')


//landing page
router.get('/', Controller.landingPage)
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
router.get('/hindr/home/:id', Controller.homePage)
router.get('/hindr/preferences/:id', Controller.formPreference) //  ok
router.post('/hindr/preferences/:id', Controller.postPreference) //  ok
router.get('/hindr/match/:id', Controller.match) //  ok
router.post('/hindr/match/:matchId/user/:id',Controller.postMatch) //  ok
router.get('/hindr/match/profile/:id', Controller.profileById) //  ok
router.get('/hindr/user/edit/:id', Controller.formEditById)
router.post('/hindr/user/edit/:id', Controller.postEditById)


//session admin
router.use(admin)


//admin endpoint
router.get('/hindr/admin/delete', Controller.deleteUserByAdmin)
router.get('/hindr/admin/delete/:id', Controller.deleteUser)
module.exports = router