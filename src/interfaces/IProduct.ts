import IRestaurant from "./IRestaurnat";
import IProductCategory from "./IProductCategory";

export default interface IProduct {
    _id?: string;
    name: string;
    image: string;
    price: number;
    productCategoryId: string;
    restaurantId: string;
    restaurant?: IRestaurant;
    productCategory?: IProductCategory;
    status: string;
};