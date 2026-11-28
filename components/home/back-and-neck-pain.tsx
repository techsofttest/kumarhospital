"use client";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {useLayoutData} from '@/context/LayoutContext';

const painPoints = [
  "Non-surgical treatment options",
  "Interventional pain procedures",
  "IDD therapy",
  "Laser-based treatment",
  "Prolotherapy & PRP injections",
];

export function BackAndNeckPain({brain}:{brain:any}) {
      const { layoutData }= useLayoutData();
    const contact =layoutData?.contact ?? null;
    const service =layoutData?.neck ?? [];
  return (
    <section id="pain" className="relative bg-gray-100 py-10 sm:py-14 lg:py-0">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="order-2 flex flex-col justify-center px-6 py-8 sm:px-12 sm:py-12 lg:order-1 lg:py-16 lg:pl-16 lg:pr-14 xl:pl-20 xl:pr-18">
          <ScrollReveal direction="up" distance={20} duration={600}>
            <SectionLabel>{brain.title}</SectionLabel>

            {/* <h2 className="max-w-[600px] text-2xl font-medium font-[family-name:var(--font-heading)] leading-tight tracking-[-0.03em] sm:text-3xl lg:text-4xl text-[#061627]">
             {brain.sub}
            </h2> */}

            <div className="[&_h2]:max-w-[600px] [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:font-[family-name:var(--font-heading)] [&_h2]:leading-tight [&_h2]:tracking-[-0.03em] sm:[&_h2]:text-3xl lg:[&_h2]:text-4xl [&_h2]:text-[#061627] [&_p]:mt-4 [&_p]:max-w-[600px] [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-[#52606B]" dangerouslySetInnerHTML={{__html:brain?.content ?? ""}} />
          </ScrollReveal>

          <div className="mt-6 space-y-2.5">
            {service.map((item, idx) => (
              <ScrollReveal
                key={idx}
                direction="up"
                distance={15}
                delay={idx * 60}
                className="flex items-center gap-3 text-[14.5px] font-medium text-[#061627]"
              >
                <span className="flex items-center justify-center text-[#CD9E57]">
                  <Check size={15} strokeWidth={2.5} />
                </span>
                {item.title}
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" distance={15} delay={320}>
            <Button
              href="#appointment"
              variant="primary"
              size="normal"
              className="mt-6"
            >
              Enquire about pain care
            </Button>
          </ScrollReveal>
        </div>

        <div className="order-1 p-6 sm:p-8 lg:order-2 lg:sticky lg:top-20 lg:py-12 lg:pr-12 lg:pl-0 xl:pr-16 w-full self-start">
          <ScrollReveal direction="left" distance={30} duration={700}>
            <div className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] w-full overflow-hidden rounded-xl bg-gray-200 shadow-sm">
              <Image
                src={brain.image ||""}
                alt="Back and neck pain treatment"
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

