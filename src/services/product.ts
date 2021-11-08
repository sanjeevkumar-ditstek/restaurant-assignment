import Product from "../models/product";
import IProduct from "../interfaces/IProduct";
import ProductStatus from "../utils/productStatus";
const list = async (restaurantId: string) => {
    let products: IProduct[] = await Product.find({restaurantId, status: ProductStatus.Active})
    .populate({path: 'restaurant', select: "_id name"})
    .populate({path: 'productCategory', select: "_id name"}).lean()
    return products
};

const add = async (attributes) => {
    let response
    const product = new Product(attributes);
    try {
        response = await product.save();
    } catch (e) {
        return Promise.reject(new Error(`Unable to Save : ${e.message}`));
    }
    
    return response
};

const view = async (id: string) => {
    let product = await Product.findOne({_id: id, status: "Active"})
    .populate({path: 'restaurant', select: "_id name"})
    .populate({path: 'productCategory', select: "_id name"}).lean()
    return product
};

const edit = async (id: string, attributes) => {
    let response
    try {
        response = await Product.findOneAndUpdate({ _id: id }, attributes, { new: true })
    } catch (e) {
        console.error(e);
        return Promise.reject(new Error("Unable to Save"));
    }
    return response
};

const remove = async (id: string) => {
    let product = await Product.deleteOne({_id: id})
    return product
};

export default {
    list,
    add,
    view,
    edit,
    remove
};