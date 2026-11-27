import type { Metadata } from "next";
import { Header } from "@/components/global/header";
import { Footer } from "@/components/global/footer";
import { Hero } from "@/components/home/hero";
import { AppointmentBooking } from "@/components/home/appointment-booking";
import { About } from "@/components/home/about";
import { WhyChoose } from "@/components/home/why-choose";
import { NeuroRehab } from "@/components/home/neuro-rehab";
import { BackAndNeckPain } from "@/components/home/back-and-neck-pain";
import { Treatments } from "@/components/home/treatments";
import { Facilities } from "@/components/home/facilities";
import { Doctors } from "@/components/home/doctors";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";
import { AppointmentCta } from "@/components/home/appointment-cta";
// export const dynamic = "force-dynamic";
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
  }[];
  
  about:{
    title:string;
    sub:string;
    content:string;
  }
  brain:{
    title:string;
    sub:string;
    content:string;
  };

  stroke:{
    title:string;
    sub:string;
    content:string;
  };  
  faq:{
    title:string;
    sub:string;
    content:string;
    detail:{
      icon:string;
      title:string;
      description:string;
    }[];
  }
  why:{
    title:string;
    sub:string;
    content:string;
    detail:{
      icon:string;
      title:string;
      description:string;
    }[];
  }
    doctor:{
    title:string;
    content:string;
    qualification:string,
    experience:string,
    role:string,
    focus:string,
    time:string,
    days:string,
    image:string,
  }[];
    facility:{
    title:string;
    content:string;
    image:string,
  }[];
     testimony:{
    title:string;
    treatment:string;
    content:string;
    image:string,
  }[];
     treatment:{
    title:string;
    content:string;
    icon:string;
  }[];
}
async function getSeo():Promise<Dataprops>{
const baseurl=process.env.NEXT_PUBLIC_API_URL;
const res=await fetch(`${baseurl}/index`,{
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

export default async  function HomePage() {
    let data: Dataprops | null = null;

  try {
    data = await getSeo();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }
  return (
    <main className="min-h-screen bg-white text-[#111827]">
      <Header />
      <Hero hero={data?.hero ?? []} />
      <AppointmentBooking />
      <About about={data?.about ?? ""}/>
      <WhyChoose why={data?.why}/>
      <NeuroRehab stroke={data?.stroke ?? ""}/>
      <BackAndNeckPain brain={data?.brain ?? ""}/>
      <Doctors doctor={data?.doctor ?? []}/>
      <Treatments treatments={data?.treatment ?? []}/>
      <Facilities facility={data?.facility ?? []}/>
      <Testimonials testimony={data?.testimony ?? []} />
      <Faq faq={data?.faq}/>
      <AppointmentCta/>
      <Footer />
    </main>
  );
}
