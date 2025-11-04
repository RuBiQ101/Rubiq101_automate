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
    name: 'Advanced AI Integration',
    description: 'Native support for GPT-4, Claude, and custom AI models with intelligent prompt management and cost optimization.',
    icon: CpuChipIcon,
  },
  {
    name: 'Visual Workflow Builder',
    description: 'React Flow-powered canvas with drag-and-drop interface. Build complex logic with conditional branches and loops.',
    icon: BoltIcon,
  },
  {
    name: 'Enterprise Security',
    description: 'JWT authentication, encrypted data storage, role-based access control, and secure API endpoints.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Real-time Monitoring',
    description: 'Built-in analytics dashboard with execution tracking, performance metrics, and cost analysis.',
    icon: ChartBarIcon,
  },
  {
    name: 'Full-Stack TypeScript',
    description: 'Next.js frontend, Express.js backend, PostgreSQL database, and Redis caching for maximum performance.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Cross-Platform Apps',
    description: 'Native mobile app built with React Native and Expo. Access your workflows anywhere, anytime.',
    icon: Cog6ToothIcon,
  },
];

export function Features() {
  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Platform Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Production-ready AI workflow platform
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Built with modern technologies for scalability, security, and developer experience
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
