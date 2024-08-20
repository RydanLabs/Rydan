import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from '@/utils/supabase/supabase'
import { createClient } from "@supabase/supabase-js"

export const createSupabaseClient = () => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};


export  async function isUserTokenValid(userToken: string){
  const { error } = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_SERVICE_KEY!).auth.getUser(userToken)
  if(error == null){
    return true
  } else {
    return false
  }
}