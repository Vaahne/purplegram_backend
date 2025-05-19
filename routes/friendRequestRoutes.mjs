import express from 'express';
import friendRequestController from '../controllers/friendRequestController.mjs';

const router = express.Router();

router.route('/').post(friendRequestController.addFriendReq);

router.route('/:friendReqId').get(friendRequestController.getFriendReq)
                             .delete(friendRequestController.deleteFriendReq)
                             .put(friendRequestController.updateFriendReq);

export default router;