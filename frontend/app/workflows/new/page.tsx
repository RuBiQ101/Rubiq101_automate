"use client";
import { useState } from "react";
import api from "@/lib/api";

export default function NewWorkflowPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    const res = await api.post("/api/workflows", { name, description, definition: { steps: [] }, status: "draft" });
    window.location.href = `/workflows/${res.data.id}`;
  };

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
      <h1>Create Workflow</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}


