require('dotenv').config()
import  mongoose from "mongoose";
import User from "./user";
import Category from "./category";
import Product from "./product";

const conDb = () =>{
    const db_uri = `mongodb+srv://rbx-adee-011:insert4455@flutter-node-api0.nhqw2.mongodb.net/flutter-node-api011?retryWrites=true&w=majority`;
    // return mongoose.connect("mongodb://localhost:27017/flutter_auth");
    return mongoose.connect(db_uri, {
        useNewUrlParser:true,
        // useCreateIndex:true,
        // useUnifiedTopology:true,
        // useFindAndModify:false
    });
    
}


const models = { User, Category, Product};

export { conDb };

export default models;



