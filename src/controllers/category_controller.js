import models from "models/index";




/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
CREATE NEW CATEGORY
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/
exports.store = async (req, res, next) => {
    try {
        
        const imgs = [];
        for(let i = 0; i < req.files.length; i++)
        {
            imgs[i] = `/category/`+req.files[i].originalname
        }

        await models.Category.create({
            title       : req.body.title,
            desc        : req.body.desc,
            image       : imgs[0]
        });
        
        return res.status(201).json({"statusCode":"201",message : "Category successfully stored", "success" : true});
    } catch (err) {
        return res.status(500).json(`ERROR: ${err.message}`);
    }
    

}



/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
GET LIST OF CATEGORIES
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/

exports.index = async (req, res, next) => {
    const categories = await models.Category.find({});
    return res.status(200).json({"success": true, "categories": categories});
}




    


