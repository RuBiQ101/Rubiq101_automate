export function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">How it works</h2>
        <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
          From visual design to production deployment in three simple steps.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">1. Design Visually</h3>
            <p className="mt-2 text-gray-600">Use our React Flow-based canvas to drag and drop AI models, APIs, and logic blocks. Create complex workflows without code.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">2. Configure & Test</h3>
            <p className="mt-2 text-gray-600">Set up AI model parameters, API credentials, and business logic. Test your workflow with real data before deployment.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">3. Deploy & Monitor</h3>
            <p className="mt-2 text-gray-600">One-click deployment to production with automatic scaling, monitoring, and analytics. Access via web or mobile app.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
