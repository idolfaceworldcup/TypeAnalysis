// view page response(using analysis page)
module.exports = (analysisId, selectAttribute, images, status, useImageId, count) => {
    let response = {
        analysisId : analysisId,
        selectAttribute : selectAttribute,
        image : images,
        status : status,
        useImageId : useImageId,
        count : count + 1
    }

    return response;
}