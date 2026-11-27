import { Bed, Cpu, Shield, Users } from "lucide-react";

export function FacilitiesHighlights({stat}:{stat:any[]}) {
  return (
    <section className="bg-[#F4F5F7] py-12 border-b border-gray-200/80">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 xl:px-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
           {stat.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-3.5">
            <div className="text-[#CD9E57] shrink-0  [&_svg]:h-10 [&_svg]:w-10"  dangerouslySetInnerHTML={{__html:stat.icon}} />
            <span className="text-sm font-semibold text-[#061627]">{stat.title}</span>
          </div>))}

          {/* <div className="flex items-center gap-3.5">
            <Cpu size={32} className="text-[#CD9E57] shrink-0" />
            <span className="text-sm font-semibold text-[#061627]">Robotic Gait & Biofeedback</span>
          </div>

          <div className="flex items-center gap-3.5">
            <Shield size={32} className="text-[#CD9E57] shrink-0" />
            <span className="text-sm font-semibold text-[#061627]">Infection-Safe Protocols</span>
          </div>

          <div className="flex items-center gap-3.5">
            <Users size={32} className="text-[#CD9E57] shrink-0" />
            <span className="text-sm font-semibold text-[#061627]">Caregiver Friendly Suites</span>
          </div> */}
        </div>
      </div>
    </section>
  );
}
