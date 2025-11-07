"use client";"use client";"use client";export function Testimonials() {



const testimonials = [

  {

    name: "Sarah Chen",const testimonials = [  return (

    role: "DevOps Lead",

    company: "TechCorp",  {

    image: "👩‍💼",

    quote: "This platform cut our deployment time from hours to minutes. The visual builder makes complex workflows incredibly simple.",    name: "Sarah Chen",const testimonials = [    <section className="py-16 bg-white" id="testimonials">

    rating: 5,

  },    role: "DevOps Lead",

  {

    name: "Marcus Rodriguez",    company: "TechCorp",  {      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    role: "CTO",

    company: "StartupXYZ",    image: "👩‍💼",

    image: "👨‍💻",

    quote: "Best automation tool we've used. The AI integration possibilities are endless. Worth every penny.",    quote: "This platform cut our deployment time from hours to minutes. The visual builder makes complex workflows incredibly simple.",    name: "Sarah Chen",        <h2 className="text-3xl font-bold text-gray-900 text-center">Loved by teams</h2>

    rating: 5,

  },    rating: 5,

  {

    name: "Emily Johnson",  },    role: "DevOps Lead",        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

    role: "Product Manager",

    company: "Enterprise Inc",  {

    image: "👩‍🔬",

    quote: "Finally, a workflow tool that both developers and non-technical team members can use effectively.",    name: "Marcus Rodriguez",    company: "TechCorp",          <div className="p-6 bg-gray-50 rounded-lg shadow">

    rating: 5,

  },    role: "CTO",

  {

    name: "David Kim",    company: "StartupXYZ",    image: "👩‍💼",            <p className="text-gray-700">

    role: "Solutions Architect",

    company: "CloudFirst",    image: "👨‍💻",

    image: "👨‍🎓",

    quote: "The flexibility and extensibility are outstanding. We've automated 80% of our manual processes.",    quote: "Best automation tool we've used. The AI integration possibilities are endless. Worth every penny.",    quote: "This platform cut our deployment time from hours to minutes. The visual builder makes complex workflows incredibly simple.",              “FlowAI helped us automate onboarding and save dozens of hours per week.”

    rating: 5,

  },    rating: 5,

  {

    name: "Lisa Anderson",  },    rating: 5,            </p>

    role: "IT Director",

    company: "MegaCorp",  {

    image: "👩‍💼",

    quote: "Self-hosted option gave us the security we needed. The support team is incredibly responsive.",    name: "Emily Johnson",  },            <p className="mt-4 text-sm text-gray-500">— Alex, Operations Lead</p>

    rating: 5,

  },    role: "Product Manager",

  {

    name: "James Wilson",    company: "Enterprise Inc",  {          </div>

    role: "Senior Developer",

    company: "DevShop",    image: "👩‍🔬",

    image: "👨‍💻",

    quote: "Code when you need it, visual builder when you don't. Perfect balance for our team.",    quote: "Finally, a workflow tool that both developers and non-technical team members can use effectively.",    name: "Marcus Rodriguez",          <div className="p-6 bg-gray-50 rounded-lg shadow">

    rating: 5,

  },    rating: 5,

];

  },    role: "CTO",            <p className="text-gray-700">

export function Testimonials() {

  return (  {

    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 sm:py-24" id="testimonials">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">    name: "David Kim",    company: "StartupXYZ",              “We ship faster with AI-assisted workflows, without burdening engineering.”

        <div className="mx-auto max-w-2xl text-center">

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">    role: "Solutions Architect",

            Loved by teams worldwide

          </h2>    company: "CloudFirst",    image: "👨‍💻",            </p>

          <p className="mt-4 text-lg text-gray-600">

            See what our users have to say about building workflows with our platform    image: "👨‍🎓",

          </p>

        </div>    quote: "The flexibility and extensibility are outstanding. We've automated 80% of our manual processes.",    quote: "Best automation tool we've used. The AI integration possibilities are endless. Worth every penny.",            <p className="mt-4 text-sm text-gray-500">— Priya, Product Manager</p>

        

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">    rating: 5,

          {testimonials.map((testimonial, index) => (

            <div  },    rating: 5,          </div>

              key={index}

              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"  {

            >

              <div className="flex gap-1 mb-4">    name: "Lisa Anderson",  },          <div className="p-6 bg-gray-50 rounded-lg shadow">

                {[...Array(testimonial.rating)].map((_, i) => (

                  <svg    role: "IT Director",

                    key={i}

                    className="w-5 h-5 text-yellow-400"    company: "MegaCorp",  {            <p className="text-gray-700">

                    fill="currentColor"

                    viewBox="0 0 20 20"    image: "👩‍💼",

                  >

                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />    quote: "Self-hosted option gave us the security we needed. The support team is incredibly responsive.",    name: "Emily Johnson",              “Monitoring and cost insights let us scale AI confidently.”

                  </svg>

                ))}    rating: 5,

              </div>

                },    role: "Product Manager",            </p>

              <blockquote className="text-gray-700 text-base mb-6">

                &quot;{testimonial.quote}&quot;  {

              </blockquote>

                  name: "James Wilson",    company: "Enterprise Inc",            <p className="mt-4 text-sm text-gray-500">— Jordan, CTO</p>

              <div className="flex items-center gap-4">

                <div className="flex-shrink-0 text-4xl bg-gradient-to-br from-indigo-100 to-purple-100 w-14 h-14 rounded-full flex items-center justify-center">    role: "Senior Developer",

                  {testimonial.image}

                </div>    company: "DevShop",    image: "👩‍🔬",          </div>

                <div>

                  <div className="font-semibold text-gray-900">{testimonial.name}</div>    image: "👨‍💻",

                  <div className="text-sm text-gray-600">{testimonial.role}</div>

                  <div className="text-sm text-indigo-600">{testimonial.company}</div>    quote: "Code when you need it, visual builder when you don't. Perfect balance for our team.",    quote: "Finally, a workflow tool that both developers and non-technical team members can use effectively.",        </div>

                </div>

              </div>    rating: 5,

            </div>

          ))}  },    rating: 5,      </div>

        </div>

        ];

        <div className="mt-16 text-center">

          <p className="text-gray-600 mb-6">  },    </section>

            Join thousands of teams building better workflows

          </p>export function Testimonials() {

          <a

            href="http://localhost:3005"  return (  {  );

            target="_blank"

            rel="noopener noreferrer"    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 sm:py-24" id="testimonials">

            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"

          >      <div className="mx-auto max-w-7xl px-6 lg:px-8">    name: "David Kim",}

            Start Building Free

            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">        <div className="mx-auto max-w-2xl text-center">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />

            </svg>          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">    role: "Solutions Architect",

          </a>

        </div>            Loved by teams worldwide    company: "CloudFirst",

      </div>

    </section>          </h2>    image: "👨‍🎓",

  );

}          <p className="mt-4 text-lg text-gray-600">    quote: "The flexibility and extensibility are outstanding. We've automated 80% of our manual processes.",


            See what our users have to say about building workflows with our platform    rating: 5,

          </p>  },

        </div>  {

            name: "Lisa Anderson",

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">    role: "IT Director",

          {testimonials.map((testimonial, index) => (    company: "MegaCorp",

            <div    image: "👩‍💼",

              key={index}    quote: "Self-hosted option gave us the security we needed. The support team is incredibly responsive.",

              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"    rating: 5,

            >  },

              <div className="flex gap-1 mb-4">  {

                {[...Array(testimonial.rating)].map((_, i) => (    name: "James Wilson",

                  <svg    role: "Senior Developer",

                    key={i}    company: "DevShop",

                    className="w-5 h-5 text-yellow-400"    image: "👨‍💻",

                    fill="currentColor"    quote: "Code when you need it, visual builder when you don't. Perfect balance for our team.",

                    viewBox="0 0 20 20"    rating: 5,

                  >  },

                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />];

                  </svg>

                ))}export function Testimonials() {

              </div>  return (

                  <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 sm:py-24" id="testimonials">

              <blockquote className="text-gray-700 text-base mb-6">      <div className="mx-auto max-w-7xl px-6 lg:px-8">

                &quot;{testimonial.quote}&quot;        <div className="mx-auto max-w-2xl text-center">

              </blockquote>          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">

                          Loved by teams worldwide

              <div className="flex items-center gap-4">          </h2>

                <div className="flex-shrink-0 text-4xl bg-gradient-to-br from-indigo-100 to-purple-100 w-14 h-14 rounded-full flex items-center justify-center">          <p className="mt-4 text-lg text-gray-600">

                  {testimonial.image}            See what our users have to say about building workflows with our platform

                </div>          </p>

                <div>        </div>

                  <div className="font-semibold text-gray-900">{testimonial.name}</div>        

                  <div className="text-sm text-gray-600">{testimonial.role}</div>        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">

                  <div className="text-sm text-indigo-600">{testimonial.company}</div>          {testimonials.map((testimonial, index) => (

                </div>            <div

              </div>              key={index}

            </div>              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"

          ))}            >

        </div>              {/* Rating stars */}

                      <div className="flex gap-1 mb-4">

        <div className="mt-16 text-center">                {[...Array(testimonial.rating)].map((_, i) => (

          <p className="text-gray-600 mb-6">                  <svg

            Join thousands of teams building better workflows                    key={i}

          </p>                    className="w-5 h-5 text-yellow-400"

          <a                    fill="currentColor"

            href="http://localhost:3005"                    viewBox="0 0 20 20"

            target="_blank"                  >

            rel="noopener noreferrer"                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />

            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"                  </svg>

          >                ))}

            Start Building Free              </div>

            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">              

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />              {/* Quote */}

            </svg>              <blockquote className="text-gray-700 text-base mb-6">

          </a>                "{testimonial.quote}"

        </div>              </blockquote>

      </div>              

    </section>              {/* User info */}

  );              <div className="flex items-center gap-4">

}                <div className="flex-shrink-0 text-4xl bg-gradient-to-br from-indigo-100 to-purple-100 w-14 h-14 rounded-full flex items-center justify-center">

                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-indigo-600">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Join thousands of teams building better workflows
          </p>
          <a
            href="http://localhost:3005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Start Building Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
