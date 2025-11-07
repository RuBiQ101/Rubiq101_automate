import './globals.css';
import type { Metadata } from 'next';
import { HydrationProvider } from '@/components/HydrationProvider';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent hydration warnings by removing extension attributes before React loads
              if (typeof window !== 'undefined') {
                window.addEventListener('DOMContentLoaded', function() {
                  const removeExtensionAttrs = () => {
                    document.querySelectorAll('[bis_skin_checked]').forEach(el => el.removeAttribute('bis_skin_checked'));
                    document.querySelectorAll('[bis_register]').forEach(el => el.removeAttribute('bis_register'));
                    document.querySelectorAll('[__processed_*]').forEach(el => {
                      Array.from(el.attributes).forEach(attr => {
                        if (attr.name.startsWith('__processed_')) el.removeAttribute(attr.name);
                      });
                    });
                  };
                  removeExtensionAttrs();
                  setTimeout(removeExtensionAttrs, 100);
                });
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <HydrationProvider>{children}</HydrationProvider>
      </body>
    </html>
  );
}
