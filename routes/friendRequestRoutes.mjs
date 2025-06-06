import express from 'express';
import friendRequestController from '../controllers/friendRequestController.mjs';
import auth from '../middleware/auth.mjs';

const router = express.Router();

router.route('/:receiverId').post(auth,friendRequestController.addFriendReq);

router.route('/').get(auth,friendRequestController.getFriendReq)
                 .delete(friendRequestController.deleteFriendReq)
                 .put(friendRequestController.updateFriendReq);

export default router;