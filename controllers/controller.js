const { Match, Preference, User } = require('../models')
const bcrypt = require('bcryptjs')

class Controller {

    

    static formRegister(req, res) {
        res.render('register-form')
    }

    static postRegister(req, res) {
        const { 
            fullName, 
            email, 
            password, 
            role, 
            imageUrl, 
            gender, 
            dateOfBirth, 
            height, 
            character, 
            userName } = req.body
        User.create({ 
            fullName, 
            email, 
            password, 
            role, 
            imageUrl, 
            gender, 
            dateOfBirth, 
            height, 
            character, 
            userName 

         })
        .then((_)=>{

            res.redirect('/login') //nyuruh user nyoba login 

        })
        .catch(err=>{
            res.send(err) //sementara 
        })
    }
    
    static formLogin(req, res) {
        res.render('login-form')
    }

    static postLogin(req, res) {
        //ngecek email dan dan password udah ada apa belum
        const { email, password } = req.body
   
        User.findOne({
            where : {
                email : email}
        })
        .then(user=>{
            if(!user) {
                
                const error = "Account is not found!"
                res.redirect(`/login?error=${error}`)
            } else {
                const validPassword = bcrypt.compareSync(password, user.password)
                    if(validPassword){

                        req.session.role = user.role
                        return res.redirect('homepage') //belum ada
                    } else{
                        const error = "Wrong Password!"
                        return res.redirect(`/login?error=${error}`) // wrong password
                    }
            }
        })
        .catch(err=>[
            res.send(err) // sementara
        ])

    }

    static logout(req, res) {
        req.session.destroy((err) =>{
            if(err) {
                res.send(err)
            } else {
                res.redirect('/login')
            }
        }) 
    }
}

module.exports = Controller