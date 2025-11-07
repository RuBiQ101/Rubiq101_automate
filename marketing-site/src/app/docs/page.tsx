import Link from 'next/link';
import { ArrowLeftIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export default function DocsPage() {
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
            Documentation
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Learn how to build powerful AI workflows
          </p>
        </div>

        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
          <div className="text-center">
            <BookOpenIcon className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Comprehensive Documentation</h2>
            <p className="text-lg mb-6 opacity-90">
              Everything you need to master AI workflow automation, from basics to advanced techniques.
            </p>
            <Link
              href="http://localhost:3005"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Start Building Now →
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Getting Started</h3>
            <p className="text-gray-600 mb-4">Learn the fundamentals of workflow building in under 10 minutes</p>
            <ul className="space-y-2 text-sm text-gray-500 mb-4">
              <li>• Installation and setup</li>
              <li>• Your first workflow</li>
              <li>• Basic concepts explained</li>
              <li>• Common patterns</li>
            </ul>
            <div className="text-sm text-indigo-600 font-semibold">Coming Soon</div>
          </div>
          
          <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">API Reference</h3>
            <p className="text-gray-600 mb-4">Complete reference for all nodes, integrations, and API endpoints</p>
            <ul className="space-y-2 text-sm text-gray-500 mb-4">
              <li>• Node documentation</li>
              <li>• REST API reference</li>
              <li>• Webhook handlers</li>
              <li>• Custom integrations</li>
            </ul>
            <div className="text-sm text-indigo-600 font-semibold">Coming Soon</div>
          </div>
          
          <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tutorials</h3>
            <p className="text-gray-600 mb-4">Step-by-step guides for building specific workflows from scratch</p>
            <ul className="space-y-2 text-sm text-gray-500 mb-4">
              <li>• Content automation</li>
              <li>• Customer support bots</li>
              <li>• Data processing</li>
              <li>• Integration recipes</li>
            </ul>
            <Link href="/tutorial" className="text-sm text-indigo-600 font-semibold hover:underline">View Tutorials →</Link>
          </div>
          
          <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Examples</h3>
            <p className="text-gray-600 mb-4">Real-world workflow examples you can clone and customize</p>
            <ul className="space-y-2 text-sm text-gray-500 mb-4">
              <li>• E-commerce automation</li>
              <li>• Marketing campaigns</li>
              <li>• Data analytics</li>
              <li>• Social media bots</li>
            </ul>
            <Link href="/examples" className="text-sm text-indigo-600 font-semibold hover:underline">Browse Examples →</Link>
          </div>
          
          <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="text-3xl mb-3">🔌</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Integrations</h3>
            <p className="text-gray-600 mb-4">Connect with 100+ third-party services and APIs</p>
            <ul className="space-y-2 text-sm text-gray-500 mb-4">
              <li>• OpenAI & Anthropic</li>
              <li>• Slack & Discord</li>
              <li>• Salesforce & HubSpot</li>
              <li>• Custom webhooks</li>
            </ul>
            <div className="text-sm text-indigo-600 font-semibold">Coming Soon</div>
          </div>
          
          <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Advanced Features</h3>
            <p className="text-gray-600 mb-4">Unlock power user capabilities and optimization techniques</p>
            <ul className="space-y-2 text-sm text-gray-500 mb-4">
              <li>• Error handling</li>
              <li>• Performance tuning</li>
              <li>• Custom nodes</li>
              <li>• Deployment strategies</li>
            </ul>
            <div className="text-sm text-indigo-600 font-semibold">Coming Soon</div>
          </div>
        </div>

        <div className="mt-12 bg-gray-100 rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Quick Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link href="/tutorial" className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <span className="text-2xl mr-3">📖</span>
              <div>
                <div className="font-semibold text-gray-900">Interactive Tutorial</div>
                <div className="text-sm text-gray-500">Learn by doing</div>
              </div>
            </Link>
            <Link href="/examples" className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <span className="text-2xl mr-3">🎯</span>
              <div>
                <div className="font-semibold text-gray-900">Workflow Examples</div>
                <div className="text-sm text-gray-500">Ready-made templates</div>
              </div>
            </Link>
            <Link href="/demo" className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <span className="text-2xl mr-3">🎮</span>
              <div>
                <div className="font-semibold text-gray-900">Live Demos</div>
                <div className="text-sm text-gray-500">Try before you build</div>
              </div>
            </Link>
            <Link href="http://localhost:3005" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <span className="text-2xl mr-3">🚀</span>
              <div>
                <div className="font-semibold text-gray-900">Workflow Builder</div>
                <div className="text-sm text-gray-500">Start creating now</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}