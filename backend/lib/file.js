const path = require('path')
const fs = require('fs')
const util = require('util')
const sharp = require('sharp')
const writeFile = util.promisify(fs.writeFile)
const unlink = util.promisify(fs.unlink)
const multer = require('multer')

exports.getImageUploader = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/analysis/image/temp'))
        },
        filename: (req, file, cb) => {
            const fileName =  file.originalname;
            cb(null, fileName);
        }
    })

    const uploader = multer({
        storage: storage
    }).single('imageFile');

    return uploader
}

exports.resizeImage = async (req) => {
    try {
        let file = req.file

        if(file === undefined) {
            return 500
        }
        
        let folder

        if(req.body.analysisId == 1) {
            folder = 'analysis_man'
        }

        else if(req.body.analysisId == 1) {
            folder = 'analysis_woman'
        }

        const buffer = await sharp(file.path).resize(250, 250).toBuffer()

        await writeFile(path.join(file.destination, '../', folder, file.filename), buffer)
        await unlink(file.path)
        
        return file.filename
    } catch(err) {
        return 500
    }
}

exports.imageFileDelete = async (filePath) => {
    try {
        await unlink(path.join(__dirname, '../public/analysis/image/', filePath))
        return 200
    } catch(err) {
        return 500
    }
}