import models from "models/index";




/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
CREATE NEW PRODUCT
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/
exports.store = async (req, res, next) => {
    try {

        const imgs = [];

        for(let i = 0; i < req.files.length; i++)
        {
            imgs[i] = `/products/`+req.files[i].originalname
        }
        
        await models.Product.create({
            title       : req.body.title,
            desc        : req.body.desc,
            category_id : req.body.category_id,
            images      : imgs,
            colors      : ["Red", "yellow"],
            price       : req.body.price,
            rating      : req.body.rating,
        
        });
        
        return res.status(201).json({"statusCode":"201",message : "Product successfully stored", "success" : true});
    } catch (err) {
        return res.status(500).json(`ERROR: ${err.message}`);
    }
    

}



/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
GET LIST OF PRODUCTS
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/

exports.index = async (req, res, next) => {
    const products = await models.Product.find({});
    return res.status(200).json({"success": true, "products": products});
}




    


