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
            return res.status(422).json({"message" : "Login credentials is wrong.", "_error" : true});
        }
        
        if (bcrypt.compareSync(req.body.password, _user.password)) {
            let _token = jwt.sign({
                    id        : _user._id,
                    email     : _user.email,
                },
                "sldfsd0fas9df809as8f", {
                    expiresIn: "1h"
                })
            return res.status(200).json({"message" : "Logged in successfully", "_token" : _token, "_error" : false});
        } else {
            return res.status(422).json({"message" : "Login credentials is wrong.", "_error" : true});
        }

    }catch(err)
    {
        return res.status(500).json({"message": err.message, "_error": true});
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
    try{
        
        const _user = await models.User.findById(req.query.uid);
        _user.fname         = req.body.fname;
        _user.lname         = req.body.lname;
        _user.phone_number  = req.body.phone;
        _user.address       = req.body.address;
        _user.save();

        return res.status(200).json({"_message": "User profile successfully created.", "_error": false});

    }catch(err){
        return res.status(500).json({"message": err.message, "_error": true});
    }
    
    // console.log(req.query, req.body)

}



    


