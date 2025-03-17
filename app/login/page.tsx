"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router"; 
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false); 
  const router = useRouter(); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session && isMounted) {  
        router.replace("/dashboard"); 
        setLoading(false); 
      }
    };
    checkSession();
  }, [router, isMounted]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        router.replace("/dashboard");
      }, 1500);
    }
  };

  if (loading) return <p>Loading...</p>; 

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="email" name="email" placeholder="Email" required autoComplete="email" onChange={handleChange} style={{ padding: "8px", fontSize: "16px" }} />
        <input type="password" name="password" placeholder="Password" required autoComplete="current-password" onChange={handleChange} style={{ padding: "8px", fontSize: "16px" }} />
        <button 
          type="submit" 
          style={{ padding: "10px", backgroundColor: "#0070f3", color: "white", borderRadius: "5px", cursor: "pointer", transition: "background-color 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#005bb5"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0070f3"}
        >
          Login
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}