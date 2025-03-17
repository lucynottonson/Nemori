"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("big error:", error);
        } else {
          const sessionUser = data?.session?.user || null;
          setUser(sessionUser);
          setAvatarUrl(sessionUser?.user_metadata?.avatar_url || null);
        }
      } catch (error) {
        console.error("Uerror :():", error);
      }
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setAvatarUrl(session?.user?.user_metadata?.avatar_url || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      window.location.href = "/LOG IN"; 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) return null; 

  return (
    <nav>
      <h1 style={{ display: "flex", alignItems: "center", fontSize: "2rem" }}>
        <Image src="/icon.png" alt="Nemori Icon" width={40} height={40} style={{ marginRight: "10px" }} />
        <Link href="/" className={pathname === "/" ? "active" : ""}>Nemori</Link>
      </h1>
      <ul>
        {user ? (
          <>
            <li>
              {avatarUrl ? (
                <Image src={avatarUrl} alt="Profile" width={40} height={40} style={{ borderRadius: "50%" }} />
              ) : (
                `HELLO, ${user.email}`
              )}
            </li>
            <li>
              <Link href="/dashboard/profile">Profile</Link>
            </li>
            <li>
              <button 
                onClick={handleSignOut} 
                style={{ borderRadius: "5px", padding: "6px 12px", backgroundColor: "#d9534f", color: "white", cursor: "pointer" }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link href="/login">LOGIN</Link></li>  
            <li><Link href="/register">JOIN US</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}