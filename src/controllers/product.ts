import {Request, Response} from '../types/express'
import ProductService from '../services/product'
import IProduct from "../interfaces/IProduct";
import Joi from "joi"
import joiErrorHandler from '../utils/joiErrorHandler';
import ApiResponse from "../utils/apiResponse";
import StatusCodes from '../utils/statusCodes';

const list = async(req: Request, res: Response) => {
    let {restaurantId} = req.params
    let products: IProduct[] = await ProductService.list(restaurantId)
    return ApiResponse.success(res, {products});
}

const add = async(req: Request, res: Response) => {
    let body = {...req.body, image: req.file?.path}

    const {error, value} = Joi.object().keys({
        name: Joi.string().required(),
        image: Joi.string().required(),
        price: Joi.number().required(),
        restaurantId: Joi.string().required(),
        productCategoryId: Joi.string().required(),
    }).validate(body, {abortEarly: false});

    if (error) {
        return joiErrorHandler(error, res)
    }

    let product: IProduct 
    try {
        product  =  await ProductService.add(body)
    } catch (error) {
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, error.message);
    }
    if(product){
        return ApiResponse.success(res, {product});
    }else{
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, StatusCodes.getStatusMessage(StatusCodes.BAD_REQUEST));
    }
}

const view = async(req: Request, res: Response) => {
    let {id} = req.params
    let product: IProduct =  await ProductService.view(id)
    if(product){
        return ApiResponse.success(res, {product});
    }else{
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, StatusCodes.getStatusMessage(StatusCodes.BAD_REQUEST));
    }
}

const edit = async(req: Request, res: Response) => {
    let {id} = req.params
    let product: IProduct =  await ProductService.view(id)
    if(!product){
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, StatusCodes.getStatusMessage(StatusCodes.BAD_REQUEST));
    }
    let body = {...req.body, image: req.file?.path}
    const {error, value} = Joi.object().keys({
        name: Joi.string().required(),
        image: Joi.string().optional(),
        price: Joi.number().required(),
        restaurantId: Joi.string().required(),
        productCategoryId: Joi.string().required(),
    }).validate(body, {abortEarly: false});

    if (error) {
        return joiErrorHandler(error, res)
    }
    let response: IProduct =  await ProductService.edit(id, body)
    if(response){
        return ApiResponse.success(res, {product: response});
    }else{
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, StatusCodes.getStatusMessage(StatusCodes.BAD_REQUEST));
    }
}

const remove = async(req: Request, res: Response) => {
    let {id} = req.params
    let product: IProduct =  await ProductService.view(id)
    if(product){
        return ApiResponse.success(res, {product});
    }else{
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, StatusCodes.getStatusMessage(StatusCodes.BAD_REQUEST));
    }
}

export default {
    list,
    add,
    view,
    edit,
    remove
};