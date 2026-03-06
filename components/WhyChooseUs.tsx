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
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-black mb-4">Why Choose ThriftELLC?</h2>
          <p className="text-xl text-gray-600">
            We believe style should be affordable, comfortable, and bold — just like you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
