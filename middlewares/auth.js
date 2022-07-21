const loggedIn = function (req, res, next) {
    if (!req.session.role) {
        const error = 'Login First!'
        res.redirect(`/hindr/login?error=${error}`)
    } else {
        if (req.session.role === 'admin') {
            res.redirect('/crud-system')
        }
        next()
    }

}

const admin = function (req, res, next) {
    if (req.session.role !== 'admin') {
        res.redirect(`/hindr/home`)
    } else {
        next()
    }
}

module.exports = {loggedIn, admin}