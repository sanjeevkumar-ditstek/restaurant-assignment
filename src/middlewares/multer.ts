import multer  from 'multer'
import path from 'path'

// Set disk storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

// Checkfile type
function fileFilter(req, file, cb) {
    const filetypes = /jpeg|png|jpg|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error : Images only')
    }
}

const upload = multer({ storage: storage, limits: { fileSize: 1000000 }, fileFilter: fileFilter })

export default upload