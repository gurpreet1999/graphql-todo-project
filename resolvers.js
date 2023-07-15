
import {randomBytes} from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import USER from './models/user.js';
import QUOTE from './models/quote.js';


const resolvers = {

  Query:{
    users:async () => await USER.find({}),
    user:async (_,{_id})=> await USER.findOne({_id}),
    quotes:async ()=>await QUOTE.find({}).populate("by","_id firstName"),
    iquote:async (_,{by})=> await QUOTE.find({by}),
    myprofile:async (_,args,{userId})=>{
        if(!userId) throw new Error("You must be logged in")
        return await USER.findOne({_id:userId})
       }
  }
,  User:{
  quotes:async(ur)=> await QUOTE.find({by:ur._id})
},
    Mutation:{
  signupUser:async(_,{userNew})=>{
     
    const user=await USER.findOne({email:userNew.email})
    if(user){
        throw new Error('user alrerady exist')
    }
    const hashedPassword =  await bcrypt.hash(userNew.password,8)

    const newuser=new USER({
        ...userNew,
        password:hashedPassword
    })

  return   await newuser.save( )

  }
,

signinUser:async(_,{userSignin})=>{

    const user = await USER.findOne({email:userSignin.email})
    if(!user){
        throw new Error("User dosent exists with that email")
    }
 
    const doMatch =await bcrypt.compare(userSignin.password,user.password)
    if(!doMatch){
        throw new Error("email or password in invalid")
    }

    const token = jwt.sign({userId:user._id},"abcde")
    return {token}
   

  }

,
createQuote:async (_,{name},{userId})=>{
  if(!userId) throw new Error("You must be logged in")
  const newQuote = new QUOTE({
      name,
      by:userId
  })
  await newQuote.save()
  return "Quote saved successfully"
}

    }

}



export default resolvers