"use client";
import axios from "axios";
import { toast } from "react-toastify";
import {useRouter} from "next/navigation"
import { useState } from "react";
import Link from "next/link";
export default function ProfilePage() {
    
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = () => {
        try {
            axios.get('/api/users/logout')
            toast.success("Logout successful")
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async() => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2>{data ==='nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>} </h2>
            <hr />
            <button
             onClick={logout}
             className="bg-blue-600 text-white py-2 px-4">Logout</button>

<button
             onClick={getUserDetails}
             className=" bg-green-600 text-white py-2 px-4">Get user Details</button>

        </div>
    )
}