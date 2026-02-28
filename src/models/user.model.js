const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    email:{
        type: String,
        required:[true, "Email is required for creating a account"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid Email address"],
        unique: [true, "Email already exists."]
    },

    name:{
        type:String,
        required:[true, "Name is required for creating a account"],
        
    },
    password:{
        type: String,
        required:[true, "Password is required for creating a account"],
        minlength: [6, "Password should contain more 6 character"],
        select:false,

    }


},{
    timestamps:true
})

