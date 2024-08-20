"use server"

import { createSupabaseClient } from '@/utils/supabase/server'
import { Database } from '@/utils/supabase/supabase'
import { redirect } from 'next/navigation'

type scheduled_messages_table = Database['public']['Tables']['scheduled_messages']['Row'];
type COMMSTYPE = scheduled_messages_table['comms_type'];

export async function scheduleMessage(prevState: { message: string; }, formData: FormData) {
    const phoneNumber = formData.get("phoneNumber") as string
    const communicationPlatform = formData.get("communicationPlatform") as COMMSTYPE
    const messageToSend = formData.get("messageToSend") as string
    const scheduleTime = formData.get("time") as string
    const timeZone = formData.get("timeZone") as string

    if (!messageToSend) {
        return { message: "Please enter a message to send" }
    }
    if (!scheduleTime) {
        return { message: "Please enter a scheduled time" }
    }
    if (!communicationPlatform) {
        return { message: "Please click on a communication platform" }
    }
    if (!phoneNumber) {
        return { message: "Please enter a phone number" }
    }

    const supabaseClient = createSupabaseClient()
    const { data } = await supabaseClient.auth.getUser()
    const insertResponse = await supabaseClient.from("scheduled_messages").insert({
        comms_type: communicationPlatform,
        message_to_send: messageToSend,
        phone_number: phoneNumber,
        user_id: data.user?.id
    }).select().single()

    const responseData = insertResponse.data
    if (responseData) {
        const time = scheduleTime.split(":")
        const cronBaseUrl = process.env.CRON_SERVICE_URL
        const scheduleMessageResponse = await fetch(`${cronBaseUrl}/api/v1/schedule`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "scheduleId": responseData.id,
                "timeZone": timeZone,
                "hour": time[0],
                "min": time[1]
            })
        })

        if (scheduleMessageResponse.status == 200) {
            return redirect('/dashboard')
        } else {
            return { message: "There was an issue scheduling your message. Please contact support" }
        }
    }
   
    return { message: "An error occurred. Please try again." }
}


