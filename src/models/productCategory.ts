import {
	Document,
	Model,
	model,
	Schema
} from "mongoose";
import IProductCategory from '../interfaces/IProductCategory'

export interface IProductCategoryModel extends IProductCategory, Document {
	_id: string;
}

const modelschema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: "Active",
	},
}, {
	timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});

const IProductCategoy: Model <IProductCategoryModel> = model <IProductCategoryModel> ("productCategory", modelschema);

export default IProductCategoy;