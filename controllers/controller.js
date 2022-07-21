const { Match, Preference, User } = require('../models')
const bcrypt = require('bcryptjs')
const {formattedAge} = require('../helpers/index')

class Controller {

    static landingPage(req,res){
        res.render('landing-page')
    }

    static formRegister(req, res) {
        const {error} = req.query
        res.render('register-form', {error})
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

            res.redirect('/hindr/login') //nyuruh user nyoba login 

        })
        .catch(err=>{
            if(err.name==='SequelizeValidationError'){
                // console.log(err);
                err = err.errors.map(el=>el.message)
                res.redirect(`/hindr/register?error=${err}`)
            }else{
                res.send(err)
            }
            // res.send(err)
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
                res.redirect(`/hindr/login?error=${error}`)
            } else {
                const validPassword = bcrypt.compareSync(password, user.password)
                    if(validPassword){

                        req.session.role = user.role
                        return res.redirect('homepage') //belum ada
                    } else{
                        const error = "Wrong Password!"
                        return res.redirect(`/hindr/login?error=${error}`) // wrong password
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
                res.redirect('/hindr/login')
            }
        }) 
    }

    static homePage(req, res){
       User.findAll({include: Preference})
       .then((user) =>{
        res.render('home', {user, formattedAge})
       })
       .catch((err) =>{
        res.send(err)
       })
    }

    static formPreference(req, res){
        res.render('formPreference')
    }

    static postPreference(req, res){

    }

    static match(req, res){

    }

    static postMatch(req, res){

    }
    
    static profileById(req, res){

    }

    static formEditById(req, res){

    }

    static postEditById(req, res){

    }

    static deleteById(req, res){

    }
}

module.exports = Controller