// view page result
module.exports = (obj) => {
    var result = {
        id : obj.id,
        content : obj.content,
        date : obj.date,
        imagePath : obj.path,
        analysisId : obj.analysisId,
        imageId : obj.imageId,
        accountId : obj.accountId
    }
    return result;
}