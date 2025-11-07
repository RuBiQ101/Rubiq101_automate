import Link from 'next/link';
import { ArrowLeftIcon, BeakerIcon } from '@heroicons/react/24/outline';

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Link 
            href="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-500 mb-8"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Workflow Examples
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Real-world examples to inspire your automation
          </p>
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-8 text-white">
          <div className="text-center">
            <BeakerIcon className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Ready-Made Workflows</h2>
            <p className="text-lg mb-6 opacity-90">
              Browse our growing library of pre-built workflows. Clone, customize, and deploy in minutes.
            </p>
            <Link
              href="http://localhost:3005"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-purple-600 transition-colors"
            >
              Browse Templates →
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Featured Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">📝</div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Beginner</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Blog Post Generator</h4>
              <p className="text-gray-600 text-sm mb-4">Generate SEO-optimized blog posts from keywords using GPT-4 and publish to WordPress</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">OpenAI</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">WordPress</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">SEO</span>
              </div>
              <div className="text-sm text-gray-500">10 mins setup • 25 uses</div>
            </div>
            
            <div className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">🤖</div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Intermediate</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Slack Support Bot</h4>
              <p className="text-gray-600 text-sm mb-4">AI-powered support bot that answers questions from your knowledge base in Slack</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">Claude</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">Slack</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">Vector DB</span>
              </div>
              <div className="text-sm text-gray-500">20 mins setup • 42 uses</div>
            </div>
            
            <div className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">📊</div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Advanced</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Sales Pipeline Analyzer</h4>
              <p className="text-gray-600 text-sm mb-4">Analyze CRM data, generate insights with AI, and create automated reports</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">Salesforce</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">GPT-4</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">Charts</span>
              </div>
              <div className="text-sm text-gray-500">30 mins setup • 18 uses</div>
            </div>

            <div className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">📧</div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Beginner</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart Email Responder</h4>
              <p className="text-gray-600 text-sm mb-4">Automatically categorize emails and generate draft responses using AI</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">Gmail</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">GPT-4</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">Classification</span>
              </div>
              <div className="text-sm text-gray-500">15 mins setup • 36 uses</div>
            </div>

            <div className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">💼</div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Intermediate</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Invoice Processor</h4>
              <p className="text-gray-600 text-sm mb-4">Extract data from invoices, validate, and sync to accounting software</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">OCR</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">QuickBooks</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">Validation</span>
              </div>
              <div className="text-sm text-gray-500">25 mins setup • 31 uses</div>
            </div>

            <div className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">🔗</div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Beginner</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Social Media Scheduler</h4>
              <p className="text-gray-600 text-sm mb-4">Generate and schedule social media posts across multiple platforms</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">Twitter</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">LinkedIn</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">Buffer</span>
              </div>
              <div className="text-sm text-gray-500">12 mins setup • 54 uses</div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gray-100 rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-2">�</div>
              <div className="text-sm font-semibold text-gray-900">Content</div>
              <div className="text-xs text-gray-500">12 workflows</div>
            </button>
            <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-2">🤖</div>
              <div className="text-sm font-semibold text-gray-900">Support</div>
              <div className="text-xs text-gray-500">8 workflows</div>
            </button>
            <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-sm font-semibold text-gray-900">Analytics</div>
              <div className="text-xs text-gray-500">10 workflows</div>
            </button>
            <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-2">📧</div>
              <div className="text-sm font-semibold text-gray-900">Email</div>
              <div className="text-xs text-gray-500">9 workflows</div>
            </button>
            <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-2">💼</div>
              <div className="text-sm font-semibold text-gray-900">Business</div>
              <div className="text-xs text-gray-500">15 workflows</div>
            </button>
            <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-2">🔗</div>
              <div className="text-sm font-semibold text-gray-900">Integration</div>
              <div className="text-xs text-gray-500">11 workflows</div>
            </button>
          </div>
        </div>

        <div className="mt-12 text-center bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Can't find what you need?</h3>
          <p className="text-gray-600 mb-6">Start from scratch and build exactly what you want with our visual workflow builder.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="http://localhost:3005"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Create Custom Workflow
            </Link>
            <Link
              href="/tutorial"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Learn the Basics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}