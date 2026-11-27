import type { Metadata } from "next";
import { Header } from "@/components/global/header";
import { Footer } from "@/components/global/footer";
import { PageHero } from "@/components/global/page-hero";
import { AppointmentCta } from "@/components/home/appointment-cta";
import { FacilitiesHighlights } from "@/components/facilities/facilities-highlights";
import { FacilitiesGrid } from "@/components/facilities/facilities-grid";

interface Dataprops{
  seo:{
    meta_title:string;
    meta_key:string;
    meta_desc:string;
  }
  hero:{
    title:string;
    sub:string;
    content:string;
    image:string;
  };
    stat:{
      icon:string;
      title:string;
      description:string;
    }[];
   facility:{
    title:string;
    content:string;
    image:string,
  }[];
}
async function getSeo():Promise<Dataprops>{
const baseurl=process.env.NEXT_PUBLIC_API_URL;
const res=await fetch(`${baseurl}/facility`,{
  cache:"no-store",
});
if(!res.ok){
  throw new Error("failed to fetch seo");
}
return res.json();
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getSeo();

    return {
      title: data?.seo?.meta_title ?? "Home",
      description: data?.seo?.meta_desc ?? "",
      keywords: data?.seo?.meta_key ?? "",
    };
  } catch (error) {
    return {
      title: "Home",
    };
  }
}

export default async function FacilitiesPage() {
      let data: Dataprops | null = null;

  try {
    data = await getSeo();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <main className="min-h-screen bg-white text-[#111827]">
      <Header />

      <PageHero
        label={data?.hero.title||"Infrastructure & Technology"}
        title={data?.hero.sub||"Purpose-built for accessibility, safety and patient recovery."}
        backgroundImage={data?.hero.image}
      />

      <FacilitiesHighlights stat={data?.stat ?? []}/>
      <FacilitiesGrid facility={data?.facility ?? []}/>
      <AppointmentCta />
      <Footer />
    </main>
  );
}
