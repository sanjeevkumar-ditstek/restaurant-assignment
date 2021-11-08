import StatusCodes from './statusCodes';
import {Response} from '../types/express'

export default class ApiResponse {
    static success = (res: Response, data: Object) => {
        return res.status(StatusCodes.OK).json({success: true, ...data});
    };

    static error = (res: Response, status = StatusCodes.BAD_REQUEST, error = StatusCodes.getStatusMessage(StatusCodes.BAD_REQUEST)) => {
        return res.status(status).json({success: false, error});
    };
}