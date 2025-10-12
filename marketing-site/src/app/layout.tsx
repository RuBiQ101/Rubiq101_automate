import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FlowAI - Build Intelligent AI Workflows',
  description:
    'Create powerful automation workflows with AI. Drag, drop, and deploy intelligent processes that scale your business.',
  keywords: 'AI automation, workflow builder, no-code, artificial intelligence',
  openGraph: {
    title: 'Orkx - AI Workflow Automation',
    description: 'The easiest way to build AI-powered workflows',
    url: 'https://orkx.in',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orkx - AI Workflow Automation',
    description: 'Build intelligent workflows with AI',
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://orkx.in'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
