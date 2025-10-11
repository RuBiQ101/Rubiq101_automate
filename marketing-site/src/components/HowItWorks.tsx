export function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">How it works</h2>
        <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
          Build flows visually, connect AI models and apps, and deploy in minutes.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-gray-900">1. Design</h3>
            <p className="mt-2 text-gray-600">Drag blocks onto the canvas and connect them to define your logic.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-gray-900">2. Configure</h3>
            <p className="mt-2 text-gray-600">Choose models, set prompts, add integrations, and test quickly.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-gray-900">3. Deploy</h3>
            <p className="mt-2 text-gray-600">Publish to production with built-in monitoring, logging, and scaling.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
