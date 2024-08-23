"use client";

import { login } from './actions'
import React from 'react';
import { useFormState } from 'react-dom'
import { useFormStatus } from "react-dom";
import OneTapComponent from '@/components/google/OneTapComponent';

const initialState = {
  message: "",
};


export default function Login() {

  const [state, formAction] = useFormState(login, initialState);
  const { pending } = useFormStatus()

    return(
      <>
      <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="text-sm">
              <p className="font-semibold text-indigo-600 hover:text-indigo-500">
                <a href='/reset-password'>
                  Forgot password?
                </a>  
              </p>
            </div>

            <p aria-live="polite" role="status" className="text-red-600">
              {state.message}
            </p>
            <div>
              <button
                type="submit"
                aria-disabled={pending}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
              <br />
              <OneTapComponent />
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up Now
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
