import { Router } from "express";
import { addToCart,fetchCartProducts,editCartProduct,deleteCartProduct, clearCart } from "../controller/cart.controller.js";

const router = Router();

router.route('/add').post(addToCart);
router.route('/get/:userId').get(fetchCartProducts);
router.route('/edit').put(editCartProduct);
router.route('/delete/:productId/:userId').delete(deleteCartProduct);
router.route('/clear/:userId').delete(clearCart);

export default router