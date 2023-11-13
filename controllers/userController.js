// get all user 
const userModel=require('../models/userModel')
const bcrypt=require('bcrypt')
exports.getAllUsers= async(req,res)=>{

    try {
        const users=await userModel .find({})
        return res.status(200).send({
            userCount:users.length,
            success:true,
            message:'all user data',
            users
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in getting user list",
            error
        })
    }
}

// register user 
exports.registerController=async (req,res)=>{
    try {
        const {username,email,password}=req.body
        if(!username || !email || !password)
        {
         return res.status(400).send({
             message:"Please fill all fields",
             success:false,
         })
        }
     //    existing user 
        const existingUser= await userModel.findOne({email})
        if(existingUser)
        {
         return res.status(500).send({
             message:"already existing user",
             success:false
         })
        }

        const hashedPassword = await bcrypt.hash(password,10)
    
         // save new user 
         const user= new userModel({username,email,password:hashedPassword})
         await user.save();
         return res.status(201).send({
             success:true,
             message:'New User Created',
             user
         })
     } catch (error) {
         console.log(error)
         return res.status(500).send({
             message:"error in register call back",
             success:false,
             error
         })
     }
}

// login 
exports.loginController=async(req,res)=>{
    try {

        const{email,password}=req.body;
        if(!email || !password)
        {
            res.status(401).send({
                success:false,
                message :"please fill all the fields"
            })
        }
        const user= await userModel.findOne({email})
        if(!user)
        {
            return res.status(200).send({
               success:false,
               message:"user not registered"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return res.status(401).send({
                success:false,
                message:'Invalid password or username'
            })
        }
        return res.status(200).send({
            success:true,
            message:'login successfully',
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'error in login callback',
            error
        })
    }
}

