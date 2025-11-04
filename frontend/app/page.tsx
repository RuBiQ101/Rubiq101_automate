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
  ChartBarIcon 
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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your AI workflows today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-md`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Workflows */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Workflows</h2>
              <Link 
                href="/workflows"
                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {workflows?.slice(0, 5).map((workflow: any) => (
              <div key={workflow.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <Link 
                    href={`/workflows/${workflow.id}`}
                    className="font-medium text-gray-900 hover:text-indigo-600"
                  >
                    {workflow.name}
                  </Link>
                  <p className="text-sm text-gray-500">{workflow.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  workflow.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {workflow.status}
                </span>
              </div>
            )) || (
              <div className="text-center py-8">
                <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No workflows yet</p>
                <Link 
                  href="/workflows/new"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create your first workflow
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Executions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Executions</h2>
              <Link 
                href="/executions"
                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {executions?.slice(0, 5).map((execution: any) => (
              <div key={execution.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{execution.workflowName || `Execution ${execution.id}`}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {new Date(execution.createdAt).toLocaleString()}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  execution.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : execution.status === 'failed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {execution.status}
                </span>
              </div>
            )) || (
              <div className="text-center py-8">
                <PlayIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No executions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="mt-8 flex justify-center">
        <Link 
          href="/workflows/new"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New Workflow
        </Link>
      </div>
    </div>
  );
}
