import React from 'react';

export const StatsSection: React.FC = () => {
  const metrics = [
    {
      value: '10',
      label: 'Disease Classes',
      subtext: 'Fruit & foliar pathologies',
    },
    {
      value: '2',
      label: 'Detection Engines',
      subtext: 'Deep CNN + classical ML',
    },
    {
      value: '110-D',
      label: 'Leaf Feature Space',
      subtext: 'Color, texture & gradient patterns',
    },
    {
      value: 'AI',
      label: 'Assisted Diagnosis',
      subtext: 'Instant agronomic guidance',
    },
  ];

  return (
    <section className="relative">
      <div className="rounded-2xl bg-white border border-[#DDE6D8] p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#DDE6D8]">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className={`text-center space-y-1 ${idx > 0 ? 'pt-4 sm:pt-0' : ''}`}
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-[#24361B] font-heading tracking-tight">
                {metric.value}
              </p>
              <h3 className="text-sm font-bold text-[#24361B] font-heading">
                {metric.label}
              </h3>
              <p className="text-xs text-[#5D6B55]">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
