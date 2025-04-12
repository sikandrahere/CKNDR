import { Router } from "express";
import { getProductDetails } from "../controller/product.controller.js";

const router = Router();

router.route('/:id').get(getProductDetails);

export default router;