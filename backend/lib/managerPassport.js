module.exports = (app) => {
    const passport = require('passport')
    const LocalStrategy = require('passport-local').Strategy
    const manager = require('./manager')

    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user, done) => {
        console.log('first')
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            let result = await manager.findById(id)
            done(null, result)
        } catch(err) {
            return done(null, false, { message : 'DB ERROR'})
        }
    })

    passport.use('manager', new LocalStrategy(
        {
            usernameField : 'loginId'
        },
        async (username, password, done) => {
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
    return passport
}