import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useNavigate } from 'react-router';

function Register() {
    const {register,handleSubmit,formState:{errors}}=useForm();
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const Navigate=useNavigate();
    
    const onSubmit=async(newUser)=>{
      // console.log(newUser);
      try{
        setLoading(true);
         const { role, ...userData } = newUser;
      //make api request 
      if (role==='user'){
        // make API request to userAPI
        let resObj=await axios.post("http://localhost:4000/user-api/users",userData);
        let res=resObj.data;
        if(resObj.status===201){
          Navigate("/login");
        }
      }
       if (role==='author'){
         let resObj=await axios.post(" http://localhost:4000/author-api/users",userData);
        let res=resObj.data;
        if(resObj.status===201){
          Navigate("/login");
        }
      }}catch(err){
        setError(err);
      }finally{
        setLoading(false);
      }
    }

// loading
if(loading===true){
  return <p className='text-yellow-50'>Loading...</p>
}
// error
if(error){
  return <p className='text-red-300'>{error.message}</p>
}
  return (
    <div className='text-center text-2xl'>
        <p>Register Form</p>
        <form onSubmit={handleSubmit(onSubmit)} >
        <div>
        <input type="radio" {...register("role",{required:true})} value="USER"  className='mb-4'  />
        <label >User</label>
        </div>
         <div>
        <input type="radio" {...register("role",{required:true})} value="AUTHOR" className='mb-4'  />
        <label >Author</label>
        </div>
          <div>
        <input type="radio" {...register("role",{required:true})} value="admin" className='mb-4'  />
        <label >Admin</label>
        </div>
         {errors.role?.type==="required"&&<p className='text-red-500 '>Role is required</p>}
        <input type="text" {...register("firstName",{required:true} ) } placeholder="FirstName" className='border mb-3' /><br></br>
        {errors.firstName?.type==="required"&&<p  className='text-red-500' >firstName is required</p>}
        <input type="text" {...register("lastName",{required:true})  } placeholder="LastName" className='border mb-3' /><br></br>
         {errors.lastName?.type==="required"&&<p  className='text-red-500' >lastName is required</p>}
        <input type="text" {...register("email",{required:true})  } placeholder="email" className='border mb-3' /><br></br>
         {errors.email?.type==="required"&&<p  className='text-red-500' >email is required</p>}
        <input type="text" {...register("password",{required:true})  } placeholder="password" className='border mb-3' /><br></br>
         {errors.password?.type==="required"&&<p  className='text-red-500' >password is required</p>}
        <input type="text" {...register("profileImageUrl")  } placeholder="profile" className='border mb-3' /><br></br>
        <button type="submit" className='border'>Register</button>
        </form>
    </div>
  )
}

export default Register

// {
//      "firstName":"Albert",
//      "lastName":"Einstien",
//      "email":"Albert@gmail.com",
//      "password":"Albert",
//      "profileImageUrl":"http://example/dp1.png"
// }
