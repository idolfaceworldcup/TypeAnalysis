const account = require('./account')

exports.logout = async (req, res, next) => {
    req.logout()
    req.session.save(function(){
        return 200
    })
}

exports.regist = async (req, res, next) => {
    
    try {
        let result = await account.createAccount(req.body.account.loginId, req.body.account.password)
        console.log(result)
        return 200
    } catch(err) {
        console.log('err')
        return 500
    }
}