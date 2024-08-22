"use server";


import { createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signup(prevState: { message: string; }, formData: FormData,) {
    const supabase = createSupabaseClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const captchaToken = formData.get('captchaToken') as string

    if(password != confirmPassword){
        return { message: "Password does not match" }
    }

    const userCred = {
      email: email,
      password: password,
      options: { captchaToken }
    }
  
    const { data, error } = await supabase.auth.signUp(userCred)
  
    if (error) {
        return { message: error.message }
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard')
}