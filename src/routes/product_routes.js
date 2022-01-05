import express from "express";
const router = express.Router();
import {index, store } from "controllers/product_controller";
import { galleryUploadFile} from "common/helpers/function";


router.get(`/`, index);
router.post(`/store`, galleryUploadFile(`../../../public/images/products`, 4), store);


export default router;