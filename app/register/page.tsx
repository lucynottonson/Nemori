"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function RegisterPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      setSuccess("Very Good. You have recieved notice through email.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} style={{ padding: "8px", fontSize: "16px" }} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} style={{ padding: "8px", fontSize: "16px" }} />
        <button 
          type="submit" 
          style={{ 
            padding: "10px", 
            backgroundColor: "#0070f3", 
            color: "white", 
            borderRadius: "5px", 
            cursor: "pointer", 
            transition: "background-color 0.2s" 
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#005bb5"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0070f3"}
        >
          Sign Up
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}