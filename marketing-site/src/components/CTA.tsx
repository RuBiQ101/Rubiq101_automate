import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-16 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white">Start building AI workflows today</h2>
        <p className="mt-4 text-indigo-100">Create your first flow in minutes. No credit card required.</p>
        <div className="mt-8">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-indigo-700 shadow hover:bg-gray-100"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
}
