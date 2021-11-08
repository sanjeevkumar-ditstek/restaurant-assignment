import Restaurant from "../models/restaurant";
import IRestaurant from "../interfaces/IRestaurnat";
import { Error } from "mongoose";

const list = async () => {
    let restaurants: IRestaurant[] = await Restaurant.find()
    return restaurants
};

const add = async (attributes) => {
    let response
    const restaurant = new Restaurant(attributes);
    try {
        response = await restaurant.save();
    } catch (e) {
        console.error(e);
        return Promise.reject(new Error(`Unable to Save ${e.message}`));
    }
    return response
};

const view = async (id: string) => {
    let restaurant = await Restaurant.findOne({_id: id})
    return restaurant
};

const edit = async (id: string, attributes) => {
    let response
    try {
        response = await Restaurant.findOneAndUpdate({ _id: id }, attributes, { new: true })
    } catch (e) {
        console.error(e);
        return Promise.reject(new Error("Unable to Save"));
    }
    return response
};

const remove = async (id: string) => {
    let restaurant = await Restaurant.deleteOne({_id: id})
    return restaurant
};

export default {
    list,
    add,
    view,
    edit,
    remove
};