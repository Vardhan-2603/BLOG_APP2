import {create} from 'zustand'
import axios from 'axios'


export const useAuth=create((set)=>({
     isAuthenticate:false,
     loading:false,
     error:null,
     currentUser:null,
     login:async(userCred)=>{
          const {role ,...userCrdObj}=userCred
          try{
               //set loading
               set({loading:true,error:null});
               //grt api call
               let res=await axios.post("http://localhost:4000/common-api/login",userCrdObj,{withCredentials:true});
               // console.log(res)
            //    console.log(res.data.paylood);
               //update state
               set({
                    loading:false,
                    isAuthenticate:true,
                    currentUser:res.data.payload,
                    error:null
               });
          }catch(err){
               console.log(err);
               set({
                    loading:false,
                    error:err,
                    isAuthenticate:false,
                    currentUser:null,
               });
          }
     },
     logout:async()=>{
        try{
            set({loading:true,error:null});
            let res=await axios.get("http://localhost:4000/common-api/logout",{withCredentials:true});
            // update state
            set({
                loading:false,
                isAuthenticate:false,
                error:null,
                currentUser:null,
            })
        }catch(err){
          console.log(err);
            set({
                loading:false,
                isAuthenticate:false,
                currentUser:null,
                error:err,
            })
        }
     }
}))

