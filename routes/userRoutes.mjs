import express from 'express';
import userCNTR from '../controllers/userController.mjs';
import imageStore from '../middleware/multerImagUploadMiddleware.mjs';

const router = express.Router();

router.route('/').get(userCNTR.getAllUsers)
                 .post(userCNTR.addUser);

router.route('/:userId').put(imageStore,userCNTR.updateUser)
                        .delete(userCNTR.deleteUser)
                        .get(userCNTR.getUser);

export default router;