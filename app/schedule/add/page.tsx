'use client';

import React, { useState } from "react";
import { scheduleMessage } from './actions'
import { useFormState } from 'react-dom'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { parsePhoneNumber } from 'react-phone-number-input'

const initialState = {
  message: "",
};


export default function Schedule() {

    const [message, setMesssage] = useState('')
    const [time, setTime] = useState('')
    const [commType, setCommType] = useState('SMS');
    const [telInput, setTelInput] = useState('')
    const [state, formAction] = useFormState(scheduleMessage, initialState);
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    function onRadioButtonChange(event: { target: { value: React.SetStateAction<string>; }; }){
      setCommType(event.target.value)
    }

    function onPhoneNumberChange(value: string){
      setPhoneNumberError("")
      if(value){
        const phoneNumber = parsePhoneNumber(value)
        if (!phoneNumber?.isValid()) {
          setPhoneNumberError("Please enter a valid phone number")
        } else {
          setTelInput(phoneNumber.number)
          setPhoneNumberError("")
        }
      }
    }

    return (
        <>
        <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Schedule Your Next Reminder
            </h2>
          </div>
          <form action={formAction} className="space-y-6">
            <fieldset onChange={onRadioButtonChange}>
              <legend>Choose Your Communication Platform</legend>
              <div>
                <input type="radio" id="communicationPlatform" name="communicationPlatform" value="SMS" checked={commType === "SMS"} />
                <label htmlFor="SMS">SMS</label>
              </div>

              <div>
                <input type="radio" id="communicationPlatform" name="communicationPlatform" value="PHONE_CALLS" checked={commType === "PHONE_CALLS"}/>
                <label htmlFor="PHONE_CALLS">Phone Call</label>
              </div>
            </fieldset>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone number
              </label>
              <div className="mt-2">
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="AU"
                value={telInput}
                onChange={onPhoneNumberChange}/>

                <p aria-live="polite"  className="text-red-600">
                    {phoneNumberError}
                </p>
                <input id="phoneNumber" name="phoneNumber" value={telInput} style={{display: "none"}}>
                </input>

                <input id="timeZone" name="timeZone" value={timeZone} style={{display: "none"}}>
                </input>

              </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Send reminder daily at
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Message to send
                  </label>
                </div>
                <div className="mt-2">
                  <textarea
                    id="messageToSend"
                    name="messageToSend"
                    value={message} onChange={(e) => setMesssage(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <br />
              <p aria-live="polite" role="status" className="text-red-600">
                    {state?.message}
                </p>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Submit
                </button>
              </div>

          </form>
        </div>
      </>
  
    )
}
