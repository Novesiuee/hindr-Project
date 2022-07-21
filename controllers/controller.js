const { Match, Preference, User } = require('../models')
const bcrypt = require('bcryptjs')
const { formattedAge, formatDate} = require('../helpers/index')
const { Op } = require('sequelize')
var getSign = require('horoscope').getSign;


class Controller {

    static landingPage(req, res) {
        res.render('landing-page')
    }

    static formRegister(req, res) {
        const { error } = req.query
        res.render('register-form', { error })
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
            .then((_) => {

                res.redirect('/hindr/login') //nyuruh user nyoba login 

            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    // console.log(err);
                    err = err.errors.map(el => el.message)
                    res.redirect(`/hindr/register?error=${err}`)
                } else {
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
            where: {
                email: email
            }
        })
            .then(user => {
                if (!user) {

                    const error = "Account is not found!"
                    res.redirect(`/hindr/login?error=${error}`)
                } else {
                    let id = user.id
                    const validPassword = bcrypt.compareSync(password, user.password)
                    if (validPassword) {

                        req.session.role = user.role
                        return res.redirect(`/hindr/home/${id}`)
                    } else {
                        const error = "Wrong Password!"
                        return res.redirect(`/hindr/login?error=${error}`) // wrong password
                    }
                }
            })
            .catch(err => {
                res.send(err) // sementara
            })

    }

    static homePage(req, res) {
        const { id } = req.params
        
        User.findOne({ where: { id: id }, include: Preference })
            .then((user) => {
     
                res.render('home', { user, formattedAge, formatDate })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/hindr/login')
            }
        })
    }


    static formPreference(req, res) {
        const { id } = req.params
        res.render('formPreference', { id })
    }

    static postPreference(req, res) {

        const UserId = req.params.id

        const { seekingAge, seekingGender, seekingHeight, seekingCharacter, seekingRelationshipType } = req.body
        let age = seekingAge.slice(0, 2)

        Preference.create({ seekingAge: +age, seekingGender, seekingHeight: +seekingHeight, seekingCharacter, seekingRelationshipType, UserId })
            .then(resultPreference => {

                res.redirect(`/hindr/match/${UserId}`)
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {

                    err = err.errors.map(el => el.message)
                    res.redirect(`/hindr/preferences/${id}?error=${err}`)
                } else {
                    res.send(err)
                }
            })
    }

    static match(req, res) { 

        const { id } = req.params
        let all;
        Preference.findAll({include : User})
            .then(result => {
                all = result
                Preference.findOne({
                    where: { UserId: id }, include : User
                })
                    .then((one) => {
                        res.render('match', { all, one })
                       
                    })
                    .catch(err => {
                        res.send(err)
                    })

            })
            .catch(err => {
                res.send(err)
            })

    }

    static postMatch(req, res) {
        
        const { matchId, id } = req.params

        Match.create({ MatchId : matchId, UserId:id})
            .then((_) => {
                res.redirect(`/hindr/match/profile/${matchId}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static profileById(req, res) {
        const { id } = req.params
        User.findOne({ where: { id: id }, include: Preference })
            .then((user) => {

                res.render('profileMatch', { user, formattedAge, formatDate})
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static formEditById(req, res) {
        const { id } = req.params
        User.findByPk(id, {include : Preference})
            .then(user => {
                res.render('formEditProfile', { user })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postEditById(req, res) {
        const { id } = req.params
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

            User.findOne({where:{id:id}})
            .then(result =>{
                result.update({
                    fullName: fullName,
                    email: email,
                    imageUrl: imageUrl,
                    dateOfBirth: dateOfBirth,
                    userName: userName
                })
            })
            .then((_)=>res.redirect(`/hindr/home/${id}`))   
            .catch(err => {
                res.send(err)
            })





        // User.update(,)
        //     .then(result => {
        //         res.redirect('/hindr/home')
        //     })
        //     .catch(err => {
        //         if (err.name === 'SequelizeValidationError') {
        //             // console.log(err);
        //             err = err.errors.map(el => el.message)
        //             res.redirect(`/hindr/user/edit/${id}?error=${err}`)
        //         } else {
        //             res.send(err)
        //         }
        //     })
    }

    // static deleteUser(req, res) {
    //     User.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //         .then(result => {
    //             res.redirect('/hindr/login')
    //         })
    //         .catch(err => {
    //             res.send(err)
    //         })
    // }

    static deleteUserByAdmin(req,res){
        User.findAll()
        .then(result=>{
            res.render('allUser', {result})
        })
        .catch(err=>res.send(err))
    }


}

module.exports = Controller