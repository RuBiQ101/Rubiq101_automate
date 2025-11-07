"use client";
import { useAuth } from '@/context/AuthContext';
import useSWR from 'swr';
import api from '@/lib/api';
import Link from 'next/link';
import { 
  PlusIcon, 
  PlayIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user, loading } = useAuth();
  
  const { data: workflows } = useSWR('/api/workflows', url => api.get(url).then(r => r.data));
  const { data: executions } = useSWR('/api/executions', url => api.get(url).then(r => r.data));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Orkx</h1>
          <p className="text-gray-600 mb-6">Please log in to continue</p>
          <Link 
            href="/login"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Workflows',
      value: workflows?.length || 0,
      icon: ChartBarIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'Active Workflows',
      value: workflows?.filter((w: any) => w.status === 'active').length || 0,
      icon: CheckCircleIcon,
      color: 'bg-green-500'
    },
    {
      name: 'Recent Executions',
      value: executions?.length || 0,
      icon: PlayIcon,
      color: 'bg-purple-500'
    },
    {
      name: 'Failed Executions',
      value: executions?.filter((e: any) => e.status === 'failed').length || 0,
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Here's what's happening with your AI workflows today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div 
              key={stat.name} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-4 rounded-xl shadow-lg`}>
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-gray-200 to-transparent rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Recent Workflows */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-indigo-600 p-2 rounded-lg mr-3">
                    <CogIcon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Recent Workflows</h2>
                </div>
                <Link 
                  href="/workflows"
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold flex items-center group"
                >
                  View all
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="p-6">
              {workflows?.slice(0, 5).map((workflow: any) => (
                <div key={workflow.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                  <div className="flex-1">
                    <Link 
                      href={`/workflows/${workflow.id}`}
                      className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                      {workflow.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{workflow.description}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ml-4 ${
                    workflow.status === 'active' 
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {workflow.status}
                  </span>
                </div>
              )) || (
                <div className="text-center py-12">
                  <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <ChartBarIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium mb-6">No workflows yet</p>
                  <Link 
                    href="/workflows/new"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Create your first workflow
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Executions */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-teal-50 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-600 p-2 rounded-lg mr-3">
                    <PlayIcon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Recent Executions</h2>
                </div>
                <Link 
                  href="/executions"
                  className="text-green-600 hover:text-green-700 text-sm font-semibold flex items-center group"
                >
                  View all
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="p-6">
              {executions?.slice(0, 5).map((execution: any) => (
                <div key={execution.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{execution.workflowName || `Execution ${execution.id}`}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {new Date(execution.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ml-4 ${
                    execution.status === 'completed' 
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : execution.status === 'failed'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}>
                    {execution.status}
                  </span>
                </div>
              )) || (
                <div className="text-center py-12">
                  <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <PlayIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">No executions yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-10 flex justify-center">
          <Link 
            href="/workflows/new"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <PlusIcon className="h-6 w-6 mr-3" />
            Create New Workflow
          </Link>
        </div>
      </div>
    </div>
  );
}
