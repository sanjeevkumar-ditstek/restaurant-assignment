import IAddress from "./IAddress";
export default interface IRestaurant {
    _id?: string;
    name: string;
    image: string;
    address: IAddress;
    status: string;
};