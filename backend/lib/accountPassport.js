module.exports = (passport) => {
    const LocalStrategy = require('passport-local').Strategy
    const account = require('./account')

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            let result = await account.getAccount(id)
            done(null, result)
        } catch(err) {
            return done(null, false, { message : 'DB ERROR'})
        }
    })

    passport.use(new LocalStrategy(
        {
            usernameField : 'loginId'
        },
        async (username, password, done) => {
            try {
                let result = await account.login(username, password)
                
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