"use client";
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { TechStack } from '@/components/TechStack';
import { Demo } from '@/components/Demo';
import { UseCases } from '@/components/UseCases';
import { Pricing } from '@/components/Pricing';
import { Testimonials } from '@/components/Testimonials';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Additional cleanup after component mount
    const cleanupExtensionAttributes = () => {
      // Remove all bis_skin_checked attributes
      document.querySelectorAll('[bis_skin_checked]').forEach(element => {
        element.removeAttribute('bis_skin_checked');
      });
      
      // Remove bis_register attributes
      document.querySelectorAll('[bis_register]').forEach(element => {
        element.removeAttribute('bis_register');
      });
      
      // Remove style attributes added by extensions
      document.querySelectorAll('[style*="cursor"]').forEach(element => {
        const el = element as HTMLElement;
        if (el.style.cursor && el.style.cursor !== 'auto') {
          el.style.cursor = 'auto';
        }
      });
    };
    
    // Run cleanup multiple times to catch all extension modifications
    cleanupExtensionAttributes();
    setTimeout(cleanupExtensionAttributes, 100);
    setTimeout(cleanupExtensionAttributes, 500);
    setTimeout(cleanupExtensionAttributes, 1000);
  }, []);

  return (
    <main className="min-h-screen" suppressHydrationWarning>
      <Header />
      <Hero />
      <UseCases />
      <Features />
      <HowItWorks />
      <Demo />
      <TechStack />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
