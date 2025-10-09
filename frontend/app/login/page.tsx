"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login(email, password);
    window.location.href = "/workflows";
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
      <h1>Login</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      <p>Don’t have an account? <a href="/signup">Sign up</a></p>
    </form>
  );
}


