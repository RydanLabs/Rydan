"use server"

import { createSupabaseClient } from '@/utils/supabase/server'


const supabaseClient = createSupabaseClient()

export async function handleScheduleChange(isEnabled: boolean, scheduleId: string) {
    const response = await supabaseClient.from('scheduled_messages').update({ is_enabled: isEnabled }).eq('id', scheduleId).select().single()
    const error = response.error
    if(!error){
        const cronBaseUrl = process.env.CRON_SERVICE_URL
        await fetch(`${cronBaseUrl}/api/v1/schedule`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "requestId": scheduleId, 
                "isEnabled": isEnabled
            })
        })

    }
}

export async function handleScheduleDelete(scheduleId: string){
    const response = await supabaseClient.from('scheduled_messages').delete().eq('id', scheduleId)
    const error = response.error
    if(!error){
        const cronBaseUrl = process.env.CRON_SERVICE_URL
        await fetch(`${cronBaseUrl}/api/v1/schedule`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "requestId": scheduleId
            })
        })


    }
}