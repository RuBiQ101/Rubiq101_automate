import Link from 'next/link';
import { ArrowLeftIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function TutorialPage() {
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
            Interactive Tutorial
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Learn to build AI workflows step by step
          </p>
        </div>

        <div className="mt-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg shadow-lg p-8 text-white">
          <div className="text-center">
            <AcademicCapIcon className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Learn By Building</h2>
            <p className="text-lg mb-6 opacity-90">
              Interactive, hands-on tutorial that takes you from zero to hero in 30 minutes.
            </p>
            <Link
              href="http://localhost:3005"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-green-600 transition-colors"
            >
              Start Tutorial Now →
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">What You'll Learn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              <div className="flex items-start mb-4">
                <div className="text-3xl mr-4">🎯</div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Workflow Basics</h4>
                  <p className="text-gray-600 text-sm mb-3">Master the fundamentals of workflow design</p>
                  <ul className="space-y-1 text-sm text-gray-500">
                    <li>• Node types and connections</li>
                    <li>• Data flow concepts</li>
                    <li>• Execution order</li>
                  </ul>
                </div>
              </div>
              <div className="text-xs text-green-600 font-semibold">Lesson 1 • 5 mins</div>
            </div>
            
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              <div className="flex items-start mb-4">
                <div className="text-3xl mr-4">🤖</div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">AI Integration</h4>
                  <p className="text-gray-600 text-sm mb-3">Connect AI models to your workflows</p>
                  <ul className="space-y-1 text-sm text-gray-500">
                    <li>• OpenAI GPT-4 setup</li>
                    <li>• Anthropic Claude integration</li>
                    <li>• Prompt engineering basics</li>
                  </ul>
                </div>
              </div>
              <div className="text-xs text-green-600 font-semibold">Lesson 2 • 8 mins</div>
            </div>
            
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              <div className="flex items-start mb-4">
                <div className="text-3xl mr-4">🔗</div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">App Connections</h4>
                  <p className="text-gray-600 text-sm mb-3">Integrate with popular services</p>
                  <ul className="space-y-1 text-sm text-gray-500">
                    <li>• Slack, Gmail, Discord</li>
                    <li>• API authentication</li>
                    <li>• Webhook triggers</li>
                  </ul>
                </div>
              </div>
              <div className="text-xs text-green-600 font-semibold">Lesson 3 • 7 mins</div>
            </div>
            
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              <div className="flex items-start mb-4">
                <div className="text-3xl mr-4">⚡</div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Automation</h4>
                  <p className="text-gray-600 text-sm mb-3">Set up automatic workflow execution</p>
                  <ul className="space-y-1 text-sm text-gray-500">
                    <li>• Cron schedules</li>
                    <li>• Event triggers</li>
                    <li>• Error handling</li>
                  </ul>
                </div>
              </div>
              <div className="text-xs text-green-600 font-semibold">Lesson 4 • 5 mins</div>
            </div>
            
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              <div className="flex items-start mb-4">
                <div className="text-3xl mr-4">�</div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Data Processing</h4>
                  <p className="text-gray-600 text-sm mb-3">Transform and manipulate data</p>
                  <ul className="space-y-1 text-sm text-gray-500">
                    <li>• Data mapping</li>
                    <li>• Filtering and sorting</li>
                    <li>• Format conversions</li>
                  </ul>
                </div>
              </div>
              <div className="text-xs text-green-600 font-semibold">Lesson 5 • 6 mins</div>
            </div>
            
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              <div className="flex items-start mb-4">
                <div className="text-3xl mr-4">🚀</div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Deployment</h4>
                  <p className="text-gray-600 text-sm mb-3">Deploy workflows to production</p>
                  <ul className="space-y-1 text-sm text-gray-500">
                    <li>• Testing workflows</li>
                    <li>• Monitoring execution</li>
                    <li>• Production best practices</li>
                  </ul>
                </div>
              </div>
              <div className="text-xs text-green-600 font-semibold">Lesson 6 • 4 mins</div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Tutorial Path</h3>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Progress line */}
              <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gray-200"></div>
              
              {/* Steps */}
              <div className="space-y-6">
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm z-10">1</div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-semibold text-gray-900">Your First Workflow</h4>
                    <p className="text-sm text-gray-600">Create a simple "Hello World" workflow to understand the basics</p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm z-10">2</div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-semibold text-gray-900">Add AI Power</h4>
                    <p className="text-sm text-gray-600">Connect GPT-4 to generate content from user input</p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm z-10">3</div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-semibold text-gray-900">Connect Services</h4>
                    <p className="text-sm text-gray-600">Send the generated content to Slack or email</p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm z-10">4</div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-semibold text-gray-900">Automate Everything</h4>
                    <p className="text-sm text-gray-600">Set up triggers to run your workflow automatically</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link
              href="http://localhost:3005"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Begin Interactive Tutorial →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}