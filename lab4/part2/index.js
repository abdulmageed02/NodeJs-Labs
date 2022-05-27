const express = require('express')
const app = express()
const PORT = 3000
const userRouter = require('./routes/todos')
const helper = require('./helpers/users_helper')



app.use(express.json())
app.use(async (req, res, next) => {
    await helper.checkDB()
    next()
})

app.use('/todos', userRouter)

app.get('/', (req, res) => {
    res.send('Home page')
})


app.listen(PORT, (err) => {
    if (!err) console.log(`The server started at port ${PORT}`)
})