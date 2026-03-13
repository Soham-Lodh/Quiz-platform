"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

type LoginCardProps = {
  bgColour: string
  title: string
  buttonText: string
  buttonColour: string
}

export default function LoginCard({ bgColour, title, buttonText, buttonColour } : LoginCardProps) {

  const router = useRouter()
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  useEffect(()=>{

    const cookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))

    if(cookie){
      router.replace("/")   // redirect to home
    }

  },[])

  const handleLogin = async (e:any)=>{
    e.preventDefault()

    if(!email || !password){
      toast.error("Enter email and password")
      return
    }

    try{

      const res = await fetch(`${BACKEND_URL}/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      })

      const data = await res.json()

      if(!res.ok){
        toast.error(data.message || "Invalid credentials")
        return
      }

      document.cookie = `token=${data.token}; path=/; max-age=86400`

      toast.success("Login successful")

      router.replace("/")   // redirect to home page

    }catch{
      toast.error("Server connection failed")
    }
  }

  return (
    <div className="relative inline-block scale-115">
      <div className="bg-black rounded-xl absolute top-2 left-2 w-full h-full" />

      <form
        onSubmit={handleLogin}
        className="border-black border-4 rounded-xl flex flex-col text-left px-10 pt-5 pb-4 relative"
        style={{ backgroundColor: bgColour }}
      >

        <div className="text-3xl font-bold mb-2 tracking-tighter">{title}</div>

        <div className="flex flex-col gap-3">

          <div className="flex flex-col">
            <label className="text-xl tracking-tighter">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="roll@kiit.ac.in"
              className="border-2 border-black rounded-xl px-3 py-1 bg-[#F0F0F0] text-xl"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xl tracking-tighter">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="********"
              className="border-2 border-black rounded-xl px-3 py-1 bg-[#F0F0F0] text-xl"
            />
          </div>

        </div>

        <div className="relative inline-block mt-4 mx-auto">
          <div className="bg-black rounded-xl absolute top-1 left-1 w-full h-full" />

          <button
            type="submit"
            className="border-black text-white border-3 rounded-xl font-bold text-2xl cursor-pointer relative py-2 px-12"
            style={{ backgroundColor: buttonColour }}
          >
            {buttonText}
          </button>

        </div>

      </form>
    </div>
  )
}