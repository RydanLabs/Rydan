"use server"

import { createSupabaseClient } from '@/utils/supabase/server'

const supabaseClient = createSupabaseClient()

export async function displayEmail(){
    const { data } = await supabaseClient.auth.getUser()
    if(data.user){
        return { email: data.user.email }
    } else {
        return { email: "" }
    }
}
