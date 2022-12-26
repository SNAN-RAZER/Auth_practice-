const { userModel } = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signup = async(req,res)=>{
    try {
        const {email,username,password} = req.body;

        const userExists = await userModel.findOne({email});
        if(userExists)
        {
            return res.status(400).json({
                message: "User already exists",
                success: true,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user  = new userModel({
            email,
            username,
            password:hashedPassword
        });

        await user.save();

        return res.status(201).send({message:"Signup successful",success:true});


    } catch (error) {
        return res.status(400).send({message:"An error occurred"+error,success:false});
    }
};


const login =async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        
        if(!user)
        {
            return res.status(400).json({
                message: "User does not exist",
                success: false,
            });
        }
        const isPasswordCorrect =  bcrypt.compareSync(password,user.password);
        
        if(!isPasswordCorrect)
        {
            return res.status(400).json({
                message: "Password does not match",
                success: false,
            });
        }
        const token  = await jwt.sign({...user},process.env.SECRET_KEY,
          {
            expiresIn: "5min" 
        });

        return res.status(200).json({
            message: "Login successful",success:true,token});

        

    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    signup,
    login
};