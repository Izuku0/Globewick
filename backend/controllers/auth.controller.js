import { User } from "../models/users.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


const signUp = asyncHandler(async(req,res)=>{
    const {firstName,lastName,email,countryCode,phoneNumber,password,dob,gender} = req.body;

    if(!firstName || !lastName || !email || !phoneNumber || !password){
        res.json({msg:"All fields are required"})
    }

    const existedUser = await User.findOne({email});

    if(existedUser){
        res.json({msg:"user already exist"});
    }

    const userCreated = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password
      });
      const createdUser = await User.findById(userCreated._id).select(
        "-password"
      );
      if (!createdUser) {
       res.json({msg:"Something went wrong"});
      }
      return res.status(201).json({msg:'User Created',token:await userCreated.generateToken(),userId:userCreated._id.toString()})
      // return res.status(201).json({msg:createdUser})
})


const login = asyncHandler(async(req,res)=>{

  const {email,password} = req.body;

  if(!email || !password){
    res.json({msg:"all fields are required"})
  }

  const userExist = await User.findOne({email,password})

  if(!userExist){
    return res.status(400).json({message:"Invalid Credientials"})
  }

  if(userExist){
    res.status(201).json({msg:'Login Successful',token:await userExist.generateToken(),userId:userExist._id.toString()})
  
  }
  res.status(401).json({message:"Invalid email or password"})

})

export {signUp,login}