"use client";
import useSWR from "swr";
import api from "@/lib/api";
import Link from "next/link";

export default function WorkflowsPage() {
  const { data, error } = useSWR("/api/workflows", url => api.get(url).then(r => r.data));

  if (error) return <div>Error loading workflows</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Workflows</h1>
      <Link href="/workflows/new"><button>Create New</button></Link>
      <ul>
        {data.map((wf: any) => (
          <li key={wf.id}>
            <Link href={`/workflows/${wf.id}`}>{wf.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
