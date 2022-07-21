const loggedIn = function (req, res, next) {
    if (!req.session.role) {
        const error = 'Login First!'
        res.redirect(`/login?error${error}`)
    } else {
        if (req.session.role === 'admin') {
            res.redirect('/crud-system')
        }
        next()
    }

}

const admin = function (req, res, next) {
    if (req.session.role !== 'admin') {
        const message = `You don't have access!`
        res.redirect(`/home?error${message}`)
    } else {
        next()
    }
}

module.exports = {loggedIn, admin}