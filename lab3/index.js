const express = require('express')
var mongoose = require('mongoose')

const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const app = express()

const PORT = process.env.PORT || 3000
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/blog'

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} || ${req.url} || ${new Date()}`);
    next()
})

app.use('/users', userRouter)
app.use('/posts', postRouter)

app.get('/', (req, res) => {
    res.send('Home page')
})


mongoose.connect(DB_URL, (err) => {
    if (!err) return console.log('DB connected')
    console.log(err)
})

app.listen(PORT, (err) => {
    if (!err) console.log(`The server started at port ${PORT}`)
})

