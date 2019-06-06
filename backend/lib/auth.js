exports.logout = async (req, res, next) => {
    req.logout()
    req.session.save(function(){
        return 200
    })
}

exports.isLogin = (req, res, next) => {
    if(req.user) {
        return true
    }

    else {
        return false
    }
}