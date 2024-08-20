"use client"

import { createClient } from "@/utils/supabase/client";
import { Button } from "@mui/material";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then((userResponse) => {
      const userData = userResponse.data
      if(userData){
        setUser(userData.user)
      }
    })
  }, [supabase])

  return (
    <div>
      {user ? (
        <Button variant="contained" className="bg-primary text-white hover:bg-primary-dark" sx={{
          backgroundColor: 'primary.main',
          color: 'white',
        }}>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Button variant="contained" className="bg-primary text-white hover:bg-primary-dark" sx={{
          backgroundColor: 'primary.main',
          color: 'white',
        }}>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
