export function WhyChooseUs() {
  const features = [
    {
      icon: '✅',
      title: 'Premium Quality',
      description: 'Every piece is made with attention to detail, durable fabric, perfect fit, and superior comfort.',
    },
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Fast and free shipping on all prepaid orders. Delivered safely to your doorstep across India.',
    },
    {
      icon: '📦',
      title: 'Weekly New Drops',
      description: 'Stay ahead in style. We drop new jackets, jerseys, and accessories every week.',
    },
  ]

  return (
    <section className="py-16 px-6 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-10 text-gray-100">Why Choose Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-gray-800 p-8 rounded-2xl bg-gray-900"
            >
              <div className="text-5xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-gray-100 mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
