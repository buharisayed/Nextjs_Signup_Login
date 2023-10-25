"use client";
import Link from "next/link"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import { toast } from "react-toastify";

export default function LoginPage(){
    const router = useRouter();
    const[user,setUser] = React.useState({
        email:"",
        password:"",
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(false)
    const [loading,setLoading] = React.useState(false)

    const onLogin = async() => {
        try {
            setLoading(true);
           const response = await axios.post("/api/users/login",user);
           console.log("Login success",response.data);
           toast.success("Login success")
           router.push("/profile");

            
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }

    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user]);

    return(
        <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
           

            <hr/>
            <label htmlFor="email">Email</label>
            <input
            className="text-black"
             type="email" 
             id="email"
             value={user.email}
             onChange={(e) => setUser({...user,email:e.target.value})}
             placeholder="Enter your email"
             />
             
             <hr/>
            <label htmlFor="password">Username</label>
            <input
            className="text-black"
            type="password" 
             id="password"
             value={user.password}
             onChange={(e) => setUser({...user,password:e.target.value})}
             placeholder="Enter your password"
             />
             <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                Login
             </button>
             <Link href="/signup">Visit Signup page</Link>
        </div>
        </>
    )
}