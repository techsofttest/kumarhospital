"use client";
import { MapPin, Phone, Clock3 } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {useLayoutData} from '@/context/LayoutContext';
interface Dataprops{
      title:string;
    sub:string;
    content:string;
    stat:{
      icon:string;
      title:string;
      description:string;
    }[];
}
export function ContactInfo({about}:{about?:Dataprops}) {
    const { layoutData }= useLayoutData();
    const contact =layoutData?.contact ?? null;
  return (
    <ScrollReveal direction="up" distance={20} duration={600}>
      <SectionLabel>{about?.title}</SectionLabel>
      <h2 className="text-3xl sm:text-4xl font-medium font-[family-name:var(--font-heading)] text-[#061627] tracking-[-0.03em]">
        {about?.sub}
      </h2>
      <div className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-[#52606B] " dangerouslySetInnerHTML={{__html:about?.content ?? "" }} />

      {/* Cards for Info */}
      <div className="mt-8 space-y-4">
         
        <div className="flex items-start gap-4 rounded-2xl border border-gray-200/90 bg-[#F4F5F7] p-5">
          <div className="text-[#CD9E57] shrink-0 mt-0.5 [&>svg]:h-10 [&>svg]:w-10 [&>svg]:[stroke-width:1.6]"  dangerouslySetInnerHTML={{__html:about?.stat?.[0].icon ?? ""}} />
          <div>
            <h3 className="text-sm font-semibold text-[#061627] ">{about?.stat?.[0].title}</h3>
            <div className="mt-0.5 text-xs sm:text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{__html:contact?.address?? ""}} />
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border border-gray-200/90 bg-[#F4F5F7] p-5">
          <Phone size={32} className="text-[#CD9E57] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-[#061627]">{about?.stat?.[1].title}</h3>
            <p className="mt-0.5 text-xs sm:text-sm text-gray-600">
              Primary Helpline:{" "}
              <a href={`tel:${contact?.phone}`} className="font-semibold text-[#061627] underline">
                {contact?.phone}
              </a>
            </p>
            <p className="mt-0.5 text-xs text-gray-500">Available 7 days a week:{contact?.open}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-2xl border border-gray-200/90 bg-[#F4F5F7] p-5">
          <Clock3 size={32} className="text-[#CD9E57] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-[#061627]">{about?.stat?.[2].title}</h3>
            <p className="mt-0.5 text-xs sm:text-sm text-gray-600 [&_span]:mt-0.5 [&_span]:text-xs [&_span]:text-gray-500"dangerouslySetInnerHTML={{__html:contact?.time ?? ""}} />
            {/* <p className="mt-0.5 text-xs text-gray-500">Sunday: Closed for routine OP (Emergency rehabilitation support open)</p> */}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
