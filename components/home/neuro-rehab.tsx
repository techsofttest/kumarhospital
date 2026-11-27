"use client";
import Image from "next/image";
import {
  Brain,
  Stethoscope,
  Dumbbell,
  Activity,
  MessageCircle,
  Target,
  ArrowRight,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {useLayoutData} from '@/context/LayoutContext';

const neuroServices = [
  { label: "Physical Medicine Consultation", icon: Stethoscope },
  { label: "Physiotherapy", icon: Dumbbell },
  { label: "Occupational Therapy", icon: Activity },
  { label: "Speech Therapy", icon: MessageCircle },
  { label: "Functional Training", icon: Target },
  { label: "Neurological Assessment", icon: Brain },
];

export function NeuroRehab({stroke}:{stroke:any}) {
    const { layoutData }= useLayoutData();
    const contact =layoutData?.contact ?? null;
    const service =layoutData?.stroke ?? [];
  return (
    <section id="neuro" className="relative bg-white py-10 sm:py-14 lg:py-0">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="p-6 sm:p-8 lg:sticky lg:top-20 lg:py-12 lg:pl-12 lg:pr-0 xl:pl-16 w-full self-start">
          <ScrollReveal direction="right" distance={30} duration={700}>
            <div className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] w-full overflow-hidden rounded-xl bg-gray-200 shadow-sm">
              <Image
                src="/categories/Neural Pathways in Focus.png"
                alt="Stroke and neurological rehabilitation"
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="flex flex-col justify-center px-6 py-8 sm:px-12 sm:py-12 lg:py-16 lg:pl-16 lg:pr-14 xl:pl-20 xl:pr-18">
          <ScrollReveal direction="up" distance={20} duration={600}>
            <SectionLabel>{stroke.title}</SectionLabel>

            {/* <h2 className="max-w-[600px] text-2xl font-medium font-[family-name:var(--font-heading)] leading-tight tracking-[-0.03em] sm:text-3xl lg:text-4xl text-[#061627]">
             {stroke.sub}
            </h2> */}

            <div className="[&_h2]:max-w-[600px] [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:font-[family-name:var(--font-heading)] [&_h2]:leading-tight [&_h2]:tracking-[-0.03em] sm:[&_h2]:text-3xl lg:[&_h2]:text-4xl [&_h2]:text-[#061627] [&_p]:mt-4 [&_p]:max-w-[600px] [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-[#52606B]" dangerouslySetInnerHTML={{__html:stroke?.content ?? ""}} />
          </ScrollReveal>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {service.map(({ title, icon }, idx) => (
              <ScrollReveal
                key={title}
                direction="up"
                distance={18}
                delay={idx * 60}
                className="flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4"
              > <div className="text-[#CD9E57] [&>svg]:h-10 [&>svg]:w-10 [&>svg]:[stroke-width:1.6]" dangerouslySetInnerHTML={{__html:icon}} />
                <span className="text-[14px] font-medium text-[#061627]">{title}</span>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" distance={15} delay={350}>
            <Button
              href="#appointment"
              variant="primary"
              size="normal"
              className="mt-8"
            >
              Enquire about neuro rehabilitation
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

