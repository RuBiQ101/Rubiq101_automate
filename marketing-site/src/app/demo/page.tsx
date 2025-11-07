import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function DemoPage() {
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
            Interactive Demo
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Experience our AI workflow builder in action
          </p>
        </div>

        <div className="mt-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Try It Yourself</h2>
            <p className="text-lg mb-6 opacity-90">
              Jump into our workflow builder and start creating your own AI automation today.
              No credit card required, no time limits.
            </p>
            <Link
              href="http://localhost:3005"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Launch Workflow Builder →
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Demo Workflows</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/demo/ai-content-generator" className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-6 group">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-indigo-600">AI Content Generator</h3>
              <p className="text-gray-600 mb-4">Transform ideas into SEO-optimized blog posts using GPT-4 with automatic CMS publishing</p>
              <ul className="space-y-2 text-sm text-gray-500 mb-4">
                <li>• GPT-4 content generation</li>
                <li>• Automatic SEO optimization</li>
                <li>• Multi-platform publishing</li>
                <li>• Content calendar integration</li>
              </ul>
              <span className="text-indigo-600 font-semibold group-hover:underline">Explore Demo →</span>
            </Link>
            
            <Link href="/demo/customer-support-bot" className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-6 group">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-indigo-600">Customer Support Bot</h3>
              <p className="text-gray-600 mb-4">Intelligent chatbot powered by Claude that handles queries and updates your CRM automatically</p>
              <ul className="space-y-2 text-sm text-gray-500 mb-4">
                <li>• Natural language understanding</li>
                <li>• Sentiment analysis</li>
                <li>• Smart ticket escalation</li>
                <li>• CRM synchronization</li>
              </ul>
              <span className="text-indigo-600 font-semibold group-hover:underline">Explore Demo →</span>
            </Link>
            
            <Link href="/demo/data-analysis-pipeline" className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-6 group">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-indigo-600">Data Analysis Pipeline</h3>
              <p className="text-gray-600 mb-4">Process CSV files with AI-powered analysis to generate insights and automated visual reports</p>
              <ul className="space-y-2 text-sm text-gray-500 mb-4">
                <li>• Automated data processing</li>
                <li>• AI-powered insights</li>
                <li>• Dynamic chart generation</li>
                <li>• PDF report creation</li>
              </ul>
              <span className="text-indigo-600 font-semibold group-hover:underline">Explore Demo →</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-gray-100 rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-indigo-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Choose a Template</h4>
              <p className="text-sm text-gray-600">Start with one of our pre-built demos or create from scratch</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-indigo-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Customize</h4>
              <p className="text-sm text-gray-600">Drag and drop nodes to modify the workflow to your needs</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-indigo-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Test</h4>
              <p className="text-sm text-gray-600">Run your workflow with sample data to verify it works</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-indigo-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Deploy</h4>
              <p className="text-sm text-gray-600">Activate your workflow and let it run automatically</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}