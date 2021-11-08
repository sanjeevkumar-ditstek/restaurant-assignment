import { Router } from 'express';
import Restaurant from '../controllers/restaurant';
import Upload from '../middlewares/multer'

const router = Router();
router.get('/list', Restaurant.list);
router.post('/add', Upload.single('image'), Restaurant.add);
router.post('/edit/:id', Upload.single('image'), Restaurant.edit);
router.get('/view/:id', Restaurant.view);
router.delete('/delete/:id', Restaurant.remove);

export default router;