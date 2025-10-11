import { CheckIcon } from '@heroicons/react/24/outline';

const tiers = [
  {
    name: 'Starter',
    href: '/signup?plan=starter',
    priceMonthly: 0,
    description: 'Perfect for trying out AI workflows',
    features: [
      '5 workflows',
      '100 executions/month',
      'Basic AI models',
      'Community support',
      'Standard integrations',
    ],
    cta: 'Start Free',
    mostPopular: false,
  },
  {
    name: 'Professional',
    href: '/signup?plan=pro',
    priceMonthly: 29,
    description: 'Best for growing teams and businesses',
    features: [
      'Unlimited workflows',
      '10,000 executions/month',
      'Advanced AI models (GPT-4, Claude)',
      'Priority support',
      'Advanced integrations',
      'Team collaboration',
      'Analytics dashboard',
    ],
    cta: 'Start Trial',
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    href: '/contact',
    priceMonthly: null as number | null,
    description: 'Advanced features for large organizations',
    features: [
      'Unlimited everything',
      'Custom AI models',
      'Dedicated support',
      'SSO & advanced security',
      'Custom integrations',
      'SLA guarantees',
      'On-premise deployment',
    ],
    cta: 'Contact Sales',
    mostPopular: false,
  },
];

export function Pricing() {
  return (
    <div className="bg-gray-900" id="pricing">
      <div className="pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
        <div className="text-center">
          <h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider">Pricing</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            The right price for you, whoever you are
          </p>
          <p className="mt-3 max-w-4xl mx-auto text-xl text-gray-300 sm:mt-5 sm:text-2xl">
            Start free, scale as you grow. No hidden fees.
          </p>
        </div>
      </div>

      <div className="mt-16 bg-white pb-12 lg:mt-20 lg:pb-20">
        <div className="relative z-0">
          <div className="absolute inset-0 h-5/6 bg-gray-900 lg:h-2/3"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative lg:grid lg:grid-cols-7">
              {/* Starter Tier */}
              <div className="mx-auto max-w-md lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3">
                <div className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg">
                  <div className="flex-1 flex flex-col">
                    <div className="bg-white px-6 py-10">
                      <div>
                        <h3 className="text-center text-2xl font-medium text-gray-900">{tiers[0].name}</h3>
                        <div className="mt-4 flex items-center justify-center">
                          <span className="px-3 flex items-start text-6xl tracking-tight text-gray-900">
                            <span className="mt-2 mr-2 text-4xl font-medium">$</span>
                            <span className="font-extrabold">{tiers[0].priceMonthly}</span>
                          </span>
                          <span className="text-xl font-medium text-gray-500">/mo</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
                      <ul className="space-y-4">
                        {tiers[0].features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                              <CheckIcon className="flex-shrink-0 h-6 w-6 text-green-500" />
                            </div>
                            <p className="ml-3 text-base font-medium text-gray-500">{feature}</p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <div className="rounded-lg shadow-md">
                          <a href={tiers[0].href} className="block w-full text-center rounded-lg border border-transparent px-6 py-3 text-base font-medium text-indigo-600 bg-white hover:bg-gray-50">
                            {tiers[0].cta}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional tiers can be added similarly */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
