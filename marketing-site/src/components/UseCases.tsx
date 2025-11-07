"use client";
import { useState, useEffect } from 'react';

const useCases = [
  {
    role: "IT Ops",
    icon: "⚙️",
    action: "Automate server provisioning and monitoring",
    description: "Deploy and configure infrastructure automatically across cloud providers",
  },
  {
    role: "DevOps",
    icon: "🚀",
    action: "Streamline CI/CD pipelines",
    description: "Build, test, and deploy applications with automated workflows",
  },
  {
    role: "Sales",
    icon: "📊",
    action: "Enrich leads and automate outreach",
    description: "Connect CRM data with enrichment APIs and email automation",
  },
  {
    role: "Security",
    icon: "🔒",
    action: "Enrich security alerts instantly",
    description: "Aggregate threat intelligence and automate incident response",
  },
  {
    role: "Support",
    icon: "💬",
    action: "Automate ticket routing and responses",
    description: "Classify support tickets and trigger appropriate workflows",
  },
  {
    role: "Marketing",
    icon: "📈",
    action: "Sync campaigns across platforms",
    description: "Coordinate multi-channel campaigns with automated data flows",
  },
];

export function UseCases() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % useCases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Built for every team
          </h2>
          <p className="text-lg text-gray-600">
            Powerful automation workflows for all roles and departments
          </p>
        </div>

        {/* Rotating Use Case Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-16 text-white text-center min-h-[200px] flex flex-col items-center justify-center shadow-xl">
          {mounted && (
            <div key={currentIndex} className="animate-fade-in">
              <div className="text-6xl mb-4">{useCases[currentIndex].icon}</div>
              <h3 className="text-2xl font-bold mb-2">
                {useCases[currentIndex].role} can ⚡
              </h3>
              <p className="text-xl mb-2 font-semibold">
                {useCases[currentIndex].action}
              </p>
              <p className="text-indigo-100 max-w-2xl mx-auto">
                {useCases[currentIndex].description}
              </p>
            </div>
          )}
        </div>

        {/* Grid of All Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                mounted && index === currentIndex
                  ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="text-4xl mb-3">{useCase.icon}</div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">{useCase.role}</h4>
              <p className="text-gray-700 font-medium mb-2">{useCase.action}</p>
              <p className="text-gray-600 text-sm">{useCase.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 text-lg">
            Ready to build workflows for your team?
          </p>
          <a
            href="http://localhost:3005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Start Building Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
