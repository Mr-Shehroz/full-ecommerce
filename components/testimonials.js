export default function Testimonials() {
    const testimonials = [
      {
        name: "Aisha Khan",
        feedback: "Absolutely love the quality! Fast delivery and great support. Will shop again.",
      },
      {
        name: "Hamza Ali",
        feedback: "Amazing variety of products and the checkout process was super smooth.",
      },
      {
        name: "Zara Sheikh",
        feedback: "Best experience ever! The product matched exactly what I saw online.",
      },
    ];
  
    return (
      <section className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">
            What Our Customers Say
          </h2>
  
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl shadow hover:shadow-md transition text-left"
              >
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  “{t.feedback}”
                </p>
                <h4 className="text-slate-900 dark:text-white font-semibold">
                  — {t.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  