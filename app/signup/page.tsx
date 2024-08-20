"use client";


import { signup } from './actions'
import React from 'react';
import { useFormState } from 'react-dom'

const initialState = {
    message: "",
};
  

export default function SignUp() {

    const [state, formAction] = useFormState(signup, initialState);
  
    return (
      <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                
                <form action={formAction} className="space-y-6">

                <input 
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="organisationName"
                    placeholder="Organisation Name" />

                <input 
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="email"
                    placeholder="Email" />

                <input 
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    placeholder="Password" />
                <input 
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="confirmPassword"
                    placeholder="Confirm Password" />
                
                <button
                   type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Sign up
                </button>

                <p aria-live="polite" role="status" className="text-red-600">
                    {state?.message}
                </p>

                </form>
                <div className="text-grey-dark mt-6">
                    Already have an account? {' '}
                    <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" href="/login">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    )
}