import express from "express";
const router = express.Router();
import {index, store } from "controllers/category_controller";
import { galleryUploadFile} from "common/helpers/function";


router.get(`/`, index);
router.post(`/store`, galleryUploadFile(`../../../public/images/category`, 1), store);



export default router;