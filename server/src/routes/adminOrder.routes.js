import Router from 'express';
import { getAllOrdersByAllusers, updateOrderStatus } from '../controller/adminOrder.controller.js';

const router = Router();

router.get('/get', getAllOrdersByAllusers);
router.put('/update/:orderId', updateOrderStatus);


export default router;
