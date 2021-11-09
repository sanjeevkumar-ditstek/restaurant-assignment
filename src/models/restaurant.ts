import {
	Document,
	Model,
	model,
	Schema
} from "mongoose";
import IRestaurant from '../interfaces/IRestaurnat'
import Status from "../utils/restaurantStatus"

export interface IRestaurantModel extends IRestaurant, Document {
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
	address: {
		locality: String,
		street: String,
		city: String,
		country: String,
		zip: Number
	},
	openingHours: [{
		dayName: String,
		isHoliday: Boolean,
		startTime: {
			type: String,
			required: false,
		},
		endTime: {
			type: String,
			required: false,
		},
	}],
	status: {
		type: String,
		default: Status.Active,
	},
    createdAt: Number,
    updatedAt: Number,
}, {
	timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});

const Restaurant: Model < IRestaurantModel > = model < IRestaurantModel > ("restaurant", modelschema);

export default Restaurant;