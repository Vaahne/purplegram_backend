import multer from 'multer';

const upload = multer({dest: `uploads/`});

let imageStore =  upload.single('photo') ;

export default imageStore;