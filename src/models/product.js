import mongoose from 'mongoose';
import timestamps from "mongoose-timestamp";

const productSchema = new mongoose.Schema({

    title       : {type:String, required:true},
    desc        : {type:String},
    category_id : {type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    images      : [],
    colors      : [],
    price       : {type: Number},
    rating      : {type: Number},
    isPopular   : {type: Boolean, default:false},
    isFavitor   : {type: Boolean, default:false},

})

productSchema.plugin(timestamps,{
   'createdAt' : 'created_at',  
   'updatedAt' : 'updated_at'
})

const Product = mongoose.model('Product', productSchema);

export default Product;

