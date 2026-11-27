"use client";
import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { useLayoutData } from "@/context/LayoutContext";

interface TreatmentSidebarProps {
  treatment: {
    title: string;
    category: string | number;
    tagline: string;
    content?: string | null;
    image: string;
  };
  relatedTreatments: {
    slug: string;
    title: string;
    content: string;
    image: string;
  }[];
    info:{
    title: string;
    sub: string ;
    content: string ;
  }
}

export function TreatmentSidebar({ treatment, relatedTreatments ,info}: TreatmentSidebarProps) {
      const { layoutData }= useLayoutData();
    const contact =layoutData?.contact ?? null;
  return (
    <div className="lg:sticky lg:top-28 space-y-6">
      {/* Book Appointment Card */}
      <div className="rounded-2xl bg-[#061627] text-white p-6 sm:p-8">
        <SectionLabel light>{info.title}</SectionLabel>
        <h3 className="mt-2 text-xl font-semibold font-[family-name:var(--font-heading)] text-white">
         {info.sub}
        </h3>
        <div className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{__html:info.content ?? ""}} />

        <div className="mt-6 space-y-3">
          <Button
            href="/book-appointment"
            variant="primary"
            size="normal"
            className="w-full justify-center text-xs sm:text-sm"
          >
            Book Consultation Online
          </Button>

          <Button
            href={`tel:${contact?.phone}`}
            variant="secondary"
            size="normal"
            className="w-full justify-center text-xs sm:text-sm border-white/20 hover:border-white/40"
          >
            Call Help Desk: {contact?.phone}
          </Button>
        </div>
      </div>

      {/* Related Treatments with Thumbnails */}
      {relatedTreatments.length > 0 && (
        <div className="rounded-2xl bg-[#F4F5F7] border border-gray-200 p-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
            Other Specialized Treatments
          </h4>
          <div className="space-y-3">
            {relatedTreatments.map((rel) => (
              <Link
                key={rel.slug}
                href={`/treatments/${rel.slug}`}
                className="group flex items-center gap-3 rounded-xl bg-white border border-gray-200 p-3 hover:border-gray-400 transition-colors"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h5 className="text-xs sm:text-sm font-semibold text-[#061627] group-hover:text-[#CD9E57] transition-colors leading-snug line-clamp-1">
                    {rel.title}
                  </h5>
                  <div className="mt-0.5 text-[11px] text-gray-500 line-clamp-1" dangerouslySetInnerHTML={{__html:rel.content}} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

