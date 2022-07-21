const { Match, Preference, User } = require('../models')
const bcrypt = require('bcryptjs')
const {formattedAge} = require('../helpers/index')
const { Op } = require('sequelize')

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
                        return res.render('home', {user, formattedAge})
                    } else{
                        const error = "Wrong Password!"
                        return res.redirect(`/hindr/login?error=${error}`) // wrong password
                    }
            }
        })
        .catch(err=>{
            res.send(err) // sementara
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

    static logout(req, res) {
        req.session.destroy((err) =>{
            if(err) {
                res.send(err)
            } else {
                res.redirect('/hindr/login')
            }
        }) 
    }


    static formPreference(req, res){
        res.render('formPreference')
    }

    static postPreference(req, res){
        const { id } = req.params
        const { seekingAge, seekingGender, seekingHeight, seekingCharacter, seekingRelationshipType } = req.body

        Preference.create({ seekingAge, seekingGender, seekingHeight, seekingCharacter, seekingRelationshipType })
            .then(resultPreference => {
                return resultPreference
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    // console.log(err);
                    err = err.errors.map(el => el.message)
                    res.redirect(`/hindr/preferences/${id}?error=${err}`)
                } else {
                    res.send(err)
                }
            })
    }

    static match(req, res){
        const { seekingAge, seekingGender, seekingHeight, seekingCharacter, seekingRelationshipType } = req.body

        User.findAll({
            include : Preference,
            where : {
                Preference:{
                    seekingAge : seekingAge,
                    seekingGender : seekingGender,
                }
            }

        })
    }

    static postMatch(req, res){
        const {MatchId} = req.params

        Match.create({UserId, MatchId}, {include : User})
        .then(createdMatch=>{
            let matchWitchUser = User.findByPk(createdMatch.MatchId)

            Match.findAll({
                where :{
                    UserId: haha
                }
            })
        })
    }
    
    static profileById(req, res){

    }

    static formEditById(req, res){
        const {id} = req.params
        User.findByPk(id)
            .then(result => {
                res.render('editFormById', { result })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postEditById(req, res){
        const {id} = req.params
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
            userName 
        } = req.body

        User.Update({
            fullName:fullName,
            email:email,
            password:password,
            role:role,
            imageUrl:imageUrl,
            gender:gender,
            dateOfBirth:dateOfBirth,
            height:height,
            character:character,
            userName:userName 
        })
        .then(result=>{
            res.redirect('/hindr/home')
        })
        .catch(err=>{
            if (err.name === 'SequelizeValidationError') {
                // console.log(err);
                err = err.errors.map(el => el.message)
                res.redirect(`/hindr/user/edit/${id}?error=${err}`)
            } else {
                res.send(err)
            }
        })
    }

    static deleteById(req, res){
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                res.redirect('/hindr')
            })
            .catch(err => {
                res.send(err)
            })
    }

}

module.exports = Controller