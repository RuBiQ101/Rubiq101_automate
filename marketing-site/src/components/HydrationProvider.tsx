"use client";
import { useEffect } from 'react';

export function HydrationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Remove browser extension attributes after hydration
    const removeExtensionAttributes = () => {
      const elements = document.querySelectorAll('[bis_skin_checked]');
      elements.forEach(element => {
        element.removeAttribute('bis_skin_checked');
      });
      
      // Also remove other common extension attributes
      const commonExtensionAttrs = [
        'bis_register'
      ];
      
      commonExtensionAttrs.forEach(attr => {
        document.querySelectorAll(`[${attr}]`).forEach(el => {
          el.removeAttribute(attr);
        });
      });
      
      // Handle wildcard attributes separately
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        Array.from(el.attributes).forEach(attribute => {
          // Remove __processed_* attributes
          if (attribute.name.startsWith('__processed_')) {
            el.removeAttribute(attribute.name);
          }
          // Remove data-*-extension attributes
          if (attribute.name.includes('-extension')) {
            el.removeAttribute(attribute.name);
          }
        });
        
        // Remove extension-added cursor styles
        const htmlEl = el as HTMLElement;
        if (htmlEl.style && htmlEl.style.cursor && htmlEl.style.cursor === 'pointer') {
          // Only remove cursor:pointer if it wasn't set by our styles
          const hasPointerClass = htmlEl.className.includes('cursor-pointer');
          if (!hasPointerClass) {
            htmlEl.style.removeProperty('cursor');
          }
        }
      });
    };

    // Run immediately after hydration
    removeExtensionAttributes();
    
    // Set up a mutation observer to catch future extension modifications
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'bis_skin_checked' || 
             mutation.attributeName?.startsWith('__processed_') ||
             mutation.attributeName === 'bis_register')) {
          const target = mutation.target as Element;
          target.removeAttribute(mutation.attributeName!);
        }
      });
    });

    // Observe the entire document for attribute changes
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['bis_skin_checked', 'bis_register']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}