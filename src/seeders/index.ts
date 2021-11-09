import { connect } from "mongoose";
import { MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_DATABASE } from "../env";
import ProductCategoryModel from "../models/productCategory";
export default class Seeder {
    constructor() {
        console.log("Running Seeder..");
        this.connectToMongo()
        this.shouldRun()
    }

    private connectToMongo() {
        connect(`mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_DATABASE}`)
          .then(() => {
            console.log("Connected to MongoDB");
          })
          .catch((e) => {
            console.error("There was an error connecting to MongoDB:");
            console.error(e);
          });
    }

    async shouldRun() {
        let hasCategories = await ProductCategoryModel.find().count()
        if(hasCategories == 0){
            await this.up()
        }else{
            console.log("ProductCategories already up")
        }
        console.log("Done")
        process.exit()
    }
    
    async up() {
        let data = [{
                "name": "Sweet"
            },
            {
                "name": "Savory"
            },
            {
                "name": "Juice"
            }
        ]
        let created = await ProductCategoryModel.create(data);
        console.log("created ProductCategory", created);
        return created
    }
}
new Seeder()