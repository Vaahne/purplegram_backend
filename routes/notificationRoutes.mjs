import express from 'express';
import notificationController from '../controllers/notificationController.mjs';

const router = express.Router();

router.route('/').post(notificationController.addNotification);

router.route('/:notificationId').get(notificationController.getNotification)
                                .delete(notificationController.deleteNotification)
                                .put(notificationController.updateNotification);

export default router;