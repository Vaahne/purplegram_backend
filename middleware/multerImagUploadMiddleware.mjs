import multer from 'multer';

const upload = multer({dest: `uploads/`});

const imageStore = upload.single(`photo`);

export default imageStore;