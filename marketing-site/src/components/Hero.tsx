"use client";
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Build</span>{' '}
                <span className="block text-indigo-600 xl:inline">AI-Powered Workflows</span>{' '}
                <span className="block xl:inline">Visually</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Connect AI models like GPT-4 and Claude with 500+ apps. Create intelligent automation workflows with our visual drag-and-drop builder. Available on web and mobile.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="http://localhost:3005"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Start Building Free
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="/demo"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    <PlayIcon className="mr-2 h-5 w-5" />
                    Try Live Demo
                  </Link>
                </div>
              </div>
              <div className="mt-6 flex items-center text-sm text-gray-500" suppressHydrationWarning>
                {mounted && <span>🚀 Full-stack TypeScript • Web + Mobile • Enterprise Ready</span>}
              </div>

              {/* Trust Signals */}
              <div className="mt-10 flex flex-wrap items-center gap-6 sm:justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-gray-900">4.9/5</span>
                  <span className="text-gray-600 text-sm">rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-gray-900">10,000+</span>
                  <span className="text-gray-600 text-sm">users</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-gray-900">50,000+</span>
                  <span className="text-gray-600 text-sm">workflows</span>
                </div>
              </div>

              {/* Trusted By Companies */}
              <div className="mt-12">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5 sm:text-center lg:text-left">
                  Trusted by teams at
                </p>
                <div className="flex flex-wrap items-center gap-x-10 gap-y-4 sm:justify-center lg:justify-start">
                  <div className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">Microsoft</div>
                  <div className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">Salesforce</div>
                  <div className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">Zendesk</div>
                  <div className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">HubSpot</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="text-white text-center relative z-10 px-8" suppressHydrationWarning>
            {mounted && (
              <>
                <div className="text-7xl mb-6 animate-bounce">⚡</div>
                <div className="text-2xl font-bold mb-2">Visual Workflow Builder</div>
                <div className="text-lg text-indigo-100 mb-6">Drag. Drop. Deploy.</div>
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <span>🎨</span>
                    <span>No-Code UI</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <span>🔌</span>
                    <span>500+ Apps</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <span>🤖</span>
                    <span>AI-Powered</span>
                  </div>
                </div>
              </>
            )}
            {!mounted && (
              <>
                <div className="text-7xl mb-6">⚡</div>
                <div className="text-2xl font-bold mb-2">Visual Workflow Builder</div>
                <div className="text-lg text-indigo-100">Drag. Drop. Deploy.</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
