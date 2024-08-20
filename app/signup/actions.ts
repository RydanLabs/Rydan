"use server";


import { createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signup(prevState: { message: string; }, formData: FormData,) {
    const supabase = createSupabaseClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const organisationName = formData.get('organisationName') as string

    if(password != confirmPassword){
        return { message: "Password does not match" }
    }

    if(!organisationName){
        return { message: "Please enter an Organisation Name" }
    }

    
    const userCred = {
      email: email,
      password: password,
    }
  
    const { data, error } = await supabase.auth.signUp(userCred)
  
    if (error) {
        return { message: error.message }
    }

    const userTablePromise = supabase.from("user_record").insert({
        organisation_name: organisationName,
        user_id: data.user?.id
    });

    const orgTablePromise = supabase.from("organisations").insert({
        name: organisationName
    });

    await Promise.all([orgTablePromise, userTablePromise]);

    revalidatePath('/', 'layout');
    redirect('/dashboard')
}