const loggedIn = function (req, res, next) {
    if (!req.session.role) {
        const error = 'Login First!'
        res.redirect(`/hindr/login?error=${error}`)
    } 
        next()
}
// else if (req.session.role === 'admin'){
//     res.render('allUser')
// }
const admin = function (req, res, next) {
    if (req.session.role != 'admin') {
        res.redirect(`/hindr/home/${req.session.id}`)
        // res.redirect(`/hindr/home/${req.session.id}`)
    } else{
        next()
    }
       
    
}

module.exports = {loggedIn, admin}