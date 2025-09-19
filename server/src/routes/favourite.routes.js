import { Router } from "express";
import { addToFavourite,fetchFavouriteProducts,deleteFavouriteProduct} from "../controller/favourite.controller.js";

const router = Router();

router.route('/add').post(addToFavourite);
router.route('/get/:userId').get(fetchFavouriteProducts);
router.route('/delete/:productId/:userId').delete(deleteFavouriteProduct);

export default router