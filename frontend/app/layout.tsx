import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: "flex" }}>
        <AuthProvider>
          <nav style={{ width: 240, padding: 16, borderRight: "1px solid #eee" }}>
            <a href="/">Home</a><br/>
            <a href="/workflows">Workflows</a>
          </nav>
          <main style={{ flex: 1 }}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
