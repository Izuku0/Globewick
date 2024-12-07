import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    countryCode:{
        type:Number,
        trim:true
    },
    phoneNumber:{
        type:Number,
        trim:true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlenth:6
      },
},{timestamps:true})

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"30d"
        }
        
    )

    } catch (error) {
        console.error(error)
    }
}

export const User = mongoose.model("User",userSchema)