import {
	Document,
	Model,
	model,
	Schema
} from "mongoose";

import IProduct from '../interfaces/IProduct'
import Restaurant from './restaurant'
import ProductCategory from './productCategory'
import Status from "../utils/productStatus"

export interface IProductModel extends IProduct, Document {
	_id: string;
}

const modelschema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: false
	},
	price: {
        type: Number,
		required: true,
	},
    restaurantId:{
        type: String,
        ref: 'Restaurant'
    },
    productCategoryId: {
        type: String,
        ref: 'ProductCategory'
    },
	status: {
		type: String,
		default: Status.Active,
	},
}, {
	timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});

modelschema.virtual('restaurant', {
    ref: Restaurant,
    localField: 'restaurantId',
    foreignField: '_id',
    justOne: true,
});

modelschema.virtual('productCategory', {
    ref: ProductCategory,
    localField: 'productCategoryId',
    foreignField: '_id',
    justOne: true,
});

const Product: Model < IProductModel > = model <IProductModel> ("product", modelschema);

export default Product;