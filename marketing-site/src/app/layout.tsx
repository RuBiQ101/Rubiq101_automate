import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orkx - AI Workflow Automation Platform',
  description:
    'Build intelligent AI workflows with our visual drag-and-drop builder. Full-stack TypeScript platform with web and mobile apps. Connect GPT-4, Claude, and 500+ integrations.',
  keywords: 'AI automation, workflow builder, no-code, artificial intelligence, React Flow, TypeScript, GPT-4, Claude',
  openGraph: {
    title: 'Orkx - AI Workflow Automation Platform',
    description: 'Visual AI workflow builder with full-stack TypeScript architecture',
    url: 'https://orkx.in',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orkx - AI Workflow Automation',
    description: 'Build intelligent workflows with AI using visual drag-and-drop interface',
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
