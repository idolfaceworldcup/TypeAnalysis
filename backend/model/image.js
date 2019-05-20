// view page image
module.exports = (obj) => {
    let image = {
        id : obj.id,
        path : obj.path,
        attributeName : obj.name,
        attributeValue : obj.value,
        analysisId : obj.analysisId,
        imageId : obj.imageId,
        attributeId : obj.attributeId,
    }

    return image;
}