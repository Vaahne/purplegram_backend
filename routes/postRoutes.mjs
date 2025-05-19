import express from 'express';
import postController from '../controllers/postController.mjs';

const router = express.Router();

router.route('/').get((req,res)=>{res.send(`Hello from Post Router`)})
                 .post(postController.addPost);

router.route('/postId').get(postController.getPost)
                       .delete(postController.deletePost)
                       .put(postController.updatePost);

export default router;