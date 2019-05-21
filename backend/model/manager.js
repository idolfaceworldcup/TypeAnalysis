// view page manager
module.exports = (obj) => {
    let manager = {
        id : obj.id,
        loginId : obj.loginId,
        authority : obj.authority
    }

    return manager;
}