const { Match, Preference, User } = require('../models')
const bcrypt = require('bcryptjs')

class Controller {

    static formLogin(req, res) {
        res.render('login-form')
    }

    static postLogin(req, res) {
        //ngecek email dan dan password udah ada apa belum
        const { email, password } = req.body

        User.findOne({
            where : email
        })
        .then(user=>{
            if(user){
                const validPassword = bcrypt.compareSync(password, user.password)

                if(validPassword){
                    return res.redirect('homepage') //belum ada
                } else{
                    return res.redirect('register-form') // kalo ternyata gaada akun, bikin akun baru aja 
                }
            }
        })
        .catch(err=>[
            res.send(err) // sementara
        ])

    }

    static formRegister(req, res) {
        res.render('register-form')
    }

    static postRegister(req, res) {
        const { fullName, email, password, role, imageUrl, gender, dateOfBirth, height, character, userName } = req.body
        User.create({ fullName, email, password, role, imageUrl, gender, dateOfBirth, height, character, userName })
        .then(newUser=>{
            res.redirect('login-form') //nyuruh user nyoba login 

        })
        .catch(err=>{
            res.send(err) //sementara 
        })
    }


}

module.exports = Controller