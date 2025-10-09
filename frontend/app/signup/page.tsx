"use client";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function SignupPage() {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signup(name, email, password);
    window.location.href = "/workflows";
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
      <h1>Sign Up</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </form>
  );
}


