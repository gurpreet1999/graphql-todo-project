import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import {mongoose} from "mongoose";

import jwt from 'jsonwebtoken'



export const dbConnect = async () => {
    await mongoose.connect('mongodb+srv://gurpreetsingh:Shalu%401999@cluster0.apn6ahn.mongodb.net/?retryWrites=true&w=majority');
    console.log(`Database Connected on`);
  };

  dbConnect()



  import "./models/quote.js"
  import "./models/user.js"


import resolvers from "./resolvers.js";


const context = ({req})=>{
    const { authorization } = req.headers;
    if(authorization){
     const {userId} = jwt.verify(authorization,"abcde")
     return {userId}
    }
}



const server=new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]

})


server.listen().then(({url})=>{

    console.log('server id running')
})