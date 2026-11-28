import type { Metadata } from "next";
import { Header } from "@/components/global/header";
import { Footer } from "@/components/global/footer";
import { PageHero } from "@/components/global/page-hero";
import { AppointmentCta } from "@/components/home/appointment-cta";
import { DoctorsGrid } from "@/components/doctors/doctors-grid";
import { DoctorsStandards } from "@/components/doctors/doctors-standards";


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
    stat:{
      icon:string;
      title:string;
      description:string;
    }[];
}
async function getSeo():Promise<Dataprops>{
const baseurl=process.env.NEXT_PUBLIC_API_URL;
const res=await fetch(`${baseurl}/doctor`,{
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

export default async  function DoctorsPage() {
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
        label={data?.hero.title||""}
        title={data?.hero.sub||""}
        backgroundImage={data?.hero.image||"/page-hero/b3.png"}
      />

      <DoctorsGrid doctor={data?.doctor ?? []} />
      <DoctorsStandards stat={data?.stat ?? []} />
      <AppointmentCta />
      <Footer />
    </main>
  );
}
