import { Router } from 'express';
import Product from '../controllers/product';
import Upload from '../middlewares/multer'

const router = Router();
router.get('/list/:restaurantId', Product.list);
router.post('/add', Upload.single('image'), Product.add);
router.post('/edit/:id', Upload.single('image'), Product.edit);
router.get('/view/:id', Product.view);
router.delete('/delete/:id', Product.remove);

export default router;