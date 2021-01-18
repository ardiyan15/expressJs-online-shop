const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
// const expressHbs = require('express-handlebars')
const app = express()

// === Setup for handlebars template ====
// app.engine(
//     'hbs', 
//     expressHbs({
//         layoutsDir:'views/layouts/', 
//         defaultLayout: 'main-layout', 
//         extname: 'hbs'
//     }))
// app.set('view engine', 'hbs')
// =========

// Setup for pug template
// app.set('view engine', 'pug')

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

const sequelize = require('./util/database')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

sequelize
    .sync()
    .then(result => {
        // console.log(result)
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })