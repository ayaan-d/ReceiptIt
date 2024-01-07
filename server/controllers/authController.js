const User = require('../models/user');
const { hashPassword, comparePassword } = require('../handlers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

// register endpoint
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        
        // check if name was entered
        if (!name) {
            return res.json({
                error: 'Name is required'
            })
        };

        // check password field
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        };


        // check email field
        if (!email) {
            return res.json({
                error: 'Email is required'
            })
        }

        const exists = await User.findOne({email});
        if (exists) {
            return res.json({
                error: 'This email has already been registered'
            })
        }

        const hashedPassword = await hashPassword(password)

        // create user in db
        const user = await User.create({
            name, email, password: hashedPassword, budget: 0, receipts: []
        })

        return res.json(user)

    } catch (error) {
        console.log(error);
    }
}

// login endpoint

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check if user exists
        const user = await User.findOne({email})
        if (!user) {
            return res.json({
                error: 'No user associated with that email'
            })
        }

        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user)
            })
        } else {
            res.json({
                error: 'Incorrect password. Try again'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}