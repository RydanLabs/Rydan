"use client"

import { createClient } from "@/utils/supabase/client";
import { useState } from "react"

export default function ResetPassword(){

    const [email, setEmail] = useState('')
    const supabase = createClient();


    async function ResetPassword(){
      const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL ?? 'http://localhost:8080';
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${redirectUrl}/account/update-password`,
      })          
    }

    return (
        <>
        <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot your password?
            </h2>
            <h1>Enter your email address and we will send you instructions to reset your password.</h1>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              
              <button
                  type="submit"
                  onClick={ResetPassword}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Continue
                </button>
          </div>
        </div>
      </>
    )
}