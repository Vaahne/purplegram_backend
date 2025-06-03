import express from 'express';
import notificationController from '../controllers/notificationController.mjs';
import auth from '../middleware/auth.mjs';

const router = express.Router();

router.route('/').post(notificationController.addNotification);

router.route('/').get(auth,notificationController.getNotification)
                       .delete(notificationController.deleteNotification)
                       .put(notificationController.updateNotification);

export default router;