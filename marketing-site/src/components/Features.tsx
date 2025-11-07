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
    <div className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Platform Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to build powerful workflows
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Production-ready platform with modern technologies, enterprise security, and developer-friendly tools
          </p>
        </div>

        {/* Featured showcase sections */}
        <div className="space-y-24">
          {/* Visual Builder Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-12 shadow-xl">
                <div className="text-center">
                  <div className="text-6xl mb-6">🎨</div>
                  <div className="text-2xl font-bold text-gray-900 mb-4">Visual Workflow Canvas</div>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-white rounded-lg px-4 py-2 shadow text-sm font-medium">Drag & Drop</div>
                    <div className="bg-white rounded-lg px-4 py-2 shadow text-sm font-medium">500+ Integrations</div>
                    <div className="bg-white rounded-lg px-4 py-2 shadow text-sm font-medium">Real-time Preview</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Code when you need it, UI when you don't
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Build complex workflows visually with our intuitive drag-and-drop builder. Switch to code mode for advanced customization. No lock-in, full flexibility.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <BoltIcon className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Visual canvas powered by React Flow with conditional logic and loops</span>
                </li>
                <li className="flex items-start gap-3">
                  <BoltIcon className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Connect to 500+ apps including Slack, Gmail, GitHub, and more</span>
                </li>
                <li className="flex items-start gap-3">
                  <BoltIcon className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Real-time execution preview and debugging</span>
                </li>
              </ul>
            </div>
          </div>

          {/* AI Integration Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Build multi-step AI agents
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Native integration with GPT-4, Claude, and custom AI models. Create intelligent workflows that understand context and make decisions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CpuChipIcon className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Support for multiple AI providers with automatic failover</span>
                </li>
                <li className="flex items-start gap-3">
                  <CpuChipIcon className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Smart prompt management and version control</span>
                </li>
                <li className="flex items-start gap-3">
                  <CpuChipIcon className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Built-in cost tracking and optimization</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-12 shadow-xl">
                <div className="text-center">
                  <div className="text-6xl mb-6">🤖</div>
                  <div className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Automation</div>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-white rounded-lg px-4 py-2 shadow text-sm font-medium">GPT-4</div>
                    <div className="bg-white rounded-lg px-4 py-2 shadow text-sm font-medium">Claude</div>
                    <div className="bg-white rounded-lg px-4 py-2 shadow text-sm font-medium">Custom Models</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Self-host Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl p-12 shadow-xl">
                <div className="text-center">
                  <div className="text-6xl mb-6">🔒</div>
                  <div className="text-2xl font-bold text-gray-900 mb-4">Enterprise Security</div>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-white rounded-lg px-4 py-2 shadow text-sm font-medium">Self-Hosted</div>
                    <div className="bg-white rounded-lg px-4 py-2 shadow text-sm font-medium">SOC 2</div>
                    <div className="bg-white rounded-lg px-4 py-2 shadow text-sm font-medium">RBAC</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Self-host everything
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Full control over your data and infrastructure. Deploy on your own servers with Docker or Kubernetes. No vendor lock-in.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Complete data ownership and privacy control</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">JWT authentication with role-based access control</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheckIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Encrypted data storage and secure API endpoints</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Traditional feature grid */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            And so much more...
          </h3>
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.slice(3).map((feature) => (
              <div key={feature.name} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-600 text-white mb-4">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
