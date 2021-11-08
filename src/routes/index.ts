import { Router } from 'express';
import restaurantRoutes from './restaurant'
import productRoutes from './product'
const router = Router();
const BaseApi = "/api/"
import StatusCodes from '../utils/statusCodes'

// Application's base url will fall here
router.get('/', (req, res, next) => {
    res.status(200).header('Content-Type', 'text/html').send(`<h4>RESTful API</h4>`);
});


router.use(`${BaseApi}restaurant`, restaurantRoutes);
router.use(`${BaseApi}product`, productRoutes);

// All except above or Not Found Routes will fall here
router.get('*', (req, res, next) => {
    // return res.status(404).json('404 Not Found');
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: {
            code: StatusCodes.NOT_FOUND,
            message: StatusCodes.getStatusMessage(StatusCodes.NOT_FOUND),
        },
    });
});

export default router;