import Joi from "joi"
import {Request, Response} from '../types/express'
import RestaurantService from '../services/restaurant'
import IRestaurant from "../interfaces/IRestaurnat";
import joiErrorHandler from '../utils/joiErrorHandler';
import ApiResponse from "../utils/apiResponse";
import StatusCodes from "../utils/statusCodes";
import {API_URL} from '../env'
/**
 * list of all the restaurants
 * @param  {Request} req
 * @param  {Response} res
 */
const list = async(req: Request, res: Response) => {
    let restaurants: IRestaurant[] =  await RestaurantService.list()
    return ApiResponse.success(res, {restaurants});
}

/** creating new restaurant
 * @param  {Request} req
 * @param  {Response} res
 */
const add = async(req: Request, res: Response) => {
    let body = {...req.body, image: API_URL + "/uploads/" + req.file?.filename}

    const {error, value} = Joi.object().keys({
        name: Joi.string().required(),
        image: Joi.string().required(),
        address: Joi.object().keys({
            locality: Joi.string().required(),
            street: Joi.string().required(),
            city: Joi.string().required(),
            country: Joi.string().required(),
            zip: Joi.number().min(6).required(),
        }).required(),
        openingHours: Joi.any().required(),
    }).validate(body, {abortEarly: false});

    if (error) {
        return joiErrorHandler(error, res)
    }
    let restaurant: IRestaurant
    try {
        restaurant =  await RestaurantService.add(body)
    } catch (error) {
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, error.message);
    }

    if(restaurant){
        return ApiResponse.success(res, {restaurant});
    }else{
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, StatusCodes.getStatusMessage(StatusCodes.BAD_REQUEST));
    }
}

/**
 * view restaurant information
 * @param  {Request} req
 * @param  {Response} res
 */
const view = async(req: Request, res: Response) => {
    let {id} = req.params
    let restaurant: IRestaurant =  await RestaurantService.view(id)
    if(restaurant){
        return ApiResponse.success(res, {restaurant});
    }else{
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, StatusCodes.getStatusMessage(StatusCodes.BAD_REQUEST));
    }
}

/**
 * Update Restaurant information
 * @param  {Request} req
 * @param  {Response} res
 */
const edit = async(req: Request, res: Response) => {
    let {id} = req.params
    let restaurant: IRestaurant =  await RestaurantService.view(id)
    if(!restaurant){
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, StatusCodes.getStatusMessage(StatusCodes.BAD_REQUEST));
    }
    let body = {...req.body}
    if(req.file){
        body.image = API_URL + "/uploads/" + req.file?.filename
    }
    const {error, value} = Joi.object().keys({
        name: Joi.string().required(),
        image: Joi.string(),
        address: Joi.object().keys({
            locality: Joi.string().required(),
            street: Joi.string().required(),
            city: Joi.string().required(),
            country: Joi.string().required(),
            zip: Joi.number().min(6).required(),
        }).required(),
        openingHours: Joi.any().required(),
    }).validate(body, {abortEarly: false});

    if (error) {
        return joiErrorHandler(error, res)
    }
    let response: IRestaurant =  await RestaurantService.edit(id, body)
    if(response){
        return ApiResponse.success(res, {restaurant: response});
    }else{
        return ApiResponse.error(res, StatusCodes.BAD_REQUEST, StatusCodes.getStatusMessage(StatusCodes.BAD_REQUEST));
    }
    
}

/**
 * Remove a restaurant from db
 * @param  {Request} req
 * @param  {Response} res
 */
const remove = async(req: Request, res: Response) => {
    let {id} = req.params
    let restaurant: IRestaurant =  await RestaurantService.view(id)
    if(restaurant){
        return ApiResponse.success(res, {restaurant});
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