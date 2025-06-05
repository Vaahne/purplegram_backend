import express from 'express';
import userCNTR from '../controllers/userController.mjs';
import imageStore from '../middleware/multerImagUploadMiddleware.mjs';
import auth from '../middleware/auth.mjs';
import { check } from 'express-validator';

const router = express.Router();

router.route('/').get(userCNTR.getAllUsers)
                 .post(imageStore,userCNTR.addUser);

router.route('/').put(auth,imageStore,userCNTR.updateUser)
                  .delete(auth,userCNTR.deleteUser);
// change password
router.put('/changepwd',auth,[check('newPassword','Password should be atleast 6 chars').isLength({min:6})],userCNTR.changePassword);

// login route
router.post('/auth',[check('email','Please enter valid email').isEmail(),
                       check('password','Password should be atleast 6 chars').isLength({min:6})
                    ],userCNTR.login);

// register a user route
router.post('/register',imageStore,[check('name','User Name cannot be empty').not().isEmpty(),
                          check('email','Please enter valid email').isEmail(),
                          check('password','Password should be atleast 6 chars').isLength({min:6}),
                          check('gender','Select a gender').not().isEmpty(),
                          check('dob','Please enter date of birth').not().isEmpty()],
                          userCNTR.addUser);

router.post('/search',auth,userCNTR.searchByUsername);

// developer purpose to sync the frinds of users
router.get('/sync',userCNTR.syncMutualFriends);

export default router;