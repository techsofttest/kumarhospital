import type { Metadata } from "next";
import { Header } from "@/components/global/header";
import { Footer } from "@/components/global/footer";
import { PageHero } from "@/components/global/page-hero";
import { AppointmentCta } from "@/components/home/appointment-cta";
import { FaqSection } from "@/components/faq/faq-section";


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
   faq:{
    category:string;
    question:string;
    answer:string,
  }[];
}
async function getSeo():Promise<Dataprops>{
const baseurl=process.env.NEXT_PUBLIC_API_URL;
const res=await fetch(`${baseurl}/faq`,{
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

export default async function FaqPage() {
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
        label={data?.hero.title||"Questions & Answers"}
        title={data?.hero.sub||"Everything you need to know about our care."}
        backgroundImage={data?.hero.image|| ""}
      />

      <FaqSection faq={data?.faq??[]} info={data?.hero.content} />
      <AppointmentCta />
      <Footer />
    </main>
  );
}
