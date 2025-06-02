import multer from 'multer';

const upload = multer({dest: `uploads/`});

let imageStore =  upload.single('photo') || upload.single('post_photo');

export default imageStore;