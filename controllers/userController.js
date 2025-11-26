// User controller: signup and login logic
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup a new user
const registerUser = async(req,res)=>{
    try{
        console.log("REQUEST BODY:", req.body);

        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const exisitingUser = await User.findOne({$or:[{username}, {email}]});
        if(exisitingUser){
            return res.status(400).json({message:"Username or email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save(); // save to db
        res.status(201).json({message:"User registered successfully", user_id: newUser._id});

        
    }catch(err){
        console.error(err);
        res.status(500).json({ status: false, message: "Server error" });
    }
}

const loginUser = async(req,res)=>{
    try{
        const{username, email, password }= req.body;
        if((!username&&!email) || !password){
            return res.status(400).json({message:"Username/email and password are required"});
        }

        const user= await User.findOne({ $or:[{username}, {email}] }); 
        if(!user){
            return res.status(400).json({status: false, message: "Invalid username/email or password."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({status: false, message: "Invalid username/email or password."});
        }

        // generate jwt token
        const token= jwt.sign(
            { id: user._id, username:user.username, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message:"Login successful",
            jwt_token: token,
        });
    }catch(err){
        console.error(err);
        res.status(500).json({status: false, message: "Server error"+err.message});
    }

}

// exporting the functions to be used in routes
module.exports = { registerUser, loginUser };
