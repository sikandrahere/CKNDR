import Router from 'express';
import { createOrder, getAllOrdersByUser, verifyPayment } from '../controller/userOrder.controller.js';




const router = Router();
router.route('/create-order').post(createOrder);
router.route('/verify-order').post(verifyPayment);
router.route('/list/:userId').get(getAllOrdersByUser);

export default router;