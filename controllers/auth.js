const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandlers');

module.exports.login = async function (req, res) {
    //receive email and password
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        //Check password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            //Create token, passwords are equal
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }
        else {
            //Unauthorised error
            res.status(401).json({
                message: 'Unauthorized'
            })
        }
    } else {
        //No user found
        res.status(404).json({
            message: 'User not found'
        })
    }
}


module.exports.register = async function (req, res) {
    
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        //User exists, throw error
        res.status(409).json({
            message: 'User with this email already exists'
        })
    } else {
        // Create user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            errorHandler(res, e);
        }
    }
}

