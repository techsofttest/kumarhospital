import { Stethoscope, Award, GraduationCap } from "lucide-react";

export function DoctorsStandards({stat}:{stat:any[]}) {
  return (
    <section className="bg-[#F4F5F7] py-14 sm:py-16 text-[#061627]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 xl:px-24">
        <div className="grid gap-8 sm:grid-cols-3">
          {stat.map((doc, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div  className="text-[#CD9E57] shrink-0 mt-0.5" dangerouslySetInnerHTML={{__html:doc.icon}} />
            <div>
              <h4 className="text-base font-semibold text-[#061627]">{doc.title}</h4>
              <div className="mt-1 text-xs sm:text-sm text-gray-600" dangerouslySetInnerHTML={{__html:doc.description}} />
            </div>
          </div>))}
        </div>
      </div>
    </section>
  );
}
