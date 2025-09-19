import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createProduct, deleteProduct, editProduct, fetchAllProducts } from "../controller/product.controller.js";

const router = Router();

router.route('/create-product').post(upload.single('image'),createProduct)

router.route('/edit-product/:id').put(upload.single('image'),editProduct)
router.route('/delete-product/:id').delete(deleteProduct)
router.route('/fetch-all-products').get(fetchAllProducts)

export default router