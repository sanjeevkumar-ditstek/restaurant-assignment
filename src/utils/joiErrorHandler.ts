import HttpStatus from './statusCodes';
import {Response} from '../types/express'

export default (err: any, res: Response) => {
    
    const errorDetails = {};
    err.details.forEach((error: any) =>
        errorDetails[error.context.key] = error.message
    );
    const errorRsp = {
        errors: errorDetails,
        code: HttpStatus.BAD_REQUEST,
        message: HttpStatus.getStatusMessage(HttpStatus.BAD_REQUEST),
    };

    return res.status(HttpStatus.BAD_REQUEST).json({...errorRsp});
  };