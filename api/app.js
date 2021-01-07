const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv/config')

const postRoute = require('./routes/posts')
const authRoute = require('./routes/auth')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/posts', postRoute)
app.use('/auth', authRoute)

mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => { console.log('DB Connected') })

app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`)
})
