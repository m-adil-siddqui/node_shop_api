import jwt from "jsonwebtoken";
import models from "models/index";
import bcrypt from 'bcrypt';




/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
Register User
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/

exports.registerUser = async (req, res, next) =>{
    try {
        
        const _user = new models.User();
        _user.email    = req.body.email;
        _user.password = _user.hashPassword(req.body.password);
        _user.save();

        let _token = jwt.sign({
            id        : _user._id,
            email     : _user.email,
        },
        "sldfsd0fas9df809as8f", {
            expiresIn: "1h"
        })

        return res.status(200).json({
            'success' : `_user successfully registered.`,
            'token':_token});

    } catch (err) {
        return res.status(500).json(`ERROR: ${err.message}`);
    }
    
}


exports.loginUser = async (req, res, next) => {
    try{
        
        const _user = await models.User.findOne({'email':req.body.email});
        if(!_user)
        {
            return res.status(422).json({msg : "Login credentials is wrong.", "success" : false});
        }
        
        if (bcrypt.compareSync(req.body.password, _user.password)) {
            let _token = jwt.sign({
                    id        : _user._id,
                    email     : _user.email,
                },
                "sldfsd0fas9df809as8f", {
                    expiresIn: "1h"
                })
            return res.status(200).json({"data":{msg : "Logged in successfully", "_token" : _token, "success" : true}});
        } else {
            return res.status(422).json({msg : "Login credentials is wrong.", "success" : false});
        }

    }catch(err)
    {
        return res.status(500).json(`ERROR: ${err.message}`);
    }
}

exports.userDetails = async (req, res, next) => {
    const _user = await models.User.findById(req.payload.id);
    return res.json({"user": _user});
}


/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
Store user profile
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/

exports.store_profile = async (req, res, next) => {
    // const _user = await models.User.findById(req);
    console.log(req.params)

}



    


