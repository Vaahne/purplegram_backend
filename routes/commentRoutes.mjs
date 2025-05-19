import express from 'express';
import commentController from '../controllers/commentController.mjs';
const router = express.Router();

router.route('/').post(commentController.addComment);

router.route('/:commentId').get(commentController.getComment)
                           .delete(commentController.deleteComment)
                           .put(commentController.updateComment);

export default router;