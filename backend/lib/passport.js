module.exports = (app) => {
    const passport = require('passport')
    const LocalStrategy = require('passport-local').Strategy
    const account = require('./account')
    const manager = require('./manager')

    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser(async (user, done) => {
        try {
            let result
            if(user.authority === undefined) {
                result = await account.getAccount(user.id)
                done(null, result)
            }
            else {
                result = await manager.getManager(user.id)
                done(null, result)
            }
        } catch(err) {
            return done(null, false, { message : 'DB ERROR'})
        }
    })

    passport.use('user', new LocalStrategy(
        {
            usernameField : 'loginId',
            passwordField : 'password'
        },
        async (loginId, password, done) => {
            try {
                let result = await account.login(loginId, password)
                
                if(result[0] === undefined) return done(null, false, { message : 'Incorrect login'})


                return done(null, result[0], {
                    message : 'Welcome'
                })
            } catch(err) {
                return done(null, false, { message: 'DB ERROR'})
            }
        })
    )

    
    passport.use('manager', new LocalStrategy(
        {
            usernameField : 'loginId',
            passwordField : 'password'
        },
        async (req, username, password, done) => {
            try {
                let result = await manager.login(username, password)
                
                if(result[0] === undefined) return done(null, false, { message : 'Incorrect login'})

                return done(null, result[0], {
                    message : 'Welcome'
                })
            } catch(err) {
                return done(null, false, { message: 'DB ERROR'})
            }
        })
    )


    console.log('gg')

    return passport
}