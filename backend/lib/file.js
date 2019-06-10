const path = require('path')

exports.manUpload = async (req, res, next) => {
    const multer = require('multer')
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            let folder = 'analysis_man/'
            cb(null, path.join(__dirname, '../../frontend/public/img/analysis/image/', folder))
        },
        filename: (req, file, cb) => {
            const fileName =  file.originalname;
            cb(null, fileName);
        }
    })
    
    const upload = multer({
        storage: storage
    }).single('man');

    return upload
}

exports.womanUpload = async (req, res, next) => {
    const multer = require('multer')
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            let folder = 'analysis_woman/'
            cb(null, path.join(__dirname, '../../frontend/public/img/analysis/image/', folder))
        },
        filename: (req, file, cb) => {
            const fileName =  file.originalname;;
            cb(null, fileName);
        }
    })
    

    const upload = multer({
        storage: storage
    }).single('woman');

    return upload
}