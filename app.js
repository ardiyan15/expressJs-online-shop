const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')
const errorController = require('./controllers/error')

const User = require('./models/user')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById('600ec7e291807614a4be28e9')
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => {
            console.log(err)
        })
})

app.use(authRoutes)
app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose.connect(`mongodb+srv://ardiyan:Hiro@)@!@cluster0.hzc5z.mongodb.net/shop?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(result => {
        User.findOne().then(user => {
            if(!user){
                const user = new User({
                    name: 'Ardiyan Agus',
                    email: 'ardiyan@gmail.com',
                    cart: {
                        items: []
                    }
                })
                user.save()
            }
        })
        console.log('Connected!')
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })