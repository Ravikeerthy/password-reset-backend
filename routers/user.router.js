import express from 'express';
import { forgetPassword, getAllUser, resetPassword, userLogin, userRegister } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/getalluser', getAllUser);
router.post('/forgetpassword', forgetPassword);
router.put('/resetpassword', resetPassword);


export default router;