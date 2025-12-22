import React from 'react';

const StatsBar = () => {
  const stats = [
    { label: 'Users', value: '10,000+' },
    { label: 'Tools', value: '200+' },
    { label: 'Countries', value: '25+' },
  ];

  return (
    <section className="bg-lavender py-12 border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-purple-200">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center pt-8 md:pt-0 px-4">
              <div className="text-4xl sm:text-5xl font-heading text-primary bg-clip-text">
                {stat.value}
              </div>
              <div className="text-gray-500 font-medium mt-2 text-lg uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
