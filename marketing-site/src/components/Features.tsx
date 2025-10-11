import { 
  CpuChipIcon, 
  BoltIcon, 
  ShieldCheckIcon, 
  ChartBarIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'AI-Powered Automation',
    description: 'Integrate GPT-4, Claude, and other leading AI models directly into your workflows.',
    icon: CpuChipIcon,
  },
  {
    name: 'Visual Workflow Builder',
    description: 'Drag-and-drop interface makes creating complex workflows intuitive and fast.',
    icon: BoltIcon,
  },
  {
    name: 'Enterprise Security',
    description: 'End-to-end encryption, role-based access, and SOC 2 compliance ready.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Real-time Analytics',
    description: 'Monitor performance, track costs, and optimize your workflows with detailed insights.',
    icon: ChartBarIcon,
  },
  {
    name: 'Cloud Native',
    description: 'Built for scale with auto-scaling, load balancing, and 99.9% uptime SLA.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Extensive Integrations',
    description: 'Connect to 500+ apps and services including Slack, Gmail, Salesforce, and more.',
    icon: Cog6ToothIcon,
  },
];

export function Features() {
  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to automate intelligently
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Powerful features that make AI automation accessible to everyone
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
