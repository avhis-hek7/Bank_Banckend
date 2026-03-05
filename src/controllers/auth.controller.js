const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const emailService = require('../services/email.service')
const tokenBlacklistModel = require('../models/blackList.model');

// =full api path =>/POST/api/auth/register
async function userRegisterController(req,res){

    const {email, password, name} = req.body;

    const isUserExists = await userModel.findOne({email:email})
    if(isUserExists){
        return res.status(422).json({
            message:"User already exists with this email.",
            status:"failed"
        })
    }
    const user = await userModel.create({
        email, password, name
    })

    const token = jwt.sign({userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn: "3d"}
    )

    res.cookie("token",token)

    res.status(201).json({message:"user created successfully",
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })

    await emailService.sendRegisterationEmail(user.email, user.name)





}


async function userLoginController(req,res){
    const {email, password} = req.body;

     const isUserExists = await userModel.findOne({email:email}).select("+password")

     if(!isUserExists){
        return res.status(401).json({message:"Invalid login credentials!"})
     }
     
    const isValidPassword = await isUserExists.comparePassword(password)

    if(!isValidPassword){
         return res.status(401).json({message:"Invalid login credentials!"})

    }

    const token = jwt.sign({userId:isUserExists._id}, process.env.JWT_SECRET, {expiresIn: "3d"})
    res.cookie("token",token)

    res.status(200).json({ message:"Login successfully",
        isUserExists:{
            _id:isUserExists._id,
            name:isUserExists.name,
            email:isUserExists.email
            
        },
        token

    })


}

async function userLogoutController(req,res){
    
   const token = req.cookies.token || req.headers.authorization?.split("")[1];
   if(!token){
        return res.status(200).json({
            message:"User logout successfully"
        })
    }


    await tokenBlacklistModel.create({
        token:token
    })

    res.clearCookie("token")

    res.status(200).json({
        message:"User logged out successfully"
    })

}

module.exports = {userRegisterController,userLoginController, userLogoutController}