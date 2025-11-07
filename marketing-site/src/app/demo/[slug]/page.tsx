import Link from 'next/link';
import { ArrowLeftIcon, PlayIcon } from '@heroicons/react/24/outline';

interface DemoPageProps {
  params: {
    slug: string;
  };
}

export default function DemoWorkflowPage({ params }: DemoPageProps) {
  const workflowTitles = {
    'ai-content-generator': 'AI Content Generator',
    'customer-support-bot': 'Customer Support Bot',
    'data-analysis-pipeline': 'Data Analysis Pipeline'
  };

  const workflowDescriptions = {
    'ai-content-generator': 'Transform ideas into blog posts using GPT-4, with automatic SEO optimization and publishing to CMS.',
    'customer-support-bot': 'Intelligent chatbot that handles customer queries, escalates complex issues, and updates CRM automatically.',
    'data-analysis-pipeline': 'Process CSV files, run AI analysis, generate insights, and create automated reports with charts.'
  };

  const workflowFeatures = {
    'ai-content-generator': ['GPT-4 Integration', 'SEO Analysis', 'Auto Publishing', 'Content Calendar'],
    'customer-support-bot': ['Claude Integration', 'Sentiment Analysis', 'CRM Updates', 'Email Notifications'],
    'data-analysis-pipeline': ['Data Processing', 'AI Analysis', 'Chart Generation', 'PDF Reports']
  };

  const title = workflowTitles[params.slug as keyof typeof workflowTitles] || 'Demo Workflow';
  const description = workflowDescriptions[params.slug as keyof typeof workflowDescriptions] || 'Workflow demonstration';
  const features = workflowFeatures[params.slug as keyof typeof workflowFeatures] || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Link 
            href="/demo"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-500 mb-8"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Demo
          </Link>
          
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
            {description}
          </p>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <PlayIcon className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Demo</h2>
            <p className="text-gray-600 mb-8">
              This specific workflow demo is being prepared. You can explore the main application to get started.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="http://localhost:3005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Build This Workflow
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View All Demos
              </Link>
            </div>
          </div>

          {features.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 1: Setup</h3>
            <p className="text-gray-600">Configure your workflow inputs and connections</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 2: Process</h3>
            <p className="text-gray-600">AI processes your data and generates results</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 3: Output</h3>
            <p className="text-gray-600">Get your results and automate next steps</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: 'ai-content-generator' },
    { slug: 'customer-support-bot' },
    { slug: 'data-analysis-pipeline' }
  ];
}