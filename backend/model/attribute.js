// view page attribute
module.exports = (obj) => {
    let attribute = {
        id : obj.id,
        name : obj.name,
        analysisId : obj.analysisId
    }

    return attribute;
}