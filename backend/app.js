const express = require('express')
const app = express()
const helmet = require('helmet')
const bodyParser = require('body-parser')
const compression = require('compression')

app.use(helmet())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())

const indexRouter = require('./routes/index')
const api = require('./api/handler/api')
app.use('/', indexRouter)
app.use('/api', api)


app.listen(3000, () => {
    console.log('connect!')
})