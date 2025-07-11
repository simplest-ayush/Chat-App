import multer from "multer";
import path from "path"
// import x from "../public/images"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, '../public/images')
        cb(null, path.join(process.cwd(), 'public', 'images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
    }
})

export const upload = multer({
    storage: storage
})