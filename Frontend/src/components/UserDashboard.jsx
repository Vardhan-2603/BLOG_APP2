import React from 'react'
import { useAuth } from '../../store/authStore'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function UserDashboard() {
    // Read Articles of all Authors
    const[loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    const [article,setArticles]=useState([]);
    

    useEffect(()=>{
      const readArticles=async()=>{
      // set Loading to true
      setLoading(true);
      // call API to fetch all the articles by the user
      try{
      let res= await axios.get("http://localhost:4000/user-api/article",{withCredentials:true});
      // console.log(res);
      setArticles(res.data.payload)
      }catch(err){
        setError(err);
      }
      finally{
        setLoading(false);
      }
    }
      readArticles();
    },[])
    // Display them in the form of grid of cards
      // 1.card for extra small
      // 2/card for small
      // 3.cards for medium
      // 4.cards for large screen Onwards

   const logout=useAuth(state=>state.logout);
    const navigate=useNavigate();
    const onLogout=async()=>{
      await logout();
      navigate("/login");
    }
    return (
      // print all articles by default
      
      // logout
      // Navigate
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
      {article.map((articleObj)=><div key ={articleObj._id} className='shadow-md rounded-2xl hover:shadow-2xl m-10'>
        <p>{articleObj.title}</p>
        <p>{articleObj.content}</p>
      </div>)}
      <div className="flex justify-center items-center">
      <button onClick={onLogout} className="border items-center">logout</button>
      </div>
      
    </div>
    )
}

export default UserDashboard

