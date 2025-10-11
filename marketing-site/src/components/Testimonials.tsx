export function Testimonials() {
  return (
    <section className="py-16 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Loved by teams</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <p className="text-gray-700">
              “FlowAI helped us automate onboarding and save dozens of hours per week.”
            </p>
            <p className="mt-4 text-sm text-gray-500">— Alex, Operations Lead</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <p className="text-gray-700">
              “We ship faster with AI-assisted workflows, without burdening engineering.”
            </p>
            <p className="mt-4 text-sm text-gray-500">— Priya, Product Manager</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <p className="text-gray-700">
              “Monitoring and cost insights let us scale AI confidently.”
            </p>
            <p className="mt-4 text-sm text-gray-500">— Jordan, CTO</p>
          </div>
        </div>
      </div>
    </section>
  );
}
