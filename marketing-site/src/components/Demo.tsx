import { PlayIcon, EyeIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const demoWorkflows = [
  {
    title: 'AI Content Generator',
    description: 'Transform ideas into blog posts using GPT-4, with automatic SEO optimization and publishing to CMS.',
    features: ['GPT-4 Integration', 'SEO Analysis', 'Auto Publishing', 'Content Calendar'],
    image: '📝',
    complexity: 'Beginner'
  },
  {
    title: 'Customer Support Bot',
    description: 'Intelligent chatbot that handles customer queries, escalates complex issues, and updates CRM automatically.',
    features: ['Claude Integration', 'Sentiment Analysis', 'CRM Updates', 'Email Notifications'],
    image: '🤖',
    complexity: 'Intermediate'
  },
  {
    title: 'Data Analysis Pipeline',
    description: 'Process CSV files, run AI analysis, generate insights, and create automated reports with charts.',
    features: ['Data Processing', 'AI Analysis', 'Chart Generation', 'PDF Reports'],
    image: '📊',
    complexity: 'Advanced'
  }
];

export function Demo() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Interactive Demo</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            See AI workflows in action
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Explore real-world examples built with our visual workflow builder
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {demoWorkflows.map((workflow, index) => (
            <div key={workflow.title} className="relative group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{workflow.image}</div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      workflow.complexity === 'Beginner' ? 'bg-green-100 text-green-800' :
                      workflow.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {workflow.complexity}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{workflow.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{workflow.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {workflow.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      href={`https://app.orkx.in/demo/${workflow.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                    >
                      <PlayIcon className="w-4 h-4 mr-1" />
                      Try Now
                    </Link>
                    <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-indigo-50 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to build your own?</h3>
            <p className="text-gray-600 mb-6">Start with our interactive tutorial and build your first AI workflow in under 10 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://app.orkx.in/tutorial"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <CodeBracketIcon className="w-5 h-5 mr-2" />
                Start Tutorial
              </Link>
              <Link
                href="https://docs.orkx.in/examples"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Browse Examples
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}