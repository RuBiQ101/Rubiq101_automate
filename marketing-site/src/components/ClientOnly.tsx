"use client";
import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface SafeEmojiProps {
  emoji: string;
  fallback?: string;
  className?: string;
}

export function SafeEmoji({ emoji, fallback = "⚡", className = "" }: SafeEmojiProps) {
  return (
    <ClientOnly fallback={<span className={className}>{fallback}</span>}>
      <span className={className} suppressHydrationWarning>
        {emoji}
      </span>
    </ClientOnly>
  );
}