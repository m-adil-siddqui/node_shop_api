import express from "express";
const router = express.Router();
import { registerUser, loginUser, userDetails, store_profile } from "controllers/auth/auth_controller";
import { auth } from "middlewares/auth_middleware";


router.post(`/register`, registerUser);
router.post(`/login`, loginUser);
router.get(`/user_details`, auth, userDetails);
router.get(`/create/profile/:id`, store_profile);





export default router;