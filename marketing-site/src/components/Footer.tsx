"use client";

export function Footer() {
  return (
    <footer className="py-8 bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm" suppressHydrationWarning>
          © {new Date().getFullYear()} Orkx AI Workflow Platform. All rights reserved.
        </div>
        <div className="mt-4 md:mt-0 space-x-4 text-sm">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="/docs" className="hover:text-white">Docs</a>
          <a href="/blog" className="hover:text-white">Blog</a>
        </div>
      </div>
    </footer>
  );
}
