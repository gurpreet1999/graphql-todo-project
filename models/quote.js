import mongoose from 'mongoose'
const quoteSchema = new mongoose.Schema({
   name:{
       type:String,
       required:true
   },
   by:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"GRAPHQLUSER"
   }
    
})



const QUOTE=mongoose.model("QUOTE",quoteSchema)

export default QUOTE