const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Auth = require('../models/auth')

router.get('/', async (req, res) => {
    const users = await Auth.find()
    res.json(users)
})

router.post('/login', async (req, res) => {
    console.log('User Logging In')
    try {
        const user = await Auth.find({ username: req.body.username })
        if (user.length == 1) {
            try {
                let auth = await bcrypt.compare(req.body.password, user[0].password)
                if (auth) {
                    let data = {
                        id: user[0].id,
                        username: user[0].username,
                        auth: true
                    }
                    res.send(data)
                    console.log('Signed In Successfully')
                } else {
                    res.send({ auth: false })
                    console.log('Incorrect Password')
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            res.send({ auth: false })
            console.log('User Not Found')
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/signup', async (req, res) => {
    console.log('User Signing Up')
    if ((await Auth.find({ username: req.body.username })).length == 0) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
        const auth = new Auth({
            username: req.body.username,
            password: hashedPassword
        })
        try {
            const newUser = await auth.save()  
            console.log(newUser)
            res.send(true)
        } catch (err) {
            console.log(err)
            res.send(false)
        }
    } else {
        res.send(false)
        console.log('User Already Exists')
    }
})

module.exports = router