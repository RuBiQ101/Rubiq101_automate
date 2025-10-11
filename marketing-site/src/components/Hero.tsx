"use client";
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Build Intelligent</span>{' '}
                <span className="block text-indigo-600 xl:inline">AI Workflows</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Create powerful automation workflows with AI. Drag, drop, and deploy intelligent processes that scale your business. No coding required.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="/signup"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Start Building Free
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    <PlayIcon className="mr-2 h-5 w-5" />
                    Watch Demo
                  </button>
                </div>
              </div>
              <div className="mt-6 flex items-center text-sm text-gray-500">
                <span>🚀 Join 10,000+ users automating with AI</span>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-6xl mb-4">🤖</div>
            <div className="text-xl font-semibold">AI Workflow Canvas</div>
            <div className="text-sm opacity-80">Visual Builder Preview</div>
          </div>
        </div>
      </div>
    </div>
  );
}
