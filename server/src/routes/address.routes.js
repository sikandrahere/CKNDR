import Router from "express";
import { createAddress, fetchAddress, editAddress, deleteAddress } from "../controller/address.controller.js";

const router = Router();

router.route('/create').post(createAddress);
router.route('/get/:userId').get(fetchAddress);
router.route('/edit/:userId/:addressId').put(editAddress);
router.route('/delete/:userId/:addressId').delete(deleteAddress);

export default router