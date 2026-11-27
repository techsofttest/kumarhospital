import type { Metadata } from "next";
import { Header } from "@/components/global/header";
import { Footer } from "@/components/global/footer";
import { PageHero } from "@/components/global/page-hero";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactMap } from "@/components/contact/contact-map";


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
  about:{
    title:string;
    sub:string;
    content:string;
    image:string;
    stat:{
      icon:string;
      title:string;
      description:string;
    }[];
  }
    
}
async function getSeo():Promise<Dataprops>{
const baseurl=process.env.NEXT_PUBLIC_API_URL;
const res=await fetch(`${baseurl}/contact`,{
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

export default async  function ContactPage() {
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
        label={data?.hero.title || "Get In Touch"}
        title={data?.hero.content|| ""}
        description="Reach out to our clinical care desk in Thammanam, Kochi for outpatient specialist appointments, neuro-rehab admissions, or non-surgical pain inquiries."
        backgroundImage={data?.hero.image||"/page-hero/b2.png"}
      />

      {/* Main Contact Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 xl:px-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-start">
            <ContactInfo about={data?.about}/>
            <ContactForm />
          </div>

          <ContactMap />
        </div>
      </section>

      <Footer />
    </main>
  );
}
