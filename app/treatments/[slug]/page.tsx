import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";
import { Header } from "@/components/global/header";
import { Footer } from "@/components/global/footer";
import { AppointmentCta } from "@/components/home/appointment-cta";
import { treatmentsData } from "@/data/treatments";
import { TreatmentHeaderBar } from "@/components/treatments/treatment-header-bar";
import { TreatmentOverview } from "@/components/treatments/treatment-overview";
import { TreatmentSidebar } from "@/components/treatments/treatment-sidebar";


export interface ProtocolStep {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceDetailData {
  overview?: string | string[];
  clinicalHighlights?: string[];
  indications?: string[];
  recoveryGoals?: string[];
  protocolSteps?: ProtocolStep[];
}

export interface ServiceDetailResponse {
  seo: {
    meta_title: string | null;
    meta_key: string | null;
    meta_desc: string | null;
  };
  detail: ServiceDetailData;
  hero: {
    title: string;
    category: string | number;
    tagline: string;
    content?: string | null;
    image: string;
  };
  related: {
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

const getServiceDetail = cache(
  async (slug: string): Promise<ServiceDetailResponse | null> => {
    const baseurl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseurl}/treatment/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch service detail (${res.status})`);
    }

    return res.json();
  }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const data = await getServiceDetail(slug);

    if (!data) {
      return { title: "Service Not Found" };
    }

    return {
      title:
        data.seo?.meta_title ||
        `${data.hero?.title} | Kumar Hospital Kochi`,
      description: data.seo?.meta_desc || data.hero?.tagline || "",
      keywords: data.seo?.meta_key || "",
    };
  } catch (error) {
    return {
      title: "Service | Kumar Hospital Kochi",
    };
  }
}

async function TreatmentDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getServiceDetail(slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      {/* Top Header Bar with Treatment Background */}
      <TreatmentHeaderBar treatment={data.hero} />

      {/* Main Clinical Details & Sidebar Layout */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 xl:px-24">
          <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr] items-start">
            <TreatmentOverview treatment={data.detail} hero={data.hero} />
            <TreatmentSidebar treatment={data.hero} info={data.info} relatedTreatments={data.related ?? []} />
          </div>
        </div>
      </section>
    </>
  );
}

export default function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="min-h-screen bg-white text-[#111827]">
      <Header />

      <Suspense
        fallback={
          <div className="min-h-[500px] flex items-center justify-center bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-[#CD9E57]" />
          </div>
        }
      >
        <TreatmentDetailContent params={params} />
      </Suspense>

      <AppointmentCta />
      <Footer />
    </main>
  );
}

