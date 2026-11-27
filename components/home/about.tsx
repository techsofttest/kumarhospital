import Image from "next/image";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function About({about}:{about:any}) {
  return (
    <section id="about" className="relative overflow-hidden bg-[#061627] min-h-[580px] lg:min-h-[640px] flex flex-col justify-end">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={about?.image || "/baner/b3.png"}
          alt="Kumar Hospital About"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark gradient overlay on top of background image to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content aligned to bottom */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-14 pt-28 sm:px-12 sm:pb-16 sm:pt-36 lg:px-20 lg:pb-20 xl:px-24">
        <ScrollReveal direction="up" distance={15} duration={500}>
          <SectionLabel light>{about?.title}</SectionLabel>
        </ScrollReveal>

        {/* 2-column layout: Header on left, Description on right */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-end">
          {/* Left: Heading + Button */}
          <ScrollReveal direction="up" distance={24} duration={650}>
            <div className="max-w-[580px] text-3xl font-medium font-[family-name:var(--font-heading)] leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl text-white" dangerouslySetInnerHTML={{__html:about?.sub ?? ""}}/>

            <div className="mt-8">
              <Button href="#contact" variant="primary" size="normal">
                Know More
              </Button>
            </div>
          </ScrollReveal>

          {/* Right: Description + Feature tags */}
          <ScrollReveal direction="up" distance={24} duration={650} delay={150} className="flex flex-col justify-end">
            <div className="[&_p]:text-[16px] [&_p]:leading-7 [&_p]:text-gray-200 [&_ul]:mt-6 [&_ul]:flex [&_ul]:flex-wrap [&_ul]:gap-2.5 [&_li]:rounded-full [&_li]:bg-white/10 [&_li]:border [&_li]:border-white/15 [&_li]:px-4 [&_li]:py-2 [&_li]:text-[13px] [&_li]:font-medium [&_li]:text-white [&_li]:backdrop-blur-xs" dangerouslySetInnerHTML={{__html:about.content}} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
