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

const mongoConnect = require('./util/database').mongoConnect


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then(user => {
    //         req.user = user
    //         next()
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    next()
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoConnect(() => {
    app.listen(3000)
})





















// ------- SETUP FOR MYSQL DATABASE ----------
// Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
// User.hasMany(Product)
// User.hasOne(Cart)
// Cart.belongsTo(User)
// Cart.belongsToMany(Product, {through: CartItem})
// Product.belongsToMany(Cart, {through: CartItem})
// Order.belongsTo(User)
// User.hasMany(Order)
// Order.belongsToMany(Product, {through: OrderItem})

// sequelize
//     // .sync({force: true})
//     .sync()
//     .then(result => {
//         return User.findByPk(1)
//         // console.log(result)
//     })
//     .then(user => {
//         if(!user){
//            return User.create({
//                 name: 'Ardiyan',
//                 email: 'ardiyan@gmail.com'
//             })
//         }
//         return user
//     })
//     .then(user => {
//         // console.log(user)
//         return user.createCart()
//     })
//     .then(cart => {
//         app.listen(3000)
//     })
//     .catch(err => {
//         console.log(err)
//     })