import React from 'react';
import { Camera, Sparkles, Microscope, Sprout, ArrowRight } from 'lucide-react';

interface StepItem {
  number: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

const steps: StepItem[] = [
  {
    number: '01',
    icon: <Camera className="w-6 h-6 text-[#24361B]" />,
    title: 'Capture',
    subtitle: 'Upload an Image',
    description: 'Take a clear photo of the citrus fruit or leaf using your smartphone or camera.',
    badge: 'Step 1',
  },
  {
    number: '02',
    icon: <Sparkles className="w-6 h-6 text-[#98CC6B]" />,
    title: 'Analyze',
    subtitle: 'AI Examines It',
    description: 'Our specialized computer vision models analyze microscopic rind and foliar visual patterns.',
    badge: 'Step 2',
  },
  {
    number: '03',
    icon: <Microscope className="w-6 h-6 text-[#24361B]" />,
    title: 'Diagnose',
    subtitle: 'Identify the Disease',
    description: 'The system matches visual markers against verified disease classes and outputs confidence scores.',
    badge: 'Step 3',
  },
  {
    number: '04',
    icon: <Sprout className="w-6 h-6 text-[#98CC6B]" />,
    title: 'Act',
    subtitle: 'Take Action',
    description: 'Receive symptom confirmation, step-by-step treatment guidance, and proactive orchard prevention protocols.',
    badge: 'Step 4',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works-section" className="space-y-8 scroll-mt-28 text-left">
      <div className="max-w-2xl">
        <span className="text-xs uppercase font-bold text-[#98CC6B] tracking-wider">
          Diagnostic Workflow
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24361B] font-heading tracking-tight mt-1">
          From Image to Insight
        </h2>
        <p className="text-sm sm:text-base text-[#5D6B55] mt-2 leading-relaxed">
          A simple four-step process to understand the health of your citrus crop.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div
            key={s.number}
            className="rounded-3xl bg-white border border-[#DDE6D8] p-6 shadow-xs hover:shadow-md hover:border-[#98CC6B] transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold text-[#5D6B55] group-hover:text-[#24361B] transition-colors">
                  {s.number} &bull; {s.title}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2EC] group-hover:bg-[#EEF2EC]/80 border border-[#DDE6D8] flex items-center justify-center transition-colors">
                  {s.icon}
                </div>
              </div>

              {/* Step Subtitle & Description */}
              <h3 className="text-lg font-bold text-[#24361B] font-heading group-hover:text-[#24361B] transition-colors mb-2">
                {s.subtitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#5D6B55] leading-relaxed">
                {s.description}
              </p>
            </div>

            {/* Bottom Indicator */}
            <div className="mt-6 pt-4 border-t border-[#EEF2EC] flex items-center justify-between text-xs text-[#5D6B55]">
              <span className="font-medium">{s.badge}</span>
              <ArrowRight className="w-4 h-4 text-[#5D6B55] group-hover:text-[#24361B] group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
