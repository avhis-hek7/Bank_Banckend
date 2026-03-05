const accountModel = require('../models/account.model')

async function createAccountController(req,res){

    const user = req.user;

    const account = await accountModel.create({
        user:user._id
    }) 
    res.status(201).json({ 
        message:"Account created successfully",
        account
    })
}

async function getUserAccuntsController(req,res){
    const accounts = await accountModel.find({user: req.user._id});

    res.status(200).json({
        message:"Fecth all user accounts",
        accounts
    })

}

module.exports = { createAccountController }