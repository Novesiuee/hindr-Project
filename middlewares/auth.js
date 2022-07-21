const loggedIn = function (req, res, next) {
    if (!req.session.role) {
        const error = 'Login First!'
        res.redirect(`/hindr/login?error=${error}`)
    } else {
        next()
    }

}

const admin = function (req, res, next) {
    if (req.session.role != 'admin') {
        res.redirect(`/hindr/home/${req.session.id}`)
        // res.redirect(`/hindr/home/${req.session.id}`)
    } 
        next()
    
}

module.exports = {loggedIn, admin}