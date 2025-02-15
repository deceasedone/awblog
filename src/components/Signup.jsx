"use client"

import { useState } from "react"
import authService from "../appwrite/auth"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../store/authSlice"
import { Button, Input, Logo } from "./index.js"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(login(userData))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blog">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="mb-4 flex justify-center">
            <Logo width="120px" />
          </div>
          <h2 className="text-center text-2xl font-bold mb-6">Sign up to create account</h2>
          <p className="text-center text-sm text-gray-600 mb-8">
            Already have an account?&nbsp;
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit(create)} className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup

