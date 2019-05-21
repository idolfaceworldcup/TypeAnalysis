// view page result
module.exports = (obj, compare) => {
    if(compare !== undefined) {
        var result = {
            id : obj.id,
            content : obj.content,
            date : obj.date,
            imagePath : obj.path,
            analysisId : obj.analysisId,
            imageId : obj.imageId,
            accountId : obj.accountId
        }
    }

    else {
        var result = {
            id : obj.id,
            content : obj.content,
            date : obj.date,
            imagePath : obj.path,
            attributeName : obj.name,
            attributeValue : obj.value,
            analysisId : obj.analysisId,
            imageId : obj.imageId,
            accountId : obj.accountId,
            compareImageId : obj.valueImageId
        }
    }

    return result;
}