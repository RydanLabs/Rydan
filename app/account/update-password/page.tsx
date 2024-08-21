"use client";


import React, { useEffect, useState } from 'react';
import { useRouter  } from "next/navigation";
import { displayEmail } from './actions';
import { createClient } from '@/utils/supabase/client';


export default function UpdatePassword(){

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        displayEmail().then(emailAddress => {
            const mail = emailAddress.email
            if(mail){
                setEmail(mail)
            } else {
                router.push("/");
            }
        })
    })

    function resetPassword(){
        const supabase = createClient()
        supabase.auth.updateUser({ password: password })
    }

    return (
        <>
        <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <p className='text-center'>Update password for</p> 
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {email}
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              
              <button
                  type="submit"
                  onClick={resetPassword}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Reset Password
                </button>
                
          </div>
        </div>
      </>
  
    )
}
