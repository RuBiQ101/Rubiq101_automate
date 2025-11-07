import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link 
          href="/"
          className="flex justify-center items-center text-indigo-600 hover:text-indigo-500 mb-8"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your AI workflow builder
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Access Available</h3>
            <p className="text-gray-600">
              Authentication system is under development. Access the workflow builder directly to get started.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-indigo-900 mb-2">🚀 What You Can Do Now</h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Build unlimited AI workflows</li>
                <li>• Access all templates and demos</li>
                <li>• Test with real integrations</li>
                <li>• Export and import workflows</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link
                href="http://localhost:3005"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Launch Workflow Builder →
              </Link>
              
              <Link
                href="/"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                ← Back to Home
              </Link>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Full authentication with user accounts, team collaboration, and cloud deployment coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}