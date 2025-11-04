import { CodeBracketIcon, DevicePhoneMobileIcon, CloudIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const technologies = [
  {
    category: 'Frontend',
    icon: CodeBracketIcon,
    items: ['Next.js 15', 'React 19', 'TypeScript', 'React Flow', 'Tailwind CSS'],
    color: 'blue'
  },
  {
    category: 'Backend',
    icon: CloudIcon,
    items: ['Express.js', 'TypeScript', 'PostgreSQL', 'Redis', 'BullMQ'],
    color: 'green'
  },
  {
    category: 'Mobile',
    icon: DevicePhoneMobileIcon,
    items: ['React Native', 'Expo SDK 54', 'Expo Router', 'Secure Store'],
    color: 'purple'
  },
  {
    category: 'DevOps',
    icon: ShieldCheckIcon,
    items: ['Docker', 'GitHub Actions', 'Kubernetes', 'Nginx', 'Prometheus'],
    color: 'orange'
  }
];

export function TechStack() {
  return (
    <section className="py-16 bg-white" id="tech-stack">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Technology Stack</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Built with modern, proven technologies
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Full-stack TypeScript platform designed for scalability and developer experience
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech) => (
            <div key={tech.category} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative p-6 bg-white rounded-lg ring-1 ring-gray-900/5">
                <div className="flex items-center mb-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-${tech.color}-100 flex items-center justify-center`}>
                    <tech.icon className={`w-6 h-6 text-${tech.color}-600`} />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">{tech.category}</h3>
                </div>
                <ul className="space-y-2">
                  {tech.items.map((item) => (
                    <li key={item} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Production Ready
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Docker & K8s
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              TypeScript First
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              MIT Licensed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}