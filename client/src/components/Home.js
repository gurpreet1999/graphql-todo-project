import React,{useEffect} from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_QUOTES } from '../gqloperations/queries';
//apollo client ka ye fayda he ki cheexzo ko cache kr ke rakh leta he


export default function Home() {

   const {loading,error,data} = useQuery(GET_ALL_QUOTES)

   if(loading) return <h1>Loading</h1>
   if(error){
       console.log(error.message)
   }
   if(data.quotes.length == 0){
    return  <h2>No Quotes available</h2>
   }

   //without appolo client kaise krenge

//    useEffect(()=>{
//   fetch("http://localhost:4000",{
//     method:"post",
//     headers:{
//         "Content-type":"application/json"
//     },
//     body:JSON.stringify({
//         query:`
//         query getallQuotes{
//             quotes{
//                 name
//             }
//         }
//         `
// variables:{
//     userid:"12345"
// }

//     })
//   }
//  )
//    },[])



    return (
        <div className="container">
            {
                data.quotes.map(quote=>{
                    return(
                   <blockquote>
                        <h6>{quote.name}</h6>
                        <p className="right-align">~{quote.by.firstName}</p>
                    </blockquote>
                    )
                })
            }
            
        </div>
    )
}