import multer from 'multer';
// file upload using multer that stores the value in req.file to access in controller
const upload = multer({dest: `uploads/`});

let imageStore =  upload.single('photo') ;

export default imageStore;