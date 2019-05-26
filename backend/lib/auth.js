const account = require('./account')

exports.logout = async (req, res, next) => {
    req.logout()
    req.session.save(function(){
        return 300
    })
}

exports.regist = async (req, res, next) => {
    if(req.user) {
        return false
    }

    try {
        let result = await account.createAccount(loginId, password)
        
        return result
    } catch(err) {
        return 500
    }
}